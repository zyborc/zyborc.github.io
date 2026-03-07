---
title: "Copilot Studio in Power Apps Code Apps: Every Pitfall I Hit"
date: 2026-03-08
tags: ["Power Apps", "Copilot Studio", "AI", "TypeScript", "Microsoft 365"]
summary: "Integrating Copilot Studio into a Power Apps Code App should be straightforward. It is not. Here are the undocumented bugs, workarounds, and patterns I discovered building a production AI assistant."
coverImage: "/images/blog/power-apps-copilot-pitfalls-cover.png"
draft: true
---

![Copilot Studio pitfalls in Power Apps Code Apps](/images/blog/power-apps-copilot-pitfalls-cover.png)

## The Promise

Copilot Studio is Microsoft's platform for building custom AI agents. Power Apps Code Apps can call these agents through a generated service class. The idea is simple: add Copilot Studio as a data source, call `ExecuteCopilotAsyncV2`, get an AI response.

In practice, I hit five significant issues that are not documented anywhere.

## Pitfall 1: The `x-ms-conversation-id` Header Bug

When you run `pac code add-data-source` and select the Copilot Studio connector, it generates a `MicrosoftCopilotStudioService.ts` file. This file contains a critical bug.

The generated code uses **underscores** in the conversation ID header:

```typescript
// ❌ Generated code (BROKEN)
headers: {
  'x_ms_conversation_id': conversationId,
}
```

The API expects **hyphens**:

```typescript
// ✅ What the API actually needs
headers: {
  'x-ms-conversation-id': conversationId,
}
```

**You must manually patch the generated file after every regeneration.** There is no configuration option to fix this. The symptom is that multi-turn conversations silently reset — each message starts a new conversation instead of continuing the previous one.

### The Fix

Open `src/generated/services/MicrosoftCopilotStudioService.ts` and find every occurrence of `x_ms_conversation_id`. Replace it with `x-ms-conversation-id`.

I recommend adding a comment above the fix so you remember to re-apply it after regeneration:

```typescript
// MANUAL PATCH: PAC generates underscores, API requires hyphens
'x-ms-conversation-id': conversationId,
```

## Pitfall 2: The `notificationUrl` Placeholder Trick

The `ExecuteCopilotAsyncV2` method requires a `notificationUrl` parameter. This is intended for webhook-based notification when the agent finishes processing a long-running request.

In a Code App context, you do not need a real webhook URL. But you cannot pass `null` or an empty string — the API will reject it.

The solution is a specific placeholder string:

```typescript
const response = await MicrosoftCopilotStudioService.ExecuteCopilotAsyncV2({
  agentIdentifier: 'as_techdocs',
  text: userMessage,
  notificationUrl: 'https://notificationurlplaceholder',
  // ↑ This exact string. Not any URL. This specific one.
});
```

I discovered this through trial and error. Using `https://example.com` or any other URL causes the API to attempt an actual webhook call and fail.

## Pitfall 3: Unpredictable Response Formats

This was the most frustrating issue. The Copilot Studio API does not return a consistent JSON structure. Depending on the agent, the conversation state, and seemingly random factors, the response might be nested differently.

I have seen all of these in production:

```typescript
// Sometimes this:
response.responses[0].text

// Sometimes this:
response.text

// Sometimes this:
JSON.parse(response).Response

// Sometimes this:
response.activities[0].text

// And sometimes this:
JSON.parse(response.response).text
```

### The Solution: A Nested Response Traverser

I wrote a utility that checks every known path:

```typescript
const extractCopilotResponse = (raw: unknown): string => {
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return extractCopilotResponse(parsed);
    } catch {
      return raw;
    }
  }

  if (typeof raw !== 'object' || raw === null) {
    return '';
  }

  const obj = raw as Record<string, unknown>;

  // Check known response paths
  if (obj.responses && Array.isArray(obj.responses) && obj.responses[0]) {
    const first = obj.responses[0] as Record<string, unknown>;
    if (typeof first.text === 'string') return first.text;
  }

  if (typeof obj.text === 'string') return obj.text;
  if (typeof obj.Response === 'string') return obj.Response;
  if (typeof obj.response === 'string') {
    return extractCopilotResponse(obj.response);
  }

  if (obj.activities && Array.isArray(obj.activities)) {
    const textActivity = obj.activities.find(
      (a: unknown) => typeof a === 'object' && a !== null && 'text' in a
    );
    if (textActivity && typeof (textActivity as Record<string, unknown>).text === 'string') {
      return (textActivity as Record<string, unknown>).text as string;
    }
  }

  return JSON.stringify(raw);
};
```

This is ugly but necessary. Without it, your chat panel will randomly show `[object Object]` or empty responses.

## Pitfall 4: Conversation State Management

Copilot Studio returns a `conversationId` on the first request. You must send this ID back on subsequent requests (using the patched header from Pitfall 1) to maintain conversation context.

The pattern I use:

```typescript
const [conversationId, setConversationId] = useState<string | null>(null);

const sendMessage = async (text: string) => {
  const response = await MicrosoftCopilotStudioService.ExecuteCopilotAsyncV2({
    agentIdentifier: config.copilotAgentName,
    text,
    notificationUrl: 'https://notificationurlplaceholder',
    ...(conversationId && { conversationId }),
  });

  // Store the conversation ID for follow-up messages
  if (response?.conversationId) {
    setConversationId(response.conversationId);
  }

  return extractCopilotResponse(response);
};
```

One additional nuance: if you want **separate conversation contexts per feature** (e.g., one for the chat panel, another for AI-drafted email replies, another for Jira comment suggestions), you need separate `conversationId` states. I maintain them per-category:

```typescript
const conversationIds = useRef<Record<string, string>>({});
```

## Pitfall 5: Void Returns on First Call

The very first call to `ExecuteCopilotAsyncV2` sometimes returns `undefined` or an empty response while the agent "warms up." Your UI must handle this gracefully:

```typescript
const reply = extractCopilotResponse(response);
if (!reply) {
  // Agent is still initializing — show a friendly message
  return 'The AI assistant is warming up. Please try again in a moment.';
}
```

## What I Built With This

Despite these issues, Copilot Studio integration is powerful once you work around the bugs. In my ITSM Dashboard, I use it for:

1. **Floating chat panel** — A general-purpose AI assistant for technical documentation queries
2. **AI-drafted Jira comments** — Clicking "AI Draft" on a ticket sends the ticket context to Copilot Studio and generates a professional response
3. **AI-drafted email replies** — Same pattern for Outlook emails, generating contextual reply drafts

The key is providing good context in the prompt:

```typescript
const draftJiraComment = async (ticket: Ticket) => {
  const prompt = `Based on this Jira ticket, draft a professional response:
    Title: ${ticket.summary}
    Description: ${ticket.description}
    Status: ${ticket.status}
    Priority: ${ticket.priority}`;

  return sendMessage(prompt);
};
```

## Summary

| Issue | Symptom | Fix |
|---|---|---|
| Header naming bug | Conversations reset every message | Replace `x_ms_conversation_id` → `x-ms-conversation-id` |
| notificationUrl | API rejects the request | Use `'https://notificationurlplaceholder'` |
| Inconsistent responses | Empty or `[object Object]` in UI | Build a nested response traverser |
| Missing conversation state | No multi-turn context | Store and re-send `conversationId` |
| Cold start void returns | First response is empty | Add graceful fallback messaging |

None of these are documented in the official Power Apps Code Apps documentation as of March 2026. Hopefully that changes, but until then, consider this your field guide.

---

*This is part 2 of a three-part series. Previously: [Getting Started with Power Apps Code Apps](/blog/2026-03-power-apps-code-apps-getting-started). Next: [12 Things I Wish I Knew](/blog/2026-03-power-apps-code-apps-lessons-learned).*

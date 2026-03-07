---
title: "12 Things I Wish I Knew Before Building Power Apps Code Apps"
date: 2026-03-09
tags: ["Power Apps", "React", "TypeScript", "Lessons Learned", "Microsoft 365"]
summary: "After building two production applications with Power Apps Code Apps, here are the non-obvious lessons — from SDK quirks and generated code bugs to architecture patterns that actually work."
coverImage: "/images/blog/power-apps-lessons-learned-cover.png"
draft: true
---

![12 lessons learned building Power Apps Code Apps](/images/blog/power-apps-lessons-learned-cover.png)

## The Context

I built two production applications with Power Apps Code Apps over the past few months: a **Technical Documentation Search App** powered by Copilot Studio, and an **ITSM Agent Dashboard** integrating Jira Cloud, Office 365, and AI-drafted responses. These are the lessons I would give my past self.

> 📖 New to Code Apps? Start with the [official overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview) and the [quickstart guide](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch).

---

## 1. Connectors Work Without `getContext()`

The SDK offers `getContext()` from `@microsoft/power-apps/app` to retrieve runtime info like the current user or environment details. I initially thought this was a mandatory initialization step. It is not.

Your generated services (Jira, Outlook, Copilot Studio) work without calling `getContext()`. Use it only when you need runtime information:

```typescript
import { getContext } from '@microsoft/power-apps/app';

const context = await getContext();
// Use for user greeting, environment-specific logic, etc.
```

Do not treat this as an initialization gate — your app and all connectors function without it.

---

## 2. Your CSS Needs iframe Awareness

Code Apps run inside an iframe in the Power Platform host. Standard CSS behavior changes:

```css
html, body, #root {
  height: 100%;
  overflow: hidden; /* Prevent double scrollbars */
}
```

Without this, you get nested scrollbars and the app does not fill the available space properly. The Power Platform container has its own scroll handling.

---

## 3. Build Mock-First, Integrate Later

The `pac code add-data-source` command generates TypeScript service files from connectors. But you need a connected Power Platform environment to run it.

**Pattern that works:** Design your hooks to be data-source agnostic.

```typescript
// Start with mock data
const useTickets = () => {
  const [tickets] = useState<Ticket[]>(MOCK_DATA);
  return { tickets, loading: false };
};

// Later, swap the implementation
const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    JiraCloudService.SearchForIssuesUsingJql({...})
      .then(result => setTickets(mapJiraToTickets(result.issues)));
  }, []);
  return { tickets, loading };
};
```

The consuming components never change. This saved me significant time during development.

---

## 4. The Generated Code Has Bugs — Accept It

The `pac code add-data-source` generator is not perfect. Specific issues I encountered:

- **Copilot Studio:** `x_ms_conversation_id` header uses underscores instead of hyphens (breaks multi-turn conversations)
- **Office 365 Users:** `HttpRequest` parameter typed as `string` when it should accept objects with headers
- **General:** Some methods have incorrect return types

**Strategy:** After every `pac code add-data-source` run, maintain a checklist of manual patches you need to re-apply.

---

## 5. Use API V3, Not V2

When working with Office 365 Outlook connectors, the generated service may expose multiple API versions. Always use V3:

```typescript
// ✅ Use V3
Office365OutlookService.GetEmailsV3({ folderPath: 'Inbox' })
Office365OutlookService.GetEventsCalendarViewV3({ calendarId: 'Calendar' })

// ❌ Avoid V2 — different response shapes, less reliable
Office365OutlookService.GetEmailsV2({ folderPath: 'Inbox' })
```

V2 and V3 return different response structures. If you start with V2 and later switch, you will have to refactor your type mappings.

---

## 6. There Is No Test Infrastructure

Power Apps Code Apps do not ship with Jest, Vitest, or any testing framework. Your verification workflow is:

1. `npm run build` — catches TypeScript errors
2. `npm run dev` — manual testing via Local Playback
3. Browser DevTools — verify network calls
4. `pac code push` — deploy and test in Power Platform

If you want unit tests, you can add Vitest yourself, but the generated service classes are difficult to mock because they depend on the Power Apps runtime.

---

## 7. Design System From Day One

I made the mistake of using hardcoded colors in JavaScript:

```typescript
// ❌ This causes pain later
const COLORS = { bg: '#030817', surface: '#0f1b34', accent: '#60a5fa' };
```

When I needed to refactor for dark/light mode consistency, I had to touch every component. Start with CSS variables immediately:

```css
:root {
  --bg: #030817;
  --surface: #0f1b34;
  --accent: #60a5fa;
  --text: #f8fbff;
  --text-secondary: #95a7c6;
  --border: #233a63;
}
```

```typescript
// ✅ Components use CSS variables, no JS color constants
<div style={{ background: 'var(--surface)' }}>
```

---

## 8. Jira ADF Is Not Plain Text

If you integrate Jira Cloud, comments and descriptions come in **Atlassian Document Format** (ADF) — a JSON structure, not markdown or HTML.

You need a parser:

```typescript
const parseADF = (node: ADFNode): string => {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'paragraph') {
    return node.content?.map(parseADF).join('') + '\n';
  }
  if (node.type === 'heading') {
    const level = node.attrs?.level ?? 2;
    return '#'.repeat(level) + ' ' + node.content?.map(parseADF).join('') + '\n';
  }
  // ... handle lists, code blocks, etc.
  return node.content?.map(parseADF).join('') ?? '';
};
```

And a creator for writing comments back:

```typescript
const createADF = (text: string) => ({
  version: 1,
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{ type: 'text', text }],
  }],
});
```

Also: **JSM internal comments** require the special property `sd.public.comment` for visibility control. Standard Jira comments do not need this.

---

## 9. ConfigContext + localStorage Beats Static Config

A static `config.ts` file does not work well in practice. Users need different JQL queries, different mail folders, different team members.

**Pattern:** Use a React Context backed by `localStorage`:

```typescript
const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('app-config');
    return saved ? deepMerge(DEFAULT_CONFIG, JSON.parse(saved)) : DEFAULT_CONFIG;
  });

  const updateConfig = (partial: Partial<AppConfig>) => {
    setConfig(prev => {
      const next = deepMerge(prev, partial);
      localStorage.setItem('app-config', JSON.stringify(next));
      return next;
    });
  };

  return <ConfigContext.Provider value={{ config, updateConfig }}>{children}</ConfigContext.Provider>;
};
```

The **deep merge** is critical. Without it, adding new config fields in a code update will wipe out the user's saved settings because the old localStorage payload does not contain the new keys.

---

## 10. The Copilot `notificationUrl` Must Be Exactly Right

I covered this in detail in the [Copilot Studio article](/blog/2026-03-power-apps-copilot-studio-pitfalls), but it bears repeating:

```typescript
notificationUrl: 'https://notificationurlplaceholder'
// This exact string. Not "https://example.com". Not null. This one.
```

---

## 11. Master-Detail Layouts Work Best

For data-heavy views (tickets, emails), a Master-Detail layout is the most effective pattern in the iframe context:

```
┌─────────────────────────────────────────┐
│ Sidebar │  List (Master)  │   Detail    │
│         │  ┌───────────┐  │  ┌────────┐ │
│  🎫     │  │ Ticket 1  │  │  │ Title  │ │
│  📧     │  │ Ticket 2  │◄─│  │ Desc   │ │
│  📅     │  │ Ticket 3  │  │  │ Status │ │
│  👥     │  │ ...       │  │  │ Actions│ │
│         │  └───────────┘  │  └────────┘ │
└─────────────────────────────────────────┘
```

I used this pattern for both Jira tickets (with comment chat panel) and Outlook emails (with AI draft action). The detail pane includes quick actions like "Reply," "Mark as read," and "AI Draft."

---

## 12. `npm run build` Is Your Best Friend

Since there is no test framework, TypeScript compilation is your primary safety net. Run `npm run build` after every significant change. The generated service classes are strictly typed, so the compiler will catch most integration errors.

My deploy checklist:

```bash
# 1. Type check
npm run build

# 2. Visual check in Local Playback
npm run dev

# 3. Deploy
pac code push
```

If the build passes and the Local Playback looks right, the deployed version will work.

---

## Final Thoughts

Power Apps Code Apps are genuinely useful for frontend developers who need to build enterprise internal tools. The connector ecosystem is powerful, and the React foundation means you are not learning a proprietary framework.

The rough edges are real — generated code bugs, missing documentation, no test infrastructure. But these are solvable problems, and the productivity gain from automatic authentication and connector access is significant.

Here is what I believe: **Code Apps will eventually replace canvas apps for any serious enterprise application.** Canvas apps were designed for citizen developers building simple forms and approval flows. They work for that. But the moment you need more than a list with a filter — a real dashboard, multi-source views, custom interactions, state management — you are fighting Power Fx and the formula bar instead of building.

Code Apps change the equation. You get a real development environment — React, TypeScript, npm, version control, code review — with the Power Platform connector infrastructure doing what it does best: handling authentication, consent, and API connectivity. No more `Patch(DataSource, LookUp(...))` formulas sprawling across a canvas. Just `await Service.Method()`.

The enterprise governance story seals it. Your Code App automatically inherits **DLP policies**, conditional access, managed environment controls, sharing limits, and cross-tenant restrictions — the same governance your IT admins already enforce for every Power App in the organization. You do not build security. You build features. The platform handles the rest.

And with AI-assisted coding tools making React development accessible to people who might have previously been canvas app builders, the line between "citizen developer" and "pro developer" is blurring. The skills gap that justified canvas apps is closing fast.

If you are building internal tools for Microsoft 365 organizations today, Code Apps deserve more than a look. They deserve to be your default choice.

## Further Reading

- [Power Apps Code Apps Overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Create a code app from scratch](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [Connect your code app to data](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/connect-to-data)
- [Code Apps Architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture)
- [System limits and configuration](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/system-limits-configuration)

---

*This concludes the three-part series on Power Apps Code Apps. Part 1: [Getting Started](/blog/2026-03-power-apps-code-apps-getting-started). Part 2: [Copilot Studio Pitfalls](/blog/2026-03-power-apps-copilot-studio-pitfalls).*

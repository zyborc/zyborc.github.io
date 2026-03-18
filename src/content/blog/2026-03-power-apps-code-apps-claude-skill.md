---
title: "Supercharge Power Apps Code App Development with a Claude Skill"
date: 2026-03-18
tags: ["Power Apps", "Claude", "AI", "Developer Tools", "React", "TypeScript"]
summary: "I published an open-source Claude skill that encodes everything I've learned building Power Apps Code Apps — PAC CLI workflows, SharePoint gotchas, Copilot Studio bugs, and design patterns. Here's what it is and how to use it."
coverImage: "/images/blog/power-apps-claude-skill-cover.png"
draft: false
---

![Power Apps Code Apps Claude Skill](/images/blog/power-apps-claude-skill-cover.png)

If you've read my previous posts on [getting started with Power Apps Code Apps](/blog/2026-03-power-apps-code-apps-getting-started) and [the lessons I learned the hard way](/blog/2026-03-power-apps-code-apps-lessons-learned), you know there's a lot of non-obvious knowledge involved in building these apps well. The PAC CLI has quirks. The generated services have bugs. SharePoint fields expect formats that are nowhere near obvious. And there's almost nothing written about it yet.

I've been using Claude Code as my primary coding assistant throughout this journey. And I've been thinking about a recurring problem: every time I start a new Code App project in a fresh conversation, I have to re-explain the same context. Don't edit generated files. The SharePoint CLI list discovery doesn't work. The Copilot Studio header bug. Always await `initialize()`. Over and over again.

So I turned all of that knowledge into a **Claude skill** — and I'm publishing it publicly.

> 📦 **Repository:** [github.com/zyborc/power-apps-code-apps-skill](https://github.com/zyborc/power-apps-code-apps-skill)

---

## What Is a Claude Skill?

Claude Code supports a **skill system** — folders of markdown files that teach Claude how to approach a specific domain. When you place a skill in your project's `.agent/skills/` directory, Claude automatically picks it up and applies it whenever the context matches.

Think of it as a long-term memory for your AI assistant. Instead of explaining your stack, conventions, and known pitfalls in every conversation, the skill carries that context permanently.

The skill system is based on a `SKILL.md` file with a YAML frontmatter `description` field that tells Claude when to trigger the skill — and then sub-files that Claude loads on demand for specific topics.

> 📖 [Claude Code Skill Docs](https://code.claude.com/docs/en/skills) · [Official Anthropic Skills Repo](https://github.com/anthropics/skills)

---

## What the Skill Covers

The skill is organized as a main entry point plus six focused sub-files:

| File | What it teaches Claude |
|---|---|
| `SKILL.md` | Stack overview, non-negotiable rules, CLI quick reference, load order |
| `setup.md` | Project init (template vs. scratch), auth workflow, canonical `package.json`, folder structure |
| `rules.md` | CLI rules, data connection workflow, code conventions |
| `errors.md` | Known gotchas — **always loaded before any data or SDK code** |
| `design.md` | Design tokens (dark-navy theme), Tailwind + inline token pattern, iframe constraints |
| `sharepoint.md` | Choice fields, People Picker, dynamic option loading |
| `copilot-studio.md` | `MicrosoftCopilotStudioService`, `ExecuteCopilotAsyncV2`, the `x-ms-conversation-id` header bug |

Claude loads only the sub-files relevant to the current task — not all of them upfront.

---

## The Non-Negotiable Rules

At the core of the skill are eight rules that Claude applies to every Code App task, without exception:

```
1. Never use fetch/axios directly to connectors — only generated services
2. Never edit files in src/generated/ — they are owned by PAC CLI
3. If schema changes: delete + re-add the data source, never patch generated files
4. Auth is handled by the Power Apps host — never implement MSAL yourself
5. No localStorage / sessionStorage — use React state or Dataverse
6. Always load errors.md before touching the data layer
7. All data fetching in hooks/ — never directly inside components
8. If more than one CLI command fails in sequence: stop and ask the user
```

Rule 8 is the one I'm most glad I encoded. Without it, Claude will attempt increasingly creative workarounds when CLI commands fail — each one harder to undo than the last.

---

## What's in `errors.md`

This is the most valuable file in the skill. It's a list of every non-obvious failure mode I've hit, with the symptom, the wrong approach, and the correct fix. Claude reads this before writing any data layer code.

A few highlights:

**SharePoint choice fields:**
```typescript
// ❌ Wrong — fails silently
await ListService.create({ Status: "Active" });

// ✅ Correct
await ListService.create({ Status: { Value: "Active" } });
```

**People Picker — UPN ≠ email:**
```typescript
// ❌ Wrong — email and UPN can differ for guest accounts
const claims = `i:0#.f|membership|${email}`;

// ✅ Correct — always resolve UPN from Office365Users
const profile = await Office365UsersService.MyProfile_V2('userPrincipalName');
const claims = `i:0#.f|membership|${profile.data.userPrincipalName}`;
```

**The Copilot Studio header bug** — this one cost me hours. The PAC CLI generates `MicrosoftCopilotStudioService.ts` with `x_ms_conversation_id` (underscores) instead of `x-ms-conversation-id` (hyphens). The REST client ignores underscore-prefixed headers, which silently breaks multi-turn conversations. The skill calls this out explicitly as the **one exception** to the "never edit generated files" rule and tells Claude exactly where to patch it.

---

## The Design System

The `design.md` file defines a consistent **dark-navy Claude Code aesthetic** — the same visual language used in Claude Code and modern AI developer tooling. It's fully self-contained with CSS variables, typography, spacing tokens, and a status indicator pattern:

```css
--bg-base:       #0d1424;
--bg-surface:    #131d30;
--text-primary:  #e2e8f0;
--text-secondary: #94a3b8;
--accent:        #f59e0b;
--font-sans:     'DM Sans', sans-serif;
--font-mono:     'DM Mono', monospace;
```

The convention is **Tailwind for layout, inline styles for design tokens** — which keeps the design portable across projects, teammates, and AI models without needing a shared Tailwind config.

---

## Installing the Skill

```bash
# From your Power Apps Code App project root
mkdir -p .agent/skills
git clone https://github.com/zyborc/power-apps-code-apps-skill.git .agent/skills/power-apps-code-apps
```

Once installed, Claude Code activates the skill automatically when you mention Power Apps Code Apps, `pac code push`, `@microsoft/power-apps`, SharePoint connectors, or similar context.

If you need to trigger it manually, use this prompt:

```
Read the Power Apps skill: SKILL.md and relevant sub-files
(setup.md / rules.md / design.md / errors.md / sharepoint.md).
Always read errors.md before writing any data layer or SDK code.
Apply all rules before writing any code.
```

---

## Works With Other Agents and Models

Because the skill is plain markdown, it's not tied to Claude Code. Any AI assistant that can read files from a directory can use it — Cursor, Copilot, Windsurf, or any agent that supports similar skill/context mechanisms. The design tokens and rules are generic enough to be useful anywhere.

---

## What I Validated With

I used the [official `skill-creator` skill](https://github.com/anthropics/skills/tree/main/skills/skill-creator) from Anthropic's public skills repo to validate this skill before publishing. The validation checks structure, description quality (triggering accuracy), content completeness, and writing style.

Findings before publishing:
- An internal Bitbucket URL with my org and username in `setup.md` — replaced with a generic placeholder
- A broken reference to a local `design-system/SKILL.md` that didn't exist — replaced with self-contained tokens
- A German fallback string in `copilot-studio.md` — replaced with English

The skill passed structure, description, and content quality checks after those fixes.

---

## Contributing

Found a new gotcha? Discovered a pattern that works well? PRs are welcome.

The only rule: **keep examples generic**. No internal tenant URLs, real connection IDs, or organization names. Use placeholders like `contoso.sharepoint.com` and `aaaabbbb-0000-1111-cccc-ddddeeeeeeee`.

> 📦 [github.com/zyborc/power-apps-code-apps-skill](https://github.com/zyborc/power-apps-code-apps-skill)

---

## Further Reading

- [Power Apps Code Apps Overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Connect your code app to data](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/connect-to-data)
- [PAC CLI reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/code)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
- [Claude Code Skill Docs](https://code.claude.com/docs/en/skills)

---

*This post is part of a series on Power Apps Code Apps. Start with [Part 1: Getting Started](/blog/2026-03-power-apps-code-apps-getting-started) and [Part 2: Lessons Learned](/blog/2026-03-power-apps-code-apps-lessons-learned).*

---
title: "Power Apps Code Apps: A Developer's Guide to Getting Started"
date: 2026-03-07
tags: ["Power Apps", "React", "TypeScript", "Vite", "Microsoft 365"]
summary: "Power Apps Code Apps let you build full React+TypeScript applications that run inside the Power Platform with access to Dataverse, Copilot Studio, and Microsoft 365 connectors. Here is what the setup actually looks like."
coverImage: "/images/blog/power-apps-code-getting-started-cover.png"
draft: true
---

![Power Apps Code Apps getting started](/images/blog/power-apps-code-getting-started-cover.png)

## What Are Power Apps Code Apps?

If you have built canvas apps or model-driven apps in Power Apps before, Code Apps feel like a different world. Instead of the low-code designer, you get a standard **React + TypeScript + Vite** project. You write real components, manage real state, and deploy through the `pac` CLI.

The key difference from a regular React app: your application runs inside the Power Platform runtime and gets automatic access to **connectors** — the same ones available in Power Automate and canvas apps. That means Office 365 mail, SharePoint, Jira, Copilot Studio, Dataverse, and hundreds of other services are available through generated TypeScript service classes.

## The Tech Stack

A Power Apps Code App is built on:

| Layer | Technology |
|---|---|
| Runtime | `@microsoft/power-apps` SDK |
| Build | Vite + `@microsoft/power-apps-vite` plugin |
| UI | React 19 + TypeScript |
| Data | Auto-generated service classes from connectors |
| Deploy | `pac code push` |

There is no custom framework to learn. If you know React, you know 90% of what you need.

## Project Setup

### 1. Initialize the Project

You can scaffold a new project from the PAC CLI or use an existing template:

```bash
pac code init --name MyApp
cd MyApp
npm install
```

This gives you a standard Vite project structure with the Power Apps plugin pre-configured.

### 2. The Vite Configuration

The only non-standard piece is the Vite plugin:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { powerApps } from '@microsoft/power-apps-vite';

export default defineConfig({
  plugins: [react(), powerApps()],
});
```

The `powerApps()` plugin handles local authentication redirects and connector routing during development.

### 3. SDK Initialization — The Critical First Step

Before you can call any connector, you **must** await the SDK initialization:

```typescript
import { initialize } from '@microsoft/power-apps';

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initialize().then(() => setReady(true));
  }, []);

  if (!ready) return <LoadingScreen />;
  return <MainApp />;
};
```

> **This is not optional.** If you skip `await initialize()`, every service call will fail silently or throw cryptic errors. I learned this the hard way.

## Adding Data Sources

This is where Power Apps Code Apps really shine. Instead of writing REST clients manually, you generate typed service classes from connectors:

```bash
pac code add-data-source
```

This opens an interactive prompt where you select from available connectors — Office 365 Outlook, SharePoint, Jira Cloud, Copilot Studio, and many more. The CLI generates TypeScript files in `src/generated/services/` with fully typed methods.

For example, after adding Office 365 Outlook, you get:

```typescript
import { Office365OutlookService } from './generated/services/Office365OutlookService';

// Fetch emails
const emails = await Office365OutlookService.GetEmailsV3({
  folderPath: 'Inbox',
  top: 20,
});

// Get today's calendar events
const events = await Office365OutlookService.GetEventsCalendarViewV3({
  calendarId: 'Calendar',
  startDateTimeUtc: todayStart,
  endDateTimeUtc: todayEnd,
});
```

No API keys, no OAuth dance, no token management. The Power Platform runtime handles all of that.

## Mock-First Development

Here is a practical pattern I strongly recommend: **build with mock data first, then swap in real services.**

The reason is simple — you need to run `pac code add-data-source` to generate the service files, and that requires a connected Power Platform environment. But your component structure, layouts, and state management can all be developed independently.

Create your data hooks with a clean interface:

```typescript
// hooks/useTickets.ts
export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [loading, setLoading] = useState(false);
  return { tickets, loading };
};
```

Later, replace the mock data with real service calls:

```typescript
export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    JiraCloudService.SearchForIssuesUsingJql({ jql: 'assignee = currentUser()' })
      .then((result) => setTickets(mapJiraToTickets(result.issues)))
      .finally(() => setLoading(false));
  }, []);

  return { tickets, loading };
};
```

The components consuming the hook never need to change.

## Development Workflow

```text
npm run dev     → Local dev server with Power Apps auth
npm run build   → Production bundle
pac code push   → Deploy to Power Platform
```

The local development experience uses "Local Playback" — your app runs in the browser with live connector access through the Power Platform runtime proxy.

## What I Built

To give concrete context: I built an **ITSM Agent Dashboard** as a Code App that combines:

- **Jira Cloud tickets** — queried via JQL, with full detail panels including ADF comment rendering
- **Outlook emails** — inbox with reading pane, quick actions, and AI-drafted replies
- **Calendar events** — daily schedule from Office 365
- **Team presence** — real-time online/busy/away status via Microsoft Graph
- **Copilot Studio chat** — floating AI assistant panel for contextual help

All of this in a single React application, deployed as a Power App, accessible to anyone in the organization without additional authentication setup.

## When to Use Code Apps

Code Apps make sense when:

- You need **complex UI** that the canvas designer cannot express
- You want **real developer tooling** — TypeScript, hot reload, version control
- You need to combine **multiple connectors** in a single view
- Your team already knows **React**

They are probably overkill for simple forms or basic CRUD interfaces where canvas apps work fine.

## Next Steps

In the next article, I will cover the tricky part: [integrating Copilot Studio](/blog/2026-03-power-apps-copilot-studio-pitfalls) and the undocumented bugs you will hit along the way.

---

*This article is part of a three-part series on building production applications with Power Apps Code Apps.*

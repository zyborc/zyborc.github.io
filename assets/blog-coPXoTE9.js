const p=`---
title: "Displaying SharePoint Version History in Power Apps"
date: 2023-09-28
tags: ["SharePoint", "Power Apps", "Power Automate", "Microsoft 365"]
summary: "How to retrieve SharePoint list item version history with the REST API, process it in Power Automate, and display only changed values inside Power Apps."
coverImage: "/images/blog/sharepoint-version-history-cover.svg"
draft: false
---

![Flow for loading SharePoint version history into Power Apps.](/images/blog/sharepoint-version-history-cover.svg)

## Introduction

SharePoint lists are often the operational backbone behind approval processes, request handling, and lightweight business applications. One limitation appears quickly when you build on top of them with Power Apps: the standard SharePoint connector only exposes the current state of a list item, not its full version history.

If users need transparency about who changed what and when, you need another path.

This article shows a practical pattern:

1. Keep the normal SharePoint data connection in Power Apps.
2. Use Power Automate to call the SharePoint REST API.
3. Parse the response and return version data to the app.
4. Store that data in a collection.
5. Render only changed values in a gallery.

## Step 1: Set up the SharePoint data connection

Start with the normal SharePoint connection inside Power Apps.

- Open the app in Power Apps Studio.
- Add \`SharePoint\` as a data source.
- Connect the app to the correct site and list.

This part is standard, but it is still necessary because the app needs the current list item context. The version history itself will come from a separate flow.

## Step 2: Retrieve version history with Power Automate

The key is a flow triggered by Power Apps that sends an HTTP request to SharePoint.

![Power Automate calling the SharePoint REST API and returning JSON.](/images/blog/sharepoint-version-history-flow.svg)

Create a new flow with the \`Power Apps\` trigger and add the SharePoint action \`Send an HTTP request to SharePoint\`.

Use a \`GET\` request against the versions endpoint:

\`\`\`text
/_api/lists/getbyid('<List ID>')/items(<Item ID>)/versions
\`\`\`

Replace:

- \`<List ID>\` with the target list ID
- \`<Item ID>\` with the selected SharePoint item ID passed from Power Apps

After the HTTP request:

1. Add a \`Parse JSON\` action.
2. Use sample output from a test run to generate the schema.
3. Return the parsed result back to Power Apps.

That gives you a structured payload instead of trying to work with raw JSON inside the app.

## Step 3: Return clean data to Power Apps

Before you bind anything to the UI, make sure the flow returns only the values you actually need. In most cases, you do not want the entire response body exposed directly to controls.

Useful fields usually include:

- Version identifier
- Title
- Editor or creator references
- Modified date
- Workflow status
- Any business columns you want to compare over time

Keeping the flow output focused makes the app easier to maintain and reduces parsing friction later.

## Step 4: Store version history in a collection

Once the flow returns the version payload, you can move it into a collection in Power Apps. A common pattern is to execute this when the detail screen becomes visible.

![Power Apps collection and gallery pattern for version history.](/images/blog/sharepoint-version-history-gallery.svg)

Example:

\`\`\`powerfx
ClearCollect(
    collItemHistory,
    ForAll(
        Table(
            ParseJSON(
                FlowGetItemHistory.Run(
                    SharePointIntegration.SelectedListItemID
                ).itemhistory
            )
        ),
        {
            id: Value.id,
            Title: Text(Value.Title),
            WorkflowStatus: Text(Value.WorkflowStatus),
            _UIVersionString: Value._UIVersionString
        }
    )
)
\`\`\`

What this does:

- \`ClearCollect\` resets and fills the target collection.
- \`FlowGetItemHistory.Run(...)\` calls the Power Automate flow.
- \`ParseJSON\` converts the flow response into typed values Power Apps can work with.
- \`ForAll\` maps each version entry into a cleaner structure for the UI.

The exact property names depend on your SharePoint list. Adjust the mappings to match your environment.

## Step 5: Show only changed values in the gallery

At this point, you can bind a gallery to \`collItemHistory\`. The next improvement is what makes the screen actually useful: only show fields that changed between one version and the previous one.

For a field like \`WorkflowStatus\`, the \`Visible\` property can compare the current version with the previous one:

\`\`\`powerfx
If(
    Text(ThisItem.WorkflowStatus) <>
        Text(
            First(
                Filter(
                    collItemHistory,
                    _UIVersionString = ThisItem._UIVersionString - 1
                )
            ).WorkflowStatus
        ),
    true,
    false
)
\`\`\`

This logic works as follows:

- \`ThisItem\` is the current row in the gallery.
- \`Filter(...)\` finds the previous version.
- \`First(...)\` returns that previous record.
- The formula compares the current field value with the prior one.
- If the values differ, the control becomes visible.

You can reuse the same pattern for other columns such as approvals, comments, assignments, or business-specific status fields.

## Practical notes

There are a few details worth watching in real projects:

- Version-heavy lists can generate large payloads, so test with realistic data volumes.
- Internal field names in SharePoint do not always match display names.
- \`SelectedListItemID\` needs to be validated carefully when moving from a test list to a production list.
- Parsing JSON in Power Apps is workable, but cleaner contracts from Power Automate are easier to support over time.

The more critical the process, the more valuable it is to normalize the response before the app touches it.

## Conclusion

If you need auditability or user-facing transparency in a Power App backed by SharePoint, version history is worth exposing properly. The standard connector is not enough on its own, but the combination of SharePoint REST API, Power Automate, and a structured collection in Power Apps gives you a reliable solution.

The important part is not just retrieving old versions. It is presenting the history in a way that helps users understand actual change.
`,d=`---
title: "Dynamic Adaptive Cards in Copilot Studio: A Workaround for Unknown Form Fields"
date: 2026-03-08
tags: ["Copilot Studio", "Microsoft", "Jira", "Adaptive Cards", "Power Platform"]
summary: "Building intelligent agents often requires handling dynamic, unpredictable data structures. Learn how to create dynamic Adaptive Cards as a workaround for unknown form fields in Copilot Studio."
coverImage: "/images/blog/copilot-dynamic-cards/banner.png"
draft: false
---

Building intelligent agents often requires handling dynamic, unpredictable data structures. Recently, I implemented a Copilot Studio agent for IT helpdesk automation that creates Jira service requests directly from conversations. The challenge? Creating adaptive cards with fields I couldn't know in advance. Here's how I solved it.

## The Use Case

I built an agent to help users with IT support requests. When the agent can't resolve an issue through conversation, it should seamlessly create a Jira ticket with the correct request type and all required fields pre-filled. Simple enough, right?

The complexity comes from Jira's flexibility. Different request types require different fields. Some use traditional field configurations, others use forms. The agent needs to:

1. Search for matching Jira service request types
2. Dynamically retrieve required fields or forms for that type
3. Present a pre-filled adaptive card to the user
4. Allow the user to review and modify the data
5. Create the ticket with the final values

## The Technical Challenge

Copilot Studio's "Post adaptive card and wait for response" action is powerful, but it has a critical limitation: **you must define the output schema in advance**.

Normally, you'd configure the action like this:

\`\`\`
Post Adaptive Card
└─ Define outputs: 
   ├─ title (text)
   ├─ description (text)
   └─ priority (choice)
\`\`\`

But when you're dynamically generating cards based on Jira's current configuration, you don't know what fields will exist. Request Type A might need \`{title, description, priority}\`, while Request Type B needs \`{summary, category, affectedUser, businessImpact}\`. 

You can't predefine outputs for something that changes based on runtime data.

## The Tools I Built

To handle Jira's dynamic nature, I created several custom connectors and actions:

- **Get Service Request Types**: Retrieves available request types for a project
- **Get Fields**: Fetches required fields for a specific request type
- **Get Form**: Retrieves form configuration (Jira Service Management can use forms instead of fields)
- **Create Issue in Service Portal**: Creates the actual ticket with dynamic data

The agent's workflow searches for the best matching request type based on the conversation, then dynamically builds an adaptive card with the appropriate fields.

## The Solution: A Simple Pass-Through Topic

The solution is elegantly simple. Create a topic that acts as a pass-through for adaptive cards:

**Topic Configuration:**
- **Input**: \`cardJson\` (String) - The adaptive card JSON
- **Output**: \`userResponse\` (Any/String) - The user's submitted data

**Topic Implementation** (3 steps total):

1. **Post adaptive card and wait for response**
   - Card JSON: Reference your input variable \`Topic.cardJson\`
   - No need to define specific outputs

2. **Set a variable**:
   \`\`\`
   Set variable: Topic.userResponse
   Value: system.activity.value
   \`\`\`

3. **Return the output**
   - The topic outputs \`userResponse\` automatically

That's it. The topic is just a simple wrapper with no complex logic.

**Visual representation:**

\`\`\`text
🧩 Topic: ShowDynamicCard
├── 📥 INPUT  : cardJson (String)
├── 📤 OUTPUT : userResponse (Any)
│
├── 1️⃣ Post Adaptive Card
│   ├── Card: {Topic.cardJson}
│   └── Action: Wait for response
│
├── 2️⃣ Set Variable
│   └── userResponse = JSON(System.Activity.Value)
│
└── 3️⃣ End Topic
    └── Returns userResponse to Agent
\`\`\`

### Topic Implementation: The 3-Step Pass-Through

Here's the actual topic configuration in Copilot Studio:

![Topic Overview](/images/blog/copilot-dynamic-cards/topic-overview.png)
*The topic triggered by the agent, showing the simple trigger configuration*

**Step 1: Post the Adaptive Card**

![Topic Card Input](/images/blog/copilot-dynamic-cards/topic-card-input.png)
*The adaptive card action referencing \`Topic.AdaptiveCardJSON\` - the input variable passed by the agent*

The topic receives the complete adaptive card JSON from the agent as an input parameter. The "Post adaptive card and wait for response" action simply displays whatever card the agent built.

**Step 2: Capture the Response**

![Topic Output Variable](/images/blog/copilot-dynamic-cards/topic-output-variable.png)
*The variable assignment capturing \`JSON(System.Activity.Value)\` into \`varOutcome\`*

Here's the magic: \`System.Activity.Value\` contains the complete user submission, regardless of what fields were in the card. The expression \`JSON(System.Activity.Value)\` parses it into a structured object.

**The Complete Topic Formula:**
\`\`\`
Variable: varOutcome
Value: JSON(System.Activity.Value)
\`\`\`

This single line captures **any** adaptive card submission without needing to predefine the schema.

**Step 3: Return to Agent**

The \`varOutcome\` variable is defined as a topic output, so when the topic completes, the agent receives the parsed JSON with all user-submitted values - ready to process and send to Jira.

## The Real Magic: Agent Orchestration

Here's where it gets interesting: **all the intelligence lives in the agent orchestrator, not in flows or complex workflows**.

The agent handles everything through its instructions and tools:

1. **The agent builds the card JSON** using Jira field metadata
2. **The agent calls your topic** and passes the card JSON as input
3. **The agent receives the user's response** from the topic output
4. **The agent processes the JSON** and creates the Jira ticket

No complex agent flows. No intricate workflow logic. Just well-crafted agent instructions that tell it:
- When to search for Jira request types
- How to retrieve field configurations
- How to construct adaptive card JSON
- When to call the topic with the card
- How to process the response and create tickets

### Real-World Agent Instructions

Below is an excerpt from the actual IT Help Desk Assistant instructions. Note how the agent orchestration handles complex workflows through natural language guidance rather than hardcoded flows:

\`\`\`
🎯 Purpose & Scope
The agent supports users with:
- Solving IT problems using internal & public documentation
- Retrieving and managing existing tickets
  - List Customer Requests
  - Get Request (Details & Status)
- Creating qualified tickets (only when necessary)
  - Jira-Ticket Creator Assistant

Priority:
1️⃣ Solve the problem
2️⃣ Only then create a ticket

The agent must not ask unnecessary questions.

🔄 DIALOG LOGIC

4️⃣ CREATE / UPDATE / COMMENT

Create:
- At least 2-3 solution attempts must have failed
- Ticket must contain:
  - Problem summary
  - Original error message
  - Reproduction steps
  - Environment details
  - Timestamp
  - Impact assessment
  - Already tested measures
- Provide reference + explain next steps

📊 OUTPUT FORMAT (Markdown required)

For detail queries or when the user wants to comment on a ticket, use:
"Post Adaptive Card for Jira Request"

Pass the IssueDetails in this format:
kind: Record
properties:
  header:
    type:
      kind: Record
      properties:
        imageUrl: String
  issue:
    type:
      kind: Record
      properties:
        fields:
          type:
            kind: Record
            properties:
              assignee:
                type:
                  kind: Record
                  properties:
                    avatarUrl: String
                    displayName: String
              summary: String
              status:
                type:
                  kind: Record
                  properties:
                    name: String
              ...
        key: String
        url: String

No raw JSON output.
\`\`\`

**Key observations:**
- The agent is instructed to **delegate to another agent** (\`Jira-Ticket Creator Assistant\`) for ticket creation
- This specialized agent handles the dynamic adaptive card workflow
- The instructions define clear escalation criteria (2-3 failed solutions)
- Output formatting is specified, but the _how_ is left to the agent's orchestration
- The agent architecture uses **agent composition** - multiple specialized agents working together

The actual dynamic card creation happens in the **Jira-Ticket Creator Assistant**, which receives the context and builds appropriate Jira forms dynamically.

## Example Flow

Here's how it works in practice:

\`\`\`
User: "I need help with my laptop not connecting to WiFi"

Agent: [Analyzes issue, determines it can't resolve it]
Agent: [Uses tool: Get Service Request Types → finds "Hardware Support"]
Agent: [Uses tool: Get Fields for "Hardware Support" → receives field schema]
Agent: [Constructs adaptive card JSON with dynamic fields based on schema]
       {
         "type": "AdaptiveCard",
         "body": [
           {"type": "Input.Text", "id": "device", "value": "Laptop"},
           {"type": "Input.Text", "id": "issue", "value": "WiFi connectivity"},
           {"type": "Input.Text", "id": "location", "value": ""},
           {"type": "Input.ChoiceSet", "id": "urgency", ...}
         ]
       }
Agent: [Calls topic "ShowDynamicCard" with cardJson as input]

Topic: [Posts the adaptive card]
User: [Reviews, fills in location, adjusts urgency, clicks Submit]
Topic: [Captures System.Activity.Value → returns as userResponse output]

Agent: [Receives the JSON: {"device": "Laptop", "issue": "WiFi connectivity", ...}]
Agent: [Uses tool: Create Issue with the submitted data]
Agent: "I've created ticket HD-12345 for you!"
\`\`\`

The beauty of this approach: **the topic has no idea what's in the card**. It's just a generic pass-through. All the business logic—knowing which request type to use, which fields to show, how to pre-fill data, how to process responses—lives in the agent's instructions.

## Why This Works

The key insights are:

1. **\`System.Activity.Value\` bypasses predefined schemas**: It captures whatever the user submitted, regardless of structure

2. **The topic is just infrastructure**: It's a generic, reusable component that knows nothing about Jira, tickets, or fields

3. **The agent orchestrator is the brain**: Through well-crafted instructions, the agent:
   - Knows when ticket creation is needed
   - Retrieves the correct field configurations from Jira
   - Builds appropriate adaptive card JSON
   - Interprets the user's response
   - Creates tickets with the right data

No complex flows. No branching logic. No hardcoded field mappings. Just **a simple topic + smart agent instructions + good tools** = dynamic, adaptive behavior.

## Benefits of This Approach

1. **Simplicity**: The topic is 3 steps. No complex workflow logic to maintain
2. **Reusability**: The same topic works for any dynamic card scenario—not just Jira
3. **Agent-Driven Intelligence**: Business logic lives in natural language instructions, not hardcoded flows
4. **True Dynamic Forms**: Adapts to Jira's current configuration without any code changes
5. **No Manual Maintenance**: When Jira admins change request types or fields, everything still works
6. **User Validation**: Users review and modify pre-filled data before submission
7. **Easy Iteration**: Want to improve ticket creation logic? Update agent instructions, not flows

## Considerations

- **Agent Instructions**: The quality of your agent instructions is critical—clearly define when and how to use each tool
- **Tool Design**: Your Jira connector tools should return clean, structured data that's easy for the agent to work with
- **Error Handling**: Add validation in your agent instructions for malformed responses or missing required fields
- **Testing**: Test with multiple Jira request types to ensure the agent builds cards correctly
- **JSON Construction**: The agent needs to understand adaptive card JSON syntax—include examples in your instructions

## Conclusion

What started as a limitation—Copilot Studio requiring predefined output schemas—led to discovering a powerful pattern: **simple topics + agent orchestration**.

The \`system.lastactivity.value\` variable is the technical mechanism, but the real innovation is architectural: let the AI agent handle the complexity through instructions and tools, not through intricate flows and branching logic.

This pattern is particularly powerful in the era of generative AI agents. Instead of building complex workflows that try to anticipate every scenario, you create simple, focused topics and let the agent's intelligence—guided by your instructions—handle the orchestration.

If you're building Copilot Studio agents that work with dynamic data structures from Jira, Dynamics 365, SharePoint, or custom APIs, consider this approach. You might be surprised how much complexity you can eliminate by trusting the agent orchestrator to do what it does best: understand context and make intelligent decisions.

The future of low-code isn't necessarily more visual flows—sometimes it's simpler flows with smarter agents.

---

## Implementation Architecture

The solution uses a **multi-agent architecture** where specialized agents handle different responsibilities:

### Main Agent: IT Help Desk Assistant

**Available Tools:**

![IT Help Desk Tools](/images/blog/copilot-dynamic-cards/helpdesk-tools.png)
*Screenshot showing the connector tools available to the main helpdesk agent*

The main agent has access to:
- **List Customer Requests**: Retrieve user's tickets with filtering
- **Get Request (Details & Status)**: Fetch detailed ticket information
- **Add Comment to Request**: Add updates to existing tickets

These tools handle the "read and update" operations. Notice what's **not** here: ticket creation tools.

### Specialized Agent: Jira-Ticket Creator Assistant

![Connected Agent](/images/blog/copilot-dynamic-cards/connected-agent.png)
*Screenshot showing the Ticket Creator Assistant as a connected agent*

The main agent **delegates** to this specialized agent when ticket creation is needed. This separation of concerns means:

- The main agent focuses on troubleshooting and ticket management
- The Ticket Creator Assistant focuses purely on dynamic form generation and ticket creation
- Each agent has a focused set of tools and responsibilities

**Ticket Creator Assistant Tools:**

![Ticket Creator Tools](/images/blog/copilot-dynamic-cards/ticket-creator-tools.png)
*Screenshot showing the Jira tools available to the Ticket Creator Assistant*

- **List Request Types for a Service Desk**: Gets all available request types
- **Get Request Type Fields**: Retrieves field definitions (required/optional, field IDs, types, choice values)
- **Get Form Template for Request Type (Portal)**: Loads form configuration when Jira uses forms instead of fields
- **Create a Customer Request**: Creates the ticket with collected data
- **Post Adaptive Card for Ticket Creation** ← The simple pass-through topic

### The Ticket Creator Assistant Instructions

Here's the actual workflow defined in the agent instructions (translated from German):

\`\`\`
Role & Goal:
You are an agent for creating tickets in Jira Service Management (JSM).
You receive a problem description in natural language (German or English).
Your task is to determine the appropriate existing Request Type, load the necessary fields,
output an Adaptive Card with a pre-filled form, and—after confirmation—create the ticket.

Workflow (Steps):

1) Classification:
   a) Read the user description.
   b) Call "List Request Types for a Service Desk" and compare the description 
      with the Name/Description of the types.
   c) Select the best matching Request Type. If confidence is low, determine up to 
      2 alternatives.
   d) Explain your choice briefly (1–2 sentences).

2) Fields/Form:
   a) Call "Get Request Type Fields" with the ID of the selected Request Type 
      AND "Get Form Template" as a safety check.
      (Some request types use forms instead of fields in Jira - recognizable when 
      Get Request Type Fields returns empty)
   b) Identify required fields. Generate sensible pre-filled values from the user text:
      - summary: concise one-liner
      - description: structured description (problem, expected behavior, 
        environment/scope, steps, possibly link/attachment note)
      - other required fields: derive from text (e.g., access target, project/space, 
        impact, priority), otherwise leave empty
   c) Validate: If required information is missing, mark them as necessary.

3) Output Adaptive Card:
   "Post Adaptive Card for Ticket Creation"
   
   a) Build an Adaptive Card (v1.5) with:
      - Title ("Review & Create Ticket") - indicate whether fields are from 
        RequestType Fields or Form
      - Text block "Proposed Request Type: <Name>"
      - Brief justification
      - Input elements for all required fields and sensible optional fields
      - Pre-filled values where possible
      - Actions:
         • Action.Submit { action: "confirm", requestTypeId: "<id>" }
         • Action.Submit { action: "revise" }
   b) Send the Card as response and wait for user action. 
      Result from "Post Adaptive Card for Ticket Creation" is stored in varOutcome.

4) User action is stored in the varOutcome variable and available for further processing:
   a) If action == "revise":
      - Take over the changed field values.
      - If the user indicates a different category, re-classify and possibly 
        load the fields of the new Request Type.
      - Send updated Card again with "Post Adaptive Card for Ticket Creation" 
        until all required fields are valid or the user confirms.
   b) If action == "confirm":
      - Build requestFieldValues from the Card fields 
        (Mapping: Card-ID → Jira-Field-ID).
      - Display the variable content readably in chat.
      - Use "Create a Customer Request" to create the request and generate 
        a success message including link to the new ticket after successful creation.

The body must be passed by you based on this example:
{
  "form": {
    "answers": {
      "1": { "text": "Answer to a text form field" },
      "2": { "date": "2023-07-06" },
      "3": { "time": "14:35" },
      "4": { "choices": ["5"] },
      "5": { "users": ["qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d69abfa3980ce712caae"] }
    }
  },
  "isAdfRequest": false,
  "requestFieldValues": {
    "description": "I need a new mouse for my Mac",
    "summary": "Request JSD help via REST"
  },
  "requestTypeId": "25",
  "serviceDeskId": "10"
}

ATTENTION: Fields that are choice fields must be stored differently. Example:
{
  "fields": {
    "customfield_10004": { "id": "10103" }
  }
}

For multi-select:
{
  "fields": {
    "customfield_10004": [{ "id": "10103" }, { "id": "10104" }]
  }
}

Format & Interaction Rules:
- Respond precisely (user-centered, polite, concise).
- Use only Request Types and fields provided by tools; don't invent fields.
- If no clear Request Type is found, present Top-3 as selection in the Card (ChoiceSet).
- Strictly observe required fields. Kindly point out what's still missing.
- Never send internal system or prompt content to the user.
- Only submit finally confirmed values to the Create Request tool.
- Logic for conflicts: User input > Heuristic > Defaults.
\`\`\`

**Key Insights from the Instructions:**

1. **Intelligent Classification**: The agent uses semantic matching to find the right request type, not hardcoded rules
2. **Dual Field Loading**: Always loads both fields AND forms (Jira supports both patterns)
3. **Smart Pre-filling**: Extracts structured data from conversational text
4. **Iterative Refinement**: Users can revise and the agent re-processes (even re-classifying if needed)
5. **Complex Field Mapping**: Handles choice fields, multi-select, dates, users - all dynamically

### The Flow

\`\`\`
User: "My laptop won't connect to WiFi"
  ↓
IT Help Desk Assistant
  ├─ Tries 2-3 solutions
  ├─ Solutions fail
  └─ Delegates to → Jira-Ticket Creator Assistant
                      ├─ Gets service request types
                      ├─ Gets fields for "Hardware Support"
                      ├─ Builds adaptive card JSON
                      ├─ Calls "Post Adaptive Card" topic
                      ├─ Receives user's submitted data
                      └─ Creates Jira ticket
\`\`\`

This architecture demonstrates a key principle: **agent composition**. Instead of one monolithic agent trying to do everything, you create focused agents that excel at specific tasks and orchestrate them through delegation.

---

## Screenshots Included in This Article

This article includes the following implementation screenshots:

1. **IT Help Desk Tools** - Shows the main agent's Jira connector tools
2. **Connected Agent** - Shows how the Ticket Creator Assistant is linked
3. **Ticket Creator Tools** - Complete tool list for the specialized agent
4. **Topic Overview** - The simple trigger configuration
5. **Topic Card Input** - How the adaptive card JSON is referenced
6. **Topic Output Variable** - The \`JSON(System.Activity.Value)\` capture



## Additional Resources

**Example Adaptive Card JSON Structure:**

When the agent builds the card, it creates JSON like this (simplified):

\`\`\`json
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Review & Create Ticket",
      "weight": "Bolder",
      "size": "Large"
    },
    {
      "type": "TextBlock",
      "text": "Proposed Request Type: Hardware Support"
    },
    {
      "type": "Input.Text",
      "id": "summary",
      "label": "Summary",
      "value": "Laptop WiFi connectivity issue",
      "isRequired": true
    },
    {
      "type": "Input.Text",
      "id": "description",
      "label": "Description",
      "isMultiline": true,
      "value": "User reports WiFi disconnections...",
      "isRequired": true
    },
    {
      "type": "Input.ChoiceSet",
      "id": "customfield_10004",
      "label": "Priority",
      "choices": [
        {"title": "Low", "value": "10103"},
        {"title": "Medium", "value": "10104"},
        {"title": "High", "value": "10105"}
      ],
      "value": "10104",
      "isRequired": true
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Create Ticket",
      "data": {
        "action": "confirm",
        "requestTypeId": "25"
      }
    },
    {
      "type": "Action.Submit",
      "title": "Revise",
      "data": {
        "action": "revise"
      }
    }
  ]
}
\`\`\`

When the user submits, \`System.Activity.Value\` contains:

\`\`\`json
{
  "action": "confirm",
  "requestTypeId": "25",
  "summary": "Laptop WiFi connectivity issue (user-edited)",
  "description": "User reports WiFi disconnections...",
  "customfield_10004": "10105"
}
\`\`\`

The agent then maps these values to Jira's API format and creates the ticket.

Have you encountered similar challenges with dynamic forms in Copilot Studio? I'd love to hear how you solved them. Feel free to reach out or leave a comment below!

---

*Want to learn more about Copilot Studio and Power Platform integrations? Follow my blog for more technical deep-dives and practical solutions.*
`,u=`---
title: "Power Apps Code Apps: A Developer's Guide to Getting Started"
date: 2026-03-07
tags: ["Power Apps", "React", "TypeScript", "Vite", "Microsoft 365"]
summary: "Power Apps Code Apps let you build full React+TypeScript applications that run inside the Power Platform with access to Dataverse, Copilot Studio, and Microsoft 365 connectors. Here is what the setup actually looks like."
coverImage: "/images/blog/power-apps-code-getting-started-cover.png"
draft: false
---

![Power Apps Code Apps getting started](/images/blog/power-apps-code-getting-started-cover.png)

## What Are Power Apps Code Apps?

If you have built canvas apps or model-driven apps in Power Apps before, Code Apps feel like a different world. Instead of the low-code designer, you get a standard **React + TypeScript + Vite** project. You write real components, manage real state, and deploy through the \`pac\` CLI.

The key difference from a regular React app: your application runs inside the Power Platform runtime and gets automatic access to **connectors** — the same ones available in Power Automate and canvas apps. That means Office 365 mail, SharePoint, Jira, Copilot Studio, Dataverse, and hundreds of other services are available through generated TypeScript service classes.

> 📖 Official docs: [Power Apps Code Apps Overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview) · [Architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture)

## The Tech Stack

A Power Apps Code App is built on:

| Layer | Technology |
|---|---|
| Runtime | \`@microsoft/power-apps\` SDK |
| Build | Vite + \`@microsoft/power-apps-vite\` plugin |
| UI | React 19 + TypeScript |
| Data | Auto-generated service classes from connectors |
| Deploy | \`pac code push\` |

There is no custom framework to learn. If you know React, you know 90% of what you need.

## Project Setup

### 1. Initialize the Project

Scaffold a new project from the official template and initialize it with the PAC CLI:

\`\`\`bash
npx degit github:microsoft/PowerAppsCodeApps/templates/vite my-app
cd my-app
npm install
pac code init --displayname "My App"
\`\`\`

This gives you a standard Vite project structure with the Power Apps plugin pre-configured.

> 📖 Full walkthrough: [Create a code app from scratch](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)

### 2. The Vite Configuration

The only non-standard piece is the Vite plugin:

\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { powerApps } from '@microsoft/power-apps-vite';

export default defineConfig({
  plugins: [react(), powerApps()],
});
\`\`\`

The \`powerApps()\` plugin handles local authentication redirects and connector routing during development.

### 3. Getting Runtime Context (Optional)

The SDK provides \`getContext()\` from \`@microsoft/power-apps/app\` to retrieve runtime information like the current user or environment details. This is **not required** — your generated service classes work without it.

\`\`\`typescript
import { getContext } from '@microsoft/power-apps/app';

// Example: get runtime info for user greeting or environment logic
const context = await getContext();
\`\`\`

Use it when you need user identity or environment metadata, not as an initialization step.

## Adding Data Sources

This is where Power Apps Code Apps really shine. Instead of writing REST clients manually, you generate typed service classes from connectors:

\`\`\`bash
pac code add-data-source
\`\`\`

This opens an interactive prompt where you select from available connectors — Office 365 Outlook, SharePoint, Jira Cloud, Copilot Studio, and many more. The CLI generates TypeScript files in \`src/generated/services/\` with fully typed methods.

> 📖 Official guide: [Connect your code app to data](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/connect-to-data)

For example, after adding Office 365 Outlook, you get:

\`\`\`typescript
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
\`\`\`

No API keys, no OAuth dance, no token management. The Power Platform runtime handles all of that.

## Mock-First Development

Here is a practical pattern I recommend when building your initial UI: **start with mock data, then swap in real services.**

The reason: before you run \`pac code add-data-source\`, the generated service files do not exist yet. Your component structure, layouts, and state management can be developed with mock data first, then swapped to real connectors once you add them.

Create your data hooks with a clean interface:

\`\`\`typescript
// hooks/useTickets.ts
export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [loading, setLoading] = useState(false);
  return { tickets, loading };
};
\`\`\`

Later, replace the mock data with real service calls:

\`\`\`typescript
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
\`\`\`

The components consuming the hook never need to change.

## Development Workflow

\`\`\`text
npm run dev         → Starts local Vite server
→ Open "Local Play" URL  → App runs on apps.powerapps.com with real connectors
npm run build       → Production bundle
pac code push       → Deploy to Power Platform
\`\`\`

This is one of the best parts: \`npm run dev\` gives you a **Local Play** URL that opens your app on \`apps.powerapps.com\`, pointing back to your local dev server. You are running inside the real Power Platform host with full access to all configured connectors and real data. Hot module replacement works — you edit code locally and see changes immediately, tested against live Office 365, Jira, or any other connected service.

> **Note:** Since December 2025, Chrome and Edge may block requests from public origins to local endpoints. You might need to grant local network access permissions in your browser.

## What I Built

To give concrete context: I built an **ITSM Agent Dashboard** as a Code App that combines:

- **Jira Cloud tickets** — queried via JQL, with full detail panels including ADF comment rendering
- **Outlook emails** — inbox with reading pane, quick actions, and AI-drafted replies
- **Calendar events** — daily schedule from Office 365
- **Copilot Studio chat** — floating AI assistant panel for contextual help & search
- **Configurable dashboards** — users can configure their own dashboards with config file inside of personal oneDrive 

![The ITSM Agent Dashboard combining Jira tickets, Outlook calendar, team presence, and sprint metrics in a single view.](/images/blog/itsm-dashboard-overview.png)

All of this in a single React application, deployed as a Power App, accessible to anyone in the organization without additional authentication setup.

### Spotlight: Per-User Configuration via OneDrive

The configurable dashboards feature deserves a closer look. Instead of storing user preferences only in \`localStorage\` (which is device-specific), I sync the configuration to each user's **OneDrive AppRoot** folder. Settings follow the user across devices without a dedicated backend.

The idea came from [Guido Zambarda's blog post](https://iamguidozam.blog/2026/02/18/storing-app-configuration-in-onedrive-with-microsoft-graph-using-an-spfx-web-part/) about storing SPFx app configuration in OneDrive via Microsoft Graph. I adapted the same idea for Power Apps Code Apps.

The key insight: the **Office 365 Users connector** exposes an \`HttpRequest\` method that can forward Microsoft Graph calls. The official documentation describes \`/me\` and \`/users/<userId>\` as the supported roots and primarily documents Outlook-oriented resources such as \`messages\`, \`mailFolders\`, \`events\`, \`calendar\`, \`calendars\`, \`outlook\`, and \`inferenceClassification\`, but in practice \`me/drive\` also works for OneDrive file operations:

\`\`\`typescript
import { Office365UsersService } from '../generated/services/Office365UsersService';

const ONEDRIVE_CONFIG_URI =
  'https://graph.microsoft.com/v1.0/me/drive/special/approot:/myapp-config.json:/content';

// Read config from user's OneDrive
const response = await Office365UsersService.HttpRequest(
  ONEDRIVE_CONFIG_URI,
  'GET',
  '', '', '', '', '', '', ''
);

if (response.success && response.data) {
  const remoteConfig = typeof response.data === 'string'
    ? JSON.parse(response.data)
    : response.data;
  // Merge with defaults and apply...
}
\`\`\`

The full \`ConfigContext\` still follows a **three-layer strategy**:

1. **Boot:** Load from \`localStorage\` instantly (fast startup, no waiting for network)
2. **Hydrate:** Fetch persisted config from OneDrive in the background, deep-merge with defaults, update state
3. **Save:** On every config change, write to both \`localStorage\` and OneDrive

Deep merging is critical. When you ship a code update with new config fields, an older OneDrive config file will not have those keys. Without deep merge, new defaults get silently lost:

\`\`\`typescript
const mergeConfig = (incoming: Partial<ConfigType>): ConfigType => ({
  ...defaultConfig,
  ...incoming,
  jira: { ...defaultConfig.jira, ...(incoming.jira || {}) },
  mail: { ...defaultConfig.mail, ...(incoming.mail || {}) },
  copilot: {
    ...defaultConfig.copilot,
    ...(incoming.copilot || {}),
    prompts: {
      ...defaultConfig.copilot.prompts,
      ...(incoming.copilot?.prompts || {}),
    },
  },
  // ... other nested sections
});
\`\`\`

The practical takeaway: \`Office365UsersService.HttpRequest\` is more capable than the narrow examples in the docs suggest, and it is enough to support OneDrive-backed per-user configuration in a Code App.

## When to Use Code Apps

Code Apps make sense when:

- You need **complex UI** that the canvas designer cannot express
- You want **real developer tooling** — TypeScript, hot reload, version control
- You need to combine **multiple connectors** in a single view
- Your team already knows **React**

They are probably overkill for simple forms or basic CRUD interfaces where canvas apps still work fine.

But here is what I think: **Code Apps are the beginning of the end for canvas apps as we know them.** Canvas apps were built for citizen developers — drag-and-drop, Power Fx formulas, limited customization. They served their purpose, but they hit a ceiling fast. The moment you need a custom list view, a chat panel, a master-detail layout, or any kind of state management, you are fighting the platform instead of building with it.

Code Apps remove that ceiling entirely. You get the full React ecosystem — any npm package, any design pattern, any UI library — while keeping the one thing that made canvas apps valuable: the **connector infrastructure**. Authentication, token management, consent flows — all handled by the platform. You just call \`Service.Method()\` and get data.

And here is what enterprise architects care about: you inherit the entire **Power Platform governance stack** without writing a single line of security code. DLP policies control which connectors can be used together. Managed environments enforce sharing limits. Conditional access policies apply automatically. Cross-tenant restrictions, app quarantine, consent suppression for custom connectors, and full **ALM support** with solutions, environments, and managed deployments — all managed by your IT admins through the Power Platform Admin Center, not by you in your React code. For a developer, this means you can build a dashboard that pulls data from Jira, Outlook, and Copilot Studio, and your security team can govern it with the same tools they already use for every other Power App in the organization.

**One honest disclaimer:** Code Apps require a **Power Apps Premium license** (or pay-as-you-go) for end users. That is a real cost. But consider what you are getting: a developer can build a production-quality, enterprise-ready internal tool in **hours**, not weeks — with authentication, governance, and 1,000+ connectors included out of the box. And you do not even need deep React expertise. With AI-assisted coding tools, even developers who have never touched React before can scaffold, iterate, and ship a fully functional Code App. This is just the beginning — the tooling will only get easier from here. The time a citizen developer would spend fighting canvas app limitations easily justifies the license cost. And here is the bigger thought: at this speed and quality level, you are not just replacing canvas apps. You could start replacing **third-party SaaS tools** with custom-built alternatives that fit your organization exactly, governed by your own platform, at a fraction of per-seat SaaS pricing. That is a whole different conversation — and maybe a future article.

With AI-assisted development making React more accessible to non-traditional developers, the argument for canvas apps gets weaker every month. I would not be surprised if Code Apps become the default recommendation for new Power Apps projects within the next year or two.

## Next Steps

In the next article, I will cover the tricky part: [integrating Copilot Studio](/blog/2026-03-power-apps-copilot-studio-pitfalls) and the undocumented bugs you will hit along the way.

## Further Reading

- [Power Apps Code Apps Overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Create a code app from scratch](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [Connect your code app to data](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/connect-to-data)
- [Code Apps Architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture)
- [System limits and configuration](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/system-limits-configuration)

---

*This article is part of a three-part series on building production applications with Power Apps Code Apps.*
`,h=`---
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

## 1. Connectors Work Without \`getContext()\`

The SDK offers \`getContext()\` from \`@microsoft/power-apps/app\` to retrieve runtime info like the current user or environment details. I initially thought this was a mandatory initialization step. It is not.

Your generated services (Jira, Outlook, Copilot Studio) work without calling \`getContext()\`. Use it only when you need runtime information:

\`\`\`typescript
import { getContext } from '@microsoft/power-apps/app';

const context = await getContext();
// Use for user greeting, environment-specific logic, etc.
\`\`\`

Do not treat this as an initialization gate — your app and all connectors function without it.

---

## 2. Your CSS Needs iframe Awareness

Code Apps run inside an iframe in the Power Platform host. Standard CSS behavior changes:

\`\`\`css
html, body, #root {
  height: 100%;
  overflow: hidden; /* Prevent double scrollbars */
}
\`\`\`

Without this, you get nested scrollbars and the app does not fill the available space properly. The Power Platform container has its own scroll handling.

---

## 3. Build Mock-First, Integrate Later

The \`pac code add-data-source\` command generates TypeScript service files from connectors. But you need a connected Power Platform environment to run it.

**Pattern that works:** Design your hooks to be data-source agnostic.

\`\`\`typescript
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
\`\`\`

The consuming components never change. This saved me significant time during development.

---

## 4. The Generated Code Has Bugs — Accept It

The \`pac code add-data-source\` generator is not perfect. Specific issues I encountered:

- **Copilot Studio:** \`x_ms_conversation_id\` header uses underscores instead of hyphens (breaks multi-turn conversations)
- **Office 365 Users:** \`HttpRequest\` parameter typed as \`string\` when it should accept objects with headers
- **General:** Some methods have incorrect return types

**Strategy:** After every \`pac code add-data-source\` run, maintain a checklist of manual patches you need to re-apply.

---

## 5. Use API V3, Not V2

When working with Office 365 Outlook connectors, the generated service may expose multiple API versions. Always use V3:

\`\`\`typescript
// ✅ Use V3
Office365OutlookService.GetEmailsV3({ folderPath: 'Inbox' })
Office365OutlookService.GetEventsCalendarViewV3({ calendarId: 'Calendar' })

// ❌ Avoid V2 — different response shapes, less reliable
Office365OutlookService.GetEmailsV2({ folderPath: 'Inbox' })
\`\`\`

V2 and V3 return different response structures. If you start with V2 and later switch, you will have to refactor your type mappings.

---

## 6. There Is No Test Infrastructure

Power Apps Code Apps do not ship with Jest, Vitest, or any testing framework. Your verification workflow is:

1. \`npm run build\` — catches TypeScript errors
2. \`npm run dev\` — manual testing via Local Playback
3. Browser DevTools — verify network calls
4. \`pac code push\` — deploy and test in Power Platform

If you want unit tests, you can add Vitest yourself, but the generated service classes are difficult to mock because they depend on the Power Apps runtime.

---

## 7. Design System From Day One

I made the mistake of using hardcoded colors in JavaScript:

\`\`\`typescript
// ❌ This causes pain later
const COLORS = { bg: '#030817', surface: '#0f1b34', accent: '#60a5fa' };
\`\`\`

When I needed to refactor for dark/light mode consistency, I had to touch every component. Start with CSS variables immediately:

\`\`\`css
:root {
  --bg: #030817;
  --surface: #0f1b34;
  --accent: #60a5fa;
  --text: #f8fbff;
  --text-secondary: #95a7c6;
  --border: #233a63;
}
\`\`\`

\`\`\`typescript
// ✅ Components use CSS variables, no JS color constants
<div style={{ background: 'var(--surface)' }}>
\`\`\`

---

## 8. Jira ADF Is Not Plain Text

If you integrate Jira Cloud, comments and descriptions come in **Atlassian Document Format** (ADF) — a JSON structure, not markdown or HTML.

You need a parser:

\`\`\`typescript
const parseADF = (node: ADFNode): string => {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'paragraph') {
    return node.content?.map(parseADF).join('') + '\\n';
  }
  if (node.type === 'heading') {
    const level = node.attrs?.level ?? 2;
    return '#'.repeat(level) + ' ' + node.content?.map(parseADF).join('') + '\\n';
  }
  // ... handle lists, code blocks, etc.
  return node.content?.map(parseADF).join('') ?? '';
};
\`\`\`

And a creator for writing comments back:

\`\`\`typescript
const createADF = (text: string) => ({
  version: 1,
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{ type: 'text', text }],
  }],
});
\`\`\`

Also: **JSM internal comments** require the special property \`sd.public.comment\` for visibility control. Standard Jira comments do not need this.

---

## 9. ConfigContext + localStorage Beats Static Config

A static \`config.ts\` file does not work well in practice. Users need different JQL queries, different mail folders, different team members.

**Pattern:** Use a React Context backed by \`localStorage\`:

\`\`\`typescript
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
\`\`\`

The **deep merge** is critical. Without it, adding new config fields in a code update will wipe out the user's saved settings because the old localStorage payload does not contain the new keys.

---

## 10. The Copilot \`notificationUrl\` Must Be Exactly Right

I covered this in detail in the [Copilot Studio article](/blog/2026-03-power-apps-copilot-studio-pitfalls), but it bears repeating:

\`\`\`typescript
notificationUrl: 'https://notificationurlplaceholder'
// This exact string. Not "https://example.com". Not null. This one.
\`\`\`

---

## 11. Master-Detail Layouts Work Best

For data-heavy views (tickets, emails), a Master-Detail layout is the most effective pattern in the iframe context:

\`\`\`
┌─────────────────────────────────────────┐
│ Sidebar │  List (Master)  │   Detail    │
│         │  ┌───────────┐  │  ┌────────┐ │
│  🎫     │  │ Ticket 1  │  │  │ Title  │ │
│  📧     │  │ Ticket 2  │◄─│  │ Desc   │ │
│  📅     │  │ Ticket 3  │  │  │ Status │ │
│  👥     │  │ ...       │  │  │ Actions│ │
│         │  └───────────┘  │  └────────┘ │
└─────────────────────────────────────────┘
\`\`\`

I used this pattern for both Jira tickets (with comment chat panel) and Outlook emails (with AI draft action). The detail pane includes quick actions like "Reply," "Mark as read," and "AI Draft."

---

## 12. \`npm run build\` Is Your Best Friend

Since there is no test framework, TypeScript compilation is your primary safety net. Run \`npm run build\` after every significant change. The generated service classes are strictly typed, so the compiler will catch most integration errors.

My deploy checklist:

\`\`\`bash
# 1. Type check
npm run build

# 2. Visual check in Local Playback
npm run dev

# 3. Deploy
pac code push
\`\`\`

If the build passes and the Local Playback looks right, the deployed version will work.

---

## Final Thoughts

Power Apps Code Apps are genuinely useful for frontend developers who need to build enterprise internal tools. The connector ecosystem is powerful, and the React foundation means you are not learning a proprietary framework.

The rough edges are real — generated code bugs, missing documentation, no test infrastructure. But these are solvable problems, and the productivity gain from automatic authentication and connector access is significant.

Here is what I believe: **Code Apps will eventually replace canvas apps for any serious enterprise application.** Canvas apps were designed for citizen developers building simple forms and approval flows. They work for that. But the moment you need more than a list with a filter — a real dashboard, multi-source views, custom interactions, state management — you are fighting Power Fx and the formula bar instead of building.

Code Apps change the equation. You get a real development environment — React, TypeScript, npm, version control, code review — with the Power Platform connector infrastructure doing what it does best: handling authentication, consent, and API connectivity. No more \`Patch(DataSource, LookUp(...))\` formulas sprawling across a canvas. Just \`await Service.Method()\`.

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
`,m=`---
title: "Copilot Studio in Power Apps Code Apps: Every Pitfall I Hit"
date: 2026-03-08
tags: ["Power Apps", "Copilot Studio", "AI", "TypeScript", "Microsoft 365"]
summary: "Integrating Copilot Studio into a Power Apps Code App should be straightforward. It is not. Here are the undocumented bugs, workarounds, and patterns I discovered building a production AI assistant."
coverImage: "/images/blog/power-apps-copilot-pitfalls-cover.png"
draft: true
---

![Copilot Studio pitfalls in Power Apps Code Apps](/images/blog/power-apps-copilot-pitfalls-cover.png)

## The Promise

Copilot Studio is Microsoft's platform for building custom AI agents. Power Apps Code Apps can call these agents through a generated service class. The idea is simple: add Copilot Studio as a data source, call \`ExecuteCopilotAsyncV2\`, get an AI response.

In practice, I hit five significant issues that are not documented anywhere.

> 📖 Official docs: [Connect your code app to data](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/connect-to-data) · [Copilot Studio overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)

## Pitfall 1: The \`x-ms-conversation-id\` Header Bug

When you run \`pac code add-data-source\` and select the Copilot Studio connector, it generates a \`MicrosoftCopilotStudioService.ts\` file. This file contains a critical bug.

The generated code uses **underscores** in the conversation ID header:

\`\`\`typescript
// ❌ Generated code (BROKEN)
headers: {
  'x_ms_conversation_id': conversationId,
}
\`\`\`

The API expects **hyphens**:

\`\`\`typescript
// ✅ What the API actually needs
headers: {
  'x-ms-conversation-id': conversationId,
}
\`\`\`

**You must manually patch the generated file after every regeneration.** There is no configuration option to fix this. The symptom is that multi-turn conversations silently reset — each message starts a new conversation instead of continuing the previous one.

### The Fix

Open \`src/generated/services/MicrosoftCopilotStudioService.ts\` and find every occurrence of \`x_ms_conversation_id\`. Replace it with \`x-ms-conversation-id\`.

I recommend adding a comment above the fix so you remember to re-apply it after regeneration:

\`\`\`typescript
// MANUAL PATCH: PAC generates underscores, API requires hyphens
'x-ms-conversation-id': conversationId,
\`\`\`

## Pitfall 2: The \`notificationUrl\` Placeholder Trick

The \`ExecuteCopilotAsyncV2\` method requires a \`notificationUrl\` parameter. This is intended for webhook-based notification when the agent finishes processing a long-running request.

In a Code App context, you do not need a real webhook URL. But you cannot pass \`null\` or an empty string — the API will reject it.

The solution is a specific placeholder string:

\`\`\`typescript
const response = await MicrosoftCopilotStudioService.ExecuteCopilotAsyncV2({
  agentIdentifier: 'as_techdocs',
  text: userMessage,
  notificationUrl: 'https://notificationurlplaceholder',
  // ↑ This exact string. Not any URL. This specific one.
});
\`\`\`

I discovered this through trial and error. Using \`https://example.com\` or any other URL causes the API to attempt an actual webhook call and fail.

## Pitfall 3: Unpredictable Response Formats

This was the most frustrating issue. The Copilot Studio API does not return a consistent JSON structure. Depending on the agent, the conversation state, and seemingly random factors, the response might be nested differently.

I have seen all of these in production:

\`\`\`typescript
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
\`\`\`

### The Solution: A Nested Response Traverser

I wrote a utility that checks every known path:

\`\`\`typescript
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
\`\`\`

This is ugly but necessary. Without it, your chat panel will randomly show \`[object Object]\` or empty responses.

## Pitfall 4: Conversation State Management

Copilot Studio returns a \`conversationId\` on the first request. You must send this ID back on subsequent requests (using the patched header from Pitfall 1) to maintain conversation context.

The pattern I use:

\`\`\`typescript
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
\`\`\`

One additional nuance: if you want **separate conversation contexts per feature** (e.g., one for the chat panel, another for AI-drafted email replies, another for Jira comment suggestions), you need separate \`conversationId\` states. I maintain them per-category:

\`\`\`typescript
const conversationIds = useRef<Record<string, string>>({});
\`\`\`

## Pitfall 5: Void Returns on First Call

The very first call to \`ExecuteCopilotAsyncV2\` sometimes returns \`undefined\` or an empty response while the agent "warms up." Your UI must handle this gracefully:

\`\`\`typescript
const reply = extractCopilotResponse(response);
if (!reply) {
  // Agent is still initializing — show a friendly message
  return 'The AI assistant is warming up. Please try again in a moment.';
}
\`\`\`

## What I Built With This

Despite these issues, Copilot Studio integration is powerful once you work around the bugs. In my ITSM Dashboard, I use it for:

1. **Floating chat panel** — A general-purpose AI assistant for technical documentation queries
2. **AI-drafted Jira comments** — Clicking "AI Draft" on a ticket sends the ticket context to Copilot Studio and generates a professional response
3. **AI-drafted email replies** — Same pattern for Outlook emails, generating contextual reply drafts

The key is providing good context in the prompt:

\`\`\`typescript
const draftJiraComment = async (ticket: Ticket) => {
  const prompt = \`Based on this Jira ticket, draft a professional response:
    Title: \${ticket.summary}
    Description: \${ticket.description}
    Status: \${ticket.status}
    Priority: \${ticket.priority}\`;

  return sendMessage(prompt);
};
\`\`\`

## Summary

| Issue | Symptom | Fix |
|---|---|---|
| Header naming bug | Conversations reset every message | Replace \`x_ms_conversation_id\` → \`x-ms-conversation-id\` |
| notificationUrl | API rejects the request | Use \`'https://notificationurlplaceholder'\` |
| Inconsistent responses | Empty or \`[object Object]\` in UI | Build a nested response traverser |
| Missing conversation state | No multi-turn context | Store and re-send \`conversationId\` |
| Cold start void returns | First response is empty | Add graceful fallback messaging |

None of these are documented in the official Power Apps Code Apps documentation as of March 2026. Hopefully that changes, but until then, consider this your field guide.

---

*This is part 2 of a three-part series. Previously: [Getting Started with Power Apps Code Apps](/blog/2026-03-power-apps-code-apps-getting-started). Next: [12 Things I Wish I Knew](/blog/2026-03-power-apps-code-apps-lessons-learned).*
`,f=Object.assign({"../content/blog/2023-09-displaying-sharepoint-version-history-in-power-apps.md":p,"../content/blog/2026-03-copilot-studio-dynamic-adaptive-cards.md":d,"../content/blog/2026-03-power-apps-code-apps-getting-started.md":u,"../content/blog/2026-03-power-apps-code-apps-lessons-learned.md":h,"../content/blog/2026-03-power-apps-copilot-studio-pitfalls.md":m}),g=t=>{const e=t.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(e/200))},y=t=>typeof t!="string"?new Date().toISOString().slice(0,10):t,c=t=>{const e=t.trim();return e==="true"?!0:e==="false"?!1:e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e},v=t=>{const e=t.trim().replace(/^\[/,"").replace(/\]$/,"");return e?e.split(",").map(o=>c(o)).filter(o=>typeof o=="string"&&o.length>0):[]},w=t=>{if(!t.startsWith("---"))return{data:{},content:t.trim()};const e=t.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);if(!e)return{data:{},content:t.trim()};const[,o,r]=e,i={};for(const n of o.split(/\r?\n/)){if(!n.trim())continue;const s=n.indexOf(":");if(s===-1)continue;const l=n.slice(0,s).trim(),a=n.slice(s+1).trim();i[l]=a.startsWith("[")?v(a):c(a)}return{data:i,content:r.trim()}},b=()=>Object.entries(f).map(([t,e])=>{const o=t.split("/").pop()?.replace(/\.md$/,"")??"post",i=w(typeof e=="string"?e:""),n=i.data;return{slug:o,title:n.title??o,date:y(n.date),tags:Array.isArray(n.tags)?n.tags:[],summary:n.summary??"",coverImage:n.coverImage,draft:n.draft??!1,content:i.content.trim(),readingTimeMinutes:g(i.content)}}).filter(t=>!t.draft).sort((t,e)=>e.date.localeCompare(t.date)),T=t=>b().find(e=>e.slug===t);export{T as a,b as g};

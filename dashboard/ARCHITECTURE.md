# 🖥️ OpenClaw Dashboard — Architecture

## Overview

A minimal, self-hosted control center for monitoring and interacting with your OpenClaw AI assistant.

---

## 🎯 Core Features

### v1.0 MVP
1. **Task Board** — Kanban-style view of AI activities
2. **Activity Feed** — Real-time log of what the AI is doing
3. **Quick Actions** — Send commands without Telegram
4. **Cost Tracker** — API usage and costs
5. **Memory Viewer** — Browse agent memory files

### v1.1
6. **Voice Feedback** — Record voice memos for feedback
7. **Scheduled Tasks** — View/manage cron jobs
8. **Multi-Agent** — Switch between agents
9. **Notifications** — Desktop/mobile alerts

---

## 🏗️ Tech Stack

### Frontend
- **Vanilla JS** — No framework bloat, fast loading
- **CSS Variables** — Dark mode by default, customizable
- **WebSocket** — Real-time updates from gateway
- **IndexedDB** — Local caching

### Backend Integration
- **OpenClaw Gateway API** — Existing REST/WS endpoints
- **File System** — Direct read of workspace files
- **Cron API** — Schedule management

---

## 📁 File Structure

```
dashboard/
├── ARCHITECTURE.md    # This file
├── index.html         # Main entry point
├── src/
│   ├── app.js         # Main application logic
│   ├── api.js         # Gateway API client
│   ├── tasks.js       # Task board logic
│   ├── feed.js        # Activity feed
│   ├── memory.js      # Memory viewer
│   └── costs.js       # Cost tracking
├── styles/
│   ├── main.css       # Global styles
│   ├── tasks.css      # Task board styles
│   └── components.css # UI components
└── assets/
    └── icons/         # SVG icons
```

---

## 🔌 API Endpoints (OpenClaw Gateway)

### Sessions
- `GET /api/sessions` — List active sessions
- `GET /api/sessions/:key/history` — Message history
- `POST /api/sessions/:key/send` — Send message

### Cron
- `GET /api/cron/jobs` — List scheduled jobs
- `POST /api/cron/jobs` — Create job
- `DELETE /api/cron/jobs/:id` — Delete job

### Status
- `GET /api/status` — Gateway status and metrics

### WebSocket
- `ws://localhost:18789/ws` — Real-time events
  - `message` — New message in session
  - `tool_use` — Tool being executed
  - `heartbeat` — Agent heartbeat

---

## 🎨 UI Design

### Dark Theme (Default)
```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-tertiary: #21262d;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --success: #3fb950;
  --warning: #d29922;
  --error: #f85149;
  --border: #30363d;
}
```

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  OpenClaw Dashboard                    [Status] [Costs] │
├───────────────┬─────────────────────────────────────────┤
│               │                                         │
│   📋 Tasks    │           🗂️ Task Board                 │
│   📊 Feed     │  ┌─────────┬─────────┬─────────┐       │
│   🧠 Memory   │  │ To Do   │ Working │  Done   │       │
│   ⚙️ Settings │  │         │         │         │       │
│               │  │ [Task]  │ [Task]  │ [Task]  │       │
│               │  │ [Task]  │         │ [Task]  │       │
│               │  │         │         │ [Task]  │       │
│               │  └─────────┴─────────┴─────────┘       │
│               │                                         │
├───────────────┴─────────────────────────────────────────┤
│  💬 Quick Input: [________________________] [Send]      │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Task Schema

Tasks are stored in workspace as JSON for persistence:

```json
// ~/.openclaw/workspace/tasks/tasks.json
{
  "tasks": [
    {
      "id": "task_abc123",
      "title": "Research competitor pricing",
      "description": "Analyze top 5 competitors' pricing strategy",
      "status": "todo|working|done|blocked",
      "priority": "high|medium|low",
      "createdAt": "2026-01-31T10:00:00Z",
      "updatedAt": "2026-01-31T12:00:00Z",
      "completedAt": null,
      "assignedTo": "agent|human",
      "source": "telegram|dashboard|cron|agent",
      "feedback": null,
      "tags": ["research", "competitor"]
    }
  ],
  "columns": ["todo", "working", "done", "blocked"],
  "version": 1
}
```

---

## 🔄 Data Flow

### 1. User creates task (Dashboard)
```
Dashboard → POST /api/sessions/main/send 
         → {"message": "[TASK] Research competitor pricing"}
         → Agent parses and adds to tasks.json
         → WebSocket notifies dashboard
         → UI updates
```

### 2. Agent completes task
```
Agent completes work → Updates tasks.json (status: done)
                     → Sends Telegram notification
                     → WebSocket notifies dashboard
                     → UI shows task in "Done" column
```

### 3. User gives feedback
```
Dashboard → User clicks task → Rates/comments
         → POST feedback to session
         → Agent learns from feedback
         → Task marked as reviewed
```

---

## 🚀 Implementation Plan

### Phase 1: Static Prototype (Today)
- [ ] Create index.html with layout
- [ ] Style with CSS (dark mode)
- [ ] Mock data for tasks
- [ ] Basic interactivity (drag & drop)

### Phase 2: Gateway Integration (Day 2)
- [ ] Connect to WebSocket
- [ ] Fetch real session history
- [ ] Send messages through dashboard
- [ ] Display real costs

### Phase 3: Task System (Day 3)
- [ ] Create tasks.json structure
- [ ] Agent skill to manage tasks
- [ ] Sync between Telegram and dashboard
- [ ] Feedback mechanism

### Phase 4: Polish (Day 4)
- [ ] Responsive design
- [ ] Local storage for preferences
- [ ] Error handling
- [ ] Loading states

---

## 🔒 Security Considerations

1. **Local Only** — Dashboard runs on localhost by default
2. **Authentication** — Uses OpenClaw gateway token
3. **No External Calls** — All data stays local
4. **HTTPS** — Optional TLS for remote access

---

## 💡 Future Ideas

- **Mobile App** — React Native version
- **Voice Commands** — "Hey Clarus, add task..."
- **Slack/Discord Widget** — Embed mini dashboard
- **Metrics Graphs** — Historical cost/usage charts
- **Team Mode** — Multiple users, permissions

---

*Architecture v1.0 — 2026-01-31*

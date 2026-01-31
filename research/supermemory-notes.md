# Supermemory Plugin for OpenClaw

**Source:** https://github.com/supermemoryai/openclaw-supermemory

## What It Does
Long-term memory for OpenClaw. Automatically remembers conversations, recalls relevant context, and builds persistent user profile — all cloud-powered.

**Requires:** Supermemory Pro ($) - https://console.supermemory.ai/billing

## Installation
```bash
openclaw plugins install @supermemory/openclaw-supermemory
```

## Configuration
```bash
export SUPERMEMORY_OPENCLAW_API_KEY="sm_..."
```

Or in `openclaw.json`:
```json
{
  "plugins": {
    "entries": {
      "openclaw-supermemory": {
        "enabled": true,
        "config": {
          "apiKey": "${SUPERMEMORY_OPENCLAW_API_KEY}"
        }
      }
    }
  }
}
```

## Options
| Key | Default | Description |
|-----|---------|-------------|
| containerTag | openclaw_{hostname} | Memory namespace |
| autoRecall | true | Inject relevant memories before every turn |
| autoCapture | true | Store conversation content after every turn |
| maxRecallResults | 10 | Max memories injected per turn |
| profileFrequency | 50 | Inject full profile every N turns |
| captureMode | "all" | "all" or "everything" |
| debug | false | Verbose logging |

## How It Works
- **Auto-Recall:** Queries Supermemory before each turn, injects user profile + similar past conversations
- **Auto-Capture:** Sends last exchange to Supermemory for extraction and storage
- Everything runs in cloud - handles extraction, deduplication, profile building

## Commands
- `/remember <text>` - Save manually
- `/recall <query>` - Search memories

## AI Tools Available
- `supermemory_store` - Save to long-term memory
- `supermemory_search` - Search memories
- `supermemory_forget` - Delete memory
- `supermemory_profile` - View user profile

## CLI
```bash
openclaw supermemory search <query>
openclaw supermemory profile
openclaw supermemory wipe  # Destructive!
```

---

## 🎯 Evaluation
**Pros:**
- Zero-config persistent memory
- Automatic context injection
- Handles deduplication and profile building
- Cloud = no local infrastructure

**Cons:**
- Requires paid subscription (Pro+)
- Data in third-party cloud (privacy consideration)
- Monthly cost to factor in

**Decision:** Evaluate cost vs benefit. For now, continue using local file-based memory (MEMORY.md + daily notes). Consider Supermemory when budget allows or if memory becomes a bottleneck.

*Research captured: 2026-01-31*

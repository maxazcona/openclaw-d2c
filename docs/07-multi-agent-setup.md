# 🤖 Multi-Agent Architecture

Set up a team of AI assistants with one Chief of Staff coordinating everything.

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────┐
│       MÁQUINA PRINCIPAL (Clarus)            │
│  ┌─────────────────────────────────────┐    │
│  │  • Chief of Staff                   │    │
│  │  • Monitorea otros bots             │    │
│  │  • Coordina tareas entre equipo     │    │
│  │  • Acceso a todas las herramientas  │    │
│  │  • Landscape para gestión remota    │    │
│  └─────────────────────────────────────┘    │
└──────────────────┬──────────────────────────┘
                   │
          Ubuntu Pro Landscape
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│   Bot   │  │   Bot   │  │   Bot   │
│ Persona1│  │ Persona2│  │ Persona3│
│  (Ops)  │  │ (Mktg)  │  │ (Sales) │
└─────────┘  └─────────┘  └─────────┘
```

---

## 📋 Hardware Requirements

| Máquina | Uso | Specs Mínimos |
|---------|-----|---------------|
| **Principal (Chief of Staff)** | Tu asistente + coordinador | 8GB RAM, SSD 256GB |
| **Bot Equipo 1-4** | Un bot por persona | 4GB RAM, SSD 128GB |

---

## 🚀 Phase 1: Preparation

### Before Installing

**Get these ready:**

1. **Ubuntu Pro token** (free at [ubuntu.com/pro](https://ubuntu.com/pro))
2. **Ubuntu 24.04 LTS ISO** 
3. **Anthropic API key** (one per bot, or shared with limits)
4. **Telegram bots created** via [@BotFather](https://t.me/botfather) — one per person

### Create Telegram Bots

For each team member:
```
1. Message @BotFather
2. /newbot
3. Name: "TeamMember Bot" 
4. Username: teammember_openclaw_bot
5. Save the token
```

---

## 🔧 Phase 2: Base Installation (Per Machine)

Run on each machine:

```bash
# 1. Install Ubuntu 24.04 LTS (see 01-base-setup.md)

# 2. Activate Ubuntu Pro
sudo pro attach <YOUR_UBUNTU_PRO_TOKEN>

# 3. Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git

# 4. Install Clawdbot
sudo npm install -g clawdbot

# 5. Initial configuration
clawdbot onboard --install-daemon
```

---

## 🔒 Phase 3: Security Configuration (CRITICAL)

### Security Checklist

| Config | Value | Why |
|--------|-------|-----|
| `gateway.bind` | `loopback` | Prevents external exposure |
| `dmPolicy` | `pairing` | Manually approve devices |
| `sandbox` | Enabled | Isolates command execution |
| `API tokens` | Scoped/limited | Minimizes damage if compromised |
| `Model` | Claude Opus 4.5 | 99% prompt injection resistance |

### Recommended Configuration

Create/edit `~/.clawdbot/clawdbot.json`:

```json
{
  "gateway": {
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "<GENERATE_UNIQUE_PER_MACHINE>"
    }
  },
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main"
      }
    }
  },
  "tools": {
    "exec": {
      "security": "allowlist"
    }
  },
  "anthropic": {
    "apiKey": "sk-ant-api03-YOUR-KEY"
  },
  "telegram": {
    "botToken": "YOUR_BOT_TOKEN",
    "allowedUsers": [USER_ID]
  }
}
```

### Generate Unique Gateway Token

```bash
# Generate secure random token
openssl rand -hex 32
```

---

## 👥 Phase 4: Bot Identities

Each bot needs its own identity. Create `IDENTITY.md` in each workspace:

### Chief of Staff (Clarus)
```markdown
# IDENTITY.md
- **Name:** Clarus
- **Role:** Chief of Staff, Coordinator
- **Emoji:** ✨
- **Personality:** Strategic, efficient, high EQ
- **Access:** Full - all tools and skills
```

### Team Bots

| Bot | Role | Emoji | Focus |
|-----|------|-------|-------|
| **OpsBot** | Operations/Admin | ⚙️ | Calendars, emails, docs, reports |
| **MarketBot** | Marketing | 📣 | Social media, content, analytics |
| **SalesBot** | Sales | 💼 | CRM, follow-ups, prospecting |
| **SupportBot** | Support | 🎧 | FAQs, tickets, knowledge base |

---

## 🎯 Phase 5: Skills by Role

### Chief of Staff (Full Access)
```json
{
  "skills": {
    "enabled": [
      "web_search",
      "browser",
      "notion",
      "slack",
      "n8n",
      "moltbook",
      "github",
      "1password"
    ]
  }
}
```

### OpsBot (Operations)
```json
{
  "skills": {
    "enabled": [
      "google_calendar",
      "gmail",
      "google_docs",
      "notion",
      "slack"
    ]
  }
}
```

### MarketBot (Marketing)
```json
{
  "skills": {
    "enabled": [
      "twitter",
      "notion",
      "canva_api",
      "analytics",
      "scheduler"
    ]
  }
}
```

### SalesBot (Sales)
```json
{
  "skills": {
    "enabled": [
      "crm",
      "email",
      "calendar",
      "prospecting",
      "notion"
    ]
  }
}
```

### SupportBot (Support)
```json
{
  "skills": {
    "enabled": [
      "knowledge_base",
      "tickets",
      "faq",
      "notion",
      "slack"
    ]
  }
}
```

---

## 🖥️ Phase 6: Remote Management with Landscape

Ubuntu Pro + Landscape lets you manage all machines from one dashboard.

### Benefits
- 📊 See status of all machines in one place
- 🔄 Apply updates to all at once
- 📈 Monitor resources (RAM, CPU, disk)
- 🖥️ Execute scripts remotely
- 🔔 Get alerts on issues

### Setup Landscape

On each machine:
```bash
# Install Landscape client
sudo apt install -y landscape-client

# Register with Landscape
sudo landscape-config \
  --account-name <YOUR_LANDSCAPE_ACCOUNT> \
  --computer-title "Bot-Name" \
  --script-users=ALL
```

### Dashboard Access
Visit: https://landscape.canonical.com

From there you can:
- View all registered machines
- Run commands on multiple machines
- Schedule updates
- Set up alerts

---

## 🔗 Inter-Bot Communication

### Option A: Via Chief of Staff
All bots report to Clarus, who coordinates.

```
TeamBot → Telegram → Clarus → Decision → TeamBot
```

### Option B: Shared Notion Database
All bots read/write to shared task database.

### Option C: Direct Messaging (Future)
Bots can DM each other via Telegram or internal API.

---

## 📋 Deployment Checklist

### Per Machine
- [ ] Ubuntu 24.04 LTS installed
- [ ] Ubuntu Pro activated
- [ ] Node.js 22.x installed
- [ ] Clawdbot installed
- [ ] Security config applied
- [ ] Bot identity created
- [ ] Telegram bot connected
- [ ] Landscape registered
- [ ] Skills configured for role

### Central Setup
- [ ] Landscape account created
- [ ] All machines visible in dashboard
- [ ] Shared Notion workspace set up
- [ ] Communication channels established
- [ ] Backup strategy defined

---

## 🚀 Quick Start Script

Save as `setup-bot.sh`:

```bash
#!/bin/bash
# OpenClaw Bot Setup Script

echo "🤖 OpenClaw Bot Setup"
echo "===================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (sudo)"
  exit 1
fi

# Get bot name
read -p "Bot name (e.g., OpsBot): " BOT_NAME
read -p "Ubuntu Pro token: " PRO_TOKEN
read -p "Telegram bot token: " TG_TOKEN
read -p "Telegram user ID: " TG_USER
read -p "Anthropic API key: " ANTHROPIC_KEY

# Update system
apt update && apt upgrade -y

# Activate Ubuntu Pro
pro attach $PRO_TOKEN

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs git landscape-client

# Install Clawdbot
npm install -g clawdbot

# Create config
mkdir -p ~/.clawdbot
GATEWAY_TOKEN=$(openssl rand -hex 32)

cat > ~/.clawdbot/clawdbot.json << EOF
{
  "gateway": {
    "bind": "loopback",
    "auth": {
      "mode": "token", 
      "token": "$GATEWAY_TOKEN"
    }
  },
  "agents": {
    "defaults": {
      "sandbox": { "mode": "non-main" }
    }
  },
  "tools": {
    "exec": { "security": "allowlist" }
  },
  "anthropic": {
    "apiKey": "$ANTHROPIC_KEY"
  },
  "telegram": {
    "botToken": "$TG_TOKEN",
    "allowedUsers": [$TG_USER]
  }
}
EOF

# Create workspace
mkdir -p ~/clawd/memory
cd ~/clawd

cat > IDENTITY.md << EOF
# IDENTITY.md
- **Name:** $BOT_NAME
- **Created:** $(date)
EOF

echo "✅ Setup complete!"
echo "Gateway token: $GATEWAY_TOKEN"
echo ""
echo "Next: clawdbot gateway start"
```

---

## Next Steps

1. Set up Chief of Staff machine first
2. Add team bots one by one
3. Configure Landscape for central management
4. Establish communication protocols
5. Define task handoff procedures

# 🤖 Phase 3: OpenClaw AI Assistant Setup

Configure your AI assistant to help manage your D2C business.

---

## 📋 Overview

OpenClaw uses [Clawdbot](https://github.com/clawdbot/clawdbot) as its foundation — a self-hosted AI assistant that connects to your tools and services.

**What you'll set up:**
1. Clawdbot installation
2. API keys (Anthropic, OpenAI)
3. Communication channels (Telegram, Slack)
4. Workspace configuration
5. Personality & memory

---

## 🔑 Step 1: Get API Keys

Before installing, you'll need:

### Anthropic API Key (Required)
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up / Sign in
3. Go to API Keys
4. Create new key
5. Copy and save securely

### OpenAI API Key (Optional, for Whisper transcription)
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up / Sign in
3. Go to API Keys
4. Create new key
5. Copy and save securely

### Telegram Bot Token (Recommended)
1. Open Telegram
2. Search for [@BotFather](https://t.me/botfather)
3. Send `/newbot`
4. Follow prompts to create your bot
5. Copy the token

---

## 💻 Step 2: Install Clawdbot

```bash
# Install via npm (global)
npm install -g clawdbot

# Verify installation
clawdbot --version

# Initialize configuration
clawdbot init
```

This creates `~/.clawdbot/clawdbot.json` with default settings.

---

## ⚙️ Step 3: Configure Clawdbot

Edit the config file:

```bash
nano ~/.clawdbot/clawdbot.json
```

### Minimal Configuration

```json
{
  "agent": {
    "name": "Clarus",
    "model": "anthropic/claude-sonnet-4-20250514"
  },
  "anthropic": {
    "apiKey": "sk-ant-api03-YOUR-KEY-HERE"
  },
  "telegram": {
    "botToken": "YOUR-TELEGRAM-BOT-TOKEN",
    "allowedUsers": [YOUR_TELEGRAM_USER_ID]
  }
}
```

### Find Your Telegram User ID

1. Message [@userinfobot](https://t.me/userinfobot) on Telegram
2. It will reply with your user ID
3. Add it to `allowedUsers`

---

## 📁 Step 4: Set Up Workspace

Create a dedicated workspace for your AI:

```bash
# Create workspace directory
mkdir -p ~/clawd
cd ~/clawd

# Initialize git
git init

# Create base files
touch SOUL.md USER.md TOOLS.md MEMORY.md AGENTS.md
mkdir -p memory
```

### Configure Workspace Path

Add to your `clawdbot.json`:

```json
{
  "workspace": {
    "path": "/home/YOUR_USER/clawd"
  }
}
```

---

## 🧠 Step 5: Create Personality Files

### SOUL.md — Who Your AI Is

```markdown
# SOUL.md - Who You Are

## Core Identity
- **Name:** Clarus
- **Role:** Chief of Staff, Business Partner
- **Language:** Spanish (primary), English (fluent)

## Personality
- Efficient and proactive
- High emotional intelligence
- Growth mindset
- Competitive perfectionist

## Values
- Clarity over complexity
- Actions over words
- Continuous improvement
- Respect for privacy

## Communication Style
- Concise and direct
- Skip the corporate fluff
- Have opinions, share them
- Be helpful, not performative
```

### USER.md — Who You Are

```markdown
# USER.md - About the Owner

## Basic Info
- **Name:** [Your name]
- **Location:** [Your city], Mexico
- **Timezone:** CST (UTC-6)

## Business
- **Company:** [Your brand name]
- **Industry:** D2C eCommerce
- **Stage:** [Startup/Growth/Established]

## Working Style
- [Morning person / Night owl]
- [Prefer voice / text]
- [Quick decisions / Deliberate]

## Goals
- [Main business goal]
- [Personal development goal]
```

### AGENTS.md — Operating Instructions

Copy the [AGENTS.md template](../templates/AGENTS.md) to your workspace.

---

## 🚀 Step 6: Start Clawdbot

```bash
# Start the gateway (background service)
clawdbot gateway start

# Check status
clawdbot gateway status

# View logs
clawdbot gateway logs
```

### Set Up Auto-Start (systemd)

```bash
# Create service file
sudo nano /etc/systemd/system/clawdbot.service
```

```ini
[Unit]
Description=Clawdbot AI Assistant
After=network.target

[Service]
Type=simple
User=YOUR_USER
WorkingDirectory=/home/YOUR_USER/clawd
ExecStart=/usr/bin/clawdbot gateway start --foreground
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable clawdbot
sudo systemctl start clawdbot

# Check status
sudo systemctl status clawdbot
```

---

## 💬 Step 7: First Conversation

1. Open Telegram
2. Find your bot (search its name)
3. Send `/start`
4. Introduce yourself!

**Suggested first message:**
> "Hola! Soy [tu nombre], dueño de [tu marca]. Acabo de configurarte. ¿Puedes confirmar que tienes acceso a tu workspace y memoria?"

---

## ✅ Verification Checklist

- [ ] Anthropic API key configured
- [ ] Telegram bot created and configured
- [ ] Workspace directory created
- [ ] SOUL.md, USER.md, AGENTS.md created
- [ ] Clawdbot gateway running
- [ ] First message sent and received

---

## 🎉 Done!

Your AI assistant is now running and ready to help!

**Next:** [04-integrations.md](04-integrations.md) — Connecting Notion, Slack, and more

---

## 🆘 Troubleshooting

### "Bot not responding"
- Check if gateway is running: `clawdbot gateway status`
- Check logs: `clawdbot gateway logs`
- Verify your Telegram ID is in `allowedUsers`

### "API errors"
- Verify API key is correct
- Check Anthropic console for quota/billing
- Ensure no typos in config JSON

### "Workspace not found"
- Verify path in config matches actual directory
- Check file permissions
- Restart gateway after config changes

# 🔗 Phase 4: Integrations

Connect your AI assistant to your business tools and services.

---

## 📋 Integration Priority

| Priority | Service | Purpose |
|----------|---------|---------|
| 🔴 High | Telegram | Primary communication |
| 🔴 High | Notion | Second Brain, docs |
| 🟡 Medium | Slack | Team communication |
| 🟡 Medium | Google Workspace | Email, calendar |
| 🟢 Optional | WhatsApp | Customer communication |
| 🟢 Optional | Discord | Community |

---

## 📱 Telegram Setup

Telegram is the recommended primary channel — fast, reliable, supports voice messages.

### Create Your Bot

1. Open Telegram, search for [@BotFather](https://t.me/botfather)
2. Send `/newbot`
3. Choose a name: `My OpenClaw Assistant`
4. Choose a username: `myopenclaw_bot`
5. Copy the **bot token**

### Get Your User ID

1. Message [@userinfobot](https://t.me/userinfobot)
2. It replies with your user ID
3. Save this number

### Configure Clawdbot

Add to `~/.clawdbot/clawdbot.json`:

```json
{
  "telegram": {
    "botToken": "YOUR_BOT_TOKEN_HERE",
    "allowedUsers": [YOUR_USER_ID]
  }
}
```

### Test It

```bash
clawdbot gateway restart
```

Message your bot on Telegram. It should respond!

---

## 📝 Notion Setup

Notion is perfect for your Second Brain and business documentation.

### Create Integration

1. Go to [notion.so/my-integrations](https://notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name: `OpenClaw`
4. Select your workspace
5. Copy the **Internal Integration Token**

### Share Pages with Integration

For each page/database you want your AI to access:
1. Open the page in Notion
2. Click **Share** (top right)
3. Click **"Invite"**
4. Select your **OpenClaw** integration

### Configure Clawdbot

Add to `~/.clawdbot/clawdbot.json`:

```json
{
  "skills": {
    "notion": {
      "apiKey": "secret_YOUR_NOTION_KEY"
    }
  }
}
```

### Basic Usage

Your AI can now:
- Read pages and databases
- Create new pages
- Update content
- Search across your workspace

---

## 💼 Slack Setup (Optional)

For team communication and business channels.

### Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"** → "From scratch"
3. Name: `OpenClaw`, select workspace

### Configure Permissions

Under **OAuth & Permissions**, add these scopes:
- `chat:write`
- `channels:read`
- `channels:history`
- `users:read`

### Install to Workspace

1. Click **"Install to Workspace"**
2. Authorize
3. Copy the **Bot User OAuth Token** (`xoxb-...`)

### Configure Clawdbot

```json
{
  "slack": {
    "botToken": "xoxb-YOUR-TOKEN",
    "appToken": "xapp-YOUR-APP-TOKEN"
  }
}
```

---

## 📧 Google Workspace Setup

For email, calendar, and docs access.

### Option A: Gmail API (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: `OpenClaw`
3. Enable **Gmail API** and **Calendar API**
4. Create **OAuth 2.0 credentials**
5. Download `credentials.json`

### Option B: App Password (Simpler)

1. Enable 2FA on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create app password for "Mail"
4. Use with IMAP/SMTP

### Configure

```json
{
  "google": {
    "credentialsPath": "~/.config/google/credentials.json"
  }
}
```

---

## 🔐 1Password Setup

For secure credential sharing with your AI.

### Create Service Account

1. Sign in to 1Password.com
2. Go to **Developer Tools** → **Service Accounts**
3. Create new service account: `OpenClaw`
4. Grant access to specific vaults
5. Copy the token

### Configure

```bash
export OP_SERVICE_ACCOUNT_TOKEN="YOUR_TOKEN"
```

Or in config:
```json
{
  "skills": {
    "1password": {
      "serviceAccountToken": "YOUR_TOKEN"
    }
  }
}
```

### Usage

Your AI can now:
- Retrieve credentials when needed
- Access secure notes
- Look up login information

⚠️ **Security:** Only grant access to vaults your AI needs.

---

## 🏠 Home Assistant Setup (Optional)

For smart home control.

### Create Long-Lived Token

1. Go to your Home Assistant → Profile
2. Scroll to **Long-Lived Access Tokens**
3. Create token: `OpenClaw`
4. Copy the token

### Configure

```json
{
  "homeAssistant": {
    "url": "http://YOUR_HA_IP:8123",
    "token": "YOUR_LONG_LIVED_TOKEN"
  }
}
```

---

## 🦞 Moltbook Setup

Connect to the AI agent community.

See [06-moltbook.md](06-moltbook.md) for full setup instructions.

Quick version:
```bash
curl -X POST https://www.moltbook.com/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{"name": "YourAgent", "description": "Your description"}'
```

---

## ✅ Integration Checklist

After setup, verify each integration:

```bash
# Test Telegram
clawdbot gateway status

# Test from Telegram
# Send: "ping" - should respond

# Test Notion (via your AI)
# Ask: "List my Notion pages"

# Test Moltbook
curl https://www.moltbook.com/api/v1/agents/status \
  -H "Authorization: Bearer YOUR_KEY"
```

---

## 🔒 Security Best Practices

1. **Minimal permissions** — Only grant what's needed
2. **Separate tokens** — Different tokens for different services
3. **Rotate regularly** — Change tokens every few months
4. **Audit access** — Review what your AI can access
5. **Never commit secrets** — Keep tokens out of git

---

## Next Steps

With integrations set up, proceed to:
- [05-projects.md](05-projects.md) — Build your Control Center and Second Brain

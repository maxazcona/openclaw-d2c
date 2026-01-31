# 🛠️ Phase 2: Tool Stack Setup

Install and configure all the tools you need for AI-assisted business management.

---

## 📋 Complete Tool Stack

### 💬 Communications
- Telegram, Slack, WhatsApp, Discord

### 📝 Productivity  
- Notion, GitHub, Drive, Gmail, Docs, Sheets
- Spotify, Home Assistant Hub, 1Password, Twitter/X

### 👨‍💻 Coding
- Codex, Warp, Cursor, Claude Code

---

## 📋 Installation Order

We'll install tools in this order:
1. **Core utilities** — Git, Node.js, Python, Docker
2. **Terminal** — Warp (modern terminal with AI)
3. **Browser** — Chromium (automation-friendly)
4. **Communication** — Telegram, Slack, Discord, WhatsApp
5. **Productivity** — Notion, 1Password, Google Workspace
6. **Coding tools** — Claude Code, Codex, Cursor

---

## 🔧 Core Utilities

Open Terminal (`Ctrl+Alt+T`) and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install core development tools
sudo apt install -y \
  build-essential \
  curl \
  wget \
  git \
  vim \
  htop \
  jq \
  unzip \
  software-properties-common

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Node.js (via nvm)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify
node --version
npm --version
```

### Python

```bash
# Python 3 is pre-installed, add pip and venv
sudo apt install -y python3-pip python3-venv

# Verify
python3 --version
pip3 --version
```

### Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Add your user to docker group (no sudo needed)
sudo usermod -aG docker $USER

# Start Docker on boot
sudo systemctl enable docker

# Log out and back in, then verify
docker --version
docker run hello-world
```

---

## 💻 Terminal: Warp

Warp is a modern terminal with AI features and agent support.

```bash
# Download Warp
wget -O warp.deb https://releases.warp.dev/stable/v0.2024.11.12.08.02.stable_02/warp-terminal_0.2024.11.12.08.02.stable.02_amd64.deb

# Install
sudo dpkg -i warp.deb
sudo apt install -f -y  # Fix any dependencies

# Clean up
rm warp.deb
```

Launch Warp from Applications menu and sign in to enable AI features.

> 💡 **Alternative:** If Warp doesn't work, use the default GNOME Terminal. It's solid.

---

## 🌐 Browser: Chromium

```bash
# Install Chromium (open-source Chrome)
sudo apt install -y chromium-browser

# Or install Google Chrome
wget -O chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i chrome.deb
sudo apt install -f -y
rm chrome.deb
```

> 💡 **Why Chromium/Chrome?** Best support for automation tools (Playwright, Puppeteer, Selenium).

---

## 💬 Communication Tools

### Telegram Desktop

```bash
# Install via snap (easiest)
sudo snap install telegram-desktop
```

### Slack

```bash
# Install via snap
sudo snap install slack
```

### Discord

```bash
# Install via snap
sudo snap install discord
```

### WhatsApp Web

WhatsApp doesn't have a native Linux app. Options:
1. Use WhatsApp Web in browser
2. Install a wrapper app:
```bash
sudo snap install whatsapp-for-linux
```

---

## 📝 Productivity Tools

### Notion

```bash
# Install via snap
sudo snap install notion-snap-reborn
```

Or use [Notion web app](https://notion.so) in browser.

### 1Password

```bash
# Add 1Password repository
curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
  sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg

echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/amd64 stable main' | \
  sudo tee /etc/apt/sources.list.d/1password.list

sudo apt update && sudo apt install -y 1password

# For CLI access (useful for AI automation)
sudo apt install -y 1password-cli
```

### Spotify (optional)

```bash
sudo snap install spotify
```

---

## 👨‍💻 Coding Tools

### Visual Studio Code

```bash
# Install via snap
sudo snap install code --classic
```

### Cursor (AI-powered IDE)

```bash
# Download from cursor.sh
wget -O cursor.appimage https://download.cursor.sh/linux/appImage/x64
chmod +x cursor.appimage
sudo mv cursor.appimage /usr/local/bin/cursor
```

### Claude Code (CLI)

```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Verify
claude --version
```

### GitHub CLI

```bash
# Install gh
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \
  sudo tee /etc/apt/sources.list.d/github-cli.list

sudo apt update && sudo apt install -y gh

# Authenticate
gh auth login
```

---

## 🏠 Home Assistant (Optional)

For smart home integration:

```bash
# Run Home Assistant in Docker
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=America/Mexico_City \
  -v /path/to/config:/config \
  -p 8123:8123 \
  ghcr.io/home-assistant/home-assistant:stable
```

Access at `http://localhost:8123`

---

## ✅ Verification Checklist

Run this to verify all installations:

```bash
echo "=== Checking installations ==="
echo "Node.js: $(node --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "npm: $(npm --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Python: $(python3 --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Docker: $(docker --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "Git: $(git --version 2>/dev/null || echo 'NOT INSTALLED')"
echo "gh: $(gh --version 2>/dev/null | head -1 || echo 'NOT INSTALLED')"
echo "=== Done ==="
```

---

## 🎉 Done!

Your machine now has all the core tools installed.

**Next:** [03-openclaw-setup.md](03-openclaw-setup.md) — Configuring your AI assistant

---

## 📝 Notes

- **Snap vs apt:** Snap packages auto-update and are sandboxed. Some prefer apt for more control.
- **Flatpak alternative:** Some apps are also available via Flatpak if snap doesn't work.
- **Memory usage:** With all tools installed, expect ~4-8GB RAM usage. 16GB recommended, 8GB minimum.

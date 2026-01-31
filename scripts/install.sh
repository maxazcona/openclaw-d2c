#!/bin/bash
#
# OpenClaw D2C - Interactive Installer
# Run: curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/openclaw-d2c/main/scripts/install.sh | bash
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
ROCKET="🚀"
CHECK="✅"
WARN="⚠️"
ERROR="❌"
TOOLS="🛠️"
BRAIN="🧠"

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   ${ROCKET} OpenClaw D2C Framework Installer                       ║"
echo "║                                                              ║"
echo "║   AI-powered framework for One Man D2C eCommerce             ║"
echo "║   in Mexico & LATAM                                          ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${WARN} ${YELLOW}Running as root. Consider running as regular user.${NC}"
fi

# Check OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
    echo -e "${CHECK} Detected: $OS $VER"
else
    echo -e "${ERROR} ${RED}Could not detect OS. This script is designed for Ubuntu.${NC}"
    exit 1
fi

# Function to install a package if not present
install_if_missing() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${TOOLS} Installing $1..."
        sudo apt install -y $2
    else
        echo -e "${CHECK} $1 already installed"
    fi
}

echo ""
echo -e "${BLUE}=== Phase 1: System Update ===${NC}"
echo ""

sudo apt update
sudo apt upgrade -y

echo ""
echo -e "${BLUE}=== Phase 2: Core Tools ===${NC}"
echo ""

# Core packages
sudo apt install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    jq \
    unzip \
    build-essential \
    software-properties-common

echo -e "${CHECK} Core tools installed"

echo ""
echo -e "${BLUE}=== Phase 3: Node.js ===${NC}"
echo ""

# Install nvm if not present
if [ ! -d "$HOME/.nvm" ]; then
    echo -e "${TOOLS} Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
    echo -e "${CHECK} nvm already installed"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install Node LTS
if ! command -v node &> /dev/null; then
    echo -e "${TOOLS} Installing Node.js LTS..."
    nvm install --lts
    nvm use --lts
else
    echo -e "${CHECK} Node.js already installed: $(node --version)"
fi

echo ""
echo -e "${BLUE}=== Phase 4: Docker ===${NC}"
echo ""

if ! command -v docker &> /dev/null; then
    echo -e "${TOOLS} Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo -e "${WARN} ${YELLOW}You may need to log out and back in for Docker group to take effect${NC}"
else
    echo -e "${CHECK} Docker already installed: $(docker --version)"
fi

echo ""
echo -e "${BLUE}=== Phase 5: GitHub CLI ===${NC}"
echo ""

if ! command -v gh &> /dev/null; then
    echo -e "${TOOLS} Installing GitHub CLI..."
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
        sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \
        sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt update
    sudo apt install -y gh
else
    echo -e "${CHECK} GitHub CLI already installed"
fi

echo ""
echo -e "${BLUE}=== Phase 6: Clawdbot ===${NC}"
echo ""

if ! command -v clawdbot &> /dev/null; then
    echo -e "${TOOLS} Installing Clawdbot..."
    npm install -g clawdbot
else
    echo -e "${CHECK} Clawdbot already installed: $(clawdbot --version)"
fi

echo ""
echo -e "${BLUE}=== Phase 7: Workspace Setup ===${NC}"
echo ""

WORKSPACE="$HOME/clawd"

if [ ! -d "$WORKSPACE" ]; then
    echo -e "${BRAIN} Creating workspace at $WORKSPACE..."
    mkdir -p "$WORKSPACE"
    mkdir -p "$WORKSPACE/memory"
    
    cd "$WORKSPACE"
    git init
    
    # Create base files
    touch SOUL.md USER.md TOOLS.md MEMORY.md AGENTS.md HEARTBEAT.md
    
    echo -e "${CHECK} Workspace created"
else
    echo -e "${CHECK} Workspace already exists at $WORKSPACE"
fi

echo ""
echo -e "${GREEN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   ${CHECK} Installation Complete!                                  ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
echo -e "${CYAN}Next steps:${NC}"
echo ""
echo "1. ${YELLOW}Get your API keys:${NC}"
echo "   - Anthropic: https://console.anthropic.com/"
echo "   - Telegram Bot: Talk to @BotFather"
echo ""
echo "2. ${YELLOW}Configure Clawdbot:${NC}"
echo "   clawdbot init"
echo "   # Edit ~/.clawdbot/clawdbot.json with your keys"
echo ""
echo "3. ${YELLOW}Set up your workspace:${NC}"
echo "   cd ~/clawd"
echo "   # Edit SOUL.md, USER.md, AGENTS.md"
echo ""
echo "4. ${YELLOW}Start Clawdbot:${NC}"
echo "   clawdbot gateway start"
echo ""
echo "5. ${YELLOW}Message your bot on Telegram!${NC}"
echo ""
echo -e "${CYAN}Documentation: https://github.com/openclaw/openclaw-d2c${NC}"
echo ""
echo -e "${GREEN}¡Vamos a construir algo increíble! ${ROCKET}${NC}"

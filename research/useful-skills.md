# 🛠️ Useful OpenClaw Skills for D2C

> Curated list of skills relevant to D2C eCommerce operations.

**Source:** https://github.com/VoltAgent/awesome-openclaw-skills (700+ skills)

---

## 📋 Priority Skills to Install

### Already Installed ✅
- `github` - GitHub CLI operations
- `notion` - Notion API integration
- `tmux` - Terminal multiplexer control
- `weather` - Weather forecasts
- `coding-agent` - Run Codex CLI, Claude Code, etc.
- `openai-whisper-api` - Audio transcription
- `openai-image-gen` - Image generation

### High Priority 🔴

| Skill | Purpose | Install Command |
|-------|---------|-----------------|
| `slack` | Slack integration | `npx clawdhub install slack` |
| `discord` | Discord bot control | `npx clawdhub install discord` |
| `codex-orchestration` | Multi-model orchestration | `npx clawdhub install codex-orchestration` |
| `deploy-agent` | Multi-step deployment | `npx clawdhub install deploy-agent` |
| `linearis` | Linear issue tracking | `npx clawdhub install linearis` |

### Medium Priority 🟡

| Skill | Purpose |
|-------|---------|
| `supabase` | Database + vector search |
| `coolify` | Self-hosted deployments |
| `hetzner` | VPS management |
| `cloudflare` | Workers, KV, D1, R2 |
| `pr-commit-workflow` | Git workflow automation |

---

## 📂 By Category

### Communication
- `slack` - Slack control
- `discord` - Discord control
- `telegram` (bundled) - Already integrated

### DevOps & Cloud
- `hetzner` - Hetzner Cloud management
- `hetzner-cloud` - CLI for servers, volumes, DNS
- `digital-ocean` - DO droplets and infrastructure
- `coolify` - Self-hosted deployments
- `dokploy` - Docker deployments
- `proxmox` - VM management
- `cloudflare` - Wrangler CLI for Workers
- `portainer` - Docker container management
- `kubectl-skill` - Kubernetes management

### Coding & Development
- `coding-agent` - Run Codex, Claude Code, OpenCode
- `codex-orchestration` - Multi-model orchestration
- `cursor-agent` - Cursor CLI agent
- `factory-ai` - Factory AI droid CLI
- `claude-team` - Orchestrate multiple Claude Code workers
- `perry-workspaces` - Isolated Docker workspaces

### Git & GitHub
- `github` - gh CLI operations
- `github-pr` - PR management
- `conventional-commits` - Commit formatting
- `gitload` - Download files without cloning
- `read-github` - Read repos via gitmcp.io

### Productivity & Tasks
- `linearis` - Linear.app issue tracking
- `deepwork-tracker` - Track deep work sessions

### Notes & PKM
- `notion` - Notion API
- `reflect` - Reflect app notes
- (44 total in this category)

### Search & Research
- `exa-plus` - Neural web search
- `deepwiki` - GitHub repo documentation
- (23 total in this category)

### Marketing & Sales
- 42 skills available including:
  - Social media management
  - Email marketing
  - CRM integrations
  - Analytics tools

### Finance
- 29 skills available including:
  - Accounting integrations
  - Invoice management
  - Payment processing

### Shopping & E-commerce
- 22 skills available including:
  - Inventory management
  - Order processing
  - Shipping integrations

### Smart Home & IoT
- 31 skills available including:
  - Home Assistant
  - Smart device control
  - Automation triggers

### Speech & Transcription
- `openai-whisper-api` - Already installed
- 21 total skills for audio/speech

### Image & Video Generation
- `openai-image-gen` - Already installed
- `remotion-server` - Headless video rendering
- `remotion-best-practices` - Remotion guidelines
- 19 total skills

### Security & Passwords
- `1password` - Password manager integration
- 6 total skills

---

## 🎯 Recommended Installation Order

### Phase 1: Communication & Basics
```bash
npx clawdhub install slack discord
```

### Phase 2: DevOps
```bash
npx clawdhub install hetzner cloudflare coolify
```

### Phase 3: Productivity
```bash
npx clawdhub install linearis conventional-commits
```

### Phase 4: E-commerce Specific
*Research which skills are available for:*
- Shopify integration
- WhatsApp Business
- SAT/Facturas (Mexico-specific)

---

## 🔍 Skills to Research Further

### For Ecommerce D2C Brands
- Shopify API skills
- Inventory management
- Order fulfillment
- Customer service automation

### For Multi-Agent Setup
- `claude-team` - Multiple Claude Code workers
- `codex-orchestration` - Multi-model coordination
- `perry-workspaces` - Isolated Docker workspaces

### For Automation
- `deploy-agent` - Deployment automation
- n8n integration (if available)
- Zapier integration (if available)

---

## 📚 Full Categories Available

| Category | Count |
|----------|-------|
| Marketing & Sales | 42 |
| DevOps & Cloud | 41 |
| CLI Utilities | 41 |
| Productivity & Tasks | 41 |
| Notes & PKM | 44 |
| AI & LLMs | 38 |
| Transportation | 34 |
| Smart Home & IoT | 31 |
| Finance | 29 |
| Media & Streaming | 29 |
| Personal Development | 27 |
| Health & Fitness | 26 |
| Communication | 26 |
| Search & Research | 23 |
| Shopping & E-commerce | 22 |
| Speech & Transcription | 21 |
| Image & Video Generation | 19 |
| Calendar & Scheduling | 16 |
| Coding Agents & IDEs | 15 |
| Web & Frontend | 14 |
| Apple Apps & Services | 14 |
| iOS & macOS Development | 13 |
| PDF & Documents | 12 |
| Self-Hosted & Automation | 11 |
| Browser & Automation | 11 |
| Git & GitHub | 9 |
| Security & Passwords | 6 |
| **TOTAL** | **700+** |

---

## 🔗 Resources

- **Main Repo:** https://github.com/VoltAgent/awesome-openclaw-skills
- **ClawdHub:** https://clawdhub.com
- **Install CLI:** `npx clawdhub@latest install <skill>`
- **Manual:** Copy to `~/.openclaw/skills/` or `<project>/skills/`

---

*Research compiled: 2026-01-31*
*Update regularly as new skills are added*

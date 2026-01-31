# 🚀 OpenClaw D2C - Setup Master Plan

## Visión General

Este documento es el plan maestro para configurar un entorno OpenClaw completo para empresarios D2C, basado en las lecciones aprendidas durante el setup real de Clarus.

---

## 📋 Fases del Setup

### Fase 0: Pre-requisitos
- [ ] Hardware: Ubuntu/Linux (laptop o VPS)
- [ ] Cuenta Anthropic con API key
- [ ] Telegram account (para crear bot)
- [ ] ~30 minutos de tiempo

### Fase 1: Instalación Base ⏱️ 10 min
- [ ] Instalar Node.js ≥22
- [ ] Instalar OpenClaw
- [ ] Completar onboarding wizard
- [ ] Configurar Telegram bot

### Fase 2: Personalización del Agente ⏱️ 15 min
- [ ] Editar SOUL.md (personalidad)
- [ ] Editar IDENTITY.md (nombre, emoji)
- [ ] Editar USER.md (info del usuario)
- [ ] Crear MEMORY.md (contexto inicial)

### Fase 3: Skills & Tools ⏱️ 20 min
- [ ] Instalar skills prioritarias
- [ ] Configurar API keys adicionales
- [ ] Instalar software de soporte

### Fase 4: Browser & Automation ⏱️ 15 min
- [ ] Instalar Playwright/Chromium
- [ ] Configurar browser control
- [ ] Probar web automation

### Fase 5: Advanced Setup ⏱️ Variable
- [ ] Configurar VPS para multi-agente
- [ ] Setup Tailscale (acceso remoto)
- [ ] Integrar con servicios (Notion, GitHub, etc.)

---

## 🔧 Fase 1: Instalación Base

### 1.1 Node.js
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
node -v  # Debe ser ≥22
```

### 1.2 OpenClaw
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 1.3 Onboarding
```bash
openclaw setup
# Seguir wizard:
# - Security warning: Yes
# - Quick start: Yes (o Manual si prefieres)
# - Skills: Skip for now
# - Hatch: Do this later (si vas a personalizar primero)
```

### 1.4 Telegram Bot
1. Abrir Telegram, buscar @BotFather
2. Enviar `/newbot`
3. Elegir nombre y username
4. Copiar el token

```bash
openclaw configure --section channels
# Seleccionar Telegram
# Pegar token
```

### 1.5 Aprobar tu acceso
```bash
# Enviar mensaje al bot, te dará un código
openclaw pairing approve telegram <CODIGO>
```

---

## 🎨 Fase 2: Personalización

### Estructura del Workspace
```
~/.openclaw/workspace/
├── SOUL.md        # Personalidad y tono
├── IDENTITY.md    # Nombre, avatar, vibe
├── USER.md        # Info sobre ti
├── MEMORY.md      # Memoria largo plazo
├── AGENTS.md      # Instrucciones operativas
├── TOOLS.md       # Notas de herramientas
└── memory/        # Logs diarios
```

### Templates Disponibles
Ver `templates/` en este repo para ejemplos de:
- Agente de soporte
- Agente de ventas
- Agente personal
- Agente de research

---

## 🛠️ Fase 3: Skills & Tools

### Skills Prioritarias
```bash
npx clawdhub install github clawdhub coding-agent tmux notion
```

### Skills de Productividad
```bash
npx clawdhub install himalaya 1password summarize
```

### Skills de Media/Voice
```bash
npx clawdhub install sag openai-whisper-api video-frames
```

### API Keys Necesarias

| Servicio | Variable/Config | Obtener en |
|----------|-----------------|------------|
| Anthropic | Ya configurado | console.anthropic.com |
| OpenAI | `openclaw configure` | platform.openai.com |
| Brave Search | `web.brave.apiKey` | brave.com/search/api |
| ElevenLabs | Para skill `sag` | elevenlabs.io |
| GitHub | `gh auth login` | github.com/settings/tokens |
| Notion | Para skill `notion` | notion.so/my-integrations |

### Software Adicional
```bash
# GitHub CLI
sudo apt install gh
gh auth login

# Codex CLI (OpenAI)
npm install -g @openai/codex

# Playwright (browser automation)
npx playwright install chromium
```

---

## 🌐 Fase 4: Browser Automation

OpenClaw incluye herramienta `browser` para:
- Navegar páginas
- Tomar screenshots
- Interactuar con elementos
- Automatizar tareas web

### Setup
```bash
# Instalar browsers
npx playwright install chromium

# Verificar
openclaw browser status
```

### Uso
El agente puede usar comandos como:
- `browser open https://example.com`
- `browser screenshot`
- `browser click "button text"`

---

## 🖥️ Fase 5: VPS Multi-Agente

Ver `docs/10-multi-instance-vps.md` para:
- Configurar múltiples agentes en un VPS
- Separar por usuario/función
- Monitoreo y health checks
- Backups automáticos

---

## 📦 Super Instalador (TODO)

Objetivo: Un solo comando que:
1. Detecta el sistema
2. Instala dependencias
3. Configura OpenClaw
4. Aplica templates según perfil
5. Configura servicios

```bash
# Futuro:
curl -fsSL https://openclaw-d2c.dev/install.sh | bash -s -- --profile=d2c-mexico
```

---

## 📚 Documentación del Repo

```
openclaw-d2c/
├── README.md                    # Overview
├── SETUP-MASTERPLAN.md          # Este archivo
├── docs/
│   ├── 01-base-setup.md         # Instalación base
│   ├── 02-tools-setup.md        # Herramientas
│   ├── 03-openclaw-setup.md     # Config OpenClaw
│   ├── 04-integrations.md       # Integraciones
│   ├── 05-projects.md           # Proyectos
│   ├── 06-moltbook.md           # Comunidad
│   ├── 07-multi-agent-setup.md  # Multi-agente
│   ├── 08-model-guide.md        # Guía de modelos
│   ├── 09-migration-guide.md    # 🆕 Migraciones
│   └── 10-multi-instance-vps.md # 🆕 VPS setup
├── templates/
│   ├── d2c-soporte/
│   ├── d2c-ventas/
│   └── d2c-personal/
├── scripts/
│   └── install.sh               # Super instalador
└── research/
    └── ...                      # Notas de research
```

---

## ✅ Checklist Post-Setup

- [ ] Agente responde en Telegram
- [ ] Tiene tu personalidad/tono
- [ ] Web search funciona
- [ ] Browser automation funciona
- [ ] Puede ejecutar comandos
- [ ] Puede leer/escribir archivos
- [ ] Skills instaladas funcionan
- [ ] Memoria persiste entre sesiones

---

## 🐛 Troubleshooting Común

| Problema | Solución |
|----------|----------|
| "command not found: openclaw" | `source ~/.bashrc` o reinstalar |
| Bot no responde | Verificar token, reiniciar gateway |
| "access not configured" | `openclaw pairing approve telegram <CODE>` |
| Agente sin personalidad | Verificar SOUL.md, IDENTITY.md |
| Web search falla | Configurar Brave API key |

---

*Última actualización: 2026-01-31*
*Basado en: Migración real Hostinger VPS → clarus-S15*

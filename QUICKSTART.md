# 🚀 OpenClaw D2C — Quick Start Guide

> **Tu AI Chief of Staff en 30 minutos**
> 
> Esta guía te lleva desde cero hasta tener un asistente AI funcionando en tu negocio D2C.

---

## 🎯 ¿Para Quién es Esto?

- **Empresarios D2C** (ecommerce, direct-to-consumer)
- **One-man operations** que necesitan escalar sin contratar
- **Dueños de negocio** que quieren un "empleado" 24/7
- **Gente técnica pero no desarrolladores** — no necesitas programar

### Lo que Obtienes:
- ✅ Asistente AI que trabaja contigo (no solo responde)
- ✅ Acceso a tus herramientas (calendar, email, Notion, etc.)
- ✅ Automatización de tareas repetitivas
- ✅ Research, análisis, y reportes automáticos
- ✅ Memoria persistente — recuerda tu contexto

---

## 📋 Requisitos

| Qué Necesitas | Por Qué |
|---------------|---------|
| **Computadora con Ubuntu** | El AI vive aquí (puede ser laptop vieja, VPS, o Raspberry Pi) |
| **API Key de Anthropic** | Para el cerebro (Claude AI) — ~$10-50/mes según uso |
| **Cuenta de Telegram** | Para comunicarte con tu AI |
| **30-45 minutos** | Tiempo de setup inicial |

> 💡 **¿No tienes Ubuntu?** La [guía de instalación](docs/01-base-setup.md) cubre cómo instalarlo desde Windows o Mac.

---

## ⚡ Instalación Express (5 min)

### Paso 1: Instalar OpenClaw

```bash
# Ejecuta esto en tu terminal
curl -fsSL https://openclaw.ai/install.sh | bash
```

### Paso 2: Setup Inicial

```bash
openclaw setup
```

Esto abre un wizard que te pregunta:
1. **Security warning** → `Yes`
2. **Quick start?** → `Yes` (o Manual si prefieres control total)
3. **Skills** → `Skip for now`
4. **Hatch agent?** → `Do this later`

### Paso 3: Obtener API Key de Anthropic

1. Ve a [console.anthropic.com](https://console.anthropic.com/)
2. Crea cuenta / Inicia sesión
3. Ve a **API Keys** → **Create Key**
4. Copia la key (empieza con `sk-ant-...`)

```bash
openclaw configure --section ai
# Pega tu API key cuando pregunte
```

---

## 📱 Conectar Telegram (5 min)

### Crear tu Bot

1. Abre Telegram
2. Busca **@BotFather**
3. Envía `/newbot`
4. Elige un nombre (ej: "Mi Asistente IA")
5. Elige un username (ej: `mi_asistente_ai_bot`)
6. **Copia el token** (se ve así: `123456789:ABCdefGHI...`)

### Configurar en OpenClaw

```bash
openclaw configure --section channels
# Selecciona: Telegram
# Pega tu token
```

### Aprobarte como Usuario

1. Envía cualquier mensaje a tu bot en Telegram
2. Verás un código de aprobación en tu terminal
3. Ejecuta:

```bash
openclaw pairing approve telegram <TU_CODIGO>
```

### ¡Prueba!

Envía "Hola" a tu bot. Si responde, ¡está funcionando! 🎉

---

## 🎨 Personalizar tu AI (10 min)

Tu AI vive en `~/.openclaw/workspace/`. Ahí están sus archivos de personalidad:

### IDENTITY.md — El Nombre y Vibe

```bash
nano ~/.openclaw/workspace/IDENTITY.md
```

```markdown
# IDENTITY.md

- **Name:** [Nombre de tu AI]
- **Role:** Chief of Staff / Asistente Personal
- **Language:** Español (con inglés cuando necesario)
- **Vibe:** [Profesional / Casual / Directo / etc.]
- **Emoji:** [Un emoji que lo represente]
```

### SOUL.md — La Personalidad

Este archivo define cómo piensa y actúa tu AI. Ya viene con defaults buenos, pero puedes editarlo:

```bash
nano ~/.openclaw/workspace/SOUL.md
```

### USER.md — Contexto sobre Ti

```bash
nano ~/.openclaw/workspace/USER.md
```

```markdown
# USER.md

- **Nombre:** [Tu nombre]
- **Negocio:** [Nombre de tu marca]
- **Industria:** [Ej: Skincare D2C]
- **Ubicación:** [Ciudad], México
- **Timezone:** CST/PST/etc.

## Contexto
[Agrega info relevante: qué hace tu negocio, tus prioridades, cómo te gusta trabajar]
```

---

## 🛠️ Herramientas Esenciales (10 min)

### API Keys Adicionales (Opcionales pero Recomendadas)

| Servicio | Para Qué | Costo |
|----------|----------|-------|
| **OpenAI** | Transcripción de voz (Whisper) | ~$0.006/min |
| **Brave Search** | Búsquedas web | $0 (500/mes gratis) |
| **ElevenLabs** | Respuestas en voz | ~$5/mes básico |
| **Notion** | Integración con tu workspace | $0 |

```bash
# Agregar API keys
nano ~/.openclaw/.env
```

```bash
# .env file
OPENAI_API_KEY=sk-...
BRAVE_API_KEY=BSA...
ELEVENLABS_API_KEY=...
NOTION_API_KEY=secret_...
```

```bash
# Reiniciar para que tome los cambios
openclaw gateway restart
```

### Instalar Skills

Las skills son plugins que dan capacidades a tu AI:

```bash
# Skills esenciales
npx clawdhub install github notion weather

# Skills de voz (si quieres audio)
npx clawdhub install openai-whisper-api

# Ver skills disponibles
npx clawdhub search
```

---

## 🧠 Tu AI como Chief of Staff

Una vez configurado, tu AI puede:

### 📊 Gestión de Tareas
- "¿Qué pendientes tengo?"
- "Agrega a mis tareas: revisar inventario"
- "¿Qué hicimos ayer?"

### 🔍 Research
- "Investiga tendencias de skincare en México para 2026"
- "Analiza a mi competidor [nombre]"
- "Resúmeme las noticias de ecommerce hoy"

### 📧 Comunicación
- "Draft un email para el proveedor sobre el retraso"
- "¿Llegó algo importante de [persona]?"

### 📁 Documentación
- "Guarda estas notas de la reunión"
- "Organiza mi carpeta de research"

### 🤖 Automatización
- "Cada lunes dame un resumen de la semana"
- "Monitorea [métrica] y avísame si baja de X"

---

## 🌙 El "Overnight Agent" Pattern

La magia de OpenClaw es que trabaja mientras duermes:

> *"Me voy a dormir. Te encargo investigar X, preparar Y, y tener listo Z para mañana."*

Tu AI puede:
- Procesar research que le pediste
- Organizar y documentar
- Revisar emails/notificaciones
- Preparar briefs matutinos
- Ejecutar tareas programadas

### Configurar Heartbeats

El archivo `HEARTBEAT.md` define qué hace tu AI en sus "latidos" periódicos:

```bash
nano ~/.openclaw/workspace/HEARTBEAT.md
```

```markdown
# HEARTBEAT.md

## Cada latido, revisa:
- [ ] Emails urgentes
- [ ] Calendar próximas 24h
- [ ] Métricas del negocio
- [ ] Tareas pendientes de alta prioridad
```

---

## 📈 Siguientes Pasos

### Semana 1: Aprende a Usarlo
- Envíale tareas simples
- Ve cómo responde y ajusta personalidad
- Explora sus capacidades

### Semana 2: Integra Herramientas
- Conecta Notion, Google Calendar
- Configura skills específicas para tu negocio
- Automatiza una tarea repetitiva

### Semana 3: Optimiza
- Ajusta prompts y personalidad
- Crea templates para tareas comunes
- Configura reportes automáticos

### Mes 2+: Escala
- Considera VPS dedicado para 24/7
- Múltiples agentes para diferentes funciones
- Integraciones avanzadas (voz, smart home, etc.)

---

## 🆘 Solución de Problemas

| Problema | Solución |
|----------|----------|
| Bot no responde | `openclaw gateway status` — reinicia si está caído |
| "Access denied" | Verifica que tu Telegram ID esté aprobado |
| AI sin contexto | Revisa que SOUL.md, USER.md existan y tengan contenido |
| Errores de API | Verifica tu API key y saldo en Anthropic |
| Comandos no funcionan | `source ~/.bashrc` y vuelve a intentar |

### Logs y Debug

```bash
# Ver logs en tiempo real
openclaw gateway logs

# Estado del sistema
openclaw status

# Reiniciar todo
openclaw gateway restart
```

---

## 🔗 Recursos

- **Documentación Oficial:** [docs.openclaw.ai](https://docs.openclaw.ai)
- **Comunidad Discord:** [discord.com/invite/clawd](https://discord.com/invite/clawd)
- **Skills Hub:** [clawdhub.com](https://clawdhub.com)
- **GitHub:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 💡 Filosofía

OpenClaw no es un chatbot — es un **empleado digital**.

La diferencia:
- Un chatbot responde preguntas
- Un empleado **toma iniciativa**, **recuerda contexto**, **ejecuta tareas**

Tu AI debe sentirse como un team member real:
- Proactivo, no solo reactivo
- Con opiniones y sugerencias
- Que mejora con el tiempo
- Que conoce tu negocio

> *"Solo tú y yo manejando todo el negocio."* — Ese es el objetivo.

---

**¿Listo para empezar?** Ejecuta `curl -fsSL https://openclaw.ai/install.sh | bash` y en 30 minutos tienes tu Chief of Staff digital. 🚀

---

*Última actualización: 2026-01-31*
*Por: [OpenClaw D2C Project](https://github.com/openclaw/openclaw-d2c)*

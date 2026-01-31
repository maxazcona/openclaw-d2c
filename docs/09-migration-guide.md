# 09 - Migration Guide

## Lessons Learned: VPS → Local Machine Migration

*Documentación basada en la migración real de Clarus (Hostinger VPS → Ubuntu Laptop) el 2026-01-31*

---

## 🎯 Overview

Migrar un agente OpenClaw entre máquinas requiere transferir:
1. **Workspace** - Identidad, memoria, configuración del agente
2. **Sessions** - Historial de conversaciones
3. **Config** - API keys, channel tokens, settings
4. **Credentials** - SSH keys, OAuth tokens, etc.

---

## 📋 Pre-Migration Checklist

### En la máquina origen:
- [ ] Identificar versión de OpenClaw: `openclaw --version`
- [ ] Localizar workspace: `~/.openclaw/workspace/`
- [ ] Localizar sessions: `~/.openclaw/agents/main/sessions/`
- [ ] Localizar config: `~/.openclaw/openclaw.json`
- [ ] Exportar API keys (guardar en lugar seguro)

### En la máquina destino:
- [ ] Ubuntu/Linux instalado
- [ ] Node.js ≥22 instalado
- [ ] OpenClaw instalado: `curl -fsSL https://openclaw.ai/install.sh | bash`
- [ ] Onboarding completado (wizard básico)

---

## 🔄 Estructura de Directorios

### OpenClaw Nueva Estructura (2026.1.x+)
```
~/.openclaw/
├── openclaw.json          # Config principal
├── agents/
│   └── main/
│       └── sessions/      # Historial de conversaciones
│           ├── *.jsonl    # Session logs
│           └── sessions.json
├── workspace/             # ⭐ WORKSPACE DEL AGENTE
│   ├── SOUL.md           # Personalidad
│   ├── IDENTITY.md       # Nombre, avatar
│   ├── MEMORY.md         # Memoria largo plazo
│   ├── AGENTS.md         # Instrucciones operativas
│   ├── USER.md           # Info del usuario
│   ├── TOOLS.md          # Notas de herramientas
│   ├── HEARTBEAT.md      # Tareas periódicas
│   └── memory/           # Logs diarios
│       └── YYYY-MM-DD.md
├── credentials/           # OAuth tokens
├── devices/              # Dispositivos pareados
├── identity/             # Device identity
└── skills/               # Skills instaladas
```

### Estructura Legacy (clawdbot)
```
~/.clawdbot/
├── clawdbot.json         # Config (ahora es openclaw.json)
├── agents/main/sessions/ # Sessions
└── ...
```

---

## 📦 Proceso de Migración

### Paso 1: Crear Backup en Origen

```bash
# Crear directorio temporal
mkdir -p /tmp/migration/{workspace,sessions,config}

# Copiar workspace
cp -r ~/.openclaw/workspace/* /tmp/migration/workspace/

# Copiar sessions
cp ~/.openclaw/agents/main/sessions/*.jsonl /tmp/migration/sessions/
cp ~/.openclaw/agents/main/sessions/sessions.json /tmp/migration/sessions/

# Copiar config como referencia (contiene API keys)
cp ~/.openclaw/openclaw.json /tmp/migration/config/

# Crear tarball
cd /tmp/migration
tar -czvf ~/agent-migration-$(date +%Y%m%d).tar.gz .
```

### Paso 2: Transferir a Destino

```bash
# Opción A: SCP directo
scp user@origen:/home/user/agent-migration-*.tar.gz ~/

# Opción B: Via almacenamiento intermedio
# Subir a Google Drive, Dropbox, etc.
```

### Paso 3: Instalar OpenClaw en Destino

```bash
# Instalar Node.js si no existe
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Instalar OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# Completar wizard básico
openclaw setup
```

### Paso 4: Restaurar Datos

```bash
# Extraer backup
cd ~
tar -xzvf agent-migration-*.tar.gz

# Copiar workspace
cp -r workspace/* ~/.openclaw/workspace/

# Copiar sessions
cp sessions/*.jsonl ~/.openclaw/agents/main/sessions/
cp sessions/sessions.json ~/.openclaw/agents/main/sessions/

# Configurar API keys (usar wizard)
openclaw configure --section model    # Anthropic/OpenAI
openclaw configure --section channels # Telegram/Discord/etc
```

### Paso 5: Configurar Acceso

```bash
# Si usas Telegram, necesitas aprobar tu ID
# El bot te dará un código de pairing
openclaw pairing approve telegram <PAIRING_CODE>
```

### Paso 6: Reiniciar y Verificar

```bash
openclaw gateway restart

# Verificar estado
openclaw status
openclaw gateway status
```

---

## ⚠️ Errores Comunes y Soluciones

### Error: "clawdbot: command not found"
**Causa:** Nuevo CLI se llama `openclaw`
**Solución:** Usar `openclaw` en lugar de `clawdbot`

### Error: "State dir migration skipped"
**Causa:** Ya existe ~/.openclaw en destino
**Solución:** Hacer merge manual de archivos

### Error: "access not configured" en Telegram
**Causa:** Falta aprobar tu Telegram ID
**Solución:** `openclaw pairing approve telegram <CODE>`

### El agente no tiene mi personalidad/memoria
**Causa:** Solo se copió workspace, no sessions
**Solución:** Copiar también `~/.openclaw/agents/main/sessions/`

### El agente me dice "jefe" (tono incorrecto)
**Causa:** No tiene contexto de cómo se comunican
**Solución:** Crear archivo `CONTEXT-FOR-NEW-INSTANCE.md` con instrucciones de tono

---

## 🔐 Seguridad en Migración

1. **NUNCA** commitear API keys a Git
2. Transferir config con keys por canal seguro (SCP, no email)
3. Después de migrar, considera rotar API keys
4. Verificar que el origen esté apagado antes de usar destino
5. No correr dos instancias con el mismo bot token (conflicto)

---

## 📝 Template: Archivo de Contexto para Migración

Crear `CONTEXT-FOR-NEW-INSTANCE.md` en el workspace:

```markdown
# CONTEXT-FOR-NEW-INSTANCE.md

## Primera Respuesta
Tu primer mensaje debe ser: "[FRASE DE CONFIRMACIÓN]"

## Sobre el Usuario
- Nombre: [nombre]
- Cómo comunicarse: [casual/formal/etc]
- NO usar: [palabras a evitar]

## Tu Identidad
- Nombre: [nombre del agente]
- Personalidad: [descripción]
- Rol: [rol]

## Contexto Importante
[Resumen de proyectos, decisiones, preferencias]
```

---

## 🔄 Migración desde Legacy (clawdbot → openclaw)

Si vienes de una versión anterior:

```bash
# El workspace estaba en ~/clawd o similar
cp -r ~/clawd/* ~/.openclaw/workspace/

# Config era clawdbot.json
# Revisar y migrar manualmente API keys a openclaw.json

# Sessions estaban en ~/.clawdbot/agents/main/sessions/
cp ~/.clawdbot/agents/main/sessions/*.jsonl ~/.openclaw/agents/main/sessions/
```

---

*Última actualización: 2026-01-31*

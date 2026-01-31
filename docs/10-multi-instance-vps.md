# 10 - Multi-Instance VPS Setup

## Usar un VPS para Deployar Múltiples Agentes

*Guía para configurar Hostinger VPS (o similar) como servidor de agentes OpenClaw*

---

## 🎯 Caso de Uso

Tienes un VPS con recursos disponibles (ej: Hostinger KVM 2 con 2 CPU, 8GB RAM) y quieres:
- Deployar agentes especializados (ventas, soporte, research)
- Tener agentes 24/7 sin depender de tu laptop
- Separar agentes por función o cliente

---

## 📊 Recursos Típicos por Agente

| Componente | Uso Mínimo | Recomendado |
|------------|------------|-------------|
| RAM | 200MB | 512MB |
| CPU | 0.1 core idle | 0.5 core active |
| Disco | 500MB | 2GB (con sessions) |

**Ejemplo: VPS con 8GB RAM puede correr ~8-12 agentes**

---

## 🏗️ Arquitectura Multi-Agente

```
┌─────────────────────────────────────────────────┐
│                 VPS (Hostinger)                 │
├─────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Agente 1   │  │   Agente 2   │            │
│  │  (Soporte)   │  │   (Ventas)   │            │
│  │  Port 18789  │  │  Port 18790  │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Agente 3   │  │   Agente 4   │            │
│  │  (Research)  │  │  (Personal)  │            │
│  │  Port 18791  │  │  Port 18792  │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  ┌─────────────────────────────────┐           │
│  │      Nginx Reverse Proxy        │           │
│  │         (opcional)              │           │
│  └─────────────────────────────────┘           │
└─────────────────────────────────────────────────┘
         │
         ▼
    ┌─────────┐
    │ Telegram│  (cada agente = 1 bot)
    │ Discord │
    │  Slack  │
    └─────────┘
```

---

## 🚀 Setup Inicial del VPS

### 1. Preparar el Sistema

```bash
# Actualizar
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y curl wget git nginx

# Instalar Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Instalar OpenClaw globalmente
npm install -g openclaw
```

### 2. Crear Usuario por Agente (Recomendado)

```bash
# Crear usuarios separados para aislamiento
sudo useradd -m -s /bin/bash agent-soporte
sudo useradd -m -s /bin/bash agent-ventas
sudo useradd -m -s /bin/bash agent-research
```

### 3. Configurar Cada Agente

```bash
# Cambiar a usuario del agente
sudo su - agent-soporte

# Setup OpenClaw
openclaw setup

# Configurar con puerto único
nano ~/.openclaw/openclaw.json
# Cambiar: "port": 18789 → puerto único por agente

# Configurar canal (cada agente necesita su propio bot)
openclaw configure --section channels
```

---

## 📝 Configuración por Agente

### Ejemplo: openclaw.json para Agente de Soporte

```json
{
  "agents": {
    "defaults": {
      "workspace": "/home/agent-soporte/.openclaw/workspace"
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "127.0.0.1"
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "BOT_TOKEN_SOPORTE",
      "dmPolicy": "pairing"
    }
  }
}
```

---

## 🔧 Systemd Services

### Crear servicio por agente

```bash
# /etc/systemd/system/openclaw-soporte.service
[Unit]
Description=OpenClaw Agent - Soporte
After=network.target

[Service]
Type=simple
User=agent-soporte
WorkingDirectory=/home/agent-soporte/.openclaw
ExecStart=/home/agent-soporte/.nvm/versions/node/v22.x.x/bin/openclaw gateway start --foreground
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Habilitar servicios

```bash
sudo systemctl daemon-reload
sudo systemctl enable openclaw-soporte
sudo systemctl start openclaw-soporte

# Ver status
sudo systemctl status openclaw-soporte
```

---

## 🌐 Nginx Reverse Proxy (Opcional)

Si quieres exponer dashboards:

```nginx
# /etc/nginx/sites-available/openclaw
server {
    listen 80;
    server_name agents.tudominio.com;

    location /soporte/ {
        proxy_pass http://127.0.0.1:18789/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /ventas/ {
        proxy_pass http://127.0.0.1:18790/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 📊 Monitoreo

### Script de Health Check

```bash
#!/bin/bash
# /usr/local/bin/check-agents.sh

AGENTS=("soporte:18789" "ventas:18790" "research:18791")

for agent in "${AGENTS[@]}"; do
    name="${agent%%:*}"
    port="${agent##*:}"
    
    if curl -s "http://127.0.0.1:$port/health" > /dev/null; then
        echo "✅ $name (port $port) - OK"
    else
        echo "❌ $name (port $port) - DOWN"
        systemctl restart "openclaw-$name"
    fi
done
```

### Cron para monitoreo

```bash
# Cada 5 minutos
*/5 * * * * /usr/local/bin/check-agents.sh >> /var/log/openclaw-health.log 2>&1
```

---

## 🔐 Seguridad

1. **Firewall:** Solo exponer puertos necesarios
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP (si usas nginx)
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **Usuarios separados:** Cada agente en su usuario

3. **API Keys:** Almacenar en archivos con permisos 600

4. **Backups automáticos:**
   ```bash
   # Backup diario de workspaces
   0 2 * * * tar -czf /backups/agents-$(date +\%Y\%m\%d).tar.gz /home/agent-*/
   ```

---

## 💡 Ideas de Agentes Especializados

| Agente | Función | Canal |
|--------|---------|-------|
| Soporte | Responder FAQs, tickets | Telegram Bot público |
| Ventas | Seguimiento leads, cotizaciones | WhatsApp Business |
| Research | Buscar info, summarize | Slack privado |
| Personal | Tu asistente 24/7 | Telegram privado |
| Cron | Tareas programadas | Sin canal (headless) |

---

## 🚀 Quick Start: Un Agente Nuevo

```bash
# 1. Crear usuario
sudo useradd -m -s /bin/bash agent-nuevo

# 2. Setup como ese usuario
sudo su - agent-nuevo
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw setup

# 3. Cambiar puerto en config
nano ~/.openclaw/openclaw.json
# port: 18793

# 4. Crear bot en Telegram (@BotFather)
# 5. Configurar token
openclaw configure --section channels

# 6. Crear servicio systemd
exit
sudo nano /etc/systemd/system/openclaw-nuevo.service
sudo systemctl enable --now openclaw-nuevo

# 7. Verificar
sudo systemctl status openclaw-nuevo
```

---

*Última actualización: 2026-01-31*

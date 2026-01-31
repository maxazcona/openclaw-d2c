# 🔒 Tailscale - VPN Seguro para OpenClaw

## ¿Qué es Tailscale?

VPN mesh que crea una red privada entre tus dispositivos (tailnet). Zero-config, sin abrir puertos.

## Por qué usar Tailscale

- **Sin exponer puertos** — No necesitas abrir SSH al mundo
- **Cifrado end-to-end** — WireGuard bajo el hood
- **Zero-config** — Funciona detrás de NAT, firewalls
- **Multi-plataforma** — Linux, macOS, Windows, iOS, Android
- **SSO integrado** — Google, GitHub, Microsoft auth

## Instalación en Ubuntu

```bash
# 1. Agregar repositorio
curl -fsSL https://tailscale.com/install.sh | sh

# 2. Conectar a la red
sudo tailscale up

# 3. Verificar IP
tailscale ip -4
```

## Configuración para OpenClaw

### En la máquina principal (Chief of Staff)

```bash
# Habilitar como exit node (opcional - para enrutar tráfico)
sudo tailscale up --advertise-exit-node

# Habilitar subnet routing (para acceder a red local)
sudo tailscale up --advertise-routes=192.168.1.0/24
```

### En las máquinas de team bots

```bash
# Solo conectar a la tailnet
sudo tailscale up

# Usar la máquina principal como exit node (opcional)
sudo tailscale up --exit-node=<IP_PRINCIPAL>
```

## Firewall con UFW

```bash
# Permitir solo tráfico de Tailscale para SSH
sudo ufw allow in on tailscale0 to any port 22

# Denegar SSH desde otras interfaces
sudo ufw deny 22

# Resultado: Solo puedes hacer SSH via Tailscale
```

## Configuración recomendada de Clawdbot

En `~/.clawdbot/clawdbot.json`:

```json
{
  "gateway": {
    "bind": "loopback",
    "_comment": "Solo conexiones locales, acceso remoto via Tailscale SSH"
  }
}
```

## Acceso remoto seguro

```bash
# Desde cualquier lugar, via Tailscale:
ssh user@<tailscale-ip-del-bot>

# O usando el nombre mágico de Tailscale:
ssh user@bot-nombre.tailnet-name.ts.net
```

## Beneficios para OpenClaw

1. **Todas las máquinas conectadas** — Chief of Staff puede acceder a todos los bots
2. **Sin puertos expuestos** — Más seguro que abrir SSH al internet
3. **Gestión centralizada** — Admin console de Tailscale
4. **ACLs** — Controlar quién accede a qué
5. **Logs** — Auditoría de conexiones

## Setup completo

```bash
# En cada máquina:
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# Verificar conexión
tailscale status

# Ver todas las máquinas en tu red
tailscale status | grep -v "^#"
```

## Recursos

- Docs oficiales: https://tailscale.com/kb/
- Ubuntu guide: https://tailscale.com/kb/1187/install-ubuntu

---
*Investigado: 2026-01-31*

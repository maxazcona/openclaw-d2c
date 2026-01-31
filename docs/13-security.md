# 🔒 Security Guide

## Overview

Este guide cubre la seguridad del Command Center y el sistema OpenClaw en general.

---

## 🎯 Authentication Options for Dashboard

### Option 1: Gateway Token (Recommended for MVP)

El gateway de OpenClaw ya tiene un sistema de tokens. Podemos reutilizarlo:

```javascript
// dashboard/src/auth.js
const AUTH_CONFIG = {
    gatewayUrl: 'http://localhost:18789',
    tokenKey: 'openclaw_token'
};

// Check if user has valid token
async function checkAuth() {
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    if (!token) return false;
    
    try {
        const response = await fetch(`${AUTH_CONFIG.gatewayUrl}/status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.ok;
    } catch {
        return false;
    }
}
```

**Pros:** Simple, ya existe, no requiere setup externo
**Cons:** Solo funciona localmente, no para acceso remoto

---

### Option 2: Simple Password (Quick Setup)

Para acceso básico sin infraestructura:

```javascript
// Password hash stored in localStorage after first setup
const DASHBOARD_CONFIG = {
    passwordHash: null, // SHA-256 of password
    salt: crypto.randomUUID()
};

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0')).join('');
}

// First-time setup flow
function setupPassword(password) {
    const hash = await hashPassword(password, DASHBOARD_CONFIG.salt);
    localStorage.setItem('dashboard_auth', JSON.stringify({
        hash,
        salt: DASHBOARD_CONFIG.salt
    }));
}
```

**Pros:** Funciona offline, simple
**Cons:** No tan seguro para producción

---

### Option 3: Google OAuth (Recommended for Remote Access)

Para acceso seguro desde cualquier lugar:

```javascript
// Using Google Identity Services
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

// Add to index.html
<script src="https://accounts.google.com/gsi/client" async></script>

// Initialize
google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    allowed_domains: ['yourdomain.com'] // Optional: restrict to your domain
});

function handleCredentialResponse(response) {
    const token = response.credential;
    // Verify token server-side or check email
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (payload.email === 'your-email@gmail.com') {
        localStorage.setItem('auth_token', token);
        showDashboard();
    }
}
```

**Pros:** Muy seguro, 2FA incluido, no passwords que recordar
**Cons:** Requiere Google Cloud Console setup, necesita internet

#### Google OAuth Setup Steps:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea proyecto nuevo o usa existente
3. APIs & Services → Credentials
4. Create Credentials → OAuth client ID
5. Application type: Web application
6. Authorized origins: `http://localhost:8080`, `https://yourdomain.com`
7. Copia el Client ID

---

### Option 4: Cloudflare Tunnel + Access (Production)

Para deployment real con seguridad enterprise:

```bash
# Install cloudflared
brew install cloudflared  # or apt install

# Authenticate
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create openclaw-dashboard

# Configure (config.yml)
tunnel: <TUNNEL_ID>
credentials-file: /path/to/credentials.json
ingress:
  - hostname: dashboard.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404

# Run
cloudflared tunnel run openclaw-dashboard
```

En Cloudflare Zero Trust:
1. Access → Applications → Add application
2. Self-hosted, URL: `dashboard.yourdomain.com`
3. Policies: Allow emails ending in `@yourdomain.com` or specific emails
4. Opcional: Require TOTP, hardware key, etc.

**Pros:** Enterprise security, SSO, audit logs, DDoS protection
**Cons:** Setup más complejo, Cloudflare account needed

---

## 🛡️ Recommended Security Flow

### For Development (Local Only):
```
Option 1: Gateway Token
└── Simple, works immediately
```

### For Personal Use (Remote Access):
```
Option 2 + HTTPS (Tailscale)
└── Password + encrypted tunnel
    
OR

Option 3: Google OAuth
└── Quick setup, very secure
```

### For Production/Team:
```
Option 4: Cloudflare Tunnel + Access
└── Full enterprise security
```

---

## 🔐 Additional Security Measures

### 1. Environment Variables
Never commit secrets to git:

```bash
# .env (gitignored)
GATEWAY_TOKEN=your-secret-token
GOOGLE_CLIENT_ID=your-client-id
```

### 2. CORS Configuration
If exposing API externally:

```javascript
// In gateway config
{
  "cors": {
    "origin": ["https://yourdomain.com"],
    "credentials": true
  }
}
```

### 3. Rate Limiting
Protect against brute force:

```javascript
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 min

function checkRateLimit(ip) {
    const attempts = loginAttempts.get(ip) || { count: 0, time: Date.now() };
    if (attempts.count >= MAX_ATTEMPTS) {
        if (Date.now() - attempts.time < LOCKOUT_TIME) {
            return false; // Locked out
        }
        attempts.count = 0;
    }
    return true;
}
```

### 4. Session Timeout
Auto-logout after inactivity:

```javascript
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min
let lastActivity = Date.now();

document.addEventListener('click', () => lastActivity = Date.now());
document.addEventListener('keypress', () => lastActivity = Date.now());

setInterval(() => {
    if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
    }
}, 60000);
```

---

## 📋 Security Checklist

### Before Going Public:
- [ ] Remove all personal info from repo
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Implement authentication
- [ ] Add rate limiting
- [ ] Configure CORS properly
- [ ] Add session timeout
- [ ] Review `.gitignore`
- [ ] Audit all API endpoints

### For Production:
- [ ] Use Cloudflare Tunnel or similar
- [ ] Enable 2FA for all accounts
- [ ] Set up audit logging
- [ ] Regular security updates
- [ ] Backup authentication data
- [ ] Document incident response

---

## 🚨 If You Suspect a Breach

1. **Immediately:** Revoke all tokens/sessions
2. **Rotate:** All API keys and passwords
3. **Audit:** Check logs for unauthorized access
4. **Notify:** Affected users if applicable
5. **Document:** What happened and how it was fixed

---

*Document maintained by the OpenClaw D2C team*

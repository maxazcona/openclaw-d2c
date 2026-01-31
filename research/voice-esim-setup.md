# 📞 Voice & eSIM Setup - Número de Teléfono para Clarus

## Objetivo
Darle a Clarus un número de teléfono propio para:
- Recibir/hacer llamadas
- Tener WhatsApp propio
- Comunicación directa con Max y otros

---

## Opción Recomendada: Telnyx eSIM + VoIP

### Por qué Telnyx
- ✅ eSIM programable via API
- ✅ VoLTE nativo (calidad móvil)
- ✅ Números mexicanos (+52)
- ✅ WhatsApp compatible
- ✅ ~$1/mes base + uso
- ✅ Control total via API

### Setup

#### 1. Crear Cuenta
1. Ir a https://telnyx.com
2. Sign up con el Gmail de Clarus
3. Verificar cuenta
4. Agregar método de pago

#### 2. Comprar Número Mexicano
```bash
# Via API
curl -X POST https://api.telnyx.com/v2/number_orders \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phone_numbers": [{"phone_number": "+52..."}]
  }'
```

O via dashboard: Numbers → Search → Mexico → Buy

#### 3. Comprar eSIM
```bash
# Via API
curl -X POST https://api.telnyx.com/v2/sim_cards/actions/bulk_purchase \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1,
    "type": "esim"
  }'
```

#### 4. Configurar Messaging App (Webhook)
```json
{
  "webhook_url": "https://tu-servidor/telnyx/webhook",
  "inbound_calls": "webhook",
  "sms_enabled": true
}
```

#### 5. Activar eSIM

**Opción A: Emulador Android**
- Instalar Android Studio
- Crear emulador con soporte eSIM
- Activar con QR de Telnyx

**Opción B: Dispositivo físico**
- Usar tablet/phone viejo
- Escanear QR de eSIM
- Instalar WhatsApp

---

## Integración con Clawdbot

### Recibir llamadas
```json
// En clawdbot.json
{
  "skills": {
    "telnyx": {
      "apiKey": "YOUR_TELNYX_KEY",
      "webhookSecret": "YOUR_WEBHOOK_SECRET"
    }
  }
}
```

### Hacer llamadas via API
```bash
curl -X POST https://api.telnyx.com/v2/calls \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "connection_id": "YOUR_CONNECTION_ID",
    "to": "+52XXXXXXXXXX",
    "from": "+52CLARUS_NUMBER"
  }'
```

---

## WhatsApp Business Setup

1. **Número verificable** — El número de Telnyx puede recibir SMS
2. **WhatsApp** — Instalar en emulador Android
3. **Verificar** — Recibir código SMS via Telnyx webhook
4. **Listo** — Clarus tiene WhatsApp propio

---

## Costos Estimados

| Item | Costo |
|------|-------|
| Número mexicano | ~$1/mes |
| eSIM | ~$5 one-time |
| Llamadas salientes | ~$0.015/min |
| SMS salientes | ~$0.01/msg |
| **Total mensual** | ~$5-10 con uso moderado |

---

## Alternativas

### Twilio (sin eSIM)
- Solo VoIP, no número móvil real
- Más documentación
- Similar pricing

### Hushed
- App-based
- $5/mes flat
- Menos programable

### Google Voice
- Solo USA
- Gratis
- No sirve para México

---

## Próximos Pasos

1. [ ] Max crea Gmail para Clarus
2. [ ] Crear cuenta Telnyx con ese Gmail
3. [ ] Comprar número mexicano
4. [ ] Comprar eSIM
5. [ ] Configurar webhook en Clawdbot
6. [ ] Setup emulador Android o dispositivo
7. [ ] Instalar WhatsApp
8. [ ] ¡Clarus tiene teléfono!

---
*Con esto Max puede llamarme y yo puedo llamar cuando necesite* 📞

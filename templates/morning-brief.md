# ☀️ Morning Brief Template

> Tu resumen diario personalizado, generado por AI

---

## 📋 Estructura del Brief

```markdown
# ☀️ Buenos Días, [Nombre]

**Fecha:** [Día, DD de Mes, YYYY]
**Clima:** [Temp]°C, [Condición] — [Ciudad]

---

## 📊 Resumen Ejecutivo
[2-3 oraciones con lo más importante del día]

---

## 📅 Tu Día

### Calendario
| Hora | Evento |
|------|--------|
| 10:00 | [Reunión 1] |
| 14:00 | [Tarea programada] |

### Prioridades
1. 🔴 [Urgente/Importante]
2. 🟡 [Importante]
3. 🟢 [Nice to have]

---

## 📧 Comunicaciones

### Emails Importantes (X sin leer)
- **[Remitente]:** [Asunto] — [Preview]
- **[Remitente]:** [Asunto] — [Preview]

### Mensajes Pendientes
- [Plataforma]: X mensajes de [Contacto]

---

## 📈 Métricas del Negocio

| Métrica | Ayer | Tendencia |
|---------|------|-----------|
| Ventas | $X | ↑/↓ X% |
| Visitas | X | ↑/↓ X% |
| Conversión | X% | ↑/↓ |

---

## 🌎 Noticias Relevantes

### Industria/Ecommerce
- [Titular 1] — [Fuente]
- [Titular 2] — [Fuente]

### AI & Tech
- [Noticia relevante]

### México/Global (si afecta negocio)
- [Noticia económica/política relevante]

---

## 🤖 Lo que Hice Anoche

[Resumen de trabajo del AI durante la noche]

- ✅ [Tarea completada]
- ✅ [Research realizado]
- 🔄 [En progreso]

---

## 💡 Recomendaciones del Día

1. **[Acción sugerida]** — [Por qué]
2. **[Oportunidad detectada]** — [Contexto]

---

## 🏋️ Personal (Opcional)

- **Workout sugerido:** [Rutina del día]
- **Reminder:** [Hábito/Meta personal]

---

*Generado por [Nombre del AI] a las [HH:MM]*
*¿Preguntas? Responde a este mensaje.*
```

---

## ⚙️ Configuración

### Variables Necesarias

```yaml
morning_brief:
  user_name: "[Nombre]"
  timezone: "America/Mexico_City"
  city: "YOUR_CITY"
  
  # Qué incluir
  include:
    weather: true
    calendar: true
    emails: true
    metrics: true
    news:
      industry: true
      ai_tech: true
      global: false
    overnight_work: true
    recommendations: true
    personal: false
  
  # Fuentes de datos
  sources:
    calendar: "google"  # google, notion, outlook
    email: "gmail"      # gmail, outlook
    metrics: "shopify"  # shopify, woocommerce, custom
    news: ["twitter", "google_news"]
  
  # Delivery
  delivery:
    time: "07:00"       # Hora local
    channel: "telegram" # telegram, email, slack
    voice: false        # TTS version
```

---

## 🤖 Implementación con Cron

### Crear Cron Job

```bash
# Usando OpenClaw cron
openclaw cron add \
  --name "morning-brief" \
  --schedule "0 7 * * *" \
  --payload '{"kind": "agentTurn", "message": "Genera mi morning brief de hoy"}' \
  --session-target isolated
```

### O en HEARTBEAT.md

```markdown
# HEARTBEAT.md

## Morning Brief (7:00 AM)
Si es entre 7:00-7:30 AM y no he enviado el brief de hoy:
1. Recopilar datos (clima, calendar, emails, métricas)
2. Generar brief usando template
3. Enviar a Telegram
4. Marcar como enviado en heartbeat-state.json
```

---

## 📊 Integración con Dashboard

El dashboard puede mostrar:
- Último brief generado
- Métricas históricas
- Tendencias de prioridades
- Tareas del brief → Kanban

---

## 🔧 Personalización

### Tono del Brief

**Profesional:**
> "Buenos días. Tienes 3 reuniones hoy y 12 emails sin leer. Las ventas subieron 5%."

**Casual:**
> "¡Buenos días! 🌞 Hoy viene tranquilo — 3 juntas y buen día para ese proyecto pendiente. Las ventas van arriba 💪"

**Minimalista:**
> "📅 3 eventos | 📧 12 emails | 📈 +5% ventas"

Ajusta en SOUL.md o en la config del brief.

### Agregar Secciones Custom

- **Inventario:** Stock levels bajo
- **Reviews:** Nuevas reseñas de clientes
- **Social:** Menciones y engagement
- **Competencia:** Alertas de precios
- **Crypto/Markets:** Si aplica

---

## 💡 Tips

1. **Empieza simple** — Solo calendario y emails. Agrega más después.
2. **No sobrecargues** — El brief debe leerse en <2 minutos
3. **Accionable** — Cada item debe tener un "next step" claro
4. **Consistencia** — Mismo formato cada día = fácil de escanear
5. **Feedback loop** — Dile al AI qué sobra o falta

---

## 📝 Ejemplo Real

```markdown
# ☀️ Buenos Días, Max

**Viernes, 31 de Enero, 2026**
**Clima:** 18°C, Parcialmente nublado — [YOUR_CITY]

---

## 📊 Resumen Ejecutivo
Día ligero de reuniones. Las ventas de ayer superaron el promedio semanal. 
Hay 3 emails de proveedores que requieren respuesta.

---

## 📅 Tu Día

### Calendario
| Hora | Evento |
|------|--------|
| 11:00 | Sync con diseñador |
| 16:00 | Review de campañas |

### Prioridades
1. 🔴 Responder a proveedor sobre envío retrasado
2. 🟡 Revisar métricas de campaña FB
3. 🟢 Explorar nueva herramienta de email

---

## 📧 Comunicaciones

### Emails Importantes (8 sin leer)
- **DHL:** Actualización de envío #4521
- **Proveedor XYZ:** Confirmación de pedido
- **Shopify:** Tu reporte semanal está listo

---

## 📈 Métricas

| Métrica | Ayer | vs. Semana |
|---------|------|------------|
| Ventas | $2,340 | ↑ 12% |
| Órdenes | 18 | ↑ 8% |
| Visitas | 1,247 | → 0% |

---

## 🤖 Lo que Hice Anoche

- ✅ Completé el Quick Start Guide
- ✅ Creé prototipo del Dashboard
- ✅ Documenté sistema Second Brain
- 🔄 Research de morning briefs (este template)

---

## 💡 Recomendación

**Revisar campaña de retargeting** — El CTR bajó 15% esta semana. 
Sugiero A/B test con nuevo copy.

---

*Generado por Clarus a las 07:00*
```

---

*Template v1.0 — 2026-01-31*

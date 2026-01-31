# 📊 Weekly Review Template

> Reflexión semanal para mantener el rumbo y mejorar continuamente.

---

## 📋 Estructura

```markdown
# 📊 Weekly Review — Semana [##]

**Período:** [Lunes] — [Domingo], [Mes YYYY]
**Generado:** [Fecha y hora]

---

## 🎯 Resumen de la Semana

### Lo que salió bien ✅
- [Logro 1]
- [Logro 2]
- [Logro 3]

### Lo que no salió como esperaba ⚠️
- [Desafío 1] — [Aprendizaje]
- [Desafío 2] — [Aprendizaje]

### Sorpresas/Descubrimientos 💡
- [Insight 1]
- [Insight 2]

---

## 📈 Métricas de la Semana

### Negocio
| Métrica | Esta Semana | Semana Pasada | Cambio |
|---------|-------------|---------------|--------|
| Ventas | $X | $X | ↑/↓ X% |
| Órdenes | X | X | ↑/↓ X% |
| AOV | $X | $X | ↑/↓ X% |
| Nuevos clientes | X | X | ↑/↓ X% |

### Productividad
| Métrica | Valor |
|---------|-------|
| Tareas completadas | X de Y |
| Horas productivas | ~X hrs |
| Meetings | X |

### AI/Agente
| Métrica | Valor |
|---------|-------|
| Mensajes intercambiados | X |
| Tareas delegadas | X |
| Costo API | $X |
| Valor generado (estimado) | $X |

---

## ✅ Tareas Completadas

- [x] [Tarea 1]
- [x] [Tarea 2]
- [x] [Tarea 3]

## 🔄 Tareas En Progreso

- [ ] [Tarea 1] — [% completado]
- [ ] [Tarea 2] — [% completado]

## ❌ Tareas No Completadas

- [ ] [Tarea 1] — [Razón / Nueva fecha]
- [ ] [Tarea 2] — [Razón / Nueva fecha]

---

## 📅 Próxima Semana

### Prioridades Top 3
1. 🔴 [Prioridad crítica]
2. 🟡 [Prioridad importante]
3. 🟢 [Nice to have]

### Eventos Clave
- [Día]: [Evento]
- [Día]: [Evento]

### Metas Específicas
- [ ] [Meta medible 1]
- [ ] [Meta medible 2]

---

## 💭 Reflexión Personal

### ¿Qué aprendí esta semana?
[Respuesta]

### ¿Qué haría diferente?
[Respuesta]

### ¿Cómo me siento respecto al negocio?
[1-10 y por qué]

---

## 🤖 Recomendaciones del AI

Basado en los datos de esta semana:

1. **[Recomendación 1]**
   - Razón: [Por qué]
   - Acción sugerida: [Qué hacer]

2. **[Recomendación 2]**
   - Razón: [Por qué]
   - Acción sugerida: [Qué hacer]

---

*Review generado por [AI Name]*
*¿Feedback? Dime qué agregar o quitar.*
```

---

## ⚙️ Configuración del Review

### Cuándo Generarlo

Opciones:
- **Domingo noche** — Prepara la semana
- **Lunes temprano** — Empieza con contexto
- **Viernes tarde** — Cierra la semana laboral

### Cron Job

```bash
# Domingo 8pm
openclaw cron add \
  --name "weekly-review" \
  --schedule "0 20 * * 0" \
  --payload '{"kind": "agentTurn", "message": "Genera mi weekly review de esta semana"}' \
  --session-target isolated
```

---

## 📊 Fuentes de Datos

Para generar el review automáticamente, el AI necesita:

1. **Tareas:** tasks.json, Notion, o sistema de tracking
2. **Métricas:** Shopify API, Analytics, etc.
3. **Calendario:** Google Calendar, Notion
4. **Historial:** Conversaciones de la semana
5. **Memory:** Notas diarias en memory/

---

## 💡 Tips

1. **Sé honesto** — El review es para ti, no para impresionar
2. **Busca patrones** — ¿Qué se repite semana tras semana?
3. **Celebra wins** — No todo es optimización
4. **Ajusta el formato** — Agrega/quita secciones según necesites
5. **Revísalo** — No solo lo generes, léelo y actúa

---

*Template v1.0 — 2026-01-31*

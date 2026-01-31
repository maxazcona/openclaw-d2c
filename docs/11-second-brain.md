# 🧠 Second Brain — Knowledge Management

> "Tu mente es para tener ideas, no para guardarlas." — David Allen

Este documento describe cómo configurar un sistema de "Second Brain" integrado con OpenClaw para capturar, organizar y recuperar conocimiento.

---

## 📋 Filosofía

El Second Brain de Tiago Forte se basa en:

1. **Capture** — Guardar ideas, notas, links, todo lo interesante
2. **Organize** — Estructurar por proyectos y áreas (no por temas)
3. **Distill** — Resumir y extraer lo esencial
4. **Express** — Usar el conocimiento para crear output

Con AI, podemos automatizar y potenciar cada fase.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      SECOND BRAIN                            │
├─────────────────┬─────────────────┬─────────────────────────┤
│   📥 CAPTURE    │   📁 ORGANIZE   │      🔍 RETRIEVE        │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Voice memos   │ • Notion DB     │ • Semantic search       │
│ • Web clips     │ • Local files   │ • AI summarization      │
│ • Screenshots   │ • PARA method   │ • Context injection     │
│ • Bookmarks     │ • Tags/links    │ • Memory recall         │
│ • Conversations │ • Daily notes   │ • Knowledge graphs      │
└─────────────────┴─────────────────┴─────────────────────────┘
```

---

## 📂 Estructura PARA

**P**rojects — **A**reas — **R**esources — **A**rchive

### Projects (Proyectos Activos)
- Tienen fecha de fin
- Resultado específico
- Ejemplos: "Lanzar campaña Q1", "Setup OpenClaw", "Rediseñar web"

### Areas (Áreas de Responsabilidad)
- Sin fecha de fin
- Mantenimiento continuo
- Ejemplos: "Finanzas", "Marketing", "Producto", "Salud"

### Resources (Recursos)
- Temas de interés
- Material de referencia
- Ejemplos: "AI/ML", "Copywriting", "Ecommerce trends"

### Archive (Archivo)
- Proyectos completados
- Recursos obsoletos
- "Por si acaso"

---

## 🔧 Setup con OpenClaw

### Estructura Local

```bash
# En tu workspace
mkdir -p ~/.openclaw/workspace/brain/{projects,areas,resources,archive}
```

```
~/.openclaw/workspace/brain/
├── projects/
│   ├── 2026-01-product-relaunch/
│   ├── 2026-01-openclaw-setup/
│   └── ...
├── areas/
│   ├── business/
│   ├── finances/
│   ├── marketing/
│   └── personal/
├── resources/
│   ├── ai-tools/
│   ├── ecommerce/
│   ├── competitors/
│   └── templates/
└── archive/
    └── 2025/
```

### Integración con Notion

1. **Crear Integration en Notion**
   - Ve a [notion.so/my-integrations](https://notion.so/my-integrations)
   - Crea nueva integración
   - Copia el API key

2. **Configurar en OpenClaw**
   ```bash
   echo "NOTION_API_KEY=secret_..." >> ~/.openclaw/.env
   openclaw gateway restart
   ```

3. **Instalar Skill de Notion**
   ```bash
   npx clawdhub install notion
   ```

### Bases de Datos Recomendadas en Notion

#### 📚 Knowledge Base
| Propiedad | Tipo | Uso |
|-----------|------|-----|
| Title | Title | Nombre del item |
| Type | Select | Article, Video, Tool, Note |
| Source | URL | Link original |
| Area | Select | PARA area |
| Tags | Multi-select | Categorías |
| Summary | Text | Resumen AI |
| Created | Date | Cuándo se capturó |
| Status | Select | To Review, Active, Archived |

#### ✅ Task Inbox
| Propiedad | Tipo | Uso |
|-----------|------|-----|
| Task | Title | Qué hacer |
| Priority | Select | High, Medium, Low |
| Project | Relation | Proyecto asociado |
| Due | Date | Fecha límite |
| Assigned | Select | Me, AI, Team |
| Status | Status | Not started, In progress, Done |

#### 💡 Ideas Capture
| Propiedad | Tipo | Uso |
|-----------|------|-----|
| Idea | Title | La idea |
| Context | Text | Dónde/cuándo surgió |
| Potential | Select | High, Medium, Low |
| Related | Relation | Proyectos/áreas relacionadas |

---

## 🤖 Comandos del AI

Una vez configurado, puedes decirle a tu AI:

### Capture
- "Guarda este link: [URL]"
- "Anota esta idea: [idea]"
- "Captura esto en mi Second Brain: [contenido]"

### Retrieve
- "¿Qué guardé sobre [tema]?"
- "Busca en mis notas sobre [keyword]"
- "¿Qué recursos tengo para [proyecto]?"

### Organize
- "Mueve [item] a archivo"
- "Etiqueta [item] como [tag]"
- "Resume las notas de esta semana"

### Express
- "Dame ideas basadas en mis notas sobre [tema]"
- "Crea un outline usando mis recursos de [área]"
- "¿Qué tendencias veo en mis capturas recientes?"

---

## 📥 Flujos de Captura

### Quick Capture (Telegram)

Envía al bot:
- Links → Se guardan con título y preview
- Texto → Se clasifica automáticamente
- Voz → Se transcribe y procesa
- Imágenes → Se guardan con descripción

### Web Clipper

Usa la extensión de Notion o pide al AI:
> "Guarda este artículo: [URL]"

El AI:
1. Extrae el contenido
2. Genera resumen
3. Sugiere tags
4. Guarda en Knowledge Base

### Conversational Capture

Durante conversaciones:
> "Eso es interesante, guárdalo"
> "Anota eso como idea para después"

El AI captura el contexto relevante.

---

## 🔄 Rutinas de Mantenimiento

### Diario (5 min)
- Revisar Inbox
- Clasificar nuevas capturas
- El AI puede hacer esto automáticamente

### Semanal (15 min)
- Revisar proyectos activos
- Mover completados a Archive
- El AI sugiere re-organizaciones

### Mensual (30 min)
- Review de áreas
- Actualizar recursos
- El AI genera reporte de insights

---

## 💡 Tips Pro

### 1. Capture Everything, Curate Later
No te preocupes por organizar al capturar. El AI puede clasificar después.

### 2. Usa Progressive Summarization
- **Layer 1:** Contenido original
- **Layer 2:** Highlights (bold)
- **Layer 3:** Super highlights (highlight + bold)
- **Layer 4:** Executive summary

El AI puede generar estas capas automáticamente.

### 3. Link Everything
Conecta notas relacionadas. El AI puede sugerir conexiones.

### 4. Review Regularly
La captura sin review es acumulación. Agenda tiempo para procesar.

### 5. Make It Useful
El valor no está en guardar, está en **usar**. Pide al AI que aplique tu conocimiento.

---

## 🛠️ Herramientas Complementarias

| Herramienta | Uso | Integración |
|-------------|-----|-------------|
| **Notion** | Base de datos principal | Skill de OpenClaw |
| **Readwise** | Highlights de books/articles | API sync |
| **Pocket** | Save for later | Export a Notion |
| **Obsidian** | Local markdown vault | Direct file access |
| **Raindrop** | Bookmarks | API |

---

## 📊 Métricas de Uso

El AI puede trackear:
- Items capturados/semana
- % de inbox procesado
- Items más consultados
- Áreas más activas
- Conexiones descubiertas

---

## 🎯 Resultado Final

Con este setup, tienes:

1. **Captura sin fricción** — Voice, text, web clips
2. **Organización automática** — AI clasifica y sugiere
3. **Retrieval inteligente** — Búsqueda semántica
4. **Insights generados** — El AI conecta puntos
5. **Knowledge aplicado** — Output > Input

Tu Second Brain crece contigo, y el AI lo mantiene organizado.

---

*Última actualización: 2026-01-31*

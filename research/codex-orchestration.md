# 🧠 Codex CLI 5.2 - Orchestration Setup

**Filosofía:** Yo (Clarus) soy el Chief of Staff / Arquitecto. NO codifico directamente. Orquesto a Codex con prompts de alta calidad.

## Setup de Codex CLI

### Instalación
```bash
# Instalar Codex CLI
npm install -g @openai/codex-cli

# Verificar
codex --version
```

### Configuración con Extra High Thinking
```bash
# En ~/.codex/config.json o via environment
export CODEX_THINKING="extra-high"
export CODEX_MODEL="codex-5.2"
```

### Configuración recomendada
```json
{
  "model": "codex-5.2",
  "thinking": "extra-high",
  "maxTokens": 32000,
  "temperature": 0.1,
  "autoApprove": false
}
```

## Mi Rol como Orquestador

### ❌ Lo que NO hago
- Escribir código directamente
- Debugging manual línea por línea
- Implementar features yo mismo

### ✅ Lo que SÍ hago
- Generar prompts de alta calidad para Codex
- Definir arquitectura y estructura
- Revisar output y dar feedback
- Iterar con mejores prompts si falla
- Combinar con Ralph Wiggum para loops autónomos

## Workflow de Orquestación

```
1. Max define tarea de alto nivel
2. Yo (Clarus) analizo y descompongo
3. Genero prompt óptimo para Codex
4. Codex ejecuta con extra-high thinking
5. Yo reviso output
6. Si necesita ajustes → refino prompt → repito
7. Cuando está listo → PR para Max
```

## Plantillas de Prompts para Codex

### Feature Implementation
```markdown
## Task
Implement [FEATURE] for [PROJECT]

## Context
- Current codebase uses [STACK]
- Related files: [LIST]
- Must integrate with [SYSTEMS]

## Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

## Constraints
- Follow existing code style
- Write tests (>80% coverage)
- No breaking changes

## Success Criteria
- All tests pass
- Linter clean
- Documentation updated

## Thinking Level
Use extra-high thinking for architecture decisions.
```

### Bug Fix
```markdown
## Bug Description
[DESCRIPTION]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]

## Expected vs Actual
- Expected: [X]
- Actual: [Y]

## Relevant Code
[FILE PATHS]

## Constraints
- Minimal changes
- Write regression test
- Don't break existing functionality
```

### Refactoring
```markdown
## Refactoring Goal
[GOAL - e.g., improve performance, reduce complexity]

## Target Code
[FILE/FUNCTION]

## Constraints
- All existing tests must pass
- No behavior changes
- Incremental commits

## Quality Metrics
- Cyclomatic complexity < [N]
- Test coverage maintained
- No new linter warnings
```

## Combinación con Ralph Wiggum

Para tareas complejas, combinar Codex con Ralph Wiggum:

```bash
/ralph-loop:ralph-loop "Use Codex CLI with extra-high thinking to:

1. Implement [FEATURE]
2. Write comprehensive tests
3. Update documentation

After each iteration:
- Run tests
- Check linter
- If failures, analyze and retry

Output <promise>COMPLETE</promise> when:
- All tests pass
- Coverage > 80%
- No linter errors" --max-iterations 25
```

## Monitoreo de Costos

Codex con extra-high thinking consume más tokens. Trackear:

```bash
# Agregar al workflow
echo "$(date): Codex task - $ESTIMATED_COST" >> ~/clawd/logs/codex-usage.log
```

---

## Integración con Clawdbot

En mi configuración, cuando necesite codear:

1. **Analizo la tarea** - Entiendo qué se necesita
2. **Preparo el contexto** - Archivos relevantes, constraints
3. **Genero el prompt** - Usando templates arriba
4. **Ejecuto Codex** - `codex --thinking extra-high "prompt"`
5. **Reviso y refino** - Itero si es necesario
6. **Documento** - Guardo lo aprendido para mejorar prompts futuros

---
*Filosofía: Yo dirijo la orquesta, Codex toca los instrumentos.* 🎭

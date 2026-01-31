# Claude Code on Loop: YOLO Mode

**Source:** https://mfyz.com/claude-code-on-loop-autonomous-ai-coding/

## Core Concept
Run Claude Code in a loop with minimal instructions. Ultimate "vibe coding."

```bash
while :; do
  cat prompt.md | claude -p --dangerously-skip-permissions
done
```

## What Happens

### Self-Management Emerges
- Agent develops its own workflow
- Writes tests for itself
- Maintains scope
- Sometimes "gives up" when stuck

### Unexpected Improvements
- Ask for X, it improves Y and Z too
- Anthropic's "beyond what you asked" behavior

### Continuous Progress
- Works while you sleep
- Wake up to dozens of commits

## Implementation Script

```bash
#!/usr/bin/env sh
set -eu

ITERATION_COUNT=50
PROMPT_FILE="${1:-loop/prompt.md}"
LOG_FILE="loop/loop.log"

run_once() {
  cat "$PROMPT_FILE" \
    | claude -p \
    --verbose \
    --dangerously-skip-permissions \
    --include-partial-messages \
    --output-format=stream-json \
    | tee -a "$LOG_FILE" \
    | jq -rj --unbuffered '...'
}

i=1
while [ "$i" -le $ITERATION_COUNT ]; do
  # Visual separator with figlet
  figlet -f doh "$i"
  run_once
  i=$((i+1))
done
```

## Safety Considerations

⚠️ **Critical:**
- Run in SANDBOX (Docker, VM)
- `--dangerously-skip-permissions` = full access
- Watch costs (Max plan rate limits ~1 hour with 2 projects)
- Set iteration limits (default: 50)
- Review EVERYTHING before merging
- Version control is ESSENTIAL

## Use Cases

1. **Large-scale refactoring** - Upgrade Node, React, etc.
2. **Project migrations** - Framework X → Y
3. **Documentation generation** - Comments, docstrings, READMEs
4. **Test coverage improvement** - "Add tests for uncovered code"

## Prompt Design Tips

Keep prompts:
- **Simple** - 3-5 sentences max
- **Focused** - "Improve test coverage" > detailed instructions
- **Clear about scope** - What's in-bounds vs off-limits
- **Outcome-oriented** - What to achieve, not how

## ⚠️ Rate Limit Note
Loop doesn't care about rate limits - keeps trying until window resets.
**DO NOT run with usage-based billing!**

## Open Questions
- When does agent decide it's "done"?
- How to measure progress beyond commit count?
- Optimal iteration count?
- Can you chain different prompts?

---

## 🎯 Application for OpenClaw

### Potential Uses:
1. **Overnight documentation updates**
2. **Test coverage improvement**
3. **Codebase refactoring**
4. **Migration tasks**

### Safety Setup:
1. Always use Docker/sandbox
2. Max plan (flat rate) vs API billing
3. Git branch for loop work
4. Review before merge

*Research captured: 2026-01-31*

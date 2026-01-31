# Ralph Wiggum - AI Loop Technique

**Source:** https://awesomeclaude.ai/ralph-wiggum

## Core Concept
A bash loop that repeatedly feeds Claude a prompt until completion. Named after The Simpsons character, it embodies "persistent iteration despite setbacks."

```bash
while :; do cat PROMPT.md | claude ; done
```

## Philosophy
- **Iteration > Perfection**: Don't aim for perfect on first try
- **Failures Are Data**: Deterministically bad means predictable failures
- **Operator Skill Matters**: Success depends on writing good prompts
- **Persistence Wins**: Keep trying until success

## Usage (Claude Code Plugin)
```bash
/plugin install ralph-loop@claude-plugins-official
/ralph-loop:ralph-loop "Build a hello world API" --completion-promise "DONE" --max-iterations 10
```

## Prompt Best Practices

### 1. Clear Completion Criteria
Always include explicit success criteria and completion phrase (e.g., `<promise>COMPLETE</promise>`)

### 2. Incremental Goals
Break large tasks into phases with clear milestones

### 3. Self-Correction Pattern
Use TDD approach: write failing test → implement → run tests → fix if needed → refactor → repeat

### 4. Safety
- Always use `--max-iterations` to prevent infinite loops
- Include "stuck handling" after N iterations

## When To Use
✅ **Good for:**
- Well-defined tasks with clear success criteria
- Tasks requiring iteration (getting tests to pass)
- Greenfield projects
- Automatic verification (tests, linters)
- Overnight development

❌ **Not good for:**
- Human judgment/design decisions needed
- One-shot operations
- Unclear success criteria
- Production debugging
- Human-in-the-loop tasks

## Real Results
- **6 repos overnight** at Y Combinator hackathon
- **$50k contract delivered** for $297 in API costs
- **CURSED language** created over 3 months

## Advanced Patterns

### Git Worktrees (Parallel Development)
```bash
git worktree add ../project-feature1 -b feature/auth
git worktree add ../project-feature2 -b feature/api
# Run Ralph in each terminal simultaneously
```

### Multi-Phase Development
Chain multiple loops for complex projects:
1. Phase 1: Core implementation
2. Phase 2: API layer  
3. Phase 3: Frontend

### Prompt Tuning
1. Start with no guardrails
2. When Ralph fails, add guardrails ("SLIDE DOWN, DON'T JUMP")
3. Iterate on failures - each teaches what to add
4. Eventually defects disappear

---
*Research captured: 2026-01-31*

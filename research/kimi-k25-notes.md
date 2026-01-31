# Kimi K2.5 - Open Source Multimodal Agent Model

**Source:** https://huggingface.co/moonshotai/Kimi-K2.5
**Company:** Moonshot AI (China)
**Released:** January 2026

## Overview
Open-source, native multimodal agentic model. Continual pretraining on ~15T mixed visual and text tokens.

## Key Stats
| Spec | Value |
|------|-------|
| Architecture | Mixture-of-Experts (MoE) |
| Total Parameters | **1 Trillion** |
| Activated Parameters | 32B |
| Context Length | **256K** |
| Vision Encoder | MoonViT (400M params) |

## Key Features

### Native Multimodality
- Pre-trained on vision-language tokens
- Excels in visual knowledge and cross-modal reasoning
- Agentic tool use grounded in visual inputs

### Coding with Vision
- Generates code from visual specs (UI designs, video workflows)
- Autonomously orchestrates tools for visual data processing

### Agent Swarm 🔥
- Self-directed, coordinated swarm-like execution
- Decomposes complex tasks into parallel sub-tasks
- Dynamically instantiates domain-specific agents

## Benchmark Performance (Thinking Mode)

### vs Claude Opus 4.5, GPT-5.2, Gemini 3 Pro

| Benchmark | Kimi K2.5 | Claude 4.5 | GPT-5.2 | Gemini 3 |
|-----------|-----------|------------|---------|----------|
| HLE-Full (w/tools) | **50.2** | 43.2 | 45.5 | 45.8 |
| AIME 2025 | 96.1 | 92.8 | **100** | 95.0 |
| SWE-Bench Verified | 76.8 | **80.9** | 80.0 | 76.2 |
| BrowseComp (Swarm) | **78.4** | - | - | - |
| VideoMMMU | 86.6 | 84.4 | 85.9 | **87.6** |

**Takeaway:** Competitive with top frontier models, especially strong in vision and agentic tasks.

## API Access
- https://platform.moonshot.ai (OpenAI/Anthropic-compatible API)
- Also available on Together AI

## 🎯 Application for OpenClaw

### Potential Uses:
1. **Cheaper alternative for visual tasks** - UI understanding, screenshot analysis
2. **Parallel agent execution** - Agent Swarm for complex multi-step tasks
3. **Coding tasks** - Strong performance on SWE-Bench
4. **256K context** - Good for long document processing

### Integration Path:
1. Get API key from moonshot.ai or Together AI
2. Use as alternative model for specific task types
3. Route visual/coding tasks to Kimi, reasoning to Claude

**Cost consideration:** Check pricing vs Claude/OpenAI for cost optimization

---
*Research captured: 2026-01-31*

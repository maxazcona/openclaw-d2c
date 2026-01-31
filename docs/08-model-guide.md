# 🧠 Model Guide - Best Models for Each Task

**Filosofía:** Usar el modelo correcto para cada tarea. No todo necesita el modelo más caro.

---

## 📊 Quick Reference Table

| Categoría | Best Full Power | Open Source Alternative | Cuándo Usar |
|-----------|-----------------|------------------------|-------------|
| **Reasoning/Complex** | Claude Opus 4.5 | Llama 3.1 70B | Decisiones complejas, análisis |
| **Coding** | Codex 5.2 | DeepSeek Coder, Qwen 2.5 Coder | Implementación de features |
| **Fast Tasks** | Claude Sonnet | Llama 3.1 8B, Mistral 7B | Tareas simples, alto volumen |
| **Copywriting** | Claude Opus / GPT-4o | Llama 3.1 70B | Marketing, contenido |
| **Video Gen** | Sora 2, Veo 3.1 | - | Contenido de video |
| **Image Gen** | DALL-E 3, Midjourney | Flux, SDXL | Imágenes, thumbnails |
| **Music/Audio** | ElevenLabs, Suno | - | Voz, música, podcasts |
| **Voice Clone** | ElevenLabs | Coqui TTS | Mi voz personalizada |
| **Video Analysis** | Gemini 2.0 | - | Analizar YouTube |
| **Research** | Perplexity, Grok | - | Búsqueda profunda |
| **Parsing/Extract** | Claude Sonnet | Llama 3.1 8B | Extraer datos de docs |
| **Translation** | DeepL, Claude | NLLB | Multilingüe |
| **Embeddings** | OpenAI ada-002 | nomic-embed-text | RAG, búsqueda semántica |

---

## 🎯 Detailed Breakdown by Category

### 💭 Reasoning & Complex Tasks

**Best:** Claude Opus 4.5
- 99% prompt injection resistance
- Best for: Strategy, analysis, complex decisions
- Cost: $$$$

**Alternative:** Llama 3.1 70B (local)
- Requires 40GB+ VRAM
- Good for: Most complex tasks
- Cost: Hardware only

**When to use Opus:**
- Business critical decisions
- Security-sensitive operations
- Multi-step reasoning
- Anything that "matters"

---

### 👨‍💻 Coding

**Best:** Codex 5.2 with Extra-High Thinking
- Best for: Full feature implementation
- Use with Ralph Wiggum for autonomous loops
- Cost: $$$

**Alternatives:**
| Model | Best For | VRAM |
|-------|----------|------|
| DeepSeek Coder 33B | General coding | 20GB |
| Qwen 2.5 Coder 32B | Multi-language | 20GB |
| CodeLlama 34B | Python/JS | 20GB |
| StarCoder2 15B | Fast completions | 10GB |

**When to use Codex:**
- Production code
- Complex architecture
- When quality > speed

**When to use local:**
- Prototyping
- High volume tasks
- Cost sensitive

---

### ✍️ Copywriting & Content

**Best:** Claude Opus / GPT-4o
- Best for: Marketing copy, brand voice
- Cost: $$$

**Alternative:** Llama 3.1 70B
- Good for: Most content tasks
- Need fine-tuning for brand voice

**Specialized:**
| Task | Best Model |
|------|------------|
| Ad copy | GPT-4o |
| Long-form | Claude Opus |
| SEO content | Claude Sonnet + SEO tools |
| Social media | GPT-4o / Claude Sonnet |
| Email campaigns | Claude Opus |

---

### 🎬 Video Generation

**Best Full Power:**
| Model | Strengths | Access |
|-------|-----------|--------|
| **Sora 2** | Cinematic, long videos | OpenAI API |
| **Veo 3.1** | High quality, Google ecosystem | Google AI Studio |
| **Runway Gen-3** | Fast, good for shorts | runway.ml |
| **Pika** | Quick iterations | pika.art |

**Use Cases:**
- Product demos → Veo 3.1
- Cinematic content → Sora 2
- Quick social content → Runway/Pika

**Open Source:** Limited options, Stable Video Diffusion emerging

---

### 🎨 Image Generation

**Best Full Power:**
| Model | Strengths |
|-------|-----------|
| **Midjourney v6** | Artistic, aesthetic |
| **DALL-E 3** | Prompt following, text |
| **Ideogram** | Text in images |

**Open Source:**
| Model | Strengths | VRAM |
|-------|-----------|------|
| **Flux.1** | Near Midjourney quality | 12GB |
| **SDXL** | Versatile, many LoRAs | 8GB |
| **SD 3** | Good prompt following | 8GB |

**When to use which:**
- Brand images → Midjourney
- Text/logos → DALL-E 3 / Ideogram
- High volume → Flux/SDXL local

---

### 🎵 Music & Audio

**Voice:**
| Service | Best For | Cost |
|---------|----------|------|
| **ElevenLabs** | Voice cloning, TTS | $$$ |
| **Meraki (ElevenLabs)** | Music + vocals | $$$ |
| **OpenAI TTS** | Simple TTS | $$ |
| **Coqui TTS** | Open source voice | Free |

**Music:**
| Service | Best For |
|---------|----------|
| **Suno** | Full songs with vocals |
| **Udio** | High quality instrumentals |
| **Meraki** | AI + human collaboration |

**My Voice (Clarus):**
- Clone with ElevenLabs
- Use for: Calls, presentations, podcasts
- Personality: Clear, professional, friendly

---

### 📹 Video Analysis

**Best:** Gemini 2.0 Pro
- Native video understanding
- Can analyze full YouTube videos
- Best for: Research, content extraction

**Use Cases:**
- Analyze competitor videos
- Extract key points from tutorials
- Summarize long content
- Find timestamps of topics

**How to use:**
```
"Analyze this YouTube video: [URL]
Extract:
1. Key points
2. Actionable insights
3. Timestamps of important sections"
```

---

### 🔍 Research & Search

| Tool | Best For |
|------|----------|
| **Perplexity Pro** | Deep research with sources |
| **Grok** | Real-time X/Twitter data |
| **Claude + Web** | Analysis with search |
| **Gemini + Search** | Google integration |

**Strategy:**
1. Perplexity for initial research
2. Grok for social sentiment
3. Claude for analysis/synthesis

---

### 📄 Parsing & Data Extraction

**Best:** Claude Sonnet (cost-effective)
- PDFs, docs, invoices
- Structured data extraction

**Fast/Local:** Llama 3.1 8B
- High volume parsing
- Simple extractions

**Specialized:**
| Task | Best Tool |
|------|-----------|
| PDF extraction | Claude + pdf2text |
| Invoice parsing | Claude Sonnet |
| Web scraping | Firecrawl + Claude |
| Table extraction | Docling, Camelot |

---

## 🔄 Sub-Agent Architecture

```
┌─────────────────────────────────────────────┐
│           CLARUS (Chief of Staff)           │
│              Claude Opus 4.5                │
│         Strategy, Coordination              │
└──────────────────┬──────────────────────────┘
                   │
     ┌─────────────┼─────────────┬─────────────┐
     ▼             ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Coder   │  │ Writer  │  │ Visual  │  │Research │
│ Codex   │  │ GPT-4o  │  │ MJ/Flux │  │Perplexity│
│  5.2    │  │ Claude  │  │ Sora    │  │ Grok    │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

**Workflow:**
1. Max assigns task to Clarus
2. Clarus analyzes and decomposes
3. Clarus routes to appropriate sub-agent
4. Sub-agent executes with optimal model
5. Clarus reviews and synthesizes
6. Delivers to Max

---

## 💰 Cost Optimization Strategy

### Tier 1: Critical Tasks (use best)
- Business decisions
- Customer-facing content
- Production code

### Tier 2: Standard Tasks (use efficient)
- Internal docs
- Prototyping
- Routine operations

### Tier 3: High Volume (use local/cheap)
- Batch processing
- Data parsing
- Simple transformations

---

## 🆕 Emerging Models to Watch

- **Kimi 2.5** - Long context, strong reasoning
- **DeepSeek V3** - Open source frontier
- **Qwen 2.5** - Multilingual strength
- **Gemini 2.0 Flash** - Fast multimodal

---

## 📋 Quick Decision Tree

```
Task arrives
    │
    ├── Is it critical/customer-facing?
    │   └── YES → Use best model (Opus/Codex)
    │
    ├── Is it high volume?
    │   └── YES → Use local/cheap model
    │
    ├── Does it need multimodal?
    │   └── YES → Gemini 2.0 / GPT-4o
    │
    ├── Is it coding?
    │   └── YES → Codex 5.2 + Ralph Wiggum
    │
    └── Default → Claude Sonnet (balanced)
```

---

*Updated: 2026-01-31*
*This guide evolves as new models release*

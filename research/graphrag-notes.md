# GraphRAG - Graph Retrieval-Augmented Generation

**Source:** https://trilogyai.substack.com/p/graphrag

## What is GraphRAG?
Shifts retrieval from isolated text chunks to **structured subgraphs** - clusters of interconnected nodes and edges that preserve semantic hierarchies and relational context.

## Why It Matters
- Traditional RAG struggles with "multi-hop" questions
- GraphRAG traverses explicit relationships, mimicking human reasoning
- **Reduces hallucinations by up to 35%**
- Improves accuracy in domain-specific settings

## Key Components

### 1. Graph Construction & Indexing
- **Public KBs:** Wikidata (general purpose, lacks domain specificity)
- **Self-constructed:** Proprietary data, tailored context, requires curation
- **Hybrid indexing:** Graph-native storage (Neo4j) + vector embeddings

### 2. Retrieval Methods
- **BFS (breadth-first search):** Fast but lacks nuance
- **GNN-Based Retrievers:** Encode topological patterns
- **LLM-Agent Retrieval:** Iteratively refine queries (Think-on-Graph)
- **Temporal Weighting:** Prioritize recent data using exponential decay

### 3. Generation
- Code-like syntax (adjacency lists, GraphML) for LLM parsing
- Community summarization to compress info
- Hybrid architectures (QA-GNN): score nodes → joint message passing

## Real-World Applications

### Biomedical
- KGs like CMeKG encode drug interactions, genetics, symptoms
- **22% reduction in misdiagnoses** in pilot studies

### Finance
- Transaction graph mapping for real-time fraud detection
- Temporally weighted subgraphs flag suspicious patterns faster

### Legal
- Citation network analysis
- **30% more accurate** at identifying precedent-setting decisions

## Common Myths Debunked
1. "Text retrieval handles all multi-hop queries" → GraphRAG is 30% better on HotpotQA
2. "Bigger graphs are always better" → Uncurated graphs add noise
3. "KGs eliminate hallucinations" → Still risk errors with incomplete data

## Challenges
- **Dynamic Data:** Near-real-time updates needed (FastKGE for incremental updates)
- **Prompt Engineering:** Balancing detail with context limits

## Future Directions
- **Multimodal Graphs:** Text + images + sensor data
- **Autonomous Agents:** AI-driven KG refinement
- **Democratization:** LlamaIndex, Neo4j integrations

## Key Resources
- [Microsoft GraphRAG](https://www.microsoft.com/en-us/research/project/graphrag/)
- [GitHub POC with temporal weighting](https://github.com/trilogy-group/ai-coe-graphrag-poc)
- [Demo video](https://www.loom.com/share/280665e77baa4af3b18a59e70b105f2c)

## Papers
- From Local to Global: Graph RAG for Query-Focused Summarization
- GRAG: Divide-and-conquer subgraph retrieval
- G-Retriever: Prize-Collecting Steiner Tree for conversational QA
- GNN-RAG: GNN + LLM for multi-hop QA
- Think-on-Graph: Iterative beam search for KG exploration

---

## 🎯 Application for OpenClaw
- Could enhance my memory system with knowledge graphs
- Connect entities: people, projects, decisions, dates
- Enable multi-hop queries across my memory
- Track temporal context (what was relevant when)

**POC idea:** Build a small KG from MEMORY.md + daily notes, use for enhanced recall

*Research captured: 2026-01-31*

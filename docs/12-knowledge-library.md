# 📚 Knowledge Library

> Upload books, extract insights, apply to your business.

---

## 🎯 Purpose

The Knowledge Library allows you to:

1. **Upload** books (PDF, EPUB)
2. **Extract** key knowledge automatically
3. **Apply** insights to your specific business
4. **Share** learnings with all your AI agents
5. **Store** principles in long-term memory

---

## 📋 What Gets Extracted

When you upload a book, the AI generates:

### 📝 Executive Summary
A concise 2-3 paragraph overview of the book's main message and value proposition.

### 🎯 Key Takeaways
5-10 actionable insights, presented as bullet points. These are the "if you only remember one thing" points.

### 📜 Core Principles (Commandments)
The fundamental truths or rules from the book. Timeless principles that can be applied broadly.

### 💼 Business Application
**Personalized** analysis of how to apply the book's lessons to YOUR specific business. This considers:
- Your industry (e.g., D2C skincare)
- Your current challenges
- Your growth stage
- Your market (e.g., Mexico/LATAM)

---

## 🔧 How It Works

### Processing Pipeline

```
1. UPLOAD
   └─→ User drops PDF/EPUB

2. EXTRACT
   └─→ Parse document
   └─→ Extract text content
   └─→ Identify chapters/sections

3. ANALYZE (AI)
   └─→ Generate summary
   └─→ Extract key takeaways
   └─→ Identify core principles
   └─→ Apply to user's business

4. STORE
   └─→ Save to brain/resources/books/
   └─→ Index for search
   └─→ Enable chat about book

5. MEMORIZE (Optional)
   └─→ Save principles to MEMORY.md
   └─→ All agents can access
```

### File Structure

```
brain/resources/books/
├── atomic-habits/
│   ├── metadata.json       # Title, author, added date
│   ├── summary.md          # Executive summary
│   ├── takeaways.md        # Key takeaways list
│   ├── principles.md       # Commandments/core rules
│   ├── application.md      # Business-specific application
│   └── original.pdf        # Source file (optional)
├── 4-hour-work-week/
│   └── ...
└── index.json              # Library index
```

### Example: metadata.json

```json
{
  "id": "atomic-habits",
  "title": "Atomic Habits",
  "author": "James Clear",
  "format": "pdf",
  "pages": 320,
  "addedAt": "2026-01-31T12:00:00Z",
  "processedAt": "2026-01-31T12:05:00Z",
  "tags": ["productivity", "habits", "self-improvement"],
  "takeawaysCount": 5,
  "principlesCount": 4,
  "savedToMemory": false
}
```

---

## 💾 Saving to Memory

When you click "Save Principles to Memory", the system:

1. Extracts the core principles from the book
2. Formats them for MEMORY.md
3. Adds a section like:

```markdown
## 📚 From "Atomic Habits" by James Clear

### Core Principles
1. Every action is a vote for the type of person you wish to become
2. You do not rise to the level of your goals, you fall to the level of your systems
3. The most effective way to change habits is to change your identity
4. Make the cue obvious, the craving attractive, the response easy, and the reward satisfying

### Applied to Business
- Create customer habits around our product
- Build systems, not campaigns
- Make reordering frictionless

*Added: 2026-01-31*
```

This ensures all agents have access to these learnings.

---

## 🤖 Chatting About Books

Once a book is processed, you can:

- **Ask questions:** "What does Atomic Habits say about environment design?"
- **Request applications:** "How can I apply the 1% rule to my email marketing?"
- **Compare books:** "How does this compare to what Deep Work says about focus?"

The AI has full context of the book's content and your business.

---

## 📖 Recommended Books for D2C

### Business & Strategy
- **"$100M Offers"** - Alex Hormozi
- **"Building a StoryBrand"** - Donald Miller
- **"DotCom Secrets"** - Russell Brunson
- **"Influence"** - Robert Cialdini

### Marketing & Growth
- **"This Is Marketing"** - Seth Godin
- **"Contagious"** - Jonah Berger
- **"Hooked"** - Nir Eyal

### Operations & Productivity
- **"The E-Myth Revisited"** - Michael Gerber
- **"4-Hour Work Week"** - Tim Ferriss
- **"Atomic Habits"** - James Clear

### Mindset
- **"Thinking, Fast and Slow"** - Daniel Kahneman
- **"The Psychology of Money"** - Morgan Housel

---

## ⚙️ Technical Implementation

### PDF Processing
```javascript
// Using pdf.js or pdfparse
const extractPdfText = async (file) => {
  // Parse PDF
  // Return text by chapter/section
};
```

### EPUB Processing
```javascript
// EPUBs are ZIP files with HTML content
const extractEpubText = async (file) => {
  // Unzip
  // Parse HTML content
  // Return structured text
};
```

### AI Analysis Prompt

```markdown
You are analyzing a book for a D2C entrepreneur.

Book: [Title] by [Author]
User's Business: [Description from USER.md]

Please provide:

1. **Executive Summary** (2-3 paragraphs)
   The main message and why it matters.

2. **Key Takeaways** (5-10 bullets)
   Actionable insights to remember.

3. **Core Principles** (3-7 items)
   Timeless truths that can be applied broadly.
   Format as commandments.

4. **Business Application**
   How to specifically apply these lessons to [User's Business].
   Be concrete and actionable.
```

---

## 🚀 Future Enhancements

- [ ] Audiobook support (transcription)
- [ ] Highlight import (from Kindle, Apple Books)
- [ ] Book clubs / shared libraries
- [ ] Spaced repetition for key principles
- [ ] Auto-suggest books based on challenges
- [ ] Integration with Readwise

---

*Feature added: 2026-01-31*

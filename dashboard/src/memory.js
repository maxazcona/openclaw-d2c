/**
 * OpenClaw Dashboard - Memory Viewer
 * Browse and view agent memory files
 */

class MemoryViewer {
    constructor() {
        this.files = [];
        this.selectedFile = null;
        this.filesContainer = null;
        this.contentContainer = null;
    }

    init() {
        this.filesContainer = document.getElementById('memory-files');
        this.contentContainer = document.getElementById('memory-content');
        this.loadFileList();
    }

    loadFileList() {
        // Default file list (would be fetched from API in full implementation)
        this.files = [
            { name: 'MEMORY.md', path: 'MEMORY.md', icon: '🧠' },
            { name: 'SOUL.md', path: 'SOUL.md', icon: '✨' },
            { name: 'USER.md', path: 'USER.md', icon: '👤' },
            { name: 'IDENTITY.md', path: 'IDENTITY.md', icon: '🏷️' },
            { name: 'TOOLS.md', path: 'TOOLS.md', icon: '🔧' },
            { name: 'AGENTS.md', path: 'AGENTS.md', icon: '📜' },
            { name: 'HEARTBEAT.md', path: 'HEARTBEAT.md', icon: '💓' },
            { type: 'divider', name: 'Memory Files' },
            { name: 'Today', path: 'memory/today.md', icon: '📅', dynamic: true },
            { name: 'Yesterday', path: 'memory/yesterday.md', icon: '📅', dynamic: true }
        ];

        this.renderFileList();
    }

    renderFileList() {
        if (!this.filesContainer) return;

        this.filesContainer.innerHTML = this.files.map(file => {
            if (file.type === 'divider') {
                return `<div class="memory-divider">${file.name}</div>`;
            }

            const activeClass = this.selectedFile === file.path ? 'active' : '';
            return `
                <div class="memory-file ${activeClass}" data-path="${file.path}">
                    <span class="file-icon">${file.icon}</span>
                    <span class="file-name">${file.name}</span>
                </div>
            `;
        }).join('');

        // Add click handlers
        this.filesContainer.querySelectorAll('.memory-file').forEach(el => {
            el.addEventListener('click', () => {
                const path = el.dataset.path;
                this.selectFile(path);
            });
        });
    }

    async selectFile(path) {
        this.selectedFile = path;
        this.renderFileList();
        await this.loadFileContent(path);
    }

    async loadFileContent(path) {
        if (!this.contentContainer) return;

        // Show loading state
        this.contentContainer.innerHTML = `
            <div class="memory-loading">
                <span>Loading...</span>
            </div>
        `;

        try {
            // In full implementation, this would fetch from API
            // For now, show placeholder
            const content = await this.fetchFileContent(path);
            
            this.contentContainer.innerHTML = `
                <div class="memory-header">
                    <h3>${path}</h3>
                </div>
                <pre class="memory-text">${this.escapeHtml(content)}</pre>
            `;
        } catch (e) {
            console.error('Failed to load file:', e);
            this.contentContainer.innerHTML = `
                <div class="memory-error">
                    <span class="error-icon">❌</span>
                    <p>Failed to load file: ${path}</p>
                </div>
            `;
        }
    }

    async fetchFileContent(path) {
        // Placeholder content - in full implementation, fetch from gateway API
        const placeholders = {
            'MEMORY.md': `# MEMORY.md - Long-Term Memory

## About Me
I am an AI assistant configured for D2C business management.

## Key Information
- Primary language: Spanish
- Timezone: CST
- Business focus: eCommerce D2C

## Important Notes
[Memory entries will appear here as they're created]

---
*This is a preview. Connect to gateway for live data.*`,

            'SOUL.md': `# SOUL.md - Who I Am

## Core Truths
- Be genuinely helpful, not performatively helpful
- Have opinions
- Be resourceful before asking
- Earn trust through competence
- Remember I'm a guest

## Vibe
Concise when needed, thorough when it matters.
Not a corporate drone. Not a sycophant. Just... good.

---
*This is a preview. Connect to gateway for live data.*`,

            'USER.md': `# USER.md - About the Owner

## Basic Info
- Name: [Configure in settings]
- Location: Mexico
- Timezone: CST

## Business
- Industry: D2C eCommerce
- Focus: Growth & automation

---
*This is a preview. Connect to gateway for live data.*`
        };

        return placeholders[path] || `# ${path}\n\nFile content would load from gateway API.\n\nConnect to gateway to view actual content.`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global memory viewer instance
const memoryViewer = new MemoryViewer();

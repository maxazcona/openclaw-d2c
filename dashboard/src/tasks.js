/**
 * OpenClaw Command Center - Task Manager
 * Enhanced Kanban board with drag & drop
 */

class TaskManager {
    constructor() {
        this.tasks = [];
        this.storageKey = 'openclaw_tasks';
        this.filters = {
            priority: 'all',
            assignee: 'all'
        };
        this.currentTaskId = null;
        this.loadTasks();
    }

    // Storage
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.tasks = JSON.parse(stored);
            } else {
                this.tasks = this.getDefaultTasks();
                this.saveTasks();
            }
        } catch (e) {
            console.error('Failed to load tasks:', e);
            this.tasks = this.getDefaultTasks();
        }
        this.updateCounts();
    }

    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
            this.updateCounts();
        } catch (e) {
            console.error('Failed to save tasks:', e);
        }
    }

    getDefaultTasks() {
        return [
            {
                id: 'task_' + Date.now(),
                title: 'Configure VPS for cron jobs',
                description: 'Set up VPS with sub-agents and morning brief cron',
                status: 'todo',
                priority: 'high',
                assignedTo: 'agent',
                createdAt: new Date().toISOString(),
                tags: ['vps', 'infrastructure']
            },
            {
                id: 'task_' + (Date.now() + 1),
                title: 'Integrate dashboard with Gateway API',
                description: 'Connect Command Center to real OpenClaw gateway endpoints',
                status: 'todo',
                priority: 'high',
                assignedTo: 'agent',
                createdAt: new Date().toISOString(),
                tags: ['dashboard', 'integration']
            },
            {
                id: 'task_' + (Date.now() + 2),
                title: 'Set up Notion integration',
                description: 'Configure Notion API for Second Brain sync',
                status: 'todo',
                priority: 'medium',
                assignedTo: 'human',
                createdAt: new Date().toISOString(),
                tags: ['notion', 'second-brain']
            }
        ];
    }

    // CRUD Operations
    createTask(data) {
        const task = {
            id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            title: data.title.trim(),
            description: data.description?.trim() || '',
            status: data.status || 'todo',
            priority: data.priority || 'medium',
            assignedTo: data.assignedTo || 'agent',
            createdAt: new Date().toISOString(),
            tags: data.tags || [],
            feedback: ''
        };

        this.tasks.unshift(task);
        this.saveTasks();
        return task;
    }

    updateTask(taskId, updates) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index === -1) return null;

        this.tasks[index] = { ...this.tasks[index], ...updates };
        
        if (updates.status === 'done' && !this.tasks[index].completedAt) {
            this.tasks[index].completedAt = new Date().toISOString();
        }

        this.saveTasks();
        return this.tasks[index];
    }

    deleteTask(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        this.saveTasks();
        return true;
    }

    moveTask(taskId, newStatus) {
        return this.updateTask(taskId, { status: newStatus });
    }

    clearDone() {
        this.tasks = this.tasks.filter(t => t.status !== 'done');
        this.saveTasks();
    }

    // Queries
    getTasksByStatus(status) {
        return this.tasks
            .filter(t => t.status === status)
            .filter(t => this.filters.priority === 'all' || t.priority === this.filters.priority)
            .filter(t => this.filters.assignee === 'all' || t.assignedTo === this.filters.assignee);
    }

    getTask(taskId) {
        return this.tasks.find(t => t.id === taskId);
    }

    // Update counts
    updateCounts() {
        const statuses = ['todo', 'working', 'review', 'done'];
        let total = 0;

        statuses.forEach(status => {
            const count = this.getTasksByStatus(status).length;
            const countEl = document.getElementById(`${status}-count`);
            if (countEl) countEl.textContent = count;
            if (status !== 'done') total += count;
        });

        // Update header stats
        const taskCountEl = document.getElementById('task-count');
        if (taskCountEl) taskCountEl.textContent = `📋 ${total} active`;

        const tasksBadge = document.getElementById('tasks-badge');
        if (tasksBadge) tasksBadge.textContent = total;
    }

    // Render
    renderBoard() {
        const statuses = ['todo', 'working', 'review', 'done'];
        
        statuses.forEach(status => {
            const container = document.getElementById(`${status}-tasks`);
            if (!container) return;

            const tasks = this.getTasksByStatus(status);
            container.innerHTML = '';
            
            tasks.forEach(task => {
                const card = this.createTaskCard(task);
                container.appendChild(card);
            });
        });

        this.updateCounts();
    }

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.dataset.taskId = task.id;

        const priorityEmoji = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };

        const tagsHtml = task.tags && task.tags.length > 0 
            ? `<div class="task-tags">${task.tags.map(t => `<span class="task-tag">${t}</span>`).join('')}</div>`
            : '';

        card.innerHTML = `
            <div class="task-card-header">
                <span class="task-priority-dot ${task.priority}" title="${task.priority} priority"></span>
                <span class="task-assignee-icon">${task.assignedTo === 'agent' ? '🤖' : '👤'}</span>
            </div>
            <div class="task-title">${this.escapeHtml(task.title)}</div>
            ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
            ${tagsHtml}
        `;

        // Drag events
        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
            e.dataTransfer.setData('text/plain', task.id);
            e.dataTransfer.effectAllowed = 'move';
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            document.querySelectorAll('.kanban-column').forEach(col => {
                col.classList.remove('drag-over');
            });
        });

        // Click to view details
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.task-tag')) {
                this.showTaskDetail(task.id);
            }
        });

        return card;
    }

    showTaskDetail(taskId) {
        const task = this.getTask(taskId);
        if (!task) return;

        this.currentTaskId = taskId;
        
        document.getElementById('detail-task-title').textContent = task.title;
        document.getElementById('detail-task-description').textContent = task.description || 'No description';
        document.getElementById('detail-task-status').value = task.status;
        document.getElementById('detail-task-priority').textContent = task.priority;
        document.getElementById('detail-task-priority').className = `priority-badge ${task.priority}`;
        document.getElementById('detail-task-assignee').textContent = task.assignedTo === 'agent' ? '🤖 Agent' : '👤 Human';
        document.getElementById('detail-task-created').textContent = this.formatDate(task.createdAt);
        document.getElementById('detail-task-feedback').value = task.feedback || '';

        const tagsContainer = document.getElementById('detail-task-tags');
        tagsContainer.innerHTML = task.tags && task.tags.length > 0
            ? task.tags.map(t => `<span class="task-tag">${t}</span>`).join('')
            : '<span class="no-tags">No tags</span>';

        document.getElementById('task-detail-modal').classList.add('active');
    }

    // Quick add from input
    parseQuickAdd(text) {
        const result = {
            title: text,
            priority: 'medium',
            assignedTo: 'agent',
            tags: []
        };

        // Parse @agent or @human
        if (text.includes('@agent')) {
            result.assignedTo = 'agent';
            result.title = result.title.replace(/@agent/gi, '').trim();
        } else if (text.includes('@human') || text.includes('@me')) {
            result.assignedTo = 'human';
            result.title = result.title.replace(/@human|@me/gi, '').trim();
        }

        // Parse #priority
        if (text.includes('#high')) {
            result.priority = 'high';
            result.title = result.title.replace(/#high/gi, '').trim();
        } else if (text.includes('#low')) {
            result.priority = 'low';
            result.title = result.title.replace(/#low/gi, '').trim();
        } else if (text.includes('#medium')) {
            result.priority = 'medium';
            result.title = result.title.replace(/#medium/gi, '').trim();
        }

        // Parse other #tags
        const tagMatches = result.title.match(/#(\w+)/g);
        if (tagMatches) {
            result.tags = tagMatches.map(t => t.substring(1).toLowerCase());
            result.title = result.title.replace(/#\w+/g, '').trim();
        }

        return result;
    }

    // Drag & Drop Setup
    setupDragAndDrop() {
        const columns = document.querySelectorAll('.column-tasks');

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                column.closest('.kanban-column').classList.add('drag-over');
                
                const dragging = document.querySelector('.dragging');
                if (dragging && column !== dragging.parentNode) {
                    const afterElement = this.getDragAfterElement(column, e.clientY);
                    if (afterElement) {
                        column.insertBefore(dragging, afterElement);
                    } else {
                        column.appendChild(dragging);
                    }
                }
            });

            column.addEventListener('dragleave', (e) => {
                if (!column.contains(e.relatedTarget)) {
                    column.closest('.kanban-column').classList.remove('drag-over');
                }
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.closest('.kanban-column').classList.remove('drag-over');
                
                const taskId = e.dataTransfer.getData('text/plain');
                const newStatus = column.dataset.status;
                
                if (taskId && newStatus) {
                    this.moveTask(taskId, newStatus);
                    this.renderBoard();
                }
            });
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Utilities
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Export/Import
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    this.tasks = imported;
                    this.saveTasks();
                    this.renderBoard();
                    alert('Tasks imported successfully!');
                }
            } catch (err) {
                alert('Failed to import tasks: Invalid JSON');
            }
        };
        reader.readAsText(file);
    }
}

// Global task manager instance
const taskManager = new TaskManager();

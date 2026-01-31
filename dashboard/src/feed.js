/**
 * OpenClaw Dashboard - Activity Feed
 * Real-time activity monitoring
 */

class ActivityFeed {
    constructor() {
        this.activities = [];
        this.maxItems = 100;
        this.container = null;
    }

    init() {
        this.container = document.getElementById('activity-feed');
        this.loadActivities();
        this.setupRefreshButton();
    }

    loadActivities() {
        try {
            const stored = localStorage.getItem('openclaw_activities');
            if (stored) {
                this.activities = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load activities:', e);
            this.activities = [];
        }
    }

    saveActivities() {
        try {
            localStorage.setItem('openclaw_activities', JSON.stringify(this.activities));
        } catch (e) {
            console.error('Failed to save activities:', e);
        }
    }

    addActivity(activity) {
        const item = {
            id: 'activity_' + Date.now(),
            type: activity.type || 'info',
            icon: this.getIcon(activity.type),
            title: activity.title,
            text: activity.text || '',
            timestamp: new Date().toISOString()
        };

        this.activities.unshift(item);

        // Trim to max items
        if (this.activities.length > this.maxItems) {
            this.activities = this.activities.slice(0, this.maxItems);
        }

        this.saveActivities();
        this.renderFeed();

        return item;
    }

    getIcon(type) {
        const icons = {
            'message': '💬',
            'task': '📋',
            'tool': '🔧',
            'error': '❌',
            'success': '✅',
            'warning': '⚠️',
            'info': 'ℹ️',
            'heartbeat': '💓',
            'search': '🔍',
            'file': '📁',
            'code': '💻'
        };
        return icons[type] || 'ℹ️';
    }

    setupRefreshButton() {
        const refreshBtn = document.getElementById('refresh-feed');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.fetchLatestActivity();
            });
        }
    }

    async fetchLatestActivity() {
        try {
            // Fetch recent session history
            const history = await api.getSessionHistory('main', 20);
            
            if (history && history.messages) {
                history.messages.forEach(msg => {
                    // Check if already exists
                    const exists = this.activities.some(a => 
                        a.originalId === msg.id
                    );

                    if (!exists) {
                        this.addActivity({
                            type: msg.role === 'assistant' ? 'message' : 'info',
                            title: msg.role === 'assistant' ? 'Agent Response' : 'User Message',
                            text: this.truncateText(msg.content, 200),
                            originalId: msg.id
                        });
                    }
                });
            }
        } catch (e) {
            console.error('Failed to fetch activity:', e);
            this.addActivity({
                type: 'error',
                title: 'Connection Error',
                text: 'Failed to fetch latest activity'
            });
        }
    }

    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        // Less than a minute
        if (diff < 60000) {
            return 'Just now';
        }

        // Less than an hour
        if (diff < 3600000) {
            const mins = Math.floor(diff / 60000);
            return `${mins}m ago`;
        }

        // Less than a day
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `${hours}h ago`;
        }

        // Format as date
        return date.toLocaleDateString('es-MX', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    renderFeed() {
        if (!this.container) return;

        if (this.activities.length === 0) {
            this.container.innerHTML = `
                <div class="feed-empty">
                    <span class="empty-icon">📭</span>
                    <p>No recent activity</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = this.activities.map(activity => `
            <div class="feed-item" data-type="${activity.type}">
                <span class="feed-icon">${activity.icon}</span>
                <div class="feed-content">
                    <div class="feed-title">${this.escapeHtml(activity.title)}</div>
                    ${activity.text ? `<div class="feed-text">${this.escapeHtml(activity.text)}</div>` : ''}
                    <div class="feed-time">${this.formatTime(activity.timestamp)}</div>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clear() {
        this.activities = [];
        this.saveActivities();
        this.renderFeed();
    }
}

// Global feed instance
const activityFeed = new ActivityFeed();

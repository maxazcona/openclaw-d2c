/**
 * OpenClaw Dashboard - API Client
 * Connects to the OpenClaw Gateway
 */

class OpenClawAPI {
    constructor() {
        this.baseUrl = localStorage.getItem('gatewayUrl') || 'http://localhost:18789';
        this.token = localStorage.getItem('gatewayToken') || '';
        this.ws = null;
        this.listeners = new Map();
        this.connected = false;
    }

    // Configuration
    setConfig(url, token) {
        this.baseUrl = url;
        this.token = token;
        localStorage.setItem('gatewayUrl', url);
        localStorage.setItem('gatewayToken', token);
    }

    // HTTP Methods
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // WebSocket
    connectWebSocket() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            return;
        }

        const wsUrl = this.baseUrl.replace('http', 'ws') + '/ws';
        
        try {
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.connected = true;
                this.emit('connected');
            };

            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.connected = false;
                this.emit('disconnected');
                
                // Reconnect after 5 seconds
                setTimeout(() => this.connectWebSocket(), 5000);
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.emit('error', error);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.emit('message', data);
                    
                    if (data.type) {
                        this.emit(data.type, data);
                    }
                } catch (e) {
                    console.error('Failed to parse WebSocket message:', e);
                }
            };
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
            this.emit('error', error);
        }
    }

    disconnectWebSocket() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    // Event Emitter
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (e) {
                    console.error('Event listener error:', e);
                }
            });
        }
    }

    // API Endpoints

    // Status
    async getStatus() {
        return this.get('/api/status');
    }

    // Sessions
    async getSessions() {
        return this.get('/api/sessions');
    }

    async getSessionHistory(sessionKey, limit = 50) {
        return this.get(`/api/sessions/${sessionKey}/history?limit=${limit}`);
    }

    async sendMessage(sessionKey, message) {
        return this.post(`/api/sessions/${sessionKey}/send`, { message });
    }

    // Cron Jobs
    async getCronJobs() {
        return this.get('/api/cron/jobs');
    }

    async createCronJob(job) {
        return this.post('/api/cron/jobs', job);
    }

    async deleteCronJob(jobId) {
        return this.delete(`/api/cron/jobs/${jobId}`);
    }

    async runCronJob(jobId) {
        return this.post(`/api/cron/jobs/${jobId}/run`);
    }

    // Convenience method to send to main session
    async sendToMain(message) {
        return this.sendMessage('main', message);
    }
}

// Global API instance
const api = new OpenClawAPI();

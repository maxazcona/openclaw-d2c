/**
 * OpenClaw Command Center - Main Application
 */

class CommandCenter {
    constructor() {
        this.currentView = 'tasks';
    }

    async init() {
        console.log('🚀 Initializing OpenClaw Command Center...');

        // Initialize task manager
        taskManager.setupDragAndDrop();
        taskManager.renderBoard();

        // Setup UI
        this.setupNavigation();
        this.setupQuickInput();
        this.setupTaskModal();
        this.setupTaskDetailModal();
        this.setupFilters();
        this.setupColumnAddButtons();
        this.setupClearDone();
        this.setupSettings();

        console.log('✅ Command Center initialized');
    }

    // Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(viewName) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === `${viewName}-view`);
        });

        this.currentView = viewName;

        // View-specific actions
        if (viewName === 'tasks') {
            taskManager.renderBoard();
        }
    }

    // Quick Input
    setupQuickInput() {
        const input = document.getElementById('quick-input');
        const sendBtn = document.getElementById('send-btn');

        const handleQuickAdd = () => {
            const text = input.value.trim();
            if (!text) return;

            // Parse quick add syntax
            const taskData = taskManager.parseQuickAdd(text);
            
            if (taskData.title) {
                const task = taskManager.createTask(taskData);
                taskManager.renderBoard();
                input.value = '';
                
                // Show feedback
                this.showToast(`Task created: ${task.title}`);
            }
        };

        sendBtn.addEventListener('click', handleQuickAdd);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleQuickAdd();
            }
        });
    }

    // Task Modal
    setupTaskModal() {
        const addTaskBtn = document.getElementById('add-task-btn');
        const modal = document.getElementById('add-task-modal');
        const closeBtn = document.getElementById('close-task-modal');
        const cancelBtn = document.getElementById('cancel-task');
        const createBtn = document.getElementById('create-task');

        const showModal = () => {
            modal.classList.add('active');
            document.getElementById('task-title').focus();
        };

        const hideModal = () => {
            modal.classList.remove('active');
            // Clear form
            document.getElementById('task-title').value = '';
            document.getElementById('task-description').value = '';
            document.getElementById('task-priority').value = 'medium';
            document.getElementById('task-assign').value = 'agent';
            document.getElementById('task-tags').value = '';
        };

        addTaskBtn.addEventListener('click', showModal);
        closeBtn.addEventListener('click', hideModal);
        cancelBtn.addEventListener('click', hideModal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideModal();
            }
        });

        // Create task
        createBtn.addEventListener('click', () => {
            const title = document.getElementById('task-title').value.trim();
            const description = document.getElementById('task-description').value.trim();
            const priority = document.getElementById('task-priority').value;
            const assignedTo = document.getElementById('task-assign').value;
            const tagsInput = document.getElementById('task-tags').value.trim();

            if (!title) {
                document.getElementById('task-title').focus();
                return;
            }

            const tags = tagsInput ? tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t) : [];

            const task = taskManager.createTask({
                title,
                description,
                priority,
                assignedTo,
                tags
            });

            hideModal();
            taskManager.renderBoard();
            this.showToast(`Task created: ${task.title}`);
        });
    }

    // Task Detail Modal
    setupTaskDetailModal() {
        const modal = document.getElementById('task-detail-modal');
        const closeBtn = document.getElementById('close-detail-modal');
        const saveBtn = document.getElementById('save-task-detail');
        const deleteBtn = document.getElementById('delete-task');
        const statusSelect = document.getElementById('detail-task-status');

        const hideModal = () => {
            modal.classList.remove('active');
            taskManager.currentTaskId = null;
        };

        closeBtn.addEventListener('click', hideModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideModal();
            }
        });

        // Status change
        statusSelect.addEventListener('change', () => {
            if (taskManager.currentTaskId) {
                taskManager.updateTask(taskManager.currentTaskId, {
                    status: statusSelect.value
                });
                taskManager.renderBoard();
            }
        });

        // Save changes
        saveBtn.addEventListener('click', () => {
            if (taskManager.currentTaskId) {
                const feedback = document.getElementById('detail-task-feedback').value;
                taskManager.updateTask(taskManager.currentTaskId, { feedback });
                hideModal();
                this.showToast('Task updated');
            }
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            if (taskManager.currentTaskId && confirm('Delete this task?')) {
                taskManager.deleteTask(taskManager.currentTaskId);
                hideModal();
                taskManager.renderBoard();
                this.showToast('Task deleted');
            }
        });
    }

    // Filters
    setupFilters() {
        const priorityFilter = document.getElementById('filter-priority');
        const assigneeFilter = document.getElementById('filter-assignee');

        priorityFilter?.addEventListener('change', () => {
            taskManager.filters.priority = priorityFilter.value;
            taskManager.renderBoard();
        });

        assigneeFilter?.addEventListener('change', () => {
            taskManager.filters.assignee = assigneeFilter.value;
            taskManager.renderBoard();
        });
    }

    // Column add buttons
    setupColumnAddButtons() {
        document.querySelectorAll('.add-task-column-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const status = btn.dataset.status;
                document.getElementById('add-task-modal').classList.add('active');
                document.getElementById('task-title').focus();
            });
        });
    }

    // Clear done
    setupClearDone() {
        const clearDoneBtn = document.getElementById('clear-done');
        clearDoneBtn?.addEventListener('click', () => {
            if (confirm('Clear all completed tasks?')) {
                taskManager.clearDone();
                taskManager.renderBoard();
                this.showToast('Completed tasks cleared');
            }
        });
    }

    // Settings
    setupSettings() {
        const themeSelect = document.getElementById('theme-select');
        const exportBtn = document.getElementById('export-tasks');
        const importBtn = document.getElementById('import-tasks');

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (themeSelect) {
            themeSelect.value = savedTheme;
        }
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Theme change
        themeSelect?.addEventListener('change', () => {
            const theme = themeSelect.value;
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        });

        // Export
        exportBtn?.addEventListener('click', () => {
            taskManager.exportTasks();
            this.showToast('Tasks exported');
        });

        // Import
        importBtn?.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    taskManager.importTasks(file);
                }
            };
            input.click();
        });
    }

    // Toast notifications
    showToast(message, duration = 3000) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new CommandCenter();
    app.init();
});

// ============================
// Media Input Functionality
// ============================

class MediaInput {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.currentAttachment = null;
        
        this.init();
    }

    init() {
        // Voice recording
        const voiceBtn = document.getElementById('voice-btn');
        const stopRecordingBtn = document.getElementById('stop-recording');
        
        voiceBtn?.addEventListener('click', () => this.toggleRecording());
        stopRecordingBtn?.addEventListener('click', () => this.stopRecording());

        // Photo upload
        const photoBtn = document.getElementById('photo-btn');
        const photoInput = document.getElementById('photo-input');
        
        photoBtn?.addEventListener('click', () => photoInput?.click());
        photoInput?.addEventListener('change', (e) => this.handlePhotoSelect(e));

        // File upload
        const fileBtn = document.getElementById('file-btn');
        const fileInput = document.getElementById('file-input');
        
        fileBtn?.addEventListener('click', () => fileInput?.click());
        fileInput?.addEventListener('change', (e) => this.handleFileSelect(e));

        // Remove attachment
        const removeBtn = document.getElementById('remove-attachment');
        removeBtn?.addEventListener('click', () => this.removeAttachment());
    }

    // Voice Recording
    async toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (e) => {
                this.audioChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.handleVoiceRecording(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.recordingStartTime = Date.now();

            // Update UI
            document.getElementById('voice-btn')?.classList.add('active');
            document.getElementById('recording-indicator').style.display = 'flex';

            // Start timer
            this.recordingTimer = setInterval(() => this.updateRecordingTime(), 1000);

        } catch (err) {
            console.error('Failed to start recording:', err);
            alert('Could not access microphone. Please allow microphone access.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;

            // Update UI
            document.getElementById('voice-btn')?.classList.remove('active');
            document.getElementById('recording-indicator').style.display = 'none';

            // Stop timer
            clearInterval(this.recordingTimer);
        }
    }

    updateRecordingTime() {
        const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timeEl = document.getElementById('recording-time');
        if (timeEl) timeEl.textContent = timeStr;
    }

    handleVoiceRecording(blob) {
        const url = URL.createObjectURL(blob);
        this.setAttachment({
            type: 'audio',
            name: `Voice note (${new Date().toLocaleTimeString()})`,
            blob: blob,
            url: url,
            icon: '🎤'
        });
    }

    // Photo handling
    handlePhotoSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        this.setAttachment({
            type: 'image',
            name: file.name,
            file: file,
            url: url,
            icon: '📷'
        });

        // Reset input
        event.target.value = '';
    }

    // File handling
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.setAttachment({
            type: 'file',
            name: file.name,
            file: file,
            icon: '📎'
        });

        // Reset input
        event.target.value = '';
    }

    // Attachment management
    setAttachment(attachment) {
        this.currentAttachment = attachment;

        const preview = document.getElementById('attachment-preview');
        const iconEl = document.querySelector('.attachment-icon');
        const nameEl = document.getElementById('attachment-name');

        if (preview && iconEl && nameEl) {
            iconEl.textContent = attachment.icon;
            nameEl.textContent = attachment.name;
            preview.style.display = 'block';

            // Show image thumbnail if it's a photo
            if (attachment.type === 'image' && attachment.url) {
                iconEl.innerHTML = `<img src="${attachment.url}" alt="preview" />`;
            }
        }
    }

    removeAttachment() {
        if (this.currentAttachment?.url) {
            URL.revokeObjectURL(this.currentAttachment.url);
        }
        this.currentAttachment = null;

        const preview = document.getElementById('attachment-preview');
        if (preview) preview.style.display = 'none';
    }

    getAttachment() {
        return this.currentAttachment;
    }
}

// Initialize media input
const mediaInput = new MediaInput();

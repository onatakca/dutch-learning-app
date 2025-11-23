/**
 * Progress Management for Dutch Learning App
 * Handles saving/loading data from LocalStorage
 */

window.progressManager = {
    // Keys for LocalStorage
    KEYS: {
        PROGRESS: 'dutch_app_progress',
        STATS: 'dutch_app_stats',
        SETTINGS: 'dutch_app_settings'
    },

    // Initial State
    initialStats: {
        wordsLearned: 0,
        streak: 0,
        lastStudyDate: null,
        totalStudyTime: 0
    },

    /**
     * Get all progress data
     */
    getProgress() {
        const data = localStorage.getItem(this.KEYS.PROGRESS);
        return data ? JSON.parse(data) : {};
    },

    /**
     * Get user stats
     */
    getStats() {
        const data = localStorage.getItem(this.KEYS.STATS);
        return data ? JSON.parse(data) : { ...this.initialStats };
    },

    /**
     * Save word result (Spaced Repetition)
     * @param {string} categoryId 
     * @param {string} wordId (using Dutch word as ID for now)
     * @param {string} rating 'easy', 'good', 'hard'
     */
    saveResult(categoryId, wordId, rating) {
        const progress = this.getProgress();
        const stats = this.getStats();
        const today = new Date().toDateString();

        // Initialize category if needed
        if (!progress[categoryId]) {
            progress[categoryId] = {};
        }

        // Initialize word if needed
        if (!progress[categoryId][wordId]) {
            progress[categoryId][wordId] = {
                level: 0,
                nextReview: Date.now(),
                history: []
            };
            // New word learned!
            stats.wordsLearned++;
        }

        const wordData = progress[categoryId][wordId];

        // Update Spaced Repetition Data (Simplified Anki)
        // Level 0 = New, 1 = Hard, 2 = Good, 3 = Easy
        if (rating === 'easy') {
            wordData.level = Math.min(wordData.level + 2, 5);
        } else if (rating === 'good') {
            wordData.level = Math.min(wordData.level + 1, 5);
        } else {
            wordData.level = 1; // Reset to hard
        }

        // Calculate next review time
        const daysToAdd = [1, 1, 2, 4, 7, 14][wordData.level] || 1;
        wordData.nextReview = Date.now() + (daysToAdd * 24 * 60 * 60 * 1000);
        wordData.lastReviewed = Date.now();

        // Update Streak
        if (stats.lastStudyDate !== today) {
            if (this.isConsecutiveDay(stats.lastStudyDate, today)) {
                stats.streak++;
            } else {
                stats.streak = 1; // Reset or start new
            }
            stats.lastStudyDate = today;
        }

        // Save everything
        localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
        localStorage.setItem(this.KEYS.STATS, JSON.stringify(stats));

        return { wordData, stats };
    },

    /**
     * Calculate category progress percentage
     */
    getCategoryProgress(categoryId, totalWords) {
        const progress = this.getProgress();
        if (!progress[categoryId]) return 0;

        const learnedCount = Object.keys(progress[categoryId]).length;
        return Math.min(Math.round((learnedCount / totalWords) * 100), 100);
    },

    /**
     * Helper: Check if dates are consecutive
     */
    isConsecutiveDay(lastDateStr, todayStr) {
        if (!lastDateStr) return false;
        const last = new Date(lastDateStr);
        const today = new Date(todayStr);
        const diffTime = Math.abs(today - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1;
    }
};

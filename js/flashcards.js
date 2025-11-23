// State
let currentCardIndex = 0;
let cards = [];
let isFlipped = false;
let isListView = false;

// DOM Elements
const cardElement = document.getElementById('current-card');
const revealBtn = document.getElementById('reveal-btn');
const ratingControls = document.getElementById('rating-controls');
const progressCounter = document.getElementById('progress-counter');
const viewToggleBtn = document.getElementById('view-toggle');
const flashcardContainer = document.getElementById('flashcard-view-container');
const listContainer = document.getElementById('list-view-container');
const vocabularyList = document.querySelector('.vocabulary-list');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Get category from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category') || 'greetings';

    // Set Title
    const categoryName = window.categoriesData?.categories.find(c => c.id === categoryId)?.name || 'Practice';
    document.getElementById('category-title').textContent = categoryName;

    // Load Data
    cards = await window.getVocabulary(categoryId);
    updateProgress();
    showCard(currentCardIndex);
    renderListView();

    // Event Listeners
    setupEventListeners();
});

function setupEventListeners() {
    // View Toggle
    viewToggleBtn.addEventListener('click', toggleView);

    // Flip Card
    cardElement.addEventListener('click', (e) => {
        // Don't flip if clicking audio button
        if (e.target.closest('.audio-btn')) return;
        flipCard();
    });

    revealBtn.addEventListener('click', flipCard);

    // Rating Buttons
    document.querySelectorAll('.rate-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rating = e.target.dataset.rating;
            handleRating(rating);
        });
    });

    // Audio
    document.querySelector('.audio-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio(cards[currentCardIndex].dutch);
    });
}

function toggleView() {
    isListView = !isListView;

    if (isListView) {
        flashcardContainer.classList.add('hidden');
        listContainer.classList.remove('hidden');
        viewToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 0 0 0-2 2v16"></path></svg>';
        viewToggleBtn.title = "Switch to Flashcards";
    } else {
        listContainer.classList.add('hidden');
        flashcardContainer.classList.remove('hidden');
        viewToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>';
        viewToggleBtn.title = "Switch to List View";
    }
}

function renderListView() {
    vocabularyList.innerHTML = cards.map(card => `
        <div class="vocab-item">
            <div class="vocab-header">
                <div class="vocab-word-group">
                    <span class="vocab-dutch">${card.dutch}</span>
                    <button class="vocab-audio-btn" onclick="playAudio('${card.dutch.replace(/'/g, "\\'")}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                </div>
                <span class="vocab-english">${card.english}</span>
            </div>
            <div class="vocab-details">
                <p class="vocab-example-nl">${card.example}</p>
                <p class="vocab-example-en">${card.exampleTranslation}</p>
            </div>
        </div>
    `).join('');
}

// Make playAudio global for onclick handlers
window.playAudio = playAudio;

function flipCard() {
    if (isFlipped) return; // Already flipped

    cardElement.classList.add('is-flipped');
    isFlipped = true;

    // Show ratings, hide reveal button
    revealBtn.classList.add('hidden');
    ratingControls.classList.remove('hidden');
}

function showCard(index) {
    if (index >= cards.length) {
        finishSession();
        return;
    }

    const card = cards[index];

    // Reset State
    isFlipped = false;
    cardElement.classList.remove('is-flipped');
    revealBtn.classList.remove('hidden');
    ratingControls.classList.add('hidden');

    // Update Content
    // Small delay to hide content update during flip back if needed
    setTimeout(() => {
        document.querySelector('.dutch-word').textContent = card.dutch;
        document.querySelector('.english-word').textContent = card.english;
        document.querySelector('.dutch-example').textContent = card.example;
        document.querySelector('.english-example').textContent = card.exampleTranslation;
    }, 200);
}

function handleRating(rating) {
    const card = cards[currentCardIndex];
    const categoryId = new URLSearchParams(window.location.search).get('category') || 'greetings';

    // Save progress
    if (window.progressManager) {
        window.progressManager.saveResult(categoryId, card.dutch, rating);
    }

    // Next Card
    currentCardIndex++;
    updateProgress();

    // Wait for animation
    setTimeout(() => {
        showCard(currentCardIndex);
    }, 300);
}

function updateProgress() {
    progressCounter.textContent = `${currentCardIndex + 1}/${cards.length}`;
}

function playAudio(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function finishSession() {
    alert('Session Complete! Great job!');
    window.location.href = 'index.html';
}

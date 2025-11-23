// Initialize app
checkLogin();
loadCategories();

/**
 * Check Login Status
 */
function checkLogin() {
    const modal = document.getElementById('login-modal');
    const form = document.getElementById('login-form');
    const input = document.getElementById('username-input');
    const greeting = document.getElementById('user-greeting');
    const nameDisplay = document.getElementById('username-display');

    if (!modal) return;

    const savedUser = localStorage.getItem('dutch_app_user');

    if (savedUser) {
        // User logged in
        nameDisplay.textContent = savedUser;
        greeting.classList.remove('hidden');
        modal.classList.add('hidden');
    } else {
        // Show login modal
        modal.classList.remove('hidden');
        input.focus();
    }

    // Handle Login
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input.value.trim();
        if (name) {
            localStorage.setItem('dutch_app_user', name);
            nameDisplay.textContent = name;
            greeting.classList.remove('hidden');
            modal.classList.add('hidden');
        }
    });
}

/**
 * Load Categories from JS
 */
async function loadCategories() {
    const grid = document.querySelector('.categories-grid');

    try {
        // Simulating network delay for smooth skeleton effect
        await new Promise(resolve => setTimeout(resolve, 800));

        // Clear skeletons
        grid.innerHTML = '';

        window.categoriesData.categories.forEach(category => {
            // Calculate progress if manager exists
            if (window.progressManager) {
                category.progress = window.progressManager.getCategoryProgress(category.id, category.wordCount);
            }

            const card = createCategoryCard(category);
            grid.appendChild(card);
        });

        updateHomeStats();

    } catch (error) {
        console.error('Error loading categories:', error);
        grid.innerHTML = '<p class="error-message">Failed to load categories. Please try again.</p>';
    }
}

function updateHomeStats() {
    if (!window.progressManager) return;

    const stats = window.progressManager.getStats();

    // Update DOM
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 2) {
        statValues[0].textContent = stats.wordsLearned;
        statValues[1].textContent = stats.streak;
    }
}

function createCategoryCard(category) {
    const div = document.createElement('div');
    div.className = 'category-card interactive';
    div.style.animation = 'fadeIn 0.5s ease-out forwards';

    div.innerHTML = `
        <div class="card-icon">${category.icon}</div>
        <div class="card-content">
            <h4>${category.name}</h4>
            <p>${category.wordCount} words • ${category.level}</p>
        </div>
        <div class="progress-ring" style="--progress: ${category.progress || 0}%"></div>
    `;

    div.addEventListener('click', () => {
        window.location.href = `flashcards.html?category=${category.id}`;
    });

    return div;
}

// Start Learning Button
const startBtn = document.getElementById('start-learning-btn');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        document.getElementById('categories-container').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

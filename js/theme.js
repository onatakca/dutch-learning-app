/**
 * Theme Management (Dark/Light Mode)
 * Shared across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme
    // Remove existing listeners to avoid duplicates if called multiple times
    const newBtn = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newBtn, themeToggle);

    newBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log('Theme toggled to:', newTheme);
    });
}

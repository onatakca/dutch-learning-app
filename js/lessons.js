document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on
    const path = window.location.pathname;

    if (path.includes('lesson.html')) {
        initLessonViewer();
    } else if (path.includes('lessons.html')) {
        initLessonsList();
    }
});

/**
 * Logic for lessons.html (The List)
 */
function initLessonsList() {
    const container = document.getElementById('lessons-container');
    if (!container) return;

    const lessons = window.lessonsData;

    container.innerHTML = lessons.map(lesson => `
        <div class="lesson-card" onclick="window.location.href='lesson.html?id=${lesson.id}'">
            <span class="lesson-icon">${lesson.image}</span>
            <div class="lesson-meta">
                <span class="lesson-tag">${lesson.level}</span>
                <span class="lesson-tag">${lesson.duration}</span>
            </div>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
        </div>
    `).join('');
}

/**
 * Logic for lesson.html (The Viewer)
 */
function initLessonViewer() {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('id');
    const lesson = window.lessonsData.find(l => l.id === lessonId);

    if (!lesson) {
        window.location.href = 'lessons.html';
        return;
    }

    // Render Header
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-desc').textContent = lesson.description;

    // Render Body Blocks
    const body = document.getElementById('lesson-body');
    body.innerHTML = lesson.content.map(block => renderBlock(block)).join('');

    // Finish Button
    document.getElementById('finish-btn').addEventListener('click', () => {
        // Here we could save progress
        alert('Lesson Completed! 🎉');
        window.location.href = 'lessons.html';
    });
}

/**
 * Render a single content block
 */
function renderBlock(block) {
    switch (block.type) {
        case 'text':
            // Check if this text block looks like a dialogue
            // Pattern: "Name: Message" or "Name: Message" lines
            if (block.content.includes(":") && (block.content.includes("Jan") || block.content.includes("Karel") || block.content.includes("Meneer") || block.content.includes("Mevrouw"))) {
                return renderDialogue(block.content);
            }
            // Clean up Wikitext artifacts
            let cleanContent = block.content
                .replace(/'''/g, '<strong>')
                .replace(/''/g, '</strong>') // Close bold
                .replace(/''/g, '<em>')
                .replace(/''/g, '</em>') // Close italic - simple heuristic
                .replace(/\[\[.*?\|(.*?)\]\]/g, '$1') // Links [[url|text]] -> text
                .replace(/\[\[(.*?)\]\]/g, '$1'); // Links [[text]] -> text

            return `<p class="block-text">${cleanContent}</p>`;

        case 'heading':
            return `<h3 class="block-heading">${block.content}</h3>`;

        case 'list':
            const items = block.items.map(item => `<li>${item}</li>`).join('');
            return `<ul class="block-list">${items}</ul>`;

        case 'phrase':
            // Escape quotes for the onclick handler
            const safeText = block.dutch.replace(/'/g, "\\'");
            return `
                <div class="vocab-item">
                    <div>
                        <div class="vocab-dutch">${block.dutch}</div>
                        <div class="vocab-english">${block.english}</div>
                    </div>
                    <button class="icon-button audio-btn" onclick="playAudio('${safeText}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                </div>
            `;

        case 'info-box':
            return `
                <div class="block-info-box">
                    <div class="info-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        ${block.title}
                    </div>
                    <p>${block.content}</p>
                </div>
            `;

        case 'example-box':
            return `
                <div class="block-example-box">
                    <p><strong>${block.dutch}</strong></p>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">${block.english}</p>
                </div>
            `;

        default:
            return '';
    }
}

function renderDialogue(content) {
    const lines = content.split('\n');
    let html = '<div class="chat-container">';

    lines.forEach(line => {
        // Try to split by first colon to get speaker
        const parts = line.split(':');
        if (parts.length > 1) {
            let speaker = parts[0].replace(/[*:]/g, '').trim();
            let message = parts.slice(1).join(':').trim();

            // Clean message
            message = message.replace(/'''/g, '').replace(/''/g, '');

            if (speaker && message) {
                // Determine side based on speaker (heuristic)
                const isRight = ['Jan', 'Meneer Jansen'].some(s => speaker.includes(s));
                const avatar = speaker.substring(0, 2).toUpperCase();

                html += `
                    <div class="chat-message ${isRight ? 'right' : ''}">
                        <div class="chat-avatar">${avatar}</div>
                        <div>
                            <span class="chat-speaker-name">${speaker}</span>
                            <div class="chat-bubble">${message}</div>
                        </div>
                    </div>
                `;
            }
        }
    });

    html += '</div>';
    return html;
}

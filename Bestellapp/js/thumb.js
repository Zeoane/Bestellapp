function addThumbsUp(itemId) {
    const item = findMenuItem(itemId);
    if (item) {
        item.thumbsUp = (item.thumbsUp || 0) + 1;
        updateThumbsDisplay(itemId);
    }
}

function addThumbsDown(itemId) {
    const item = findMenuItem(itemId);
    if (item) {
        item.thumbsDown = (item.thumbsDown || 0) + 1;
        updateThumbsDisplay(itemId);
    }
}

function findMenuItem(id) {
    return Object.values(menuData).flat().find(i => i.id === id);
}

function updateThumbsDisplay(itemId) {
    const item = findMenuItem(itemId);
    if (item) {
        document.getElementById(`thumbsUp${itemId}`).textContent = item.thumbsUp || 0;
        document.getElementById(`thumbsDown${itemId}`).textContent = item.thumbsDown || 0;
    }
}

function getThumbsTemplate(itemId, thumbsUp = 0, thumbsDown = 0) {
    const config = [
        { action: 'Up', color: 'text-green-500', symbol: '👍', count: thumbsUp },
        { action: 'Down', color: 'text-red-500', symbol: '👎', count: thumbsDown }
    ];
    return `<div class="thumbs-container">${config.map(c => thumbButton(itemId, c)).join('')}</div>`;
}

function thumbButton(id, { action, color, symbol, count }) {
    return `<button onclick="addThumbs${action}(${id})" class="${color}">${symbol} <span id="thumbs${action}${id}">${count}</span></button>`;
}

function renderThumbs() {
    document.querySelectorAll(".thumbs-placeholder").forEach(ph => {
        const id = +ph.dataset.itemId;
        const item = findMenuItem(id);
        if (item) ph.innerHTML = getThumbsTemplate(id, item.thumbsUp, item.thumbsDown);
    });
}

window.menuData = {
    pizza: [
        { id: 1, name: "Margherita", price: "8.00 €", rating: "★★★", img: "img/images/margherita-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 2, name: "Pepperoni", price: "9.50 €", rating: "★★", img: "img/images/pepperoni-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 3, name: "Quattro Formaggi", price: "10.00 €", rating: "★★★", img: "img/images/quattroformagi-image.png", thumbsUp: 0, thumbsDown: 0 },
    ],
    pasta: [
        { id: 4, name: "Spaghetti Bolognese", price: "9.00 €", rating: "★★★★", img: "img/images/bolognese-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 5, name: "Penne Arrabbiata", price: "8.50 €", rating: "★★★", img: "img/images/arrabiata-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 6, name: "Lasagne", price: "10.50 €", rating: "★★★★★", img: "img/images/lasagne-image.png", thumbsUp: 0, thumbsDown: 0 },
    ],
    dessert: [
        { id: 7, name: "Tiramisu", price: "5.00 €", rating: "★★★", img: "img/images/tiramisu-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 8, name: "Panna Cotta", price: "4.50 €", rating: "★", img: "img/images/pannacotta-image.png", thumbsUp: 0, thumbsDown: 0 },
        { id: 9, name: "Gelato", price: "3.50 €", rating: "★★", img: "img/images/gelato-image.png", thumbsUp: 0, thumbsDown: 0 },
    ]
};

function createItemImage(item) {
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.className = "menu-img rounded mr-4";
    return img;
}

function createItemInfo(item) {
    const infoDiv = document.createElement('div');
    const name = document.createElement('h3');
    name.className = "font-bold";
    name.textContent = item.name;
    const price = document.createElement('p');
    price.textContent = item.price;
    const rating = document.createElement('p');
    rating.className = "text-yellow-500";
    rating.textContent = item.rating;
    const thumbs = document.createElement('div');
    thumbs.className = "thumbs-placeholder";
    thumbs.dataset.itemId = item.id;
    infoDiv.append(name, price, rating, thumbs);
    return infoDiv;
}

function createAddToCartButton(itemId) {
    const button = document.createElement('button');
    button.className = "bg-blue-500 text-white px-2 py-1 rounded";
    button.textContent = "➕";
    button.dataset.id = itemId;
    return button;
}

function generateMenuItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = "flex items-center justify-between bg-white p-4 mb-2 rounded-lg shadow";
    const leftDiv = document.createElement('div');
    leftDiv.className = "flex items-center";
    leftDiv.append(createItemImage(item), createItemInfo(item));
    itemDiv.append(leftDiv, createAddToCartButton(item.id));
    return itemDiv;
}

function generateMenu() {
    const menuContainer = document.getElementById('menu');
    for (const category in window.menuData) {
        const section = document.createElement('div');
        section.id = category;
        section.className = "mb-1";
        const heading = document.createElement('h2');
        heading.className = "text-2xl font-bold capitalize mb-4";
        heading.textContent = category;
        section.appendChild(heading);
        window.menuData[category].forEach(item => {
            section.appendChild(generateMenuItem(item));
        });
        menuContainer.appendChild(section);
    }
    attachMenuEvents();
    renderThumbs();
}

function attachMenuEvents() {
    document.querySelectorAll('#menu button[data-id]').forEach(btn => {
        btn.addEventListener('click', e => addToCart(parseInt(e.target.dataset.id)));
    });
}
window.addEventListener('DOMContentLoaded', generateMenu);

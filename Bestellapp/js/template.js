function getCartHeaderTemplate(isDesktop) {
    const header = document.createElement('div');
    header.className = "flex justify-between items-center mb-4";
    const title = document.createElement('h2');
    title.className = "text-xl font-bold";
    title.textContent = "Warenkorb";
    const closeBtn = document.createElement('button');
    closeBtn.id = isDesktop ? "closeCartSidebar" : "closeCartDialog";
    closeBtn.className = "text-gray-600 hover:text-gray-900 text-2xl";
    closeBtn.textContent = "✖";
    header.append(title, closeBtn);
    return header;
}

function createItemInfoBlock(item) {
    const info = document.createElement('div');
    info.className = "flex flex-col";
    const name = document.createElement('span');
    name.className = "font-bold";
    name.textContent = item.name;
    const quantity = document.createElement('span');
    quantity.className = "text-sm";
    quantity.textContent = `${item.quantity} × ${item.price}`;
    info.append(name, quantity);
    return info;
}

function createDecrementButton(itemId) {
    const btn = document.createElement('button');
    btn.className = "decrement-btn bg-red-400 text-white px-2 py-1 rounded";
    btn.dataset.itemId = itemId;
    btn.textContent = "➖";
    return btn;
}

function createRemoveButton(itemId) {
    const btn = document.createElement('button');
    btn.className = "remove-btn bg-gray-400 text-white px-2 py-1 rounded";
    btn.dataset.itemId = itemId;
    btn.textContent = "🗑️";
    return btn;
}

function createItemActionButtons(item) {
    const actions = document.createElement('div');
    actions.className = "flex items-center space-x-1";
    actions.append(
        createDecrementButton(item.id),
        createQuantityDisplay(item.quantity),
        createIncrementButton(item.id),
        createRemoveButton(item.id)
    );
    return actions;
}

function createQuantityDisplay(quantity) {
    const qty = document.createElement('span');
    qty.textContent = quantity;
    return qty;
}

function createIncrementButton(itemId) {
    const btn = document.createElement('button');
    btn.className = "increment-btn bg-green-400 text-white px-2 py-1 rounded";
    btn.dataset.itemId = itemId;
    btn.textContent = "➕";
    return btn;
}

function getCartItemTemplate(item) {
    const container = document.createElement('div');
    container.className = "flex justify-between items-center mb-4";
    const infoBlock = createItemInfoBlock(item);
    const actionButtons = createItemActionButtons(item);
    container.append(infoBlock, actionButtons);
    return container;
}

function getCartFooterTemplate(total) {
    const footer = document.createElement('div');
    footer.className = "cart-footer";
    const delivery = document.createElement('div');
    delivery.className = "flex justify-between font-bold mb-2";
    delivery.innerHTML = `<span>Lieferkosten:</span><span>${DELIVERY_FEE.toFixed(2)} €</span>`;
    const sum = document.createElement('div');
    sum.className = "flex justify-between font-bold";
    sum.innerHTML = `<span>Gesamt:</span><span>${(total + DELIVERY_FEE).toFixed(2)} €</span>`;
    const orderBtn = document.createElement('button');
    orderBtn.className = "order-button bg-blue-500 text-white w-full py-2 mt-4 rounded";
    orderBtn.textContent = "Bestellen";
    footer.append(delivery, sum, orderBtn);
    return footer;
}

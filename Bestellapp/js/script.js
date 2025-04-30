let cart = [];
const DELIVERY_FEE = 2.50;

function addToCart(itemId) {
    const item = Object.values(menuData).flat().find(i => i.id === itemId);
    const existing = cart.find(i => i.id === itemId);
    existing ? existing.quantity++ : cart.push({ ...item, quantity: 1 });
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    renderCart();
}

function updateQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += delta;
        item.quantity <= 0 ? removeFromCart(itemId) : renderCart();
    }
}

function renderCart() {
    const elements = getCartElements();
    if (!elements) return;
    const { cartContainer, cartDialogContent, mobileCartTotal, mobileCartBtn } = elements;
    const isDesktop = window.innerWidth >= 769;
    clearCartContents(cartContainer, cartDialogContent);
    buildCart(cartContainer, cartDialogContent, isDesktop);
    updateMobileCart(mobileCartTotal);
    toggleCartVisibility(cart.length > 0, mobileCartBtn);
}

function getCartElements() {
    const cartContainer = document.getElementById("cart");
    const cartDialogContent = document.getElementById("cartDialogContent");
    const mobileCartTotal = document.getElementById("mobileCartTotal");
    const mobileCartBtn = document.getElementById("mobileCartBtn");
    if (!cartContainer || !cartDialogContent || !mobileCartTotal || !mobileCartBtn) return null;
    return { cartContainer, cartDialogContent, mobileCartTotal, mobileCartBtn };
}

function clearCartContents(cartContainer, cartDialogContent) {
    cartContainer.innerHTML = "";
    cartDialogContent.innerHTML = "";
}

function buildCart(cartContainer, cartDialogContent, isDesktop) {
    cartContainer.appendChild(getCartHeaderTemplate(isDesktop));
    cartDialogContent.appendChild(getCartHeaderTemplate(isDesktop));
    if (cart.length > 0) {
        buildCartItems(cartContainer, cartDialogContent);
    } else {
        buildEmptyCart(cartContainer, cartDialogContent);
    }
}

function buildCartItems(cartContainer, cartDialogContent) {
    let total = 0;
    cart.forEach(item => {
        cartContainer.appendChild(getCartItemTemplate(item));
        cartDialogContent.appendChild(getCartItemTemplate(item));
        total += parseFloat(item.price.replace(',', '.')) * item.quantity;
    });

    cartContainer.appendChild(getCartFooterTemplate(total));
    cartDialogContent.appendChild(getCartFooterTemplate(total));
    window.currentCartTotal = total;
}

function buildEmptyCart(cartContainer, cartDialogContent) {
    const empty = document.createElement('p');
    empty.className = "text-gray-600";
    empty.textContent = "Dein Warenkorb ist leer.";
    cartContainer.appendChild(empty);
    cartDialogContent.appendChild(empty);
    window.currentCartTotal = 0;
}

function updateMobileCart(mobileCartTotal) {
    const total = window.currentCartTotal || 0;
    mobileCartTotal.textContent = `${(total + DELIVERY_FEE).toFixed(2)} €`;
}

function toggleCartVisibility(hasItems, mobileCartBtn) {
    const cartElement = document.getElementById("cart");
    cartElement.classList.toggle("hidden-cart", !hasItems);
    mobileCartBtn.classList.toggle("hidden-cart", !hasItems);
}

function placeOrder() {
    cart = [];
    renderCart();
    const conf = document.getElementById("orderConfirmation");
    conf.classList.remove("hidden");
    setTimeout(() => conf.classList.add("hidden"), 2000);
}

function toggleCartDialog() {
    const dialog = document.getElementById("cartDialog");
    dialog.classList.toggle("open");
}

function handleCartShrinkOnScroll() {
    const cart = document.getElementById('cart');
    if (!cart) return;

    if (window.innerWidth >= 769) {
        cart.classList.toggle('shrinked', window.scrollY > 50);
    } else {
        cart.classList.remove('shrinked');
    }
}

function adjustCartPosition() {
    const nav = document.querySelector("nav");
    const cartElement = document.getElementById("cart");
    if (nav && cartElement && window.innerWidth >= 769) {
        cartElement.style.top = nav.offsetHeight + "px";
    }
}

document.addEventListener("click", e => {
    if (e.target.closest("#mobileCartBtn")) toggleCartDialog();
    if (e.target.id === "closeCartDialog" || e.target.id === "closeCartSidebar") toggleCartDialog();
    if (e.target.closest(".order-button")) placeOrder();
    if (e.target.closest(".increment-btn")) updateQuantity(+e.target.dataset.itemId, 1);
    if (e.target.closest(".decrement-btn")) updateQuantity(+e.target.dataset.itemId, -1);
    if (e.target.closest(".remove-btn")) removeFromCart(+e.target.dataset.itemId);
});

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    adjustCartPosition();
    window.addEventListener('scroll', handleCartShrinkOnScroll);
    window.addEventListener('resize', handleCartShrinkOnScroll);
});

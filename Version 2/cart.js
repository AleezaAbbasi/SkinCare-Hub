// Constants
const SHIPPING_COST = 400;
const FREE_SHIPPING_THRESHOLD = 3000;

const cartContainer = document.querySelector(".item-container");
const shippingCostElement = document.getElementById("shipping-cost");
const orderTotalElement = document.getElementById("order-total");
const checkoutButton = document.querySelector(".checkout-btn");

// Render Cart
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty 🛒</p>
        <a href="shop.html" class="checkout-btn">Go to Shop</a>
      </div>
    `;
    shippingCostElement.textContent = "";
    orderTotalElement.textContent = "";
    return;
  }

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const price = parseFloat(item.price.replace(/Rs\.|,/g, "").trim());
    const itemHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.title}" />
        <div class="item-details">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <div class="quantity-control">
            <button class="decrease" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
          <p class="price">Price: Rs.${price.toLocaleString()}</p>
          <p class="subtotal">Subtotal: Rs.${(price * item.quantity).toLocaleString()}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemHTML;
  });

  attachRemoveEventListeners();
  attachQuantityHandlers();
  calculateTotals();
}

// Remove Item
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function attachRemoveEventListeners() {
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

// Quantity Controls
function attachQuantityHandlers() {
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      updateQuantity(index, 1);
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      updateQuantity(index, -1);
    });
  });
}

function updateQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;
  cart[index].quantity = Math.max(1, cart[index].quantity + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Calculate Totals
function calculateTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return;

  let merchandiseTotal = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/Rs\.|,/g, "").trim());
    merchandiseTotal += price * item.quantity;
  });

  const shippingCost = merchandiseTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = merchandiseTotal + shippingCost;

  shippingCostElement.textContent = shippingCost === 0 ? "FREE" : `Rs.${shippingCost.toLocaleString()}`;
  orderTotalElement.textContent = `Rs.${orderTotal.toLocaleString()}`;

  localStorage.setItem("totalAmount", orderTotal);
}

// Checkout
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty! Add products to proceed.");
    return;
  }
  window.location.href = "checkout.html";
}

checkoutButton.addEventListener("click", handleCheckout);
renderCart();

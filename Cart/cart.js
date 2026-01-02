// Function to render cart items
function renderCart() {
  const cartContainer = document.querySelector(".item-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    // Update totals when cart is empty
    shippingCostElement.textContent = ""; // Clear the shipping cost
    orderTotalElement.textContent = "";  // Clear the order total
    return;
  }

  // Clear previous content
  cartContainer.innerHTML = "";

  // Loop through cart items and display them
  cart.forEach((item, index) => {
    const itemHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-details">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <p>Qty: ${item.quantity}</p>
          <p class="price">${item.price}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemHTML;
  });

  attachRemoveEventListeners(); // Add event listeners to "Remove" buttons
  calculateTotals(); // Recalculate totals when rendering cart
}

// Function to remove items from the cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item at specified index
  localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
  renderCart(); // Re-render the cart and recalculate totals
}

// Attach event listeners to "Remove" buttons
function attachRemoveEventListeners() {
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      removeFromCart(index); // Remove the item
    });
  });
}

// Constants
const SHIPPING_COST = 400; // Default shipping cost
const FREE_SHIPPING_THRESHOLD = 3000; // Order total threshold for free shipping

// DOM Elements
const shippingCostElement = document.getElementById("shipping-cost");
const orderTotalElement = document.getElementById("order-total");
const checkoutButton = document.querySelector(".checkout-btn");

// Function to calculate totals
function calculateTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    return; // Don't calculate totals if the cart is empty
  }

  // Calculate order total
  let merchandiseTotal = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/Rs\.|,/g, "").trim()); // Remove 'Rs.' and commas, convert to number
    merchandiseTotal += price * item.quantity;
  });

  // Determine shipping cost
  const shippingCost = merchandiseTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  // Calculate final order total
  const orderTotal = merchandiseTotal + shippingCost;

  // Update UI
  shippingCostElement.textContent = shippingCost === 0 ? "FREE" : `Rs.${shippingCost.toLocaleString()}`;
  orderTotalElement.textContent = `Rs.${orderTotal.toLocaleString()}`;
}

// Function to handle checkout
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty! Add products to proceed.");
    return;
  }

  // Redirect to checkout page
  window.location.href = "checkout.html";
}

// Event Listener for Checkout Button
checkoutButton.addEventListener("click", handleCheckout);

// Recalculate totals on page load
renderCart(); // This will render the cart and calculate totals when the page loads

const totalAmount = 0; // Replace with actual cart total
localStorage.setItem('totalAmount', totalAmount);
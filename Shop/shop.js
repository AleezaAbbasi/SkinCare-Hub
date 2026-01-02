
// Function to filter products based on the selected category
function filterProducts(category) {
    // Get all product cards
    var products = document.querySelectorAll('.product-card');
    
    // Loop through each product card
    products.forEach(function(product) {
      // Get the category of the product (based on its data-category attribute)
      var productCategory = product.getAttribute('data-category');
      
      // If the product's category matches the selected category, show it. Otherwise, hide it.
      if (productCategory.toUpperCase().includes(category.toUpperCase())) {
        product.style.display = 'flex'; // Show product
      } else {
        product.style.display = 'none'; // Hide product
      }
    });
  }
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
  
  // Function to add products to the cart
function addToCart(product) {
  // Get existing cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.title === product.title);
  if (existingProduct) {
    // If product exists, increase the quantity
    existingProduct.quantity += 1;
  } else {
    // If not, add the product to the cart
    cart.push({ ...product, quantity: 1 });
  }

  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    // Extract product details from the corresponding product card
    const productCard = button.closest(".product-card");
    const product = {
      title: productCard.querySelector("h3").textContent,
      description: productCard.querySelector(".product-description").textContent,
      price: productCard.querySelector(".product-price").textContent,
      image: productCard.querySelector("img").src,
    };

    addToCart(product); // Add product to cart
  });
});

// Function to filter and sort products based on user selection
function filterProducts(criteria) {
  const productCards = document.querySelectorAll('.product-card'); // Get all product cards

  // Handle sorting by price (Low to High / High to Low)
  if (criteria === 'Low to High' || criteria === 'High to Low') {
      const sortedProducts = Array.from(productCards).sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
          const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
          return criteria === 'Low to High' ? priceA - priceB : priceB - priceA;
      });

      // Reorder the products in the DOM
      const productsContainer = document.querySelector('.products');
      sortedProducts.forEach(product => productsContainer.appendChild(product));
  }

  // Handle filtering by skin type (Oily Skin, Dry Skin, Combination Skin) from the description
  else if (['Oily Skin', 'Dry Skin', 'Combination Skin'].includes(criteria)) {
      productCards.forEach(card => {
          const description = card.querySelector('.product-description').textContent.toLowerCase(); // Convert to lowercase
          if (description.includes(criteria.toLowerCase()) || criteria === 'All') {
              card.style.display = 'block'; // Show products that match the skin type
          } else {
              card.style.display = 'none'; // Hide products that do not match
          }
      });
  }

  // Handle filtering by skin problem (Acne, Hyperpigmentation, Open Pores, Discoloration) using data-skin-problem
  else if (['Acne', 'Hyperpigmentation', 'Open Pores', 'Discoloration'].includes(criteria)) {
      productCards.forEach(card => {
          const skinProblem = card.getAttribute('data-skin-problem') || ''; // Get the data-skin-problem attribute
          if (skinProblem.toLowerCase().includes(criteria.toLowerCase()) || criteria === 'All') {
              card.style.display = 'block'; // Show products that match the skin problem
          } else {
              card.style.display = 'none'; // Hide products that do not match
          }
      });
  }
}

// Event listener to handle filter button click
document.querySelector('.filter-btn').addEventListener('click', () => {
  const filterOptionsContainer = document.querySelector('.filter-options');
  filterOptionsContainer.classList.toggle('show'); // Toggle visibility of filter options dropdown
});

// Event listener for individual filter option clicks
const filterItems = document.querySelectorAll('.filter-options p');
filterItems.forEach(item => {
  item.addEventListener('click', () => {
      filterProducts(item.textContent); // Apply the filter based on the selected option
      const filterOptionsContainer = document.querySelector('.filter-options');
      filterOptionsContainer.classList.remove('show'); // Close the dropdown after selection
  });
});

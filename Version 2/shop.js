// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-box');
  const filterBtn = document.querySelector('.filter-btn');
  const filterOptions = document.querySelector('.filter-options');
  const filterItems = document.querySelectorAll('.filter-options p');
  const productCards = document.querySelectorAll('.product-card');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartCountElement = document.querySelector('.cart-count');
  const toast = document.getElementById('toast');
  const backToTopButton = document.querySelector('.back-to-top');
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarLeft = document.querySelector('.navbar-left');
  const navbarRight = document.querySelector('.navbar-right');
  const noProductsMessage = document.querySelector('.no-products');
  const paginationButtons = document.querySelectorAll('.pagination button');

  // Initialize cart count
  updateCartCount();

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', function() {
    navbarLeft.classList.toggle('active');
    navbarRight.classList.toggle('active');
  });

  // Category Filter Functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the category value
      const category = this.getAttribute('data-category');
      
      // Filter products
      filterByCategory(category);
    });
  });

  // Filter Button Toggle
  filterBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    filterOptions.classList.toggle('show');
  });

  // Close filter options when clicking elsewhere
  document.addEventListener('click', function(e) {
    if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
      filterOptions.classList.remove('show');
    }
  });

  // Filter and Sort Options
  filterItems.forEach(item => {
    item.addEventListener('click', function() {
      const sortType = this.getAttribute('data-sort');
      const filterType = this.getAttribute('data-filter');
      const filterValue = this.getAttribute('data-value');
      
      if (sortType) {
        sortProducts(sortType);
      } else if (filterType && filterValue) {
        filterByAttribute(filterType, filterValue);
      }
      
      filterOptions.classList.remove('show');
    });
  });

  // Add to Cart Functionality
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const product = {
        title: productCard.querySelector('h3').textContent,
        price: productCard.querySelector('.product-price').textContent,
        description: productCard.querySelector('.product-description').textContent,
        image: productCard.querySelector('img').getAttribute('src')
      };
      
      addToCart(product);
      showToast('Product added to cart!');
      updateCartCount();
    });
  });

  // Back to Top Button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Pagination
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      // Here you would implement actual pagination logic if needed
    });
  });

  // Functions
  function filterByCategory(category) {
    let visibleProducts = 0;
    
    productCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
        visibleProducts++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show or hide "no products" message
    noProductsMessage.style.display = visibleProducts === 0 ? 'block' : 'none';
  }

  function filterByAttribute(type, value) {
    let visibleProducts = 0;
    
    productCards.forEach(card => {
      if (card.getAttribute(`data-${type}`) === value) {
        card.style.display = 'flex';
        visibleProducts++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show or hide "no products" message
    noProductsMessage.style.display = visibleProducts === 0 ? 'block' : 'none';
  }

  function sortProducts(sortType) {
    const productsContainer = document.querySelector('.products');
    const productsArray = Array.from(productCards);
    
    if (sortType === 'price-low') {
      productsArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
        const priceB = parseInt(b.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
        return priceA - priceB;
      });
    } else if (sortType === 'price-high') {
      productsArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
        const priceB = parseInt(b.querySelector('.product-price').textContent.replace('Rs. ', '').replace(',', ''));
        return priceB - priceA;
      });
    }
    
    // Re-append sorted products
    productsArray.forEach(product => {
      productsContainer.appendChild(product);
    });
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.title === product.title);
    
    if (existingProductIndex !== -1) {
      // Increment quantity if product exists
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      // Add new product with quantity 1
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    
    cart.forEach(item => {
      totalItems += item.quantity || 1;
    });
    
    cartCountElement.textContent = totalItems;
  }

  function showToast(message) {
    toast.querySelector('p').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
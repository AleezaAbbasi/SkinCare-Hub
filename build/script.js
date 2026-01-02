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
      product.style.display = 'block'; // Show product
    } else {
      product.style.display = 'none'; // Hide product
    }
  });
}


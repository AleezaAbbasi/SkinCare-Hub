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

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[data-scroll]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 80,
                      behavior: 'smooth'
                  });
              }
          });
      });

      // Navbar scroll effect
      window.addEventListener('scroll', function() {
          const navbar = document.querySelector('.navbar');
          if (window.scrollY > 50) {
              navbar.style.padding = '1rem 3rem';
              navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
          } else {
              navbar.style.padding = '1.5rem 3rem';
              navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
          }
      });
document.addEventListener('DOMContentLoaded', function () {
  // Initialize an empty cart
  let cart = [];

  // Function to add items to the cart
  function addToCart(name, price) {
      const item = { name, price };
      cart.push(item);
      updateCartDisplay();
      showMessage(`${name} has been added to your cart.`);
  }

  // Function to show messages to the user
  function showMessage(message) {
      const messageDisplay = document.getElementById('messageDisplay');
      if (messageDisplay) {
          messageDisplay.innerText = message;
          setTimeout(() => {
              messageDisplay.innerText = ''; // Clear the message after a few seconds
          }, 3000);
      }
  }

  // Update cart display
  function updateCartDisplay() {
      const cartDisplay = document.getElementById('cartDisplay');
      if (!cartDisplay) return;

      cartDisplay.innerHTML = ''; // Clear previous cart display
      let total = 0;

      if (cart.length === 0) {
          cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
          return;
      }

      cart.forEach(item => {
          total += item.price;
          cartDisplay.innerHTML += `<p>${item.name} - Ksh${item.price}</p>`;
      });

      cartDisplay.innerHTML += `<strong>Total: Ksh${total}</strong>`;
  }

  // Handle add to cart button clicks
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));
          addToCart(name, price);
      });
  });

  // Handle order form submission
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
      orderForm.addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent default form submission

          const name = document.getElementById('name').value;
          const size = document.getElementById('size').value;
          const address = document.getElementById('billingAddress').value;
          const paymentMethod = document.getElementById('paymentMethod').value;

          // Log order details to the console
          console.log(`Order Details:\nName: ${name}\nSize: ${size}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nCart:`, cart);

          // Clear the cart after submission
          cart = [];
          updateCartDisplay();

          // Show a confirmation message
          showMessage('Thank you for your order! We will process it shortly.');
          orderForm.reset(); // Reset the form
      });
  }

  // Create a cart display section
  const cartSection = document.createElement('div');
  cartSection.id = 'cartDisplay';
  cartSection.style.position = 'fixed';
  cartSection.style.bottom = '10px';
  cartSection.style.right = '10px';
  cartSection.style.backgroundColor = '#fff';
  cartSection.style.border = '1px solid #ccc';
  cartSection.style.padding = '10px';
  cartSection.style.zIndex = '1000';
  document.body.appendChild(cartSection);

  // Create a message display section
  const messageDisplay = document.createElement('div');
  messageDisplay.id = 'messageDisplay';
  messageDisplay.style.position = 'fixed';
  messageDisplay.style.bottom = '50px';
  messageDisplay.style.right = '10px';
  messageDisplay.style.backgroundColor = '#4CAF50';
  messageDisplay.style.color = '#fff';
  messageDisplay.style.padding = '10px';
  messageDisplay.style.zIndex = '1000';
  document.body.appendChild(messageDisplay);
});
// Event listeners for the increase and decrease buttons to adjust quantities
const decreaseButtons = document.querySelectorAll('.fa-minus-circle');
const increaseButtons = document.querySelectorAll('.fa-plus-circle');
const quantityDisplays = document.querySelectorAll('.quantity');

// Function to update the total price
function updateTotalPrice() {
  let totalPrice = 0;

  // Select all the product cards and calculate the total
  const cards = document.querySelectorAll('.card-body');

  cards.forEach(card => {
    const quantity = parseInt(card.querySelector('.quantity').textContent, 10);
    const price = parseInt(card.querySelector('.unit-price').textContent.replace('$', '').trim(), 10);

    if (!isNaN(quantity) && !isNaN(price)) {
      totalPrice += quantity * price;
    }
  });

  // Update the total price display
  const totalPriceDisplay = document.querySelector('.total');
  totalPriceDisplay.textContent = `${totalPrice} $`;
}

// Loop through all the products and add event listeners for the quantity buttons
for (let i = 0; i < decreaseButtons.length; i++) {
  let quantity = 0;  // Initialize quantity for each product

  // Function to update the quantity display and total price
  function updateQuantity() {
    quantityDisplays[i].textContent = quantity;
    updateTotalPrice();  // Update the total price after changing the quantity
  }

  // Event listener for the decrease button
  decreaseButtons[i].addEventListener('click', () => {
    if (quantity > 0) {  // Prevent going below zero
      quantity--;  // Decrease quantity
      updateQuantity();
    }
  });

  // Event listener for the increase button
  increaseButtons[i].addEventListener('click', () => {
    quantity++;  // Increase quantity
    updateQuantity();
  });
}

// Event listeners for the delete buttons to remove items from the cart
const deleteButtons = document.querySelectorAll('.fa-trash-alt');
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    const productCard = deleteButton.closest('.card-body');
    productCard.remove();  // Remove the product card from the DOM
    updateTotalPrice();  // Recalculate the total price after deletion
  });
});

// Event listener for the like buttons (heart)
const likeButtons = document.querySelectorAll('.fa-heart');
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('liked');  // Toggle the liked class
  });
});

// EVENT LISTENER:
// Connects the "ORDER NOW" button to reveal the vendor options.
const orderNowBtn = document.getElementById("order-now-btn");
const vendorSection = document.getElementById("vendor-section");

orderNowBtn.addEventListener("click", function () {
  // Show the vendor section and scroll smoothly to it
  vendorSection.classList.remove("hidden");
  vendorSection.scrollIntoView({ behavior: "smooth" });
});

// VARIABLE:
// Stores which food location the user clicks on.
let currentVendor = "";

// DATA OBJECT:
// Stores separate menus for each food option.
const menus = {
  burgerking: {
    title: "Burger King Menu",
    items: [
      { name: "Whopper Meal", price: 8.99 },
      { name: "Chicken Fries (9 pc)", price: 5.49 },
      { name: "Crispy Chicken Sandwich", price: 6.29 },
      { name: "Medium Fries & Drink", price: 3.99 }
    ]
  },
  pizzeria: {
    title: "Sun's Pizzeria Menu",
    items: [
      { name: "2 Cheese Slices & Soda", price: 6.50 },
      { name: "Pepperoni Pizza Slice", price: 3.75 },
      { name: "Garlic Knots (6 pc)", price: 4.25 },
      { name: "Meatball Sub", price: 7.99 }
    ]
  },
  school: {
    title: "School Lunch Menu",
    items: [
      { name: "Gourmet Turkey Burger", price: 4.50 },
      { name: "Baked Chicken Wings", price: 4.75 },
      { name: "Garden Salad & Roll", price: 3.75 },
      { name: "Thirst Quencher Juice", price: 1.50 }
    ]
  },
  local: {
    title: "Local Corner Deli Menu",
    items: [
      { name: "Turkey & Cheese Sub", price: 6.99 },
      { name: "Chicken Caesar Wrap", price: 6.49 },
      { name: "Chips & Bottled Water", price: 2.50 }
    ]
  }
};

// DOM ELEMENTS:
// Connects JavaScript to the menu display area and back button.
const menuSection = document.getElementById("menu-section");
const menuTitle = document.getElementById("menu-title");
const menuItemsContainer = document.getElementById("menu-items-container");
const backToVendorsBtn = document.getElementById("back-to-vendors-btn");

// FUNCTION:
// Displays the separate menu for the clicked vendor.
function selectVendor(vendorKey) {
  currentVendor = vendorKey;
  const selectedMenu = menus[vendorKey];

  // Update the heading
  menuTitle.textContent = selectedMenu.title;

  // Clear previous menu items
  menuItemsContainer.innerHTML = "";

  // Loop through each item in that vendor's menu and create a card
  selectedMenu.items.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "menu-item-card";
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p class="menu-item-price">$${item.price.toFixed(2)}</p>
      <button class="btn-add-item" onclick="addToCart('${item.name}', ${item.price})">Select Item</button>
    `;
    menuItemsContainer.appendChild(card);
  });

  // Hide vendor cards and show the menu section
  vendorSection.classList.add("hidden");
  menuSection.classList.remove("hidden");
  menuSection.scrollIntoView({ behavior: "smooth" });
}

// EVENT LISTENER:
// Goes back to the vendor choices when the back button is clicked.
backToVendorsBtn.addEventListener("click", function () {
  menuSection.classList.add("hidden");
  vendorSection.classList.remove("hidden");
});

// ARRAY:
// Stores all food items the user adds to their lunch order.
let cart = [];

// DOM ELEMENTS:
// Connects JavaScript to the cart display, total price, and checkout button.
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalPrice = document.getElementById("cart-total-price");
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");

// FUNCTION:
// Adds a selected food item to the cart array and updates the screen.
function addToCart(itemName, itemPrice) {
  cart.push({ name: itemName, price: itemPrice });
  updateCartDisplay();
}

// FUNCTION:
// Removes an item from the cart by its position (index) in the array.
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// FUNCTION:
// Rebuilds the cart list on screen and calculates the total price.
function updateCartDisplay() {
  cartItemsList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `<li class="empty-cart-msg">Your cart is currently empty.</li>`;
    proceedCheckoutBtn.classList.add("hidden");
  } else {
    cart.forEach(function (item, index) {
      total += item.price;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <span>${item.name} — $${item.price.toFixed(2)}</span>
        <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsList.appendChild(li);
    });

    proceedCheckoutBtn.classList.remove("hidden");
  }

  // Update the total dollar amount on screen
  cartTotalPrice.textContent = total.toFixed(2);
}
// DOM ELEMENTS:
// Connects JavaScript to the checkout form, discount input, and final price.
const checkoutSection = document.getElementById("checkout-section");
const checkoutForm = document.getElementById("checkout-form");
const discountCodeInput = document.getElementById("discount-code");
const applyDiscountBtn = document.getElementById("apply-discount-btn");
const discountMessage = document.getElementById("discount-message");
const finalTotalPrice = document.getElementById("final-total-price");

// VARIABLE:
// Tracks whether a valid discount percentage is active (0.10 = 10% off).
let discountRate = 0;

// FUNCTION:
// Calculates the final price after any discount is applied.
function updateFinalTotal() {
  let subtotal = 0;
  cart.forEach(function (item) {
    subtotal += item.price;
  });

  let discountedTotal = subtotal * (1 - discountRate);
  finalTotalPrice.textContent = discountedTotal.toFixed(2);
}

// EVENT LISTENER:
// Reveals the checkout section when "Proceed to Checkout" is clicked.
proceedCheckoutBtn.addEventListener("click", function () {
  updateFinalTotal();
  checkoutSection.classList.remove("hidden");
  checkoutSection.scrollIntoView({ behavior: "smooth" });
});

// EVENT LISTENER:
// Checks the discount code when "Apply" is clicked.
applyDiscountBtn.addEventListener("click", function () {
  const code = discountCodeInput.value.trim().toUpperCase();

  if (code === "TEACHER10") {
    discountRate = 0.10;
    discountMessage.textContent = "10% Staff Discount Applied!";
  } else {
    discountRate = 0;
    discountMessage.textContent = "Invalid code. Try TEACHER10.";
  }

  updateFinalTotal();
});

// EVENT LISTENER:
// Handles submitting the checkout form (Feature 6 will show the full confirmation receipt).
// DOM ELEMENTS:
// Connects JavaScript to the confirmation receipt elements and reset button.
const confirmationSection = document.getElementById("confirmation-section");
const receiptName = document.getElementById("receipt-name");
const receiptTime = document.getElementById("receipt-time");
const receiptItems = document.getElementById("receipt-items");
const receiptTotal = document.getElementById("receipt-total");
const newOrderBtn = document.getElementById("new-order-btn");

// EVENT LISTENER:
// Displays the final order receipt when the checkout form is submitted.
checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Fill in the receipt details
  receiptName.textContent = document.getElementById("staff-name").value;
  receiptTime.textContent = document.getElementById("pickup-time").value;
  receiptItems.textContent = cart.map(function (item) {
    return item.name;
  }).join(", ");
  receiptTotal.textContent = finalTotalPrice.textContent;

  // Hide ordering sections and show the confirmation receipt
  menuSection.classList.add("hidden");
  document.getElementById("cart-section").classList.add("hidden");
  checkoutSection.classList.add("hidden");
  confirmationSection.classList.remove("hidden");
  confirmationSection.scrollIntoView({ behavior: "smooth" });
});

// EVENT LISTENER:
// Resets the app so another lunch order can be placed.
newOrderBtn.addEventListener("click", function () {
  cart = [];
  discountRate = 0;
  checkoutForm.reset();
  discountMessage.textContent = "";
  updateCartDisplay();

  confirmationSection.classList.add("hidden");
  document.getElementById("cart-section").classList.remove("hidden");
  vendorSection.classList.remove("hidden");
  vendorSection.scrollIntoView({ behavior: "smooth" });
});
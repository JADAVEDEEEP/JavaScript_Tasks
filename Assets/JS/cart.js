async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');
  const taxElem = document.getElementById('tax');

  const shipping = 0;
  cartContainer.innerHTML = '';
  let subtotal = 0;

  const products = await fetchProducts();

  cartItems.map((item, index) => {
    const product = products.find((p) => p.id === item.id);

    if (product) {
      subtotal += product.price * item.quantity;

      cartContainer.innerHTML += `
        <div style="display: flex; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem; font-size: 0.9rem; border-radius: 5px;">
          <img src="${product.image}" style="width: 100px; height: 100px; border-radius: 8px; margin-right: 0.5rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);" alt="image">
          <div style="flex-grow: 1;">
              <h5 style="margin: 0; font-size: 1rem; color: #333;">${product.title}</h5>
              <p style="margin: 0; color: #6c757d; font-weight: bold;">Rs ${product.price}</p>
              <div style="display: flex; align-items: center; margin-top: 0.5rem;">
                  <button onclick="updateQuantity(${index}, -1)" style="border: none; background-color: #ddd; padding: 0.2rem 0.4rem; border-radius: 5px; margin-right: 0.5rem; cursor: pointer;">-</button>
                  <span style="margin: 0 0.5rem; font-weight: bold;">${item.quantity}</span>
                  <button onclick="updateQuantity(${index}, 1)" style="border: none; background-color: #ddd; padding: 0.2rem 0.4rem; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;">+</button>
              </div>
          </div>
          <span onclick="removeFromCart(${index})" style="cursor: pointer; color: #000000; font-size: 1.2rem; margin-left: 0.5rem;">✖</span>
        </div>
      `;
    }
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  subtotalElem.textContent = `Rs ${subtotal.toFixed(2)}`;
  taxElem.textContent = `Rs ${tax.toFixed(2)}`;
  totalElem.textContent = `Rs ${total.toFixed(2)}`;
  updateCartIconCount(cartItems.length);
}

function updateCartIconCount(count) {
  const cartCountElem = document.getElementById('count');
  cartCountElem.innerText = count > 0 ? count : '';
}

function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const newQuantity = cart[index].quantity + change;

  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
  } else {
    cart.splice(index, 1);
    Swal.fire({
      title: "Removed",
      text: "Item successfully removed from your cart.",
      icon: "success",
      timer: 2000,
      timerProgressBar: true
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  Swal.fire({
    title: "Deleted",
    text: "Item successfully deleted from your cart.",
    icon: "success",
    timer: 2000,
    timerProgressBar: true
  });
  loadCart();
}

////////////////////////////////////////////////////////////////Procecced to checkout/////////////////////////////////////////////////
function proceedToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartItems.length === 0) {
    Swal.fire({
      title: "Cart Empty",
      text: "Your cart is empty. Add some items before proceeding to checkout.",
      icon: "warning",
      timer: 2000,
      timerProgressBar: true
    });
    return;
  }


  const checkoutData = cartItems.map(item => ({
    title: item.title,
    name: item.name,
    quantity: item.quantity,
    price: item.price
  }));

  localStorage.setItem('checkoutCart', JSON.stringify(checkoutData));

  
  Swal.fire({
    title: "Ready for Checkout",
    text: "Your items are ready for checkout!",
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    allowOutsideClick : false,
  }).then(() => {
 
    window.location.href = 'Checkout.html'; 
  });
}


document.addEventListener('DOMContentLoaded', loadCart);

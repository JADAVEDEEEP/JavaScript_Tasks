function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');
  const taxElem = document.getElementById('tax');

  const shipping = 50; 

  cartContainer.innerHTML = ''; 
  let subtotal = 0;

  cartItems.map((item, index) => {
    subtotal += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div style="display: flex; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
        <img src="${item.image}" alt="${item.title}" style="width: 75px; height: 75px; border-radius: 8px; margin-right: 1rem;">
        <div style="flex-grow: 1;">
          <h5 style="margin: 0;">${item.title}</h5>
          <p style="margin: 0; color: #6c757d;">Rs ${item.price}</p>
          <div style="display: flex; align-items: center; margin-top: 0.5rem;">
            <button onclick="updateQuantity(${index}, -1)" style="border: none; background-color: #ddd; padding: 0.3rem 0.5rem; border-radius: 5px; margin-right: 0.5rem;">-</button>
            <span style="margin: 0 0.5rem;">${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)" style="border: none; background-color: #ddd; padding: 0.3rem 0.5rem; border-radius: 5px; margin-left: 0.5rem;">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${index})" style="border: none; background-color: #dc3545; color: #fff; padding: 0.5rem 1rem; border-radius: 5px;">Remove</button>
      </div>
    `;
  })
 


////////////////////////////////////////////////FOR STUB TOTAL AND TOTAL /////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////UPDATE THE QUNTUTY + OR MINUS - ////////////////////////////////////////
function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}
////////////////////////////////////////////////////////DELETE THE DATA /////////////////////////////////////////////////
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  Swal.fire({
    title: "deleted",
    text: "Item successfully Deleted From your cart.",
    icon: "success",
    timer: 20000, 
    timerProgressBar: true 
});
  loadCart();
}
///////////////////////////////////////////////////////CHECKOUT PROCESS////////////////////////////////
function proceedToCheckout() {
  alert('Proceeding to checkout!');
}
document.addEventListener('DOMContentLoaded', loadCart);

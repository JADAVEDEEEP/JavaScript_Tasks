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
   <div style="display: flex; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem; font-size: 0.9rem; border-radius: 5px;">
  <!-- Image -->
  <img src="${item.image}" style="width: 100px; height: 100px; border-radius: 8px; margin-right: 0.5rem; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);" alt="image ">
  
  <!-- Title -->
  <div style="flex-grow: 1;">
      <h5 style="margin: 0; font-size: 1rem; color: #333;">${item.title}</h5>
      
      <!-- Price -->
      <p style="margin: 0; color: #6c757d; font-weight: bold;">Rs ${item.price}</p>
      
      <!-- Quantity Controls -->
      <div style="display: flex; align-items: center; margin-top: 0.5rem;">
          <button onclick="updateQuantity(${index}, -1)" style="border: none; background-color: #ddd; padding: 0.2rem 0.4rem; border-radius: 5px; margin-right: 0.5rem; cursor: pointer;">-</button>
          <span style="margin: 0 0.5rem; font-weight: bold;">${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)" style="border: none; background-color: #ddd; padding: 0.2rem 0.4rem; border-radius: 5px; margin-left: 0.5rem; cursor: pointer;">+</button>
      </div>
  </div>
  
  <!-- Delete Icon -->
  <span onclick="removeFromCart(${index})" style="cursor: pointer; color: #000000; font-size: 1.2rem; margin-left: 0.5rem;">✖</span>
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

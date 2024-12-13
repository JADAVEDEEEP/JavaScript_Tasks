const addressListElement = document.getElementById("addressList");
const addNewAddressButton = document.getElementById("addNewAddress");
const addressFormContainer = document.getElementById("addressForm");
const form = document.getElementById("form");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
let editingIndex = null;

function showMessage(message, type = "info") {
  const messageContainer = document.createElement("div");
  messageContainer.className = `alert alert-${type} fixed-top w-50 mx-auto mt-3 shadow`;
  messageContainer.innerText = message;
  document.body.appendChild(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}

function displayAddresses() {
  addressListElement.innerHTML = "";
  addresses.forEach((address, index) => {
    addressListElement.innerHTML += `
      <div class="border p-3 rounded-3 mb-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-1">${address.type} <span class="badge bg-secondary">${address.type}</span></h5>
          <p class="mb-0">${address.address}</p>
          <small class="text-muted">${address.phone}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-2" onclick="editAddress(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });
}
////////////////////////////////////////////////////ADD NEW ADRRESS///////////////////////////////////////////////////////////////////
function saveAddress() {
  const type = document.getElementById("type").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!type || !address || !phone) {
    showMessage("Please fill out all fields.", "warning");
    return;
  }

  const newAddress = { type, address, phone };

  if (editingIndex !== null) {
    addresses[editingIndex] = newAddress;
    showMessage("Address updated successfully.", "success");
  } else {
    addresses.push(newAddress);
    showMessage("Address added successfully.", "success");
  }

  localStorage.setItem("addresses", JSON.stringify(addresses));
  resetForm();
  displayAddresses();
}

////////////////////////////////////////////////////////////////////EDIT ADRESSES///////////////////////////////////////////////////////

function editAddress(index) {
  const address = addresses[index];
  document.getElementById("type").value = address.type;
  document.getElementById("address").value = address.address;
  document.getElementById("phone").value = address.phone;
  editingIndex = index;

  addressFormContainer.style.display = "block";
}
/////////////////////////////////////////////DELETE  ADRESSES/////////////////////////////////////////////////////////////////////////////
function deleteAddress(index) {
  addresses.splice(index, 1);
  localStorage.setItem("addresses", JSON.stringify(addresses));
  showMessage("Address deleted successfully.", "danger");
  displayAddresses();
}

function resetForm() {
  form.reset();
  editingIndex = null;
  addressFormContainer.style.display = "none";
}

addNewAddressButton.addEventListener("click", () => {
  resetForm();
  addressFormContainer.style.display = "block";
});

saveButton.addEventListener("click", saveAddress);

cancelButton.addEventListener("click", () => {
  resetForm();
});

displayAddresses();


document.addEventListener('DOMContentLoaded', () => {
  const checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
  const cartContainer = document.getElementById('shipping-cart');
  const orderSummary = document.getElementById('order-summary');
 

  let subtotal = 0;
  checkoutCart.forEach((item) => {
    cartContainer.innerHTML += `
      <div style="margin-bottom: 1rem;">
        <p><strong>Product:</strong> ${item.title}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> Rs ${item.price}</p>
        <p><strong>Total:</strong> Rs ${item.price * item.quantity}</p>
        <hr>
      </div>
    `;
    subtotal += item.price * item.quantity;
  });


  orderSummary.textContent = `Subtotal: Rs ${subtotal.toFixed(2)}`;
});
function placeOrder() {
  const serviceId = 'service_vkcmexa'
  const temepleteId = 'template_9f9dsem'
  const publickey = 'KiTRU_Qt_Dmx7Em5X'

  emailjs.init(publickey)
  emailjs.send(serviceId,temepleteId)
  
  localStorage.removeItem('checkoutCart');
  localStorage.removeItem('cart');

  Swal.fire({
    title: "Order Placed!",
    text: "Your order has been successfully placed.",
    icon: "success",
    timer: 5000, 
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick : false,
  }).then(() => {
   
    window.location.href = 'Index.html'; 
  });
}

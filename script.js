document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault(); 

  
  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;

  const nameError = document.getElementById("nameError");
  const colorError = document.getElementById("errorColor");
  const categoryError = document.getElementById("errorCategory");
  const priceError = document.getElementById("errorPrice");
  const message = document.getElementById('message')

  let isValid = true;

  if (name.trim() === "") {
      nameError.textContent = "Product name is required.";
      isValid = false;
  } else {
      nameError.textContent = "";
  }
  if (color.trim() === "") {
      colorError.textContent = "Product color is required.";
      isValid = false;
  } else {
      colorError.textContent = "";
  }

  if (category.trim() === "") {
      categoryError.textContent = "Product category is required.";
      isValid = false;
  } else {
      categoryError.textContent = "";
  }
  if (price.trim() === "") {
      priceError.textContent = "Product price is required.";
      isValid = false;
  } else if (isNaN(price)) {
      priceError.textContent = "Product price must be a valid number.";
      isValid = false;
  } else {
      priceError.textContent = "";
  }
  if (isValid) {
    addProduct(e);
    message.innerText = 'Product Added Successfully';
    message.style.cssText = 'color: green; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid green; background-color: #e0ffe0; border-radius: 5px;';
    
    setTimeout(() => {
        message.innerText = ''; 
        message.style.cssText = '';
    }, 3000);
} else {
    message.innerText = 'All Fields Are Mandatory';
    message.style.cssText = 'color: red; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid red; background-color: #ffe0e0; border-radius: 5px;';
    
    setTimeout(() => {
        message.innerText = ''; 
        message.style.cssText = '';
    }, 3000);
}
});


////////////////////////////////////////////////////////GET ALL PRODUCTS DATA ///////////////////////////////////////////////////////////////// 

const getProductData = async () => {
  try {
    const response = await axios.get('https://crudnext.onrender.com/api/products', { timeout: 5000 });
    const productData = response.data.result; 
    populateTable(productData); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const populateTable = (data) => {
  const tableBody = document.getElementById('userListBody');
  tableBody.innerHTML = '';
  
  data.forEach((product,index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
     <td>${index+1}</td>
      <td>${product.name}</td>
      <td>${product.color}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>
          <button class="btn btn-primary" onclick="editProduct('${product._id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
      </td>
    `;
    
    tableBody.appendChild(row); 
  });
};
getProductData(); 


/////////////////////////////////////////////////////////////////POST THE DATA ////////////////////////////////////////////////////////////

const addProduct = async (e) => {
  e.preventDefault();  

  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;

  try {
    const response = await axios.post('https://crudnext.onrender.com/api/products', {
      name,
      color,
      category,
      price
    });
    console.log('Product added:', response.data);


    document.getElementById('myForm').reset();
    getProductData();  
  } catch (error) {
    console.error('Error adding product:', error);
  }
};


/////////////////////////////////////////////////////DELETE THE DATA ///////////////////////////////////////////////////////////////////

const deleteProduct = async (id) => {
  try {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      const response = await axios.delete(`https://crudnext.onrender.com/api/products/${id}`);
      if (response.status === 200) {
        alert('Product deleted successfully!');
        getProductData();
      }
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('There was an error deleting the product. Please try again.');
  }
};

/////////////////////////////////////////////////////////EDIT PRODUCT ////////////////////////////////////////////////////////
const editProduct = async (id) => {
  try {
    const response = await axios.get(`https://crudnext.onrender.com/api/products/${id}`);
    const product = response.data.result;

    
    document.getElementById('name').value = product.name;
    document.getElementById('color').value = product.color;
    document.getElementById('category').value = product.category;
    document.getElementById('price').value = product.price;

  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Changes';
    saveButton.type = 'button'; 
    saveButton.id = 'saveChangesButton';
    saveButton.classList.add('btn', 'btn-primary'); 

    const form = document.getElementById('myForm');
    form.appendChild(saveButton);


    const submitButton = document.getElementById('submitBtn');
    if (submitButton) {
      submitButton.style.display = 'none';
    }
    saveButton.addEventListener('click', (e) => updateProduct(e, id));

  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

const updateProduct = async (e, id) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;

  try {
    const response = await axios.put(`https://crudnext.onrender.com/api/products/${id}`, {
      name,
      color,
      category,
      price
    });

    console.log('Product updated:', response.data);

    document.getElementById('myForm').reset();

    const saveButton = document.getElementById('saveChangesButton');
    if (saveButton) {
      saveButton.remove();
    }

    const submitButton = document.getElementById('submitBtn');
    if (submitButton) {
      submitButton.style.display = 'inline-block';
    }

    getProductData(); 
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

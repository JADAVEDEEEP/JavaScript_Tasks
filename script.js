document.getElementById('myForm').addEventListener('submit', (e) => {  
  e.preventDefault(); 

  /////////////////////////////////////////////////////////////SELECT ELEMENTS ////////////////////////////////////////////////////////////////   
  const name = document.getElementById('name').value; 
  const color = document.getElementById('color').value; 
  const category = document.getElementById('category').value; 
  const price = document.getElementById('price').value; 
  

  const nameError = document.getElementById("nameError");   
  const colorError = document.getElementById("errorColor");   
  const categoryError = document.getElementById("errorCategory");   
  const priceError = document.getElementById("errorPrice"); 

  let isValid = true;  

  ///////////////////////////////////////////////////////////VALIDATION LOGIC////////////////////////////////////////////////////////  
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
      priceError.textContent = "Product price must be a number.";  
      isValid = false;  
  } else {  
      priceError.textContent = "";  
  }  
  if (isValid) {  
      alert("Form submitted successfully!");  
  }  
});

///////////////////////////////////////////////////////////////GET ALL PRODUCTS DATA ///////////////////////////////////////////////////////////////// 

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
  
  data.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.color}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-danger">Delete</button>
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
    //here we use get Api Function to stored the newly created data
    getProductData();
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

document.getElementById('myForm').addEventListener('submit', addProduct);


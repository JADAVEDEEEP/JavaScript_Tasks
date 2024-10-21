/////////////////////////////////////////////////////////SELECTING THE ELEMENTS/////////////////////////////////////////////////////////////
const form = document.getElementById("form-value");
const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("Email");
const phoneNumber = document.getElementById("phone");
const gender = document.getElementById("gender");
const city = document.getElementById("city");
const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];//it will get all the child elements of tbody that have been selected from the datatable and 0 is where you are accessing the first child element that should start with the array-like structure

//////////////////////////////////////////////////////////LOGIC SCENARIO////////////////////////////////////////////////////////////////////////
let formData = [];//here we declare the empty array so whenever a new row will be created it would be stored inside this form data every time
let editIndex= null; // track index for editing

form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    //THIS WILL FETCH THE DROP-DOWN VALUES FROM THE SELECTED ITEM LIKE GENDER OR CITY
    const selectedGender = gender.value; //here we are using dropdown fetching values
    const selectCity = city.value; //here we are using the city dropdown and city values
  
    //HERE IS THE CREATED CRUD OBJECT THAT FETCHES ALL THE SELECTED ELEMENTS FROM THE FORM
    const crud = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        gender: selectedGender,
        city: selectCity
    };

    /////////////////////////////////////////////////////////////////POST METHOD/////////////////////////////////////////////////////////////
    if (editIndex === null) { // POST method logic (new entry)
        formData.push(crud);//here we pass the crud object values to the formData array, so it will store the data
    } else { // PUT method logic (edit entry)
        formData[editIndex] = crud; // Update the existing row
        editIndex = null; // Reset the editIndex after updating
    }
    form.reset(); //after the submit it would work like resetting all the input fields
    updateTable(); //here we call the function updateTable to show the updated data stored in formData
});

///////////////////////////////////////////////GET LOGIC USING FOR EACH AND INSERT ROW//////////////////////////////////////////////////
function updateTable() {
    dataTable.innerHTML = ''; //this will ensure that new records are created but don't follow the previous one
    formData.forEach((data, index) => { //here we use the forEach array method which works over objects and passes through every element
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = data.firstName;
        row.insertCell(1).innerText = data.lastName;
        row.insertCell(2).innerText = data.email;
        row.insertCell(3).innerText = data.phoneNumber;
        row.insertCell(4).innerText = data.gender;
        row.insertCell(5).innerText = data.city;
    })
}
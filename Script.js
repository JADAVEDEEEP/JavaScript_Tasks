const form = document.getElementById("form-value");
const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("Email");
const phoneNumber = document.getElementById("phone"); // Ensure this is defined
const gender = document.getElementById("gender");
const city = document.getElementById("city");
const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

/////////////////////////////////////////////////EMPTY ARRAY AND SET THE EDIT INDEX NULL IF NO EXSIXTING VALUES ////////////////////////////////////
let formData = [];
let editIndex = null;
let deleteIndex;

///////////////////////////////////////////////////////////SUBMIT EVENT FOR FORM SUBMIT//////////////////////////////////////////////////
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //////////////////////////////////////////////////DEFUALT ERRRO MESSAGE ///////////////////////////////////////////////////////////////////////
    document.getElementById("name_error").innerText = "";
    document.getElementById("last_error").innerText = "";
    document.getElementById("email_error").innerText = "";
    document.getElementById("phone_error").innerText = "";
    document.getElementById("gender_error").innerText = "";
    document.getElementById("city_error").innerText = "";

    let isValid = true;

    ///////////////////////////////////////////////////////////CUSTOM VALIDATION ////////////////////////////////////////////////////////////////////
    if (!firstName.value) {
        document.getElementById("name_error").innerText = "First Name is required.";
        isValid = false;
    }
    if (!lastName.value) {
        document.getElementById("last_error").innerText = "Last Name is required.";
        isValid = false;
    }
    if (!email.value) {
        document.getElementById("email_error").innerText = "Email Address is required.";
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            document.getElementById("email_error").innerText = "Please enter a valid email address.";
            isValid = false;
        }
    }
    if (!phoneNumber.value) {
        document.getElementById("phone_error").innerText = "Phone Number is required.";
        isValid = false;
    } else {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneNumber.value)) {
            document.getElementById("phone_error").innerText = "Please enter a valid phone number (10 digits).";
            isValid = false;
        }
    }
    if (!gender.value) {
        document.getElementById("gender_error").innerText = "Gender is required.";
        isValid = false;
    }
    if (!city.value) {
        document.getElementById("city_error").innerText = "City is required.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    /////////////////////////////////////////////////////////////STORE THE DATA IN OBJECT AND PUSING IN EMPTY ARRAY //////////////////////////////////
    const selectedGender = gender.value;
    const selectCity = city.value;
    const crud = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        gender: selectedGender,
        city: selectCity
    };

    /////////////////////////////////////////////////////////////LOGIC OF ADD AND UPDATE DATA ////////////////////////////////////////////////////
    if (editIndex === null) {
        formData.push(crud);
    } else {
        formData[editIndex] = crud;
        editIndex = null;
        toggleEditMode(false); // Switch back to normal mode after editing
    }
    form.reset();
    updateTable();
});

///////////////////////////////////////////////////////////////THIS WILL UPDATE ALL THE RECORD AFTER PUSH //////////////////////////////////
function updateTable() {
    dataTable.innerHTML = '';
    formData.forEach((data, index) => {
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = data.firstName;
        row.insertCell(1).innerText = data.lastName;
        row.insertCell(2).innerText = data.email;
        row.insertCell(3).innerText = data.phoneNumber;
        row.insertCell(4).innerText = data.gender;
        row.insertCell(5).innerText = data.city;

        ///////////////////////////////////////////////////DELETE BUTTON CREATED USING JS STYLING AND APPEND PARRENT CHILD ////////////////////////////////
        const actionsCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteRow(index);
        actionsCell.appendChild(deleteButton);

        //////////////////////////////////////////////EDIT BUTTON CREATED USING JS STYLING AND APPEND PARRENT CHILD       
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm ms-2';
        editButton.innerText = 'Edit';
        editButton.onclick = () => editRow(index);
        actionsCell.appendChild(editButton);
    });
}

////////////////////////////////////////////////////////////////////DELETE METHOD/////////////////////////////////////////////////////////////
function deleteRow(index) {
    // Prompt the user for confirmation
    deleteIndex = index; // Set the index of the row to be deleted
    // Show the Bootstrap modal
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

// Handle the confirmation of deletion
document.getElementById("confirmDelete").onclick = function() {
    // Remove the item from the array and update the table
    formData.splice(deleteIndex, 1);
    updateTable();
    // Hide the modal after deletion
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
};

// Handling "No" button in the delete confirmation modal
document.getElementById("cancelDelete").onclick = function() {
    // Hide the modal when the user clicks "No"
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
};

////////////////////////////////////////////////////////////EDIT ROW INDEX///////////////////////////////////////////////////////////////////////
function editRow(index) {
    const data = formData[index];
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    email.value = data.email;
    phoneNumber.value = data.phoneNumber;
    gender.value = data.gender;
    city.value = data.city;

    editIndex = index;
    toggleEditMode(true); // Switch to edit mode
}

//////////////////////////////////////////////////////////////HIDING LOGIC ONE CLICK EVENTS ///////////////////////////////////////////////////////
function toggleEditMode(isEditing) {
    if (isEditing) {
        // Hide submit button and show update/cancel buttons
        document.getElementById("submit-btn").style.display = 'none';
        document.getElementById("update-btn").style.display = 'inline';
        document.getElementById("cancel-btn").style.display = 'inline';
    } else {
        document.getElementById("submit-btn").style.display = 'inline';
        document.getElementById("update-btn").style.display = 'none';
        document.getElementById("cancel-btn").style.display = 'none';
    }
}

///////////////////////////////////////////////////////////////////UPDATE BUTTON ////////////////////////////////////////////////////////////
document.getElementById("update-btn").onclick = function() {
    form.dispatchEvent(new Event('submit'));
};

///////////////////////////////////////////////////////////////////CANCEL BUTTON //////////////////////////////////////////////////////////////
document.getElementById("cancel-btn").onclick = function() {
    editIndex = null;
    form.reset();
    toggleEditMode(false); // Switch back to normal mode
};

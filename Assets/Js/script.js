///////////////////////////////////////////////////////STORE USERS UNDER THE KEY AND USERLIST////////////////////////////////////////////////////////
const users = JSON.parse(localStorage.getItem('users')) || [];
let editUserIndex = null;

displayUsers();

/////////////////////////////////////////////////////////CLICK LOGIC FOR ADD USER///////////////////////////////////////////////////////
document.getElementById('addUser').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('listUserContainer').style.display = "none";
    document.getElementById('userFormContainer').style.display = "block";
    document.getElementById('cancelButton').style.display = "none";
});

//////////////////////////////////////////////////////////////CLICK LOGIC FOR LIST USER /////////////////////////////////////////////
document.getElementById('listUser').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('userFormContainer').style.display = "none";
    document.getElementById('listUserContainer').style.display = "block";
});

///////////////////////////////////////////////////////////////////SUBMIT LOGIC /////////////////////////////////////////////////////
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    /////////////////////////////////////////////////////////////SELECT ELEMENTS ////////////////////////////////////////////////////////////////
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value; 
    const message = document.getElementById('message').value;
    const gender = document.getElementById('gender').value;

    let isValid = true;

    ///////////////////////////////////////////////////////////VALIDATION LOGIC////////////////////////////////////////////////////////
    if (name.trim() === "") {
        document.getElementById('nameError').textContent = "Name is required";
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
        document.getElementById('emailError').textContent = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email";
        isValid = false;
    } else if (users.some((user, index) => user.email === email && index !== editUserIndex)) {
        document.getElementById('emailError').textContent = "This email is already registered";
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }

    if (gender === "") {
        document.getElementById('genderError').textContent = "Gender is required";
        isValid = false;
    } else {
        document.getElementById('genderError').textContent = "";
    }

    if (age.trim() === "" || age < 1 || age > 100) {
        document.getElementById('ageError').textContent = "Please enter a valid age";
        isValid = false;
    } else {
        document.getElementById('ageError').textContent = "";
    }

    const phonePattern = /^\d{10}$/; 
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = "Phone number must be exactly 10 digits";
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = "";
    }

    if (message.trim() === "") {
        document.getElementById('messageError').textContent = "Message is required";
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = "";
    }

    if (isValid) {
        const newId = getNextId(); 
        if (editUserIndex !== null) {
            //////////////////////////////////////////////////////////////EDIT USER //////////////////////////////////////////
            users[editUserIndex] = { ...users[editUserIndex], name, email, age, message, gender, phone };
            editUserIndex = null; 
        } else {
            //////////////////////////////////////////////////////////////ADD NEW USER WITH  ID AND STATUS //////////////////////////////////////////
            const user = { id: newId, name, email, age, message, gender, phone, status: true }; 
            users.push(user); 
        }
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();

        document.getElementById('myForm').reset();
        document.getElementById('userFormContainer').style.display = "none";
        document.getElementById('listUserContainer').style.display = "block";
    }
});

///////////////////////////////////////////////////////// DISPLAY USERS ////////////////////////////////////////////////////////////
function displayUsers() {
    const userListBody = document.getElementById('userListBody');
    userListBody.innerHTML = ''; 

    users.forEach((user, id) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.message}</td>
            <td>${user.gender}</td>
            <td>
                <i class="fas fa-edit" 
                   style="color: green; font-size: 20px; cursor: pointer; margin-right: 10px;" 
                   onclick="editUser(${id})"></i>
                <i class="fas fa-trash" 
                   style="color: red; font-size: 20px; cursor: pointer;" 
                   onclick="deleteUser(${id})"></i>
            </td>
            <td>
                <div class="form-check form-switch">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked-${id}" 
                        ${user.status ? 'checked' : ''}
                        onclick="toggleStatus(${id})"
                    >
                    <label 
                        class="form-check-label" 
                        for="flexSwitchCheckChecked-${id}"
                    >
                        ${user.status ? 'Active' : 'Inactive'}
                    </label>
                </div>
            </td>
        `;

        userListBody.appendChild(row); 
    });
}

//////////////////////////////////////////////////////////TOGGLE USER STATUS ////////////////////////////////////////////////////////////
function toggleStatus(id) {
    users[id].status = !users[id].status; 
    localStorage.setItem('users', JSON.stringify(users)); 
    displayUsers(); 
}

/////////////////////////////////////////////////////////////EDIT USER FUNCTION///////////////////////////////////////////////////////
function editUser(index) {
    editUserIndex = index; 
    const user = users[index];

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age;
    document.getElementById('message').value = user.message;
    document.getElementById('gender').value = user.gender;
    document.getElementById('phone').value = user.phone;

    document.getElementById('userFormContainer').style.display = "block";
    document.getElementById('listUserContainer').style.display = "none";
    document.getElementById('cancelButton').style.display = "inline";
}

//////////////////////////////////////////////////////////////DELETE USER/////////////////////////////////////////////////////////////////////
let userIndexToDelete = null;
function deleteUser(index) {
    userIndexToDelete = index; 
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    deleteModal.show(); 
}
document.getElementById('confirmDelete').addEventListener('click', function() {
    if (userIndexToDelete !== null) {
        users.splice(userIndexToDelete, 1);
        reassignUserIds();
        localStorage.setItem('users', JSON.stringify(users)); 
        displayUsers(); 
        userIndexToDelete = null; 
    }
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    deleteModal.hide(); 
});

//////////////////////////////////////////////////////////GET NEXT ID FUNCTION /////////////////////////////////////////////////////////
function getNextId() {
    return users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
}

/////////////////////////////////////////////////////////REASSIGN USER IDS ///////////////////////////////////////////////////////////
function reassignUserIds() {
    users.forEach((user, index) => {
        user.id = index + 1;
    });
}

//////////////////////////////////////////////////////////////EDIT CANCEL BUTTON /////////////////////////////////////////////////////////
document.getElementById('cancelButton').addEventListener('click', function() {
    editUserIndex = null;
    document.getElementById('myForm').reset();
    document.getElementById('userFormContainer').style.display = "none";
    document.getElementById('listUserContainer').style.display = "block";
});

//////////////////////////////////////////////////CHART SECTION///////////////////////////////////////////////////////////////////////
document.getElementById('statistics').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('listUserContainer').style.display = "none";
    document.getElementById('userFormContainer').style.display = "none";
    document.getElementById('statisticsContainer').style.display = "block";
    deepChart(); 
});
////////////////////////////////////////////////////SET THE LOCAL STORAGE TO FETCH GENDER DATA //////////////////////////////////////////////
function deepChart() {
    const listUser = JSON.parse(localStorage.getItem('users')) || [];
////////////////////////////////////////////////////INCREMENT MALE OR FEMALE ACCORDING TO LOCAL STORAGE DATA ///////////////////////////////////
    let maleCount = 0;
    let femaleCount = 0;

    listUser.forEach(user => {
        if (user.gender === "Male") maleCount++;
        else if (user.gender === "Female") femaleCount++;
    });
/////////////////////////////////////////////////////STYLING JS CATEGORIZE BY MALE AND FEMALE ////////////////////////////////////////////
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartData = {
        labels: ['Male', 'Female'],
        datasets: [{
            label: 'User Statistics by Gender',
            data: [maleCount, femaleCount], 
            backgroundColor: ['#4caf50', '#e91e63'], 
            borderColor: ['#4caf50', '#e91e63'],
            borderWidth: 1 
        }]
    };
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}
///////////////////////////////////////////////////////////////////SERCHING FUCNTIOLITY //////////////////////////////////////////////////////////

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase(); 
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));

    displayFilteredUsers(filteredUsers); 
})
function displayFilteredUsers(filteredUsers) {
    const userListBody = document.getElementById('userListBody');
    userListBody.innerHTML = ''; 
    filteredUsers.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.message}</td>
            <td>${user.gender}</td>
            <td>
                <i class="fas fa-edit" style="color: green; font-size: 20px; cursor: pointer; margin-right: 10px;" onclick="editUser(${user.id})"></i>
                <i class="fas fa-trash" style="color: red; font-size: 20px; cursor: pointer;" onclick="deleteUser(${user.id})"></i>
            </td>
            <td>
                <div class="form-check form-switch">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked-${user.id}" 
                        ${user.status ? 'checked' : ''}
                        onclick="toggleStatus(${user.id})"
                    >
                    <label 
                        class="form-check-label" 
                        for="flexSwitchCheckChecked-${user.id}"
                    >
                        Active
                    </label>
                </div>
            </td>
        `;
        userListBody.appendChild(row); 
    });
}

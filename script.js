////////////////////////////////////////////////////////STORE USERS UNDER THE KEY AND USERLIST////////////////////////////////////////////////////////
const users = JSON.parse(localStorage.getItem('users')) || [];
let editUserIndex = null;

displayUsers();

/////////////////////////////////////////////////////////CLICK LOGIC FOR ADD USER///////////////////////////////////////////////////////
document.getElementById('Add_user').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('listUserContainer').style.display = "none";
    document.getElementById('userFormContainer').style.display = "block";
   
});

//////////////////////////////////////////////////////////////CLICK LOGIC FOR LIST USER /////////////////////////////////////////////
document.getElementById('List_user').addEventListener('click', function(event) {
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
    const message = document.getElementById('message').value;
    const gender = document.getElementById('gender').value;

    let isValid = true;

    ///////////////////////////////////////////////////////////VALIDATION LOGIC////////////////////////////////////////////////////////
    if (name.trim() === "") {
        document.getElementById('name_error').textContent = "Name is required";
        isValid = false;
    } else {
        document.getElementById('name_error').textContent = "";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
        document.getElementById('email_error').textContent = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('email_error').textContent = "Please enter a valid email";
        isValid = false;
    } else {
        document.getElementById('email_error').textContent = "";
    }
    if (gender === "") {
        document.getElementById('gender_error').textContent = "Gender is required";
        isValid = false;
    } else {
        document.getElementById('gender_error').textContent = "";
    }
    if (age.trim() === "" || age < 1 || age > 100) {
        document.getElementById('age_error').textContent = "Please enter a valid age";
        isValid = false;
    } else {
        document.getElementById('age_error').textContent = "";
    }
    if (message.trim() === "") {
        document.getElementById('message_error').textContent = "Message is required";
        isValid = false;
    } else {
        document.getElementById('message_error').textContent = "";
    }
    if (isValid) {
        const newId = getNextId(); 
        if (editUserIndex !== null) {
            //////////////////////////////////////////////////////////////EDIT USER //////////////////////////////////////////
            users[editUserIndex] = { id: users[editUserIndex].id, name, email, age, message, gender };
            editUserIndex = null; 
            
        } else {
            //////////////////////////////////////////////////////////////ADD NEW USER WITH  ID //////////////////////////////////////////
            const user = { id: newId, name, email, age, message, gender }; 
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

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.message}</td>
            <td>${user.gender}</td>
            <td>
                <i class="fas fa-edit" 
                   style="color: green; font-size: 20px; cursor: pointer; margin-right: 10px;" 
                   onclick="editUser(${index})"></i>
                <i class="fas fa-trash" 
                   style="color: red; font-size: 20px; cursor: pointer;" 
                   onclick="deleteUser(${index})"></i>
            </td>
        `;

        userListBody.appendChild(row); 
    });
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
        user.id = index +1;
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
document.getElementById('Statistics').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('listUserContainer').style.display = "none";
    document.getElementById('userFormContainer').style.display = "none";
    document.getElementById('statisticsContainer').style.display = "block";
    deepChart(); 
});
////////////////////////////////////////////////////SET THE LOCAL STOARAGE TO FETCH GENDER DATA //////////////////////////////////////////////
function deepChart() {
    const listUser = JSON.parse(localStorage.getItem('users')) || [];
////////////////////////////////////////////////////INCREMENT MALE OF FEMALE ACCRODING TO LOCALSTORAGE DATA ///////////////////////////////////
    let maleCount = 0;
    let femaleCount = 0;

    listUser.forEach(user => {
        if (user.gender === "Male") maleCount++;
        else if (user.gender === "Female") femaleCount++;
    });
/////////////////////////////////////////////////////STYLING JS CATGORIZE BY MALE AND FEMALE ////////////////////////////////////////////

    const ctx = document.getElementById('myChart').getContext('2d');
    const chartData = {
        labels: ['Male', 'Female'],
        datasets: [{
            label: 'User Statistics by Gender',
            data: [maleCount, femaleCount], 
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)', 
                'rgba(255, 99, 132, 0.2)'  
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 99, 132, 1)' 
            ],
            borderWidth: 1
        }]
    };
//////////////////////////////////////////////////////////////////BAR CHART IMPLEMATIION /////////////////////////////////////////////////
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

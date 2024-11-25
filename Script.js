
// /////////////////////////////////////////////////FAKE USER LOGIN /////////////////////////////////////////

// ///////////////////////////////////////////////////// BANK LIST WITH NEW SECTION /////////////////////////////
////////////////////BANK LIST PREVIOUS CODE //////////////////////////////////////////////

const account1 = {
  owner: "deep jadav",
  balance: 2500,
  transactions: [1000],
  interestRate: 1.2,
  pin: 1111,

  transactionDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2024-11-14T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "sid soni",
  balance: 2500,
  transactions: [100],
  interestRate: 1.5,
  pin: 2222,

  transactionDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = JSON.parse(localStorage.getItem("accounts")) || [
  account1,
  account2,
];
console.log(accounts);

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsername(accounts);

localStorage.setItem("accounts", JSON.stringify(accounts));

// current time

const updateTime = function () {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, "0");
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, "0");
  const min = `${now.getMinutes()}`.padStart(2, "0");
  const seconds = `${now.getSeconds()}`.padStart(2, "0");

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  labelDate.textContent = `${dayName}, ${day}/${month}/${year} Time: ${hour}:${min}:${seconds}`;
};

setInterval(updateTime, 1000);
///

//////////////////////////////////////////////// SELECTING ALL CLASS ELEMENTS FOR DOM MANIPULATION //////////////////////////////////////
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnResgiter = document.querySelector("#btnSubmit");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnSubmit = document.querySelector(".submit-button");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const nameInput = document.querySelector("#userName");
const pinInput = document.querySelector("#useNum");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const updateUI = function (acc) {
  displayMovements(acc.transactions);
  calcDisplayBalance(acc);
};

//////////////////////////////////////////////// IMPLEMENT DOM LOGICS OF BANK LIST /////////////////////////////////////////////
const formatMovementDate = function (date) {
  const calDaysPassed = (date1, date2) =>
    Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayMovements = function (transactions, sort = false) {
  containerMovements.innerHTML = "";
  console.log(transactions, "ttttt");
  const movs = sort ? transactions.slice().sort((a, b) => a - b) : transactions;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // Capture the current date for each transaction
    const currentDate = new Date();
    const displayDate = formatMovementDate(currentDate);

    // Optionally, store the current date in the transactions array for future use
    currentAccount.transactionDates[i] = currentDate; // You can store the current date here

    const formattedMov = new Intl.NumberFormat(currentAccount.locale, {
      style: "currency",
      currency: "INR",
    }).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  });
};

///////////////////////////////// COMPUTING USERNAME ////////////////////////////////////

console.log(accounts);
///////////////////////////////////////////////////// REDUCE METHOD CURRENT BALANCE  //////////////////////////////////////////
const calcDisplayBalance = function (account) {
  const transactionsSum = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = 2500 + transactionsSum; 
  labelBalance.textContent = `${account.balance} INR`;
};
calcDisplayBalance(account1);

////////////////////////////////////////////CREATING DATES IN ACCOUNTS AND LOGIN PART ///////////////////////////////////////////////
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.username.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    
    inputLoginUsername.style.display = "none";
    inputLoginPin.style.display = "none";
    btnLogin.style.display = "none";
    btnSubmit.style.display = "none";


    displayMovements(currentAccount.transactions);
    calcDisplayBalance(currentAccount);

    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));

    messageElement.innerText = "Login successful!";
    messageElement.style.cssText =
      "color: green; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid green; background-color: #e0ffe0; border-radius: 5px;";
    setTimeout(() => {
      messageElement.innerText = "";
      messageElement.style.cssText = "";
    }, 3000);
  } else {
    messageElement.innerText = "Invalid username or PIN.";
    messageElement.style.cssText =
      "color: red; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid red; background-color: #ffe0e0; border-radius: 5px;";
    setTimeout(() => {
      messageElement.innerText = "";
      messageElement.style.cssText = "";
    }, 3000);
  }
});

window.addEventListener("load", function () {
  const storedAccount = JSON.parse(localStorage.getItem("currentAccount"));
  if (storedAccount) {

    currentAccount = storedAccount;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.username.split(" ")[0]
    }`;
    containerApp.style.opacity = 1
    inputLoginUsername.style.display = "none";
    inputLoginPin.style.display = "none";
    btnLogin.style.display = "none";
    btnSubmit.style.display = "none";

    displayMovements(currentAccount.transactions);
    calcDisplayBalance(currentAccount);
  }
});


//////////////////////////////////////////////TRANSFER MONEY USING NAME//////////////////////
const messageElement = document.getElementById("message");
const messageElement2 = document.getElementById("two");

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (!receiverAcc) {
    messageElement.innerText = "Recciver Account Doesnt Exist.";
    messageElement.style.cssText =
      "color: red; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid red; background-color: #ffe0e0; border-radius: 5px;";
    messageElement2.innerText = "";

    setTimeout(() => {
      messageElement.innerText = "";
      messageElement.style.cssText = "";
    }, 3000);
    return;
  }

  console.log(currentAccount.balance, "my current bal");

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.transactions.push(-amount);
    receiverAcc.transactions.push(amount);
    currentAccount.transactionDates.push(new Date());
    receiverAcc.transactionDates.push(new Date());

    displayMovements(currentAccount.transactions);
    calcDisplayBalance(currentAccount);
    messageElement.innerText = `Transfer ${amount}€ to ${receiverAcc.owner} completed.`;
    messageElement.style.cssText =
      "color: green; font-weight: bold; padding: 10px; margin: 5px; border: 1px solid green; background-color: #e0ffe0; border-radius: 5px;";
    messageElement2.innerText = "";

    setTimeout(() => {
      messageElement.innerText = "";
      messageElement.style.cssText = "";
    }, 3000);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  } else {
    messageElement.innerText = "Insufficient Balance";
    messageElement.style.cssText =
      "color: red; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid red; background-color: #ffe0e0; border-radius: 5px;";
    messageElement2.innerText = "";

    setTimeout(() => {
      messageElement.innerText = "";
      messageElement.style.cssText = "";
    }, 3000);
  }
});

/////////////////////////////////////////////////////////////////REQUST LOAN SECTION////////////////////////////////////////////////
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.transactions.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.transactions.push(amount);
    currentAccount.transactionDates.push(new Date());
    updateUI(currentAccount);
    Object.assign(messageElement2, {
      innerText: `Loan of ${amount}€ has been approved and added to your account.`,
      style:
        "color: green; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid green; background-color: #e0ffe0; border-radius: 5px; font-size: 1rem;",
    });

    setTimeout(() => {
      messageElement2.innerText = "";
      messageElement2.style.cssText = "";
    }, 3000);
    messageElement.innerText = "";
  } else {
    //its used to modfied Target propties of message elments 2
    Object.assign(messageElement2, {
      innerText: `Loan denied. Insufficient deposit. Your highest deposit is: ${Math.max(
        ...currentAccount.transactions
      )}€`,
      style:
        "color: red; font-weight: bold; padding: 10px; margin-top: 10px; border: 1px solid red; background-color: #ffe0e0; border-radius: 5px; font-size: 1rem;",
    });

    setTimeout(() => {
      messageElement2.innerText = "";
      messageElement2.style.cssText = "";
    }, 3000);
  }
  inputLoanAmount.value = "";
});

////////////////////////////////////////////////FINDINDEX METHOD WITH CLOSE ACCOUNT//////////////////////////////////

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log("Index to delete:", index);

    if (index !== -1) {
      accounts.splice(index, 1);
      console.log("Account deleted:", accounts);
      containerApp.style.opacity = 0;
    }
  }
});
/////////////////////////////////////////////SORTING MOVMENTS ///////////////////////////
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.transactions, sorted);
});
////////////////////////////////////////////////////////BTN LOGOUT//////////////////////////////////////////////////
const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentAccount");
  containerApp.style.opacity = 0;
  location.reload();
});
///////////////////////////////////////////////////////// CREATION OF NEW USERS //////////////////////////////////////
function savedata() {
  const newAccount = {
    owner: inputLoginUsername.value,
    pin: Number(inputLoginPin.value),
    balance: 1000,
    transactions: [1000],
    transactionDates: [new Date().toISOString()],
    currency: "IND",
    locale: "en-US",
    interestRate: 1.5,
  };
  newAccount.username = newAccount.owner
    .toLowerCase()
    .split(" ")
    .map((name) => name[0])
    .join("");
  accounts.push(newAccount);
  console.log("New account created:", newAccount);
  Object.assign(successMessage, {
    textContent: `🎉 Account successfully created for ${newAccount.owner} with balance ${newAccount.transactions[0]}€`,
    style:
      "color: #155724; font-weight: bold; padding: 15px; margin-top: 15px; border: 1px solid #c3e6cb; background-color: #d4edda; border-radius: 8px; font-size: 1.1rem; font-family: Arial, sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: inline-block;",
  });
  localStorage.setItem("accounts", JSON.stringify(accounts));
  window.location.href = "index.html";
}

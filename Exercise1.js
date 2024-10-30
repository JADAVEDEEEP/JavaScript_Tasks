//1.Write a JavaScript function that reverse a number.

const x= [3,2,2,4,3]
function ReverseNum(...args){
    return args
}
console.log(...x.reverse())

//OUTPUT
//3 4 2 2 3


/*2.Write a JavaScript function that returns a passed string with letters in
alphabetical order.*/

const deep = 'webmaster';

function SortDeep(deep) {
  return deep.split('').sort().join('')
}

console.log(SortDeep(deep)); 

//output
//abeemrstw

/*3.Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case.?*/

let Uppercases = 'the quick brown fox'

function Uppercas(Uppercases){
   return Uppercases.split(' ') //it used to arrange word in to the array sentence 
   .map(word => word.charAt(0).toUpperCase() + word.slice(1)) //char at used to pastined the array and slice will store the oter rest of elment after convert the first elment in uppercase 
   .join(' '); // Join the words back i
}
console.log(Uppercas(Uppercases))

//output
//The Quick Brown Fox


/*4. Write a JavaScript program to calculate number of days left until next Christmas.*/
const today = new Date(); //thats for the curreent date to find out 
let christmas = new Date(today.getFullYear(), 11, 25); // this will set the chritsmas date 

// Calculate the difference in time (in milliseconds) and convert to days
const timeDiff = christmas - today;//here we pass the current date and chritsmas date 
const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));//here wr converted milisweconds in to day

console.log(`Days until Christmas: ${daysLeft}`);

//output
//Days until Christmas: 57

/*5. Write a JavaScript program that accept two integers and display the larger.
*/ 

const number_one = 18
const number_two = 20

if(number_one >number_two)
{
  console.log(`Number ${number_one} is larger Number`)
}else{
  console.log(`Number ${number_two} is larger Number`)
}
//output\
//Number 20 is larger Number

/* 6.Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will
check if the current number is odd or even, and display a message to the screen.
*/

const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
for(i=0;i<array.length;i++){
  if(array[i]%2==0){
    console.log(`${array[i]} is Even`)
  }else{
    console.log(`${array[i]} is odd`)
  }
}
//output
/*1 is odd
2 is Even
3 is odd
4 is Even
5 is odd
6 is Even
7 is odd
8 is Even
9 is odd
10 is Even
11 is odd
12 is Even
13 is odd
14 is Even
15 is odd
*/

/*7. You have an array of numbers. Write a function that  double each number in the array.
*/ 
const numbers = [1, 2, 3, 4, 5];
const num = function(numbers){
  return numbers.map(function(numbers){
        return numbers * 2
  })
} 
const deesp = num(numbers)
console.log(deesp)
//output
//[ 2, 4, 6, 8, 10 ]


/*08.Given an array of ages, write a function that return a new array containing only the ages that are 18 or older.*/

const ages = [12, 17, 19, 20, 15, 30];
const age = ages.filter(function(ages){
  return ages>18
})
console.log(age)
//output
//[ 19, 20, 30 ]

/*10. Given an array of objects representing users, write a function that uses the find() method to return the user which name is Bob with its specific id*/ 

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]
function usersfind(name){
  return users.find(user =>user.name===name)
}
const userbob = usersfind('Bob') 
console.log(userbob)
//output
//{ id: 2, name: 'Bob' }

/*11. Write a function that return a new array containing the first three elements of a given array.
*/ 
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
function newArray(fruits){
  return fruits.reverse().slice(2).sort()
}
console.log(newArray(fruits))
//output
//[ 'Apple', 'Banana', 'Cherry' ]

/*12. You have an array of fruits. Write a function to remove two elements from the array starting from the second position (index 1) and returns the modified array along with the removed elements.

*/ 
const fruit = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

function removeFruits(fruit) {
  const modifiedArray = [...fruit];
    const removedFruits = modifiedArray.splice(1,2)
    return {
        modifiedArray,
        removedFruits    
}
}

const result = removeFruits(fruit);
console.log(result.modifiedArray); // Expected output: ['Apple', 'Cherry', 'Date', 'Elderberry']
console.log(result.removedFruits);  // Expected output: ['Banana', 'Cherry']

/*13.Given an object representing a car with properties like make, model, and year, write a function that returns an array of the object's keys.
*/

const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020,

 cars:function(){
  return Object.keys(this)
 }
}
console.log(car.cars())
//output
//[ 'make', 'model', 'year', 'cars' ]


/*14. Given an object representing a student with properties like name, age, and grade, write a function that returns an array of the object's values.

};
*/ 
const student = {
  name: 'Alice',
  age: 21,
  grade: 'A',

  stud : function(){
    return Object.values(this)
  }
}
console.log(student.stud())
//output
//[ 'Alice', 21, 'A', [Function: stud] ]


/* 15.You have an object that stores product details like name, price, and available. Write a function that returns an array of the object's entries (key-value pairs).
*/

const product = {
  name: 'Laptop',
  price: 999,
  available: true, 
  }
  function prod(product){
    return product
  }
console.log(...product.prod())
//output
//[ 'name', 'Laptop' ] [ 'price', 999 ] [ 'available', true ] [ 'pruc', [Function: pruc] ]


/*16. You have two objects representing user details and contact information. Write a function that combines these two objects into a new object.
};
*/const userDetails = {
  name: 'John',
  age: 30,
};

const contactInfo = {
  email: 'john@example.com',
  phone: '123-456-7890',
};

function deepcombine() {
  return { ...userDetails, ...contactInfo };
}
//this will create javadcript ibject in to the jason string 
console.log(JSON.stringify(deepcombine()));
//output
//{"name":"John","age":30,"email":"john@example.com","phone":"123-456-7890"}


/*17.Given an object representing a book with properties like title, author, and publishedYear, write a function that checks if the object has a property author.
*/const book = {
  title: '1984',
  author: 'George Orwell',
  publishedYear: 1949,
  deep: function() {
      return this.hasOwnProperty('author');
  }
};

console.log(book.deep());
 // Outputs
 //true

 /*18. Given an object representing a movie with properties like title, director, and releaseYear, write a function that returns the number of properties in the object.
};
*/
const movie = {
  title: 'Inception',
  director: 'Christopher Nolan',
  releaseYear: 2010,
};

const exectproperty = (movie) => {
  return Object.keys(movie).length;
};

const prop = exectproperty(movie); 
console.log(prop);
//output
//3

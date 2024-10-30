
/*5. Write a JavaScript program that accept two integers and display the larger.
*/ 
//sir i used the terminal prompt to get user input 
const prompt = require('prompt-sync')();//this will help to get user input insdie the terminal

const number_one = parseInt(prompt("Enter the first number:"));
const number_two = parseInt(prompt("Enter the second number:"));

if (number_one > number_two) {
  console.log(`Number ${number_one} is the larger number`);
} else if (number_one < number_two) {
  console.log(`Number ${number_two} is the larger number`);
} else {
  console.log("Both numbers are equal");
}
//output
/*Enter the first number:10
Enter the second number:20
Number 20 is the larger number*/


/* 6.Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will
check if the current number is odd or even, and display a message to the screen.
*/

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//first i was use the for loop condtion in changes i used the map that will map the all the elments one by one
array.map((num) => {
  if (num % 2 === 0) {
    console.log(`${num} is Even`);
  } else {
    console.log(`${num} is Odd`);
  }
});


/*12. You have an array of fruits. Write a function to remove two elements from the array starting from the second position (index 1) and returns the modified array along with the removed elements.

*/ 

const fruit = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

function removeFruits(fruit) {
  const modifiedArray = [...fruit];
    const removedFruits = modifiedArray.splice(1,2)// as per sir i metioned that i was stuck in the pastion of array but when i R&D and use the second elment to delete  its giving expected the result sir 
    return {
        modifiedArray,
        removedFruits    
}
}

const result = removeFruits(fruit);
console.log(result.modifiedArray); 
console.log(result.removedFruits);
//output
//[ 'Apple', 'Date', 'Elderberry' ]
//[ 'Banana', 'Cherry' ]
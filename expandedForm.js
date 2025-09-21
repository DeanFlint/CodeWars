/*
You will be given a number and you will need to return it as a string in Expanded Form. For example:

  12 --> "10 + 2"
  45 --> "40 + 5"
  70304 --> "70000 + 300 + 4"

NOTE: All numbers will be whole numbers greater than 0.
*/

/*
  Thought process:
Split the number into an array
Map through the array and for each number add the correct amount of 
zeros to the end using the legnth of the array - the current index - 1
Filter out any undefined for zero digits from the array
Join the array with a " + " inbetween each number
*/

function expandedForm(num) {
  let numList = num.toString().split("");
  let expandedNumList = numList.map((x, idx) => {
    if (x !== "0") {
      // length - idx - 1 will tell us how many zeros to add
      return x + "0".repeat(numList.length - idx - 1);
    }
  }).filter(Boolean); // remove undefined for zero digits

  return expandedNumList.join(" + ");
}

console.log(expandedForm(124)); // '100 + 20 + 4'
console.log(expandedForm(12)) // '10 + 2'
console.log(expandedForm(42)) // '40 + 2'
console.log(expandedForm(70304)) // '70000 + 300 + 4'


/*
  Top Voted Solution:
*/
function expandedForm(num) {
  return String(num)
    .split("")
    .map((num, index, arr) => num + "0".repeat(arr.length - index -1 ))
    .filter((num) => Number(num) != 0)
    .join(" + ")
}
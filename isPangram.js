/*
A pangram is a sentence that contains every single letter of the alphabet at least once. 
For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
*/

/* Thought process:
Define the alphabet into a string and split it into an array.
Do the same with the sentence that is passed through but also convert any characters to lowercase.
Using Array.every, iterate through each item in the sentence and if the character is a valid character of the alphabet, add to new array.
This new array will have all lower case characters - no numbers or punctuation.
Using Array.every, check to see that every character of the alphabet is included in the sentence.
*/

function isPangram(string){
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetList = alphabet.split("");
  const sentence = string.toLowerCase().split("");
  const validSentence = [];
  sentence.every((e) => alphabetList.includes(e) ? validSentence.push(e) : validSentence.push(""));
  return alphabetList.every((e) => validSentence.includes(e));
}

console.log(isPangram("The quick brown fox jumps over the lazy dog.")) // true
console.log(isPangram("not a pangram")) // false


/*
Better solution:
*/

function isPangram(string){
	return 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .every((x) => string.toLowerCase().includes(x));
}
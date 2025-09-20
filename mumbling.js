/* 
This time no story, no theory. The examples below show you how to write function accum:

Examples:
accum("abcd") -> "A-Bb-Ccc-Dddd"
accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt") -> "C-Ww-Aaa-Tttt"
The parameter of accum is a string which includes only letters from a..z and A..Z.
*/

/* Thought process:
Split the string into an array of letters.
Create an empty array to hold the new strings.
Loop through the array of letters.
For each letter, push to the new array the letter in uppercase + the letter in lowercase repeated index times.
Join the new array with a hyphen and return the result.
*/

function accum(str) {
	var letters = str.split('');
  var result = [];
  for (var i = 0; i < letters.length; i++) {
    result.push(letters[i].toUpperCase() + Array(i + 1).join(letters[i].toLowerCase()));
  }
  return result.join('-');
}
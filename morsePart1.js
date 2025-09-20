/* 
Thought process:
Split the string into an array by seperating words with three spaces in between to find the words
Split the strings within each word by seperating them with a space in between
*/

decodeMorse = function(morseCode){
  const newList = morseCode.trim().split("   ");
  const lettersInWords = newList.map((w) => w.split(" "))
  const translatedLetters = lettersInWords.map((x) => x.map((y) => MORSE_CODE[y]));
  const sentence = translatedLetters.map((z) => z.join("")).join(" ")
  return sentence;
}

console.log(decodeMorse('.... . -.--   .--- ..- -.. .'));

/*
Top Voted Solution:
*/
decodeMorse = function(morseCode){
  function decodeMorseLetter(letter) {
    return MORSE_CODE[letter];
  }
  function decodeMorseWord(word) {
    return word.split(' ').map(decodeMorseLetter).join('');
  }
  return morseCode.trim().split('   ').map(decodeMorseWord).join(' ');
}
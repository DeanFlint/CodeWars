/*
Who likes it? 
You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

Note: For 4 or more names, the number in "and 2 others" simply increases.
*/

/* 
Thought process:
Create a switch case.
If number of items in list = 1 then return the name + "likes this"
If the number of items in list = 2 then return name[0] + "and" name[1] + "likes this"
If the number of items in list = 3 then return name[0] + "and" name[1] + "and" + name[3] + "likes this"
If the number of items in list = 4 then return name[0] + "," name[1] + "and" + (number of items in list - 2) + "others like this" 
If there are no items in list then return "no one likes this"
*/

function likes(names) {
  switch(names.length){
    case 0:
      return "no one likes this";
    case 1:
      return names[0] + " likes this";
    case 2:
      return names[0] + " and " + names[1] + " like this";
    case 3:
      return names[0] + ", " + names[1] + " and " + names[2] + " like this";
    default:
      return names[0] + ", " + names[1] + " and " + (names.length-2) + " others like this";
  }
}

console.log(likes([]));
// no one likes this

console.log(likes(["Alex"]));
// Alex likes this

console.log(likes(["Alex", "Jacob"]));
// Alex and Jacob like this

console.log(likes(["Alex", "Jacob", "Mark"]));
// Alex, Jacob and Mark like this

console.log(likes(["Alex", "Jacob", "Mark", "Max"]));
// Alex, Jacob and 2 others like this


/*
Top Voted Solution:
*/
function likes(names) {
  names = names || [];
  switch(names.length){
    case 0: return 'no one likes this'; break;
    case 1: return names[0] + ' likes this'; break;
    case 2: return names[0] + ' and ' + names[1] + ' like this'; break;
    case 3: return names[0] + ', ' + names[1] + ' and ' + names[2] + ' like this'; break;
    default: return names[0] + ', ' + names[1] + ' and ' + (names.length - 2) + ' others like this';
  }
}
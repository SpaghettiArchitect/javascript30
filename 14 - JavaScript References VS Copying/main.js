"use strict";

// start with strings, numbers and booleans
let age = 18;
let age2 = age;
console.log(age, age2); // Output: 18 18.
age2 = 21; // Just changes the second variable.
console.log(age, age2); // Output: 18 21.

// Let's say we have an array and we want to make a copy of it.
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// You might think we can just do something like this:
const team = players;
console.log("1:", players, team);

// however what happens when we update that array?
team[3] = "Lux"; // now here is the problem!

// oh no - we have edited the original array too!
console.log("2:", players, team);

// Why? It's because that is an array reference, not an array copy.
// They both point to the same array!

// So, how do we fix this? We take a copy instead!
// one way:
const team2 = players.slice();
team2[3] = "Marie";
console.log("3:", players, team2);

// or create a new array and concat the old one in:
const team3 = [].concat(players);
team3[3] = "Lucy";
console.log("4:", players, team3);

// or use the new ES6 Spread:
const team4 = [...players];
team4[3] = "Kel";
console.log("5:", players, team4);

// or use the Array.from syntax:
const team5 = Array.from(players);
team5[3] = "Poppy";
console.log("6:", players, team5);

// now when we update it, the original one isn't changed.

// The same thing goes for objects, let's say we have a person object
const person = {
  name: "Wes Bos",
  age: 80,
};

// and think we make a copy:
// const captain = person;
// captain.number = 69;
// console.log("7:", person, captain);

// how do we take a copy instead?
const captain2 = Object.assign({}, person, { number: 99 });
console.log("8:", person, captain2);

// or using the object ...spread operator
const captain3 = { ...person, number: 75 };
console.log("9:", person, captain3);

// Things to note - this is only 1 level deep - both for Arrays and Objects.
// lodash has a cloneDeep method, but you should think twice before using it.

const wes = {
  name: "Wes",
  age: 100,
  social: {
    twitter: "@wesbos",
    facebook: "wesbos.developer",
  },
};

const dev = { ...wes };
dev.name = "Wesley"; // It doesn't affect the 'wes' object.
dev.social.twitter = "@cool"; // It also affects the 'wes' object.
console.log("10:", wes, dev);

// Another way to create a deep copy, though not recommended:
const dev2 = JSON.parse(JSON.stringify(wes));
dev2.social.facebook = "new_social"; // It doesn't change the 'wes' object.
console.log("11:", wes, dev2);

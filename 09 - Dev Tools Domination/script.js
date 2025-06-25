"use strict";

const dogs = [
  { name: "Snickers", age: 2 },
  { name: "Hugo", age: 8 },
];

function makeGreen() {
  const p = document.querySelector("p");
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

// Regular
console.log("Hello!");

// Interpolated
console.log("This is a %s string", "awesome");

// Styled
console.log("%c Some styled text", "font-size: 25px; color: red;");

// warning!
console.warn("OH NOOO!");

// Error :|
console.error("Something bad happened!");

// Info
console.info("Did you know? Your eye can see a million different colors");

// Testing
const p = document.querySelector("p");
console.assert(p.classList.contains("bad"), "That's wrong!");

// Clearing
// console.clear();

// Viewing DOM Elements
console.log(p);
console.dir(p); // Show the properties of the object.

// Grouping together
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// Counting
console.count("Joe");
console.count("Joe");
console.count("Joe");
console.count("Joe");

// Timing: How much time does a piece of code take?
console.time("Fetching data");
fetch("https://api.github.com/users/SpaghettiArchitect")
  .then((rawData) => rawData.json())
  .then((data) => {
    console.timeEnd("Fetching data");
    console.log(data);
  });

// Display a nice table
console.table(dogs);

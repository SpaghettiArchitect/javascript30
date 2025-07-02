"use strict";

const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

// Remove the articles 'A', 'An' or 'The' from a string.
function stripArticles(bandName) {
  const regex = /^(?:a|the|an)\b/i;
  return bandName.replace(regex, "").trim();
}

// Sort the list alphabetically, from A to Z.
const sortedBands = bands.toSorted((a, b) => {
  a = stripArticles(a);
  b = stripArticles(b);

  return a > b ? 1 : -1;
});

const list = document.getElementById("bands");

// Add the band names as items of the HTML list.
sortedBands.forEach((bandName) => {
  const newItem = `<li>${bandName}</li>`;
  list.insertAdjacentHTML("beforeend", newItem);
});

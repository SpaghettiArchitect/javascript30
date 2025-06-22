"use strict";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// The Fetch API returns a promise.
fetch(endpoint)
  // When this promise is resolved we need to convert the raw data into a
  // useful format.
  .then((raw) => raw.json())
  // The call to json also returns a promise, so we have to handle it.
  // Here we use the spread operator to populate the cities array.
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  // Filter for cities whose city name or state name matches the query.
  return cities.filter((place) => {
    // Creates a regex obbject to search the string pattern globally
    // and case insensitive.
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches(e) {
  // If the input is empy, just display the instructions.
  if (this.value == "") {
    suggestions.innerHTML = "<li>Filter for a city</li><li>or a state</li>";
    return;
  }

  // Find all matches for the current input.
  const matches = findMatches(this.value, cities);

  const html = matches
    .map((place) => {
      // Highlights the part of the city or state name that was matched.
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      // Add a thousands separator to the population number.
      const population = parseInt(place.population).toLocaleString();

      // Create a new html element for each match found.
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${population}</span>
        </li>
    `;
    })
    .join(""); // Concatenate the array into a large string.

  // Add the elements to the suggestions' list.
  suggestions.innerHTML = html;
}

// Select the html elements that we will use.
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// Display the matches each time the player inputs a new character.
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

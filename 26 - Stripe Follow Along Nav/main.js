"use strict";

const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

// Show the dropdown when the user hovers over the element.
function handleEnter() {
  // Show the div for the current element.
  this.classList.add("trigger-enter");
  // We need to use and arrow function because it inherits 'this' from
  // the lexical context (e.g. this function declaration).
  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);
  background.classList.add("open");

  // Get the coordinates for the current dropdown and the nav.
  // The navCoords are necessary so the dropdown is correctly
  // positioned even if we add more elements before the nav element.
  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  // Calculate the current size of the div container.
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  // Set the size and position of the background div on the current
  // list element.
  background.style.width = `${coords.width}px`;
  background.style.height = `${coords.height}px`;
  background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// Hide the dropdown when the user hover out of the element.
function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

// Add triggers for each element of the nav list.
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);

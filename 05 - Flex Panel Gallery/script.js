"use strict";

// Grab all the panels.
const panels = document.querySelectorAll(".panel");

function toggleOpen() {
  // Expands the width of the panel pressed.
  this.classList.toggle("open");
}

function toggleActive(e) {
  // Show the first and last paragraph of the panel.
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);

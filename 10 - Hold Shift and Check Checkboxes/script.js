"use strict";

const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");

// Keep track of the last ticked checkbox.
let lastChecked;

function handleCheck(e) {
  // Check if the shift key is being pressed AND that the checkbox
  // is being ticked.
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // Loop over every checkbox.
    checkboxes.forEach((checkbox) => {
      // Check if the current checkbox is in between the two
      // ticked checkboxes.
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      // If the checkbox is in between the two ticked checkboxes,
      // then also tick the current checkbox.
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

// Check if any checkbox is being ticked.
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);

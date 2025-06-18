"use strict";
// Get all input elements.
const allInputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  // The suffix is the type of unit to use for the value.
  const suffix = this.dataset.sizing ?? "";
  document.documentElement.style.setProperty(
    `--${this.name}`, // Name of the css variable.
    this.value + suffix // Current value for the input.
  );
}

allInputs.forEach((input) => {
  // Shows the result only when we let go of the input range.
  input.addEventListener("change", handleUpdate);
  // Shows the result while moving the input range.
  input.addEventListener("mousemove", handleUpdate);
});

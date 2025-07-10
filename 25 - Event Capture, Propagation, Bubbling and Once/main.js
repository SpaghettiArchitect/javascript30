"use strict";

const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); // Stop bubbling the event on parent elements.
  // console.log(this);
}

divs.forEach((div) =>
  div.addEventListener("click", logText, {
    // Trigger the event on the capture phase or on the bubbling phase.
    capture: false,
    // Listen for the event once, and then remove the event listener.
    once: true,
  })
);

button.addEventListener(
  "click",
  () => {
    console.log("This event only happens ONCE!");
  },
  { once: true }
);

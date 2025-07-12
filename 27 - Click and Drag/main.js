"use strict";

const slider = document.querySelector(".items");
let isMouseDown = false;
let startX, scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isMouseDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isMouseDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  // Stop the function from running.
  if (!isMouseDown) return;
  e.preventDefault();

  const mouseX = e.pageX - slider.offsetLeft;
  const walk = (mouseX - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});

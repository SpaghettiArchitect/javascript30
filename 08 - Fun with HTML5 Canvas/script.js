"use strict";

const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

// Set the canvas to fill the whole window screen.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Change the default values for the lines.
ctx.lineJoin = "round";
ctx.lineCap = "round";
// ctx.globalCompositeOperation = "soft-light";

// Flags to control the program.
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let augmentWidth = true;

function draw(e) {
  // Stop the function from running when the mouse isn't pressed.
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // Start of the line.
  ctx.lineTo(e.offsetX, e.offsetY); // End of the line
  ctx.stroke();

  // Update the position of the start of the line.
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue = hue > 360 ? 0 : hue + 1; // Prevents hue from going above 360deg.

  // Prevents the lineWidth from becoming too large or too small.
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    augmentWidth = !augmentWidth;
  }

  if (augmentWidth) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  // Update the position of the start of the line.
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", (e) => (isDrawing = false));
canvas.addEventListener("mouseout", (e) => (isDrawing = false));

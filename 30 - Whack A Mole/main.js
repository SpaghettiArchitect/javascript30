"use strict";

const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector("button");

let lastHole;
let timeUp = false;
let score = 0;

// Get a random number for the given range.
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  // Check the new hole for the mole is not the same as the last one.
  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peepMole() {
  const time = randomTime(250, 1000);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peepMole();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  startBtn.style.display = "none";
  peepMole();

  setTimeout(() => {
    timeUp = true;
    startBtn.style.display = "block";
  }, 10000);
}

function bonkMole(e) {
  // If the player tries to cheat the click, return.
  if (!e.isTrusted) return;
  score++;
  // Hide the mole if is clicked.
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonkMole));

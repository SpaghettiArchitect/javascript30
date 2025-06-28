"use strict";

// Elements of the video.
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const playButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

// Funtions to control the video.
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  const playIcon = this.paused ? "►" : "❚ ❚";
  playButton.textContent = playIcon;
}

function skipVideo() {
  video.currentTime += parseInt(this.dataset.skip);
}

// Event listeners for the elements.
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
playButton.addEventListener("click", togglePlay);
skipButtons.forEach((btn) => btn.addEventListener("click", skipVideo));

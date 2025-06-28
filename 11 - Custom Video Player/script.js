"use strict";

// Elements of the video.
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const playButton = player.querySelector(".toggle");
const playButtonIcon = playButton.querySelector("i");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");
const fullscreenButton = player.querySelector(".fullscreen");
const fullscreenButtonIcon = fullscreenButton.querySelector("i");

// Funtions to control the video.

// Plays or pauses the video.
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Changes the symbol inside the play button.
function updatePlayButton() {
  const currentIcon = playButtonIcon.classList[1];
  const newIcon = `bi-${this.paused ? "play" : "pause"}-fill`;

  playButtonIcon.classList.remove(currentIcon);
  playButtonIcon.classList.add(newIcon);
}

// Skips forward of backward in time by the value in data-skip.
function skipVideo() {
  video.currentTime += parseInt(this.dataset.skip);
}

// Changes the volume or the playBack speed.
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Updates the video progress bar.
function handleProgressBar() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

// Update the currentTime of the video when the progress bar is clicked.
function handleVideoSlider(e) {
  const sliderTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = sliderTime;
}

// Display the player element in fullscreen when called.
function displayFullScreen() {
  if (document.fullscreenEnabled) {
    changeFullscreenIcon();

    // If the element is already in fullscreen mode, exit the mode
    // and return immediately.
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    // Put the player in fullscreen mode.
    player.requestFullscreen();
  }
}

// Change the fullscreen icon when called.
function changeFullscreenIcon() {
  const currentIcon = fullscreenButtonIcon.classList[1];
  const newIcon = `bi-${
    document.fullscreenElement ? "fullscreen" : "fullscreen-exit"
  }`;

  fullscreenButtonIcon.classList.remove(currentIcon);
  fullscreenButtonIcon.classList.add(newIcon);
}

// Event listeners for the elements.
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", handleProgressBar);
document.addEventListener("keydown", (e) => e.code === "Space" && togglePlay());

playButton.addEventListener("click", togglePlay);
skipButtons.forEach((btn) => btn.addEventListener("click", skipVideo));
sliders.forEach((slider) =>
  slider.addEventListener("change", handleRangeUpdate)
);

let mouseDown = false;
progress.addEventListener("click", handleVideoSlider);
progress.addEventListener(
  "mousemove",
  (e) => mouseDown && handleVideoSlider(e)
);
progress.addEventListener("mousedown", (e) => (mouseDown = true));
progress.addEventListener("mouseup", (e) => (mouseDown = false));

document.addEventListener(
  "keydown",
  (e) => e.code === "KeyF" && displayFullScreen()
);
fullscreenButton.addEventListener("click", displayFullScreen);

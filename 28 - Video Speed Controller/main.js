"use strict";

const videoSpeed = document.querySelector(".speed");
const speedBar = videoSpeed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

videoSpeed.addEventListener("mousemove", function (e) {
  // VISUAL PART: movement of the bar.

  // Current mouse position on the bar and the percentage that represents.
  const mouseY = e.pageY - this.offsetTop;
  const percent = mouseY / this.offsetHeight;

  // Values for the playback speed.
  const minSpeed = 0.5;
  const maxSpeed = 2.5;

  // Calulate the value of the playbackRate, so it doesn't go below minSpeed
  // or above maxSpeed.
  const playbackRate = (percent * (maxSpeed - minSpeed) + minSpeed).toFixed(1);

  // Display the speed of the video and move the height of the bar to
  // the position of the mouse.
  const heightString = Math.round(percent * 100) + "%";
  speedBar.textContent = playbackRate + "\u00D7";
  speedBar.style.height = heightString;

  // FUNCTIONAL PART: video speed control.
  video.playbackRate = Number(playbackRate);
});

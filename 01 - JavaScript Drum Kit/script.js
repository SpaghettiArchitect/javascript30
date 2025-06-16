"use strict";

function playSound(e) {
  const audioEl = this.document.querySelector(`audio[data-key=${e.code}]`);
  const keyDiv = this.document.querySelector(`.key[data-key=${e.code}]`);
  // Check if the audio for the current key exists.
  if (!audioEl) return;
  audioEl.currentTime = 0; // Rewind to start of audio.
  audioEl.play();
  keyDiv.classList.add("playing");
}

function removeTransition(e) {
  // Skip event if it isn't a tranformation
  if (e.propertyName !== "transform") return;
  // Remove the class 'playing' after the transform ends.
  this.classList.remove("playing");
}

//------------ Event listeners.
const allKeyDivs = this.document.querySelectorAll(".key");
// We need to loop on all key elements so we know if the transition on one
// of them has ended.
allKeyDivs.forEach((key) =>
  key.addEventListener("transitionend", removeTransition)
);
// Play a sounf when any key is pressed.
window.addEventListener("keydown", playSound);

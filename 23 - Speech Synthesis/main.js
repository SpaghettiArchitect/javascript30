"use strict";

const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

// Set the default text to synthetize when the page is first loaded.
msg.text = document.querySelector("[name='text']").value;

// Append all the voices available inside the dropdown.
function populateVoices() {
  // Check is speechSynthesis exists in this browser.
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  // Get the voices available from the browser.
  voices = speechSynthesis.getVoices();

  // Create a new option element and add it to the dropdown.
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.setAttribute("value", voice.name);
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — Default";
    }

    voicesDropdown.appendChild(option);
  });
}

// Set the voice for the message.
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  playMessage();
}

// Synthetize the message with the current values.
function playMessage(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Set the attribute in the message to the current value of the input.
function setOption() {
  msg[this.name] = this.value;
  playMessage();
}

populateVoices();

if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", playMessage);
stopButton.addEventListener("click", () => playMessage(false));

"use strict";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Check if the browser supports speech recognition.
if (SpeechRecognition) {
  alert("SpeechRecognition is available!");
} else {
  alert("SpeechRecognition is not supported in this browser.");
}

const recognition = new SpeechRecognition();
// Return results that are not final.
recognition.interimResults = true;

// Add a new paragraph to the div.
const wordsDiv = document.querySelector(".words");
let p = document.createElement("p");
wordsDiv.appendChild(p);

// Listen for a new result of the speech recognition.
recognition.addEventListener("result", (e) => {
  const transcript = e.results[0][0].transcript;
  p.textContent = transcript;

  // Add a new paragraph when the current transcription ends.
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    wordsDiv.append(p);
  }
});

// Restart the service when the current transcript ends.
recognition.addEventListener("end", (e) => recognition.start());
recognition.start(); // Start the service for the first time.

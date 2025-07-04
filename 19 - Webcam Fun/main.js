"use strict";

const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const photosStrip = document.querySelector(".strip");
const takePhotoButton = document.querySelector(".btn__photo");
const snapSound = document.querySelector(".snap");

// Show the webcam stream into the page.
function getVideoStream() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    // Handle the promise that is returned.
    .then((localMediaStream) => {
      // The video stream is linked to the video element.
      video.srcObject = localMediaStream;
      video.play(); // Refresh the frames continuously.
    })
    // This happens if the user denies access to its webcam.
    .catch((error) => console.error("An error occurred :", error));
}

// Draw a video frame to the canvas every 16ms.
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // Return the unique ID of the interval, so it can be stopped by
  // passing it to clearInterval().
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Take the pixels out.
    let pixels = ctx.getImageData(0, 0, width, height);

    // Apply some filter to the pixels.
    pixels = greenScreen(pixels);
    // ctx.globalAlpha = 0.5;

    // Put the pixels back into the canvas.
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// Take a photo of the current canvas and add it to the strip.
function takePhoto() {
  // Play the sound.
  snapSound.currentTime = 0;
  snapSound.play();

  // Take the data out of the canvas. This encodes the image as Base64.
  const dataURL = canvas.toDataURL("image/png");

  // Create the link for downloading the image.
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "handsome";

  // Create the image inside the link.
  const img = document.createElement("img");
  img.src = dataURL;
  img.alt = "A handsome human being.";
  link.insertAdjacentElement("afterbegin", img);

  // Add the link (and image) inside the photosStrip div.
  // We can also use insertBefore or insertAdjacentElement.
  photosStrip.prepend(link);
}

// VIDEO EFFECTS
function applyRedFilter(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // We don't modify the red value.
    pixels.data[i + 1] = pixels.data[i + 1] * 0.25; // Green.
    pixels.data[i + 2] = pixels.data[i + 2] * 0.25; // Blue.
  }
  return pixels;
}

function splitColors(pixels) {
  const redOffset = 20;
  const greenOffset = -10;
  const blueOffset = 10;

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + redOffset * 4] = pixels.data[i + 0]; // Red.
    pixels.data[i + greenOffset * 4] = pixels.data[i + 1]; // Green.
    pixels.data[i + blueOffset * 4] = pixels.data[i + 2]; // Blue.
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideoStream();

// Runs the painToCanvas function when the video can now be played
// (e.g. getVideoStream has been called).
video.addEventListener("canplay", paintToCanvas);
takePhotoButton.addEventListener("click", takePhoto);

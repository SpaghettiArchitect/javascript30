"use strict";

const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const photosStrip = document.querySelector(".strip");
const takePhotoButton = document.querySelector(".btn__photo");
const snapSound = document.querySelector(".snap");
const filterSelection = document.querySelector("#filter");

let currentFilter = noFilter;

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

  setVideoPosition();
}

// Set the position of the video element to the top-left of the canvas.
function setVideoPosition() {
  video.style.top = `${canvas.offsetTop}px`;
  video.style.left = `${canvas.offsetLeft}px`;
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
    currentFilter(pixels);

    // ctx.globalAlpha = 0.5;

    // Put the pixels back into the canvas.
    ctx.putImageData(pixels, 0, 0);

    // Flip the canvas image horizontally.
    canvas.style.transform = "scaleX(-1)";
  }, 16);
}

// Take a photo of the current canvas and add it to the strip.
function takePhoto() {
  // Play the sound.
  snapSound.currentTime = 0;
  snapSound.play();

  canvas.toBlob((blob) => {
    // Take the data out of the canvas. This encodes the image as Base64.
    const url = URL.createObjectURL(blob);

    // Create the link for downloading the image.
    const link = document.createElement("a");
    link.href = url;
    link.download = "handsome";

    // Create the image inside the link.
    const img = document.createElement("img");
    img.src = url;
    img.alt = "A handsome human being.";
    link.insertAdjacentElement("afterbegin", img);

    // Add the link (and image) inside the photosStrip div.
    // We can also use insertBefore or insertAdjacentElement.
    photosStrip.prepend(link);
  });
}

// VIDEO EFFECTS

// Get the filter function for the filterName.
function getFilter(filterName) {
  switch (filterName) {
    case "green-screen":
      return greenScreen;
    case "red-filter":
      return applyRedFilter;
    case "green-filter":
      return applyGreenFilter;
    case "blue-filter":
      return applyBlueFilter;
    case "glitch-filter":
      return splitColors;
    case "grayscale-filter":
      return applyGrayscale;
    case "sepia-filter":
      return applySepiaFilter;
    case "invert-filter":
      return invertColors;
    default:
      // Don't apply any filter.
      return noFilter;
  }
}

// Changes the current filter applied to the canvas.
function changeFilter(e) {
  currentFilter = getFilter(this.value);

  // Hides the green screen controls if this option isn't selected.
  if (this.value === "green-screen") {
    document.querySelector("fieldset").classList.remove("hide");
  } else {
    document.querySelector("fieldset").classList.add("hide");
  }

  // Update the position of the video element.
  setVideoPosition();
}

// Doesn't change the pixels.
function noFilter(pixels) {
  return pixels;
}

// Make the canvas image appear more red.
function applyRedFilter(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // We don't modify the red value.
    pixels.data[i + 1] = 0; // Green.
    pixels.data[i + 2] = 0; // Blue.
  }
}

// Make the canvas image appear more green.
function applyGreenFilter(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 0; // Red.
    // We don't modify the green value.
    pixels.data[i + 2] = 0; // Blue.
  }
}

// Make the canvas image appear more blue.
function applyBlueFilter(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 0; // Red.
    pixels.data[i + 1] = 0; // Green.
    // We don't modify the blue value.
  }
}

// Applies a glitch filter to the canvas image.
function splitColors(pixels) {
  const redOffset = 20;
  const greenOffset = -10;
  const blueOffset = 10;

  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + redOffset * 4] = pixels.data[i + 0]; // Red.
    pixels.data[i + greenOffset * 4] = pixels.data[i + 1]; // Green.
    pixels.data[i + blueOffset * 4] = pixels.data[i + 2]; // Blue.
  }
}

// Allow the user to remove the background of the canvas image
// if is a green screen.
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];

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
}

// Add a greyscale filter to the canvas image.
function applyGrayscale(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const pixelSum = pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2];
    const pixelAvg = pixelSum / 3;
    pixels.data[i] = pixelAvg; // Red.
    pixels.data[i + 1] = pixelAvg; // Green.
    pixels.data[i + 2] = pixelAvg; // Blue.
  }
}

// Apply a sepia filter to the canvas image.
function applySepiaFilter(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];

    pixels.data[i] = Math.min(
      Math.round(0.393 * red + 0.769 * green + 0.189 * blue),
      255
    ); // Red.
    pixels.data[i + 1] = Math.min(
      Math.round(0.349 * red + 0.686 * green + 0.168 * blue),
      255
    ); // Green.
    pixels.data[i + 2] = Math.min(
      Math.round(0.272 * red + 0.534 * green + 0.131 * blue),
      255
    ); // Blue.
  }
}

// Invert the colors of the canvas image.
function invertColors(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 255 - pixels.data[i]; // Red.
    pixels.data[i + 1] = 255 - pixels.data[i + 1]; // Green.
    pixels.data[i + 2] = 255 - pixels.data[i + 2]; // Blue.
  }
}

// Show the video stream on the page.
getVideoStream();

// Runs the painToCanvas function when the video can now be played
// (e.g. getVideoStream has been called).
video.addEventListener("canplay", paintToCanvas);

takePhotoButton.addEventListener("click", takePhoto);
filterSelection.addEventListener("change", changeFilter);

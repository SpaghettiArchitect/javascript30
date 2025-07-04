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

getVideoStream();

// Runs the painToCanvas function when the video can now be played
// (e.g. getVideoStream has been called).
video.addEventListener("canplay", paintToCanvas);
takePhotoButton.addEventListener("click", takePhoto);

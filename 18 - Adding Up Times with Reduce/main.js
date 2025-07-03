"use strict";

const timeNodes = Array.from(document.querySelectorAll("[data-time]"));

const totalSeconds = timeNodes
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [min, sec] = timeCode.split(":").map(parseFloat);
    return min * 60 + sec;
  })
  .reduce((total, videoSeconds) => total + videoSeconds);

let secondsLeft = totalSeconds;

const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log("Hours:", hours);
console.log("Minutes:", minutes);
console.log("Seconds:", secondsLeft);

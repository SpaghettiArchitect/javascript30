"use strict";

const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

let countdown;

function timer(seconds) {
  // Clear currently running timers.
  clearInterval(countdown);

  // Dates in miliseconds since UNIX epoch.
  const now = Date.now();
  const then = now + seconds * 1000;

  displayEndTime(then);
  displayTimeLeft(seconds); // Immediatly display the time left.

  // Display the time left every second.
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Check if we should stop the timer.
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // Display the time left.
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // const hoursLeft = Math.floor(seconds / 3600);
  // seconds = seconds % 3600;
  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const displayTime = formatTime(minutesLeft, secondsLeft);

  // Update timer on page.
  timerDisplay.textContent = displayTime;
  // Update timer on title of the page.
  document.title = displayTime;
}

function displayEndTime(timestamp) {
  const endDate = new Date(timestamp);

  let endHour = endDate.getHours();
  let meridian = "a.m.";
  if (endHour > 12) {
    endHour -= 12;
    meridian = "p.m.";
  }

  const endMinute = endDate.getMinutes();
  const formattedTime = formatTime(endHour, endMinute);

  endTime.textContent = `Be back at ${formattedTime} ${meridian}`;
}

function formatTime(time1, time2) {
  const paddedTime1 = String(time1).padStart(2, "0");
  const paddedTime2 = String(time2).padStart(2, "0");
  return `${paddedTime1}:${paddedTime2}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((btn) => btn.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const minutes = this.minutes.value;

  timer(minutes * 60);
  this.reset();
});

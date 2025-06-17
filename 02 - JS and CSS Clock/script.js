"use strict";

function setDate() {
  // The offset of each clock hand, so they start pointing to the top.
  const degreeOffset = 90;

  // Get the current seconds, minutes and hours.
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  // Get the degrees for each hand at the current time.
  const secondsDegree = (seconds / 60) * 360 + degreeOffset;
  const minutesDegree = (minutes / 60) * 360 + degreeOffset;
  const hoursDegree = (hours / 12) * 360 + degreeOffset;

  // Set the seconds hand.
  const secondHand = document.querySelector(".second-hand");
  secondHand.style.transform = `rotate(${secondsDegree}deg)`;

  // set the minutes hand.
  const minuteHand = document.querySelector(".min-hand");
  minuteHand.style.transform = `rotate(${minutesDegree}deg)`;

  // Set hour hand
  const hourHand = document.querySelector(".hour-hand");
  hourHand.style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(setDate, 1000);

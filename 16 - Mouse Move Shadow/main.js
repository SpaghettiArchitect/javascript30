"use strict";

const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
const walk = 10; // Pixel limit for the shadow.

function moveShadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  const { clientX: x, clientY: y } = e;

  const xWalk = (x / width) * walk - walk / 2;
  const yWalk = (y / height) * walk - walk / 2;

  text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
  ${xWalk * -1}px ${yWalk * -1}px 0 rgba(0, 255, 255, 0.7)
  `;
}

hero.addEventListener("mousemove", moveShadow);

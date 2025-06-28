"use strict";

const keysPressed = [];
const secretCode = "rainbow";

window.addEventListener("keyup", (e) => {
  keysPressed.push(e.key.toLowerCase());

  // Prevents the array from being filled with all keypresses
  // (we don't want a keylogger). It only stores the last keypresses
  // needed to compare the array with the secretCode.
  keysPressed.splice(
    -secretCode.length - 1,
    keysPressed.length - secretCode.length
  );

  // Show random unicorn/rainbow images on the page, only if the last keys
  // pressed are equal to the secret code.
  if (keysPressed.join("").includes(secretCode)) {
    cornify_add();
  }
});

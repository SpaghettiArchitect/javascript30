"use strict";

const nav = document.querySelector("#main");
const navTop = nav.offsetTop;

// Fix the nav when the user scrolls past it.
function fixNav() {
  if (window.scrollY >= navTop) {
    // Add extra space at the start of the document where the nav was.
    document.body.style.paddingTop = `${nav.offsetHeight}px`;

    // Modifies the style of the document so the nav becomes fixed, the
    // logo appears and the document scales up a little.
    document.body.classList.add("fixed-nav");
  } else {
    document.body.style.paddingTop = "0px";
    document.body.classList.remove("fixed-nav");
  }
}

window.addEventListener("scroll", fixNav);

"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const deleteBtn = document.querySelector(".delete");

// Add a new item to the items array.
function addItem(e) {
  e.preventDefault(); // Stops the page from reloading.

  // Get the value of the input element and create a new item object.
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);

  // Save the items in localStorage, so they persist.
  localStorage.setItem("items", JSON.stringify(items));

  this.reset(); // Reset the default values of the form.
}

// Fills an HTML list with the items of an array.
function populateList(items = [], itemsList) {
  itemsList.innerHTML = items
    .map((item, i) => {
      const isChecked = item.done ? "checked" : "";
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${isChecked} />
        <label for="item${i}">${item.text}</label>
      </li>
    `;
    })
    .join(""); // Map returns an array, but we want a string.
}

function toggleDone(e) {
  // Skip not input events.
  if (!e.target.matches("input")) return;

  // Get the index of the input.
  const element = e.target;
  const index = element.dataset.index;
  const isDone = items[index].done;

  // Toggle the done value of the item (true => false, false => true).
  items[index].done = !isDone;

  // Save the state of current list and display it on the page.
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

// Deletes all elements from the list and localStorage.
function deleteItems(e) {
  // Confirm that the user REALLY wants to delete the list.
  const confirmDeletion = window.confirm(
    "Are you sure? This will delete ALL the elements on the list."
  );
  if (!confirmDeletion) return;

  // Deletes the list and the saved state.
  items.length = 0;
  localStorage.removeItem("items");
  populateList(items, itemsList);
}

// EVENT LISTENERS.
addItems.addEventListener("submit", addItem);

// We listen for the event on the parent element of the list items
// (this is called event delegation).
itemsList.addEventListener("click", toggleDone);

deleteBtn.addEventListener("click", deleteItems);

// Fill the HTML list with the values stored in localStorage
// (if there are any).
populateList(items, itemsList);

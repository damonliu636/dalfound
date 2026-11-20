// js/post.js – post form (WBS 1.1.1). Saving the item is WBS 1.1.2.
import { CATEGORIES, CAMPUS_LOCATIONS, DROP_OFF_LOCATIONS } from "./lists.js";

const form = document.querySelector("#post-form");
const message = document.querySelector("#form-message");
const photoInput = document.querySelector("#photo");
const categorySelect = document.querySelector("#category");
const locationSelect = document.querySelector("#location-found");
const dateInput = document.querySelector("#date-found");
const dropOffSelect = document.querySelector("#drop-off");

fillSelect(categorySelect, CATEGORIES);
fillSelect(locationSelect, CAMPUS_LOCATIONS);
fillSelect(dropOffSelect, DROP_OFF_LOCATIONS);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const photo = photoInput.files[0];
  const item = {
    photo,
    category: categorySelect.value,
    locationFound: locationSelect.value,
    dateFound: dateInput.value,
    dropOff: dropOffSelect.value,
  };

  const errors = validateItem(item);
  if (errors.length > 0) {
    showMessage(errors.join(" "), "error");
    return;
  }

  submitFoundItem(item);
  showMessage(
    "This form is complete and ready to save. Nothing has been stored yet.",
    "ready"
  );
});

function fillSelect(select, values) {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select…";
  select.appendChild(placeholder);

  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}

function validateItem(item) {
  const errors = [];

  if (!item.photo) {
    errors.push("Choose a photo.");
  } else if (!isJpegOrPng(item.photo)) {
    errors.push("The photo must be a JPG or PNG file.");
  }

  if (!item.category) errors.push("Choose a category.");
  if (!item.locationFound) errors.push("Choose the location where the item was found.");
  if (!item.dateFound) {
    errors.push("Enter the date the item was found.");
  } else if (item.dateFound > todayString()) {
    errors.push("The date found cannot be in the future.");
  }
  if (!item.dropOff) errors.push("Choose a drop-off location.");

  return errors;
}

function isJpegOrPng(file) {
  const type = (file.type || "").toLowerCase();
  if (type) return type === "image/jpeg" || type === "image/png";
  const name = file.name.toLowerCase();
  return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png");
}

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function showMessage(text, kind) {
  message.hidden = false;
  message.textContent = text;
  message.className = `form-message ${kind}`;
}

// WBS 1.1.2 replaces this. It should shrink the photo, save the record with
// status "available", show a confirmation, and clear the form.
function submitFoundItem(item) {
  console.log("Validated item ready for 1.1.2", {
    category: item.category,
    locationFound: item.locationFound,
    dateFound: item.dateFound,
    dropOff: item.dropOff,
    photoName: item.photo.name,
    photoType: item.photo.type,
  });
}

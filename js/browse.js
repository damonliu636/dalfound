// js/browse.js – claim pop-up (WBS 1.3.1). Saving the claim is WBS 1.3.2.
// A card needs data-item-id, an img, .item-category, and a .claim-button.

const dialog = document.querySelector("#claim-dialog");
const form = document.querySelector("#claim-form");
const message = document.querySelector("#claim-message");
const photo = document.querySelector("#claim-photo");
const category = document.querySelector("#claim-category");
const nameInput = document.querySelector("#claim-name");
const emailInput = document.querySelector("#claim-email");
const detailInput = document.querySelector("#claim-detail");

let activeItemId = "";

document.querySelector("#item-list").addEventListener("click", (event) => {
  const button = event.target.closest(".claim-button");
  if (!button) return;
  openClaim(button.closest(".item-card"));
});

document.querySelector("#claim-close").addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const claim = {
    itemId: activeItemId,
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    detail: detailInput.value.trim(),
  };

  const errors = validateClaim(claim);
  if (errors.length > 0) {
    showMessage(errors.join(" "), "error");
    return;
  }

  submitClaimRequest(claim);
  showMessage(
    "This claim is complete and ready to save. Nothing has been stored yet.",
    "ready"
  );
});

function openClaim(card) {
  const image = card.querySelector("img");
  activeItemId = card.dataset.itemId;
  photo.src = image.src;
  photo.alt = image.alt;
  category.textContent = card.querySelector(".item-category").textContent;
  form.reset();
  message.hidden = true;
  dialog.showModal();
}

function validateClaim(claim) {
  const errors = [];
  if (!claim.name) errors.push("Enter your name.");
  if (!claim.email) {
    errors.push("Enter your contact email.");
  } else if (!isValidEmail(claim.email)) {
    errors.push("Enter a valid email address.");
  }
  if (!claim.detail) errors.push("Enter a specific detail about the item.");
  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, kind) {
  message.hidden = false;
  message.textContent = text;
  message.className = `form-message ${kind}`;
}

// WBS 1.3.2 replaces this. It should save the item ID, name, email, detail,
// and the time submitted, then show a confirmation.
function submitClaimRequest(claim) {
  console.log("Validated claim ready for 1.3.2", claim);
}

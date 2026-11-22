
 // WBS 1.4.1 - Staff Login

import { auth, db } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

console.log("staff.js loaded");

// Login
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("login-error");

  error.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch {
    error.textContent = "Incorrect email or password.";
  }
});

// Check if user is staff
onAuthStateChanged(auth, async (user) => {
  const login = document.getElementById("login-view");
  const staff = document.getElementById("staff-view");

  login.hidden = false;
  staff.hidden = true;

  if (!user) return;

  try {
    const staffDoc = await getDoc(doc(db, "staff", user.uid));

    if (auth.currentUser?.uid !== user.uid) return;

    if (staffDoc.exists()) {
      document.getElementById("signed-in-as").textContent =
        "Signed in as " + user.email;

      login.hidden = true;
      staff.hidden = false;
    } else {
      await signOut(auth);
      document.getElementById("login-error").textContent =
        "Staff access required.";
    }
  } catch {
    document.getElementById("login-error").textContent =
      "Unable to verify staff access.";
  }
});

// Sign out
document.getElementById("signout-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch {
    alert("Unable to sign out.");
  }
});

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDLpohSUDg3EB_iNRbXLJhvBrhMyps8lBY",
  authDomain: "twonote-8563e.firebaseapp.com",
  databaseURL: "https://twonote-8563e-default-rtdb.firebaseio.com",
  projectId: "twonote-8563e",
  storageBucket: "twonote-8563e.appspot.com",
  messagingSenderId: "811618859430",
  appId: "1:811618859430:web:454c7b39bbf9239a00f767",
  measurementId: "G-J6YNSV8EJG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", (event) => {
  const currentPage = window.location.pathname;

  if (currentPage === "/signin.html") {
    const signInForm = document.getElementById("signin-form");

    if (signInForm) {
      signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            window.location.href = "index.html"; // Redirect to the main page
          })
          .catch((error) => {
            console.error("Error signing in:", error);
          });
      });
    }
  } else if (currentPage === "/index.html") {
    const signOutBtn = document.getElementById("signOutBtn");

    if (signOutBtn) {
      signOutBtn.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            console.log("User signed out");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      });

      onAuthStateChanged(auth, user => {
        if (user != null) {
          console.log('Logged in!');
        } else {
          console.log('No user! Please sign in.');
        }
      });
    }
  }
});

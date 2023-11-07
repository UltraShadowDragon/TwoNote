import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';


// TODO: Replace the following with your app's Firebase project configuration
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
	// document.getElementById("submit").addEventListener("click", save, false);
	// document.getElementById("RETRIEVE").addEventListener("click", retrieve, false);
	$('#exampleModal').on('hide.bs.modal', function (e) { 
		var tmpid = $(document.activeElement).attr('id'); 
		if (tmpid === 'Submit') {
      var notebook = $('#notebook-name').val();
			console.log("Created. " +notebook)
      saveNotebook(notebook);
	  const btncreate = document.querySelector("#Submit");
	  
	  btncreate.addEventListener("click", createPreview);
    }
	});
});

function saveNotebook(notebook) {

	console.log("Saving...");
	// var email = document.getElementById('email').value;
	// var username = document.getElementById('username').value;
	// var password = document.getElementById('password').value;
	// var notebook = document.getElementById('notebook').value;
	// // var section = document.getElementById('section').value;
	// // var page = document.getElementById('page').value;

	set(ref(db, 'notebooks/' + notebook), {
		notebook: notebook
	}).then(() => {
	  console.log('Saved');
	}).catch((error) => {
	  console.error('Error saving to the database:', error);
	});
}

function saveUser(username) {

	console.log("Saving...");
	// var email = document.getElementById('email').value;
	// var username = document.getElementById('username').value;
	// var password = document.getElementById('password').value;
	// var notebook = document.getElementById('notebook').value;
	// // var section = document.getElementById('section').value;
	// // var page = document.getElementById('page').value;

	set(ref(db, 'users/' + username), {
		username: username
	}).then(() => {
	  console.log('Saved');
	}).catch((error) => {
	  console.error('Error saving to the database:', error);
	});
}

function retrieve() {

	console.log("Notebook:" + notebook.value);
	console.log("Page:" + page.value);
	console.log("Section:" + section.value);

	alert("Retrieved")
}

function createPreview() {
	const preview = document.createElement("div");
	const contianer = document.getElementById("allPreview");

	console.log("Add");
	preview.classList.add('pre-box')
	contianer.appendChild(preview);
}

onAuthStateChanged(auth, user => {
  if(user != null){
    console.log('Logged in!');
  } else {
    console.log('No user! Please sign in.')
  }
});


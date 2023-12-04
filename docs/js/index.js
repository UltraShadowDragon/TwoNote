import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, child} from 'firebase/database';
import {v4 as uuidv4} from 'uuid';


const btnOut = document.getElementById('#btnOut');

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
			
			btncreate.addEventListener("click", createPreview(notebook));
		}
	});
	$("#btnOut").click(function(){
		console.log("logged out")
		if (confirm("Are you sure you want to logout?")) {
			window.location.replace("signup.html");
			signOut(auth);		  
		}
	});
	getAllNotebooks();
});

function saveNotebook(notebookname) {

	console.log("Saving...");
	let uuid = uuidv4();

	set(ref(db, 'notebooks/' + uuid), {
		name: notebookname,
		uuid: uuid
	}).then(() => {
	  console.log('Saved');
	}).catch((error) => {
	  console.error('Error saving to the database:', error);
	});
}

function getAllNotebooks() {
	const dbRef = ref(getDatabase());
	get(child(dbRef, 'notebooks')).then((snapshot) => {
		if (snapshot.exists()) {
			for (var key in snapshot.val()) {
				if (snapshot.val().hasOwnProperty(key)) {
					console.log(key + " -> " + snapshot.val()[key]["name"]);
					createPreview(snapshot.val()[key]["name"]);
				}
			}
			// console.log(snapshot.val());
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

function retrieve() {

	console.log("Notebook:" + notebook.value);
	console.log("Page:" + page.value);
	console.log("Section:" + section.value);

	alert("Retrieved")
}

function createPreview(name) {
	// const preview = document.createElement("div");
	// const contianer = document.getElementById("allPreview");

	console.log("Add");
	// preview.classList.add('pre-box')
	// contianer.appendChild(preview);
	$('<div class="card pre-box"></div>').html('<img class="card-img-top" src="https://storage.googleapis.com/media-newsinitiative/images/GO801_GNI_VerifyingPhotos_Card2_image3.original.jpg" alt="Card image cap"><div class="card-body"><p class="card-text">'+name+'</p></div>').appendTo('#allPreview');
	
}

onAuthStateChanged(auth, user => {
  if(user != null){
    console.log('Logged in!');
  } else {
    console.log('No user! Please sign in.')
	window.location.replace("signup.html");
  }
});


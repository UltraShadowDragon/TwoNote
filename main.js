import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, child, orderByChild, equalTo, limitToFirst, limitToLast, query} from 'firebase/database';
import {v4 as uuidv4} from 'uuid';


const btnOut = document.getElementById('#btnOut');
var userEmail = null

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
			var uuid = saveNotebook(notebook);
			const btncreate = document.querySelector("#Submit");
			
			btncreate.addEventListener("click", createPreview(notebook, uuid, '#allPreview'));
		}
	});
	$("#btnOut").click(function(){
		console.log("logged out")
		if (confirm("Are you sure you want to logout?")) {
			window.location.replace("/login/");
			signOut(auth);		  
		}
	});

});

function saveNotebook(notebookname) {

	console.log("Saving...");
	let uuid = uuidv4();

	set(ref(db, 'notebooks/' + uuid), {
		name: notebookname,
		uuid: uuid,
		owner: userEmail
	}).then(() => {
	  console.log('Saved');
	}).catch((error) => {
	  console.error('Error saving to the database:', error);
	});

	return uuid;
}


function getAllNotebooks() {
	const dbRef = ref(getDatabase(), 'notebooks');
  
	get(dbRef).then((snapshot) => {
	  if (snapshot.exists()) {
		console.log('Data snapshot:', snapshot.val());
  
		// Explicitly check and log each notebook before creating a preview
		for (const key in snapshot.val()) {
		  if (snapshot.val().hasOwnProperty(key)) {
			const notebook = snapshot.val()[key];
			console.log('Checking notebook:', notebook);
  
			// Check if the notebook belongs to the current user
			if (notebook.owner.trim() === userEmail) {
				console.log('Notebook belongs to the user. Creating preview.');
				createPreview(notebook.name, notebook.uuid, '#allPreview');
			} else {
				console.log('Notebook does not belong to the user. Skipping.');
			}  
		  }
		}
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	});
}


function showRecentNotebooks(uuid) {
    const dbRef = ref(db, 'notebooks/' + uuid);
	console.log('Hello, world: ',uuid)
    get(child(dbRef, 'name')).then((snapshot) => {
        if (snapshot.exists()) {
			createPreview(snapshot.val(), uuid, '#Recentpreview')
		} else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
  
function getAllRecents() {

    if (userEmail == null) {
        console.log("OH NO!")
        return;
    }
    var strippeduserEmail = userEmail.replace('.', '-');
    console.log(strippeduserEmail);
	//Step 1, get all recents
	//Step 1.5, pick last 5
	//Step 1.75 get their names and their Uuid
	//step 2 make them appear
    const dbRef = ref(db, 'recentlyOpened/' + strippeduserEmail);
    get((dbRef)).then((snapshot) => {
        console.log('Snapshot:',snapshot.val())
        if (snapshot.exists()) {
            let uuidarray = snapshot.val();
            console.log('Uuidarray:', uuidarray);
			let last5 = uuidarray.slice(-5)
			console.log('Last5: ', last5);
			for (let i = uuidarray.length-1; i>=0; i--) {
				showRecentNotebooks(uuidarray[i]);
			}
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error('Error retrieving data:', error);
    });    
}


function retrieve() {

	console.log("Notebook:" + notebook.value);
	console.log("Page:" + page.value);
	console.log("Section:" + section.value);

	alert("Retrieved")
}

function createPreview(name, uuid, contianer) {
	// const preview = document.createElement("div");
	// const contianer = document.getElementById("allPreview");

	console.log("Add");
	// preview.classList.add('pre-box')
	// contianer.appendChild(preview);
	$('<div id="'+uuid+'" class="card pre-box"></div>').html('<img class="card-img-top" src="https://storage.googleapis.com/media-newsinitiative/images/GO801_GNI_VerifyingPhotos_Card2_image3.original.jpg" alt="Card image cap"><div class="card-body"><p class="card-text">'+name+'</p></div>').appendTo(contianer);
	$('#'+uuid).click(function(){
		// localStorage.setItem("twonote.Uuid", uuid)
		window.location.assign("/notebook/?uuid=" +uuid)
	});
}


onAuthStateChanged(auth, user => {
  if(user != null){
	userEmail = user.email
	localStorage.setItem ( 'loggedIn', userEmail ); 
    console.log('Logged in!', userEmail);
	getAllNotebooks();
	getAllRecents();
  } else {
    console.log('No user! Please sign in.')
	  window.location.replace("/login/");
  }
  
});


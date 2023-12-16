import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, child, orderByChild, equalTo, update} from 'firebase/database';


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

var notebookUuid = localStorage.getItem("twonote.Uuid")
console.log(notebookUuid);

document.addEventListener("DOMContentLoaded", (event) => {
    getNotebookByUuid(notebookUuid)
})

let intervalID;

repeat()

function repeat() {
    intervalID = setInterval(saveData, 1000);
}

function getNotebookByUuid(uuid) {
	const dbRef = ref(getDatabase());
	get(child(dbRef, 'notebooks/' +uuid)).then((snapshot) => {
		if (snapshot.exists()) {
            $('#floatingTextarea2').val(snapshot.val()["content"]);
			console.log(snapshot.val()["content"]);
		} else {
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});
}

function saveData() {
    console.log("Saving...");

    var txtValinitial = $("#floatingTextarea2").val();

    addEventListener("input", (event) => {
        var txtVal = $("#floatingTextarea2").val();

        if (txtVal != txtValinitial) {
            console.log(txtVal);
            txtValinitial = txtVal
            update(ref(db, '/notebooks/' +notebookUuid), {
                content: txtVal
            }).then(() => {
                console.log('Saved');
            }).catch((error) => {
                console.error('Error saving to the database:', error);
            });            
        }
    })
}
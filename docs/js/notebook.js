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
    getNotebookByUuid(notebookUuid);
    $('#trumbowyg-demo').trumbowyg();    

    $("#floatingTextarea2").on("input", () => {
        saveData();
    });
});

function getNotebookByUuid(uuid) {
    const dbRef = ref(db, 'notebooks/' + uuid);
    get(child(dbRef, 'content')).then((snapshot) => {
        if (snapshot.exists()) {
            $('#floatingTextarea2').val(snapshot.val());
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function saveData() {
    var txtVal = $("#floatingTextarea2").val();

    update(ref(db, 'notebooks/' + notebookUuid), {
        content: txtVal
    }).then(() => {
        console.log('Saved');
    }).catch((error) => {
        console.error('Error saving to the database:', error);
    });
}

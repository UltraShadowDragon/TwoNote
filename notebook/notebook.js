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

const urlParams = new URLSearchParams(window.location.search);
var notebookUuid = urlParams.get('uuid');

document.addEventListener("DOMContentLoaded", (event) => {
    getNotebookByUuid(notebookUuid);
    // $('#editor').trumbowyg();
    
    // $('#editor').trumbowyg({
    //   plugins: {
    //       fontfamily: true  // Enable the fontfamily plugin
    //   }
    // });
    $.trumbowyg.svgPath = true;

    // $.trumbowyg.svgPath = '/assets/my-custom-path/icons.svg';
    // $.trumbowyg.svgAbsoluteUsePath = true;

    
    $('#editor').trumbowyg({
        svgPath: true,
        btns: [
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'del'],
            ['fontfamily'],
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ],
        plugins: {
            fontfamily: true, // Add this line for the font family plugin
            // Add other plugins here
        },
        // Add other configuration options if needed
    });


    $("#editor").on("input", () => {
        saveData();
    });

});




function getNotebookByUuid(uuid) {
    const dbRef = ref(db, 'notebooks/' + uuid);
    get(child(dbRef, 'content')).then((snapshot) => {
        if (snapshot.exists()) {
            // $('#editor').text(snapshot.val());
            $('#editor').trumbowyg('html', snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function saveData() {
    var txtVal = $("#editor").html();
    console.log(txtVal)
    update(ref(db, 'notebooks/' + notebookUuid), {
        content: txtVal
    }).catch((error) => {
        console.error('Error saving to the database:', error);
    });
}

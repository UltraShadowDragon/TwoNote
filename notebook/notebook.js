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

var userEmail = localStorage.getItem('loggedIn');
console.log(userEmail)

// onAuthStateChanged(auth, user => {
//     if(user != null){
//       userEmail = user.email
//       console.log('Logged in!', userEmail);
//     } else {
//       console.log('No user! Please sign in.')
//         window.location.replace("/login/");
//     }
// });
  


document.addEventListener("DOMContentLoaded", (event) => {
    getNotebookByUuid(notebookUuid);
    
    
    $('#editor').trumbowyg({
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
        svgPath: '#trumbowyg-icons'
    });


    $("#editor").on("input", () => {
        saveData();
    });

    getRecent();

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

$('h1').click(function(){
    window.location.replace("/index.html");
});


function getRecent() {
    if (userEmail === null) {
        console.log("OH NO!")
        return;
    }
    var strippeduserEmail = userEmail.replace('.', '-');
    console.log(strippeduserEmail);

    const dbRef = ref(db, 'recentlyOpened/' + strippeduserEmail);
    get(child(dbRef, 'content')).then((snapshot) => {
        console.log('SNAPSHOT.VAL BETER WORK THIS TIME ',snapshot.val())
        if (snapshot.exists()) {
            let uuidarray = snapshot.val();
            console.log('DSAJFADL;SJFAS;DLKJFASDKL;FJAKL;SDFJ ', uuidarray);
            uuidarray.push(notebookUuid);
            saveRecent(uuidarray);
        } else {
            console.log("No data available");
            saveRecent([notebookUuid]);
        }
    }).catch((error) => {
        console.error(error);
    });
}

function saveRecent(Recents) {
    if (userEmail === null) {
        return;
    }
    var strippeduserEmail = userEmail.replace('.', '-');
    console.log(strippeduserEmail);

	set(ref(db, 'recentlyOpened/' + strippeduserEmail), Recents).then(() => {
	  console.log('Saved');
	}).catch((error) => {
	  console.error('Error saving to the database:', error);
	});
}

// Import the required functions from Firebase Auth SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3hmaa5DKY70in7d8_HT8uLuPnsc58wyo",
    authDomain: "authentication-app-2d849.firebaseapp.com",
    databaseURL: "https://authentication-app-2d849-default-rtdb.firebaseio.com",
    projectId: "authentication-app-2d849",
    storageBucket: "authentication-app-2d849.appspot.com",
    messagingSenderId: "680172971072",
    appId: "1:680172971072:web:d9387667c8bc56052e2ba5"
};

// Initialize Firebase

const resultString = sessionStorage.getItem('result');
const result = JSON.parse(resultString);
const userString = sessionStorage.getItem('user');
const user = JSON.parse(userString);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// if (user != null) { window.location.href = '../edit/index.html'; }
// console.log(result);

// Check for the Google sign-in redirect result after the "Join with Google" button is clicked
document.addEventListener('DOMContentLoaded', () => {
    getRedirectResult(auth)
        .then((result) => {
            if (result == null) {
                return;
            }
            if (result.user) {
                // Google sign-in successful
                const user = result.user;
                alert('Hello ' + user?.displayName + ' (Google)');

            } else {

            }
        })
        .catch((error) => {
            const errorMessage = error;
            alert(error);
            // ...
        });
    // var buttonHTML = '<button id="Trial" class="start-button google-btn">Experimente</button>';
    // document.body.insertAdjacentHTML('afterbegin', buttonHTML);
    // Add an event listener to the "Join with Google" button
    // document.querySelectorAll('.google-btn').forEach((button) => {
    //     button.addEventListener('click', (e) => {
    //         console.log(auth);
    //         console.log(provider);
    //         signInWithPopup(auth, provider)
    //             .then((result) => {
    //                 console.log("this is result", result);
    //                 const user = result?.user;
    //                 sessionStorage.setItem('result', JSON.stringify(result));
    //                 sessionStorage.setItem('user', JSON.stringify(user));
    //                 window.location.href = '../home/index.html';

    //             })
    //             .catch((error) => {
    //                 const errorMessage = error;
    //                 alert(errorMessage);
    //             });
    //     });
    // });
});


// signOut(auth).then(() => {
//     user == null;
//     sessionStorage.removeItem('result');
//     sessionStorage.removeItem('user');
//     console.log('User signed out.');

// }).catch((error) => {
//     // An error happened.
// });
// log-out-button-set
// if (user?.displayName) {
//     document.getElementById('displayName').textContent = 'Hello ' + user.displayName;
//     document.getElementById('logout-button').style.display = 'inline-flex';
// }
var googleEmail = user?.email; // 這應該被替換為用戶的Google帳號
window.onload = function () {
    var googleEmail = user?.email;
    var emailElement = document.getElementById('email');
    if (emailElement.textContent !== googleEmail) {
        window.location.href = '../home/index.html';
    }
};

var jsonString = JSON.stringify({ email: googleEmail });
localStorage.setItem("googleEmail", jsonString);
export { user };

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

// Add an event listener to the "Join with Google" button
document.querySelector('.google-btn').addEventListener('click', (e) => {
    console.log(auth);
    console.log(provider);
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("this is result", result);
            // Google sign-in successful
            const user = result?.user;
            alert('Hello ' + user?.displayName + ' ');
            document.getElementById('displayName').innerText = 'Hello ' + user?.displayName + ' (Google)';
            sessionStorage.setItem('result', JSON.stringify(result));
            sessionStorage.setItem('user', JSON.stringify(user));
            location.reload();
            // ...
        })
        .catch((error) => {
            const errorMessage = error;
            alert(errorMessage);
            // ...
        });
});
if (user != null) { console.log(user); }

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
});



//登出按鈕
document.getElementById('logout-button').addEventListener('click', () => {

    const auth = getAuth();
    signOut(auth).then(() => {
        sessionStorage.removeItem('result');
        sessionStorage.removeItem('user');
        console.log('User signed out.');
        location.reload();
    }).catch((error) => {
        // An error happened.
    });
    window.location.href = './wbloom-1/index.html';
});

// log-out-button-set
if (user?.displayName) {
    document.getElementById('displayName').textContent = 'Hello ' + user.displayName;
    document.getElementById('logout-button').style.display = 'inline-flex';
}


if (window.location.pathname.includes('/wbloom-3/')) {
    ['userzone', 'generateButton'].forEach(id => document.getElementById(id)?.remove());
    //這裡的問號叫做可選鏈接，如果沒有的話則會返回undefind，而非錯誤
}


export { user };


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
if (user != null) { document.getElementById('displayName').innerText = 'Hello ' + user?.displayName + ' (Google)'; }

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

});

// log-out-button-set
if (user?.displayName) {
    document.getElementById('displayName').textContent = 'Hello ' + user.displayName;
    document.getElementById('logout-button').style.display = 'inline-flex';
}


//圖片上傳機制
document.addEventListener('DOMContentLoaded', () => {
    let userEmail = user?.email; // 假設這是使用者的電子郵件地址
    let upperLimit = 15; // 自行設定上限值


    let tagIdArray = ["a1", "a2", "a3", "a4", "b1", "b2", "c1", "c2", "c3", "c4"]; // 假設這是 tagNames 陣列

    for (let i = 0; i < tagIdArray.length; i++) {
        let tagId = tagIdArray[i];
        let ImageUrl = `./upload/${user?.email}${tagId}.jpg`;
        const dynamicImage = document.getElementById(tagId);

        // Send user data to PHP using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'Upload.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log('User data sent to PHP');
            }
        };


        // 更新圖片 URL 並設定給 img 標籤的 src 屬性
        function updateImage() {
            dynamicImage.src = ImageUrl;
        }

        // 初始設定
        updateImage();

        // 新增的 HTML 內容
        const newHtmlContent = `
            <form id="uploadForm_${tagId}" class="uploadform form" action="imgUpload.php" method="post" enctype="multipart/form-data">
                <label for="file">選擇要上傳的文檔：</label>
                <input type="file" class="file" name="file" id="file"><br>
                <input type="hidden" name="user_data" class="user_data_field" value="">
                <input type="hidden" name="tag_name" value="${tagId}">
                <input class="submitButton styled-button" type="submit" value="upload">
            </form>
        `;

        // 在每個 imgTagElement 之後插入新的 HTML 內容
        dynamicImage.insertAdjacentHTML('afterend', newHtmlContent);
        const user_data_field = document.querySelector(`#uploadForm_${tagId} .user_data_field`);
        user_data_field.value = userEmail;

        // Convert user object to JSON string
        const userStringify = JSON.stringify(user);


        xhr.send(JSON.stringify({ user: userStringify }));
    }
});

export { user };

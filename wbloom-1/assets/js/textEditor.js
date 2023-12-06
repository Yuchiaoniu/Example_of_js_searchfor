import { user } from './firebase.js';

//文字上傳機制

//可編輯事件
function makeEditable(element) {
    element.contentEditable = true;
    element.focus();
}
// 選取所有的 <h1> 和 <p> 標籤
var headings = document.querySelectorAll("h1");
var paragraphs = document.querySelectorAll("p");

// 對選取的 <h1> 元素和 <p> 元素添加事件處理程序
for (var i = 0; i < headings.length; i++) {
    headings[i].addEventListener("dblclick", function () {
        makeEditable(this);
    });
}

for (var j = 0; j < paragraphs.length; j++) {
    paragraphs[j].addEventListener("dblclick", function () {
        makeEditable(this);
    });
}

//先對所有的title和paragraph添加class，然後再用添加的class去改變原id
//對t和p~做出遍歷識別，對上傳的檔案做出遍歷識別

// 在模組內部定義 makeEditable 函式


document.addEventListener('DOMContentLoaded', () => {
    var userEmail = user?.email;
    console.log(userEmail);
    let titleIdArray = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16"];
    let paragraphIdArray = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p13"];
    // dom提交按紐和p標籤，將p標籤內容上傳到伺服器

    // 新增title的class
    for (var i = 0; i < titleIdArray.length; i++) {
        var titleId = titleIdArray[i];
        // console.log(titleId);
        var element = document.getElementById(titleId);

        if (element) {
            // 如果找到具有相應 id 的標籤，添加 classname
            element.classList.add("titleEditable");
        }
    }
    // 新增title的class
    for (var i = 0; i < paragraphIdArray.length; i++) {
        var paragraphIdArrayId = paragraphIdArray[i];
        // console.log(paragraphIdArrayId);
        var element = document.getElementById(paragraphIdArrayId);

        if (element) {
            // 如果找到具有相應 id 的標籤，添加 classname
            element.classList.add("paragraphEditable");
        }
    }

    // 取得所有具有 "textEditable" 和 "paragraphEditable"類別的元素
    var titleEditableElements = document.getElementsByClassName("titleEditable");
    var paragraphEditableElements = document.getElementsByClassName("paragraphEditable");

    // 將這些元素存儲在陣列中
    var titlesArray = Array.from(titleEditableElements);
    var paragraphsArray = Array.from(paragraphEditableElements);

    // 遍歷陣列並更改每個元素的 id
    for (var i = 0; i < titleIdArray.length; i++) {

        if (i < titleIdArray.length) { // 確保有足夠的新 id 值供使用
            titlesArray[i].id = "editableText" + titleIdArray[i];
            var titlesIdArray = titlesArray[i].id;
            const dynamicText = document.getElementById(titlesIdArray);
            const newTextContent = `<div class="center"><button id="saveButton${titlesIdArray}" class="textEditable styled-button">Save Text</button></div>`;
            dynamicText.insertAdjacentHTML('afterend', newTextContent);
        }
    }
    for (var i = 0; i < paragraphIdArray.length; i++) {

        if (i < paragraphIdArray.length) { // 確保有足夠的新 id 值供使用
            paragraphsArray[i].id = "editableText" + paragraphIdArray[i];
            var paragraphsIdArray = paragraphsArray[i].id;
            // console.log(paragraphsIdArray);
            const dynamicText = document.getElementById(paragraphsIdArray);
            const newTextContent = `<div class="center"><button id="btn${paragraphsIdArray}" class="textEditable styled-button">Save Text</button></div>`;
            dynamicText.insertAdjacentHTML('afterend', newTextContent);
        }
    }

    // 遍歷集合並為每個元素添加事件監聽器
    // 選取所有具有 "textEditable" 類別的按鈕
    var saveButtons = document.querySelectorAll(".textEditable");

    // 對選取的按鈕添加事件處理程序
    saveButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 獲取相關的文本編輯區域（即按鈕的前一個兄弟元素）
            var editedText = button.previousElementSibling.innerText;
            var tagId = button.previousElementSibling.id;
            console.log(tagId);


            // 發送 POST 請求，處理編輯的文本
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "textUpload.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log("Text saved successfully.");
                    window.location.href = 'textUpload.php';
                }
            };
            xhr.send("editedText=" + encodeURIComponent(editedText) + "&tagId=" + encodeURIComponent(tagId) + "&userEmail=" + encodeURIComponent(userEmail));

            alert("update!");
            location.reload(true);
        });
    });

    var titles = document.querySelectorAll(".titleEditable");
    var paragraphs = document.querySelectorAll(".paragraphEditable");

    titles.forEach(function (titlesElement) {
        var titlesId = titlesElement.id;

        fetchTitlesTextFile(userEmail, titlesId);
    });
    paragraphs.forEach(function (paragraphsElement) {
        var paragraphsId = paragraphsElement.id;

        fetchParagraphsTextFile(userEmail, paragraphsId);
    });


    // 對選取的按鈕添加事件處理程序


    function fetchTitlesTextFile(userEmail, titlesId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${titlesId}.txt`;

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.text();
            })
            .then(fileContent => {
                // 將內容填充到適當的元素中
                sessionStorage.setItem('fileContent', fileContent);
                const fileContents = sessionStorage.getItem('fileContent');

                // 使用 titlesId 來動態設置相應的元素 ID
                document.getElementById(titlesId).innerText = fileContents;

                // 在這裡為元素添加雙擊事件監聽器
                document.getElementById(titlesId).addEventListener("dblclick", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
    function fetchParagraphsTextFile(userEmail, titlesId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${titlesId}.txt`;
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.text();
            })
            .then(fileContent => {
                // 將內容填充到適當的元素中
                sessionStorage.setItem('fileContent', fileContent);
                const fileContents = sessionStorage.getItem('fileContent');
                console.log(fileContent);
                // 使用 titlesId 來動態設置相應的元素 ID
                document.getElementById(titlesId).innerText = fileContents;

                // 在這裡為元素添加雙擊事件監聽器
                document.getElementById(titlesId).addEventListener("dblclick", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
});
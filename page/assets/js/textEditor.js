import { user } from './firebase.js';

//文字上傳機制

document.addEventListener('DOMContentLoaded', () => {
    var userEmail = user?.email;
    // console.log(userEmail);

    //製作可編輯標籤
    // function makeEditable(element) {
    //     element.contentEditable = true;
    //     element.focus();
    // }
    // 選取所有的 <h1> 和 <p> 標籤
    var headings = document.querySelectorAll("h1");
    var paragraphs = document.querySelectorAll("p");

    // 對選取的 <h1> 元素和 <p> 元素添加事件處理程序
    for (let i = 0; i < headings.length; i++) {
        // headings[i].addEventListener("click", function () {
        //     makeEditable(this);
        // });
        headings[i].id = 't' + i;
        const dynamicText = document.getElementById('t' + i);
        const newTextContent = `<div class="center"><button id="saveButton${headings[i].id}" class="textEditable styled-button">Save Text</button></div>`;
        dynamicText.insertAdjacentHTML('afterend', newTextContent);
        // 如果找到具有相應 id 的標籤，添加 classname
        headings[i].classList.add("titleEditable");
    }

    for (var j = 0; j < paragraphs.length; j++) {
        // paragraphs[j].addEventListener("click", function () {
        //     makeEditable(this);
        // });
        paragraphs[j].id = 'p' + j;
        const dynamicText = document.getElementById('p' + j);
        const newTextContent = `<div class="center"><button id="saveButton${paragraphs[j].id}" class="textEditable styled-button">Save Text</button></div>`;
        dynamicText.insertAdjacentHTML('afterend', newTextContent);
        // 如果找到具有相應 id 的標籤，添加 classname
        paragraphs[j].classList.add("paragraphEditable");

    }
    document.querySelectorAll('a').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            // 您的其他程式碼
        });
    });

    // 上傳文件

    var saveButtons = document.querySelectorAll(".textEditable");//選取所有的按鈕
    saveButtons.forEach(function (button) {

        button.addEventListener("click", function () {
            // 獲取相關的文本編輯區域（即按鈕的前一個兄弟元素）
            var editedText = button.parentElement.previousElementSibling.innerText;
            var tagId = button.parentElement.previousElementSibling.id;
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


    //抓取文件
    function fetchTitlesTextFile(userEmail, titlesId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${titlesId}.txt`;

        // 添加一個唯一的查詢參數（當前的時間戳）
        var url = filePath + "?t=" + new Date().getTime();

        fetch(url)
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
                document.getElementById(titlesId).addEventListener("click", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                // console.error("Fetch error:", error);
            });
    }
    function fetchParagraphsTextFile(userEmail, paragraphsId) {
        // 動態生成文件路徑，例如：./user_email_t1.txt 或 ./user_email_t2.txt
        var filePath = `./${userEmail}${paragraphsId}.txt`;

        // 添加一個唯一的查詢參數（當前的時間戳）
        var url = filePath + "?t=" + new Date().getTime();

        fetch(url)
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
                // console.log(fileContent);
                // 使用 titlesId 來動態設置相應的元素 ID
                document.getElementById(paragraphsId).innerText = fileContents;

                // 在這裡為元素添加雙擊事件監聽器
                document.getElementById(paragraphsId).addEventListener("dblclick", function () {
                    makeEditable(this);
                });
            })
            .catch(error => {
                // console.error("Fetch error:", error);
            });
    }
    document.querySelectorAll('.styled-button').forEach(function (element) {
        element.parentNode.removeChild(element);
    });
});
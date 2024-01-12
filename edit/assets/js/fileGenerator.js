import { user } from './firebase.js';
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', function () {
        // 當按鈕被點擊時，執行以下代碼
        var email = user?.email; // 這裡應該是email變數

        // 獲取整個HTML文件的內容
        const htmlContent = document.documentElement.outerHTML;

        // 獲取網頁的標題作為 brandName
        var brandName = document.title;

        // 發送 HTTP 請求到伺服器端的 PHP 腳本
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "documentUpload.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // 根據伺服器的回應來處理警告訊息和頁面跳轉
                if (xhr.responseText === "Invalid request method.") {
                    alert("Please name your page");
                } else if (xhr.responseText === "File name already exists.") {
                    alert("The page name is duplicated");
                    document.getElementById("t0").focus();
                } else {
                    console.log(xhr.responseText);
                    // 根據伺服器的回應來決定跳轉的網址
                    var response = xhr.responseText.split(" ");
                    var filePath = response[response.length - 1];
                    var fileName = filePath.split("/").pop();
                    if (xhr.responseText.includes("Page created successfully")) {
                        window.location.href = 'https://www.order.scholar.ovh/checkout?email=' + encodeURIComponent(email) + '&brandName=' + encodeURIComponent(brandName);
                    } else {
                        window.location.href = '../../../page/' + fileName;
                        console.log(fileName);
                    }
                }
            }
        };
        // 將JS變數的值、email和HTML內容一起傳遞到伺服器端，記得要編碼
        xhr.send("&email=" + encodeURIComponent(email) + "&htmlContent=" + encodeURIComponent(htmlContent) + '&brandName=' + encodeURIComponent(brandName));
    });
});
document.getElementById('Trial').style.display = 'none';
document.getElementById('generateButton').style.display = 'flex';

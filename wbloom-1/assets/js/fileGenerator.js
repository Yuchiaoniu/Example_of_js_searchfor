// 檔案生成機制
const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', () => {
    // 獲取整個HTML文件的內容
    const htmlContent = document.documentElement.outerHTML;

    // 發送 HTTP 請求到伺服器端的 PHP 腳本
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "documentUpload.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Text saved successfully.");
        }
    };

    // 將HTML內容傳遞到伺服器端，記得要編碼
    xhr.send("htmlContent=" + encodeURIComponent(htmlContent));
});

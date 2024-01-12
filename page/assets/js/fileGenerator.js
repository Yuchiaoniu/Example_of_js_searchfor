document.addEventListener('DOMContentLoaded', () => {
    var title = document.title;
    var email = document.getElementById('email').innerText;
    // 檢查是否存在 id 為 'paycheck' 的元素
    if (!document.getElementById('paycheck')) {
        // 如果不存在，則發送 HTTP 請求到伺服器端的 PHP 腳本
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "check_file.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // 如果檔案不存在，則導向到付費頁面
                if (xhr.responseText === "File does not exist.") {
                    window.location.href = 'https://www.order.scholar.ovh/checkout?email=' + encodeURIComponent(email) + '&title=' + encodeURIComponent(title);
                }
            }
        };
        // 將 email 和 title 的值傳遞到伺服器端
        xhr.send("email=" + encodeURIComponent(email) + "&title=" + encodeURIComponent(title));
    }
});

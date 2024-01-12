// 假設 brandName, email, 和 subscriptionID 是你要檢查的變數
var variables = [brandName, email, subscriptionID];

// 檢查每一個變數是否為空值
for (var i = 0; i < variables.length; i++) {
    if (variables[i] !== null && variables[i] !== "") {
        // 如果變數不是空值，則使用 XMLHttpRequest 來傳送資料到 PHP 檔案
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "paycheck.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("brandName=" + brandName + "&email=" + email + "&subscriptionID=" + subscriptionID);
    }
}

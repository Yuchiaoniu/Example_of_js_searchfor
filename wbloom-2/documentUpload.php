<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 獲取POST請求中的HTML內容
    $htmlContent = $_POST["htmlContent"];

    // 生成唯一的文件名，這可以根據你的需求來定義
    $fileName = "generated_file.html";

    // 指定文件路徑
    $filePath = "../wbloom-3/" . $fileName;

    // 將HTML內容寫入文件
    file_put_contents($filePath, $htmlContent);

    // 回應成功消息
    echo "Text saved successfully as $filePath";
} else {
    // 如果不是POST請求，返回錯誤消息
    echo "Invalid request method.";
}
?>

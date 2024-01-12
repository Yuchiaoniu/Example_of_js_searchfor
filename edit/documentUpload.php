<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 從POST請求中獲取JS變數的值
    $email = $_POST["email"];
    $brandName = $_POST["brandName"];
    $htmlContent = $_POST["htmlContent"];

    // 指定新檔案的路徑
    $filePath = "../page/" . $brandName . '.html';

    if (file_exists($filePath)) {
        $existingFileContent = file_get_contents($filePath);  
        $dom = new DOMDocument;
        $dom->loadHTML($existingFileContent); 
        $creatorEmailElement = $dom->getElementById('email');
        $creatorEmail = $creatorEmailElement ? $creatorEmailElement->nodeValue : null;
        // 檢查當前的email是否與創建該檔案的email相同
        if ($email === $creatorEmail) {
            // 如果相同，則覆蓋該檔案
            file_put_contents($filePath, $htmlContent);
            echo "Page saved successfully as $filePath";
        } else {
            echo "File name already exists.";
        } 
    } else {
        file_put_contents($filePath, $htmlContent);
        echo "Page created successfully as $filePath";
    }
} else { 
    echo "Invalid request method."; 
}
?>
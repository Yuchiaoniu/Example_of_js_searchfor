<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 從POST請求中獲取JS變數的值
    $jsVariable = $_POST["jsVariable"];
    $email = $_POST["email"];

    // 檢查是否存在該名稱的txt檔案
    $fileName = $jsVariable . '.txt';
    if (file_exists($fileName)) {
        // 讀取該txt檔案的內容
        $fileContent = file_get_contents($fileName);

        // 將該內容變成一個變數
        $newFileName = $fileContent . '.html';

        // 指定新檔案的路徑
        $filePath = "../wbloom-3/" . $newFileName;

        // 獲取POST請求中的HTML內容
        $htmlContent = $_POST["htmlContent"];

        // 檢查是否已存在同名的檔案
        if (file_exists($filePath)) {
            // 讀取該檔案的內容
            $existingFileContent = file_get_contents($filePath);

            // 創建一個DOM解析器
            $dom = new DOMDocument;
            $dom->loadHTML($existingFileContent);

            // 找尋id為email的標籤的內容
            $creatorEmailElement = $dom->getElementById('email');
            $creatorEmail = $creatorEmailElement ? $creatorEmailElement->nodeValue : null;

            // 檢查當前的email是否與創建該檔案的email相同
            if ($email === $creatorEmail) {
                // 如果相同，則覆蓋該檔案
                file_put_contents($filePath, $htmlContent);
                echo "Page saved successfully as $filePath";
            } else {
                // 如果不同，則拒絕並顯示錯誤訊息
                echo "File name already exists.";
            }
        } else {
            // 將HTML內容寫入新檔案
            file_put_contents($filePath, $htmlContent);

            // 回應成功消息
            echo "Page created successfully as $filePath";
        }
    } else {
        // 如果不是POST請求，返回錯誤消息
        echo "Invalid request method.";
    }
}
?>

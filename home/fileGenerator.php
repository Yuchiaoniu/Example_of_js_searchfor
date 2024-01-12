<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $htmlContent = $_POST["htmlContent"];
    $title = $_POST["title"];
    $email = $_POST["email"];
    $describe = $_POST["describe"];
    $fileName = $title . '.html';
    $filePath = "../edit/" . $fileName;

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
        if ($email !== $creatorEmail) {
            http_response_code(400);
            echo "File name already exists.";
            exit;
        }        
    }

    // 將描述寫入到指定的.txt檔案中
    $describeFileName = $email . $title . "describe.txt";
    $describeFilePath = "../edit/" . $describeFileName;
if ($describe !== null && $describe !== '') {
    file_put_contents($describeFilePath, $describe);
}
file_put_contents($filePath, $htmlContent);
}

?>

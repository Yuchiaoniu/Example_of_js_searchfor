<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $editedText = $_POST["editedText"];

    $fileName = "edited_text.txt";
    $filePath = "upload/" . $fileName; // 請確保 "upload" 資料夾存在並具有適當的權限

    file_put_contents($filePath, $editedText);

    echo "Text saved successfully.";
}
?>

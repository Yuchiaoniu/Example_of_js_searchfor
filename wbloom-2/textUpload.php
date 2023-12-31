<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $useremail = $_POST["userEmail"];
    $tagId = $_POST["tagId"];
    $editedText = $_POST["editedText"];

    $fileName = $useremail.$tagId;
    $filePath = "../wbloom-2/" . $fileName . ".txt"; // 請確保 "upload" 資料夾存在並具有適當的權限

    file_put_contents($filePath, $editedText);

    echo "Text saved successfully.";
}
header("Location: index.html#" . $tagId); // 添加錨點
?>
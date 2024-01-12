<?php



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $useremail = $_POST["userEmail"];
    $tagId = $_POST["tagId"];
    $editedText = $_POST["editedText"];
    $title = $_POST["title"];

    $fileName = $useremail.$title.$tagId;
    $filePath = "../edit/" . $fileName . ".txt"; //上傳的路徑

    file_put_contents($filePath, $editedText);

    echo "Text saved successfully.";
}
header("Location: index.html#" . $tagId); // 添加錨點
?>
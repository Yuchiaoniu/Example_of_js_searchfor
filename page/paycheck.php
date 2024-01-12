<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $brandName = $_POST["brandName"];
    $email = $_POST["email"];
    $subscriptionID = $_POST["subscriptionID"];

    // 將資料寫入 txt 檔案
    file_put_contents($email . $brandName . ".txt", "Brand Name: $brandName\nEmail: $email\nSubscription ID: $subscriptionID");
    header('Location: https://br.searchfor.ovh/page/' . $brandName . '.html');
}
?>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $title = $_POST["title"];

    // 檢查檔案是否存在
    $filename = $email . $title . ".txt";
    if (file_exists($filename)) {
        // 如果檔案存在，則讀取檔案的內容
        $content = file_get_contents($filename);

        // 讀取 HTML 檔案的內容
        $html = file_get_contents($title . ".html");

        // 將讀取到的內容添加到 HTML 檔案中的一個 'display: none' 的元素
        $html = str_replace("</body>", "<div id='paycheck' style='display: none;'>$content</div></body>", $html);

        // 將修改後的 HTML 內容寫回檔案
        file_put_contents($title . ".html", $html);
    } else {
        echo "File does not exist.";
    }
}
?>

<?php
if (isset($_POST['image'])) {
    $base64_image = $_POST['image'];
    $image_url = $_POST['imageUrl']; // 這裡的 imageName 將會由前端傳過來
    $user_email = $_POST['userEmail'];
    $el_tag_id = $_POST['elTagId'];
    $title = $_POST['title'];
    $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64_image));

    $upload_src = './upload/';
    $image_file_name = $upload_src . $user_email. $title . $el_tag_id . '.jpg';
    // 檢查是否已經存在同名的檔案，若存在則刪除
    if (file_exists($image_file_name)) {
        unlink($image_file_name);
    }

    if (file_put_contents($image_file_name, $image_data) !== false) {
        echo 'Faça o upload de uma imagem menor se a página estiver carregando lentamente.';
    } else {
        echo 'Failed to save the image.';
    }
} else {
    echo 'Image data not received.';
}
?>

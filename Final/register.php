<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $favorite_team = $_POST['favorite_team'];

    $data = $username . "," . $password . "," . $age . "," . $gender . "," . $favorite_team . "\n";
    $file = 'users.txt';

    if (file_put_contents($file, $data, FILE_APPEND)) {
        $_SESSION['username'] = $username; // 세션 설정
        echo "success";
    } else {
        echo "Failed to register";
    }
}
?>

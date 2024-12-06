<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $favorite_team = $_POST['favorite_team'];

    $file = 'users.txt';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $userData = "$username,$hashedPassword,$age,$gender,$favorite_team\n";
    file_put_contents($file, $userData, FILE_APPEND);

    // 세션에 새 사용자 정보 저장
    $_SESSION['username'] = $username;
    $_SESSION['age'] = $age;
    $_SESSION['gender'] = $gender;
    $_SESSION['favorite_team'] = $favorite_team;

    echo "success";
}
?>

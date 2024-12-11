<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $file = 'users.txt';

    if (file_exists($file)) {
        $users = file($file, FILE_IGNORE_NEW_LINES);
        foreach ($users as $user) {
            list($stored_username, $stored_password) = explode(",", $user);

            // 사용자 이름과 비밀번호 확인
            if ($stored_username === $username && $stored_password === $password) {
                $_SESSION['username'] = $username; // 세션 설정
                echo "success";
                exit;
            }
        }
    }
    echo "Invalid username or password.";
}
?>


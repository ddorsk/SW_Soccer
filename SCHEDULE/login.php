<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $file = 'users.txt';
    $users = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($users as $user) {
        list($storedUsername, $storedPassword, $age, $gender, $favoriteTeam) = explode(',', $user);

        // 비밀번호 확인
        if ($username === $storedUsername && password_verify($password, $storedPassword)) {
            // 세션에 현재 사용자 정보 저장
            $_SESSION['username'] = $storedUsername;
            $_SESSION['age'] = $age;
            $_SESSION['gender'] = $gender;
            $_SESSION['favorite_team'] = $favoriteTeam;

            echo "success";
            exit;
        }
    }

    echo "Invalid username or password.";
}
?>

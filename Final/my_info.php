<?php
session_start();

// 사용자 세션 확인
if (!isset($_SESSION['username'])) {
    echo "<p>You are not logged in. <a href='login.html'>Login here</a></p>";
    exit;
}

$username = $_SESSION['username'];
$file = 'users.txt';

if (file_exists($file)) {
    $users = file($file, FILE_IGNORE_NEW_LINES);
    foreach ($users as $user) {
        list($stored_username, $stored_password, $age, $gender, $team) = explode(",", $user);

        if ($stored_username === $username) {
            $userInfo = [
                "Username" => $stored_username,
                "Age" => $age,
                "Gender" => $gender,
                "Favorite Team" => $team
            ];
            break;
        }
    }
}

// 사용자 정보가 없는 경우 처리
if (!isset($userInfo)) {
    echo "<p>User data not found. Please register or login again.</p>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .info-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 400px;
            text-align: center;
        }
        .info-container h1 {
            margin-bottom: 20px;
            color: #333;
        }
        .info-container ul {
            list-style-type: none;
            padding: 0;
        }
        .info-container ul li {
            margin: 10px 0;
            font-size: 18px;
            color: #555;
        }
        .btn-container {
            margin-top: 20px;
        }
        .btn-container a {
            display: inline-block;
            margin: 5px;
            padding: 10px 20px;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
        }
        .logout-btn {
            background-color: #dc3545;
        }
        .logout-btn:hover {
            background-color: #c82333;
        }
        .home-btn {
            background-color: #007bff;
        }
        .home-btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="info-container">
        <h1>Your Information</h1>
        <ul>
            <?php foreach ($userInfo as $key => $value): ?>
                <li><strong><?php echo $key; ?>:</strong> <?php echo $value; ?></li>
            <?php endforeach; ?>
        </ul>
        <div class="btn-container">
            <a href="logout.php" class="logout-btn">Logout</a>
            <a href="schedule.html" class="home-btn">Go to Home</a>
        </div>
    </div>
</body>
</html>

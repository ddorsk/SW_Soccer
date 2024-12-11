<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo "You are not logged in. Please log in first.";
    exit;
}

$username = $_SESSION['username'];
$age = $_SESSION['age'];
$gender = $_SESSION['gender'];
$favoriteTeam = $_SESSION['favorite_team'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .profile-container {
            background: #ffffff;
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
        }
        .profile-container h1 {
            margin-bottom: 20px;
            color: #333;
        }
        .profile-container p {
            margin: 10px 0;
            font-size: 1.1em;
            color: #555;
        }
        .profile-container button {
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s;
        }
        .logout-btn {
            background: #f44336;
            color: #ffffff;
        }
        .logout-btn:hover {
            background: #d32f2f;
        }
        .home-btn {
            background: #2196f3;
            color: #ffffff;
            margin-left: 10px;
        }
        .home-btn:hover {
            background: #1976d2;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <h1>User Profile</h1>
        <p><strong>Username:</strong> <?php echo htmlspecialchars($username); ?></p>
        <p><strong>Age:</strong> <?php echo htmlspecialchars($age); ?></p>
        <p><strong>Gender:</strong> <?php echo htmlspecialchars($gender); ?></p>
        <p><strong>Favorite Team:</strong> <?php echo htmlspecialchars($favoriteTeam); ?></p>

        <button class="logout-btn" onclick="location.href='logout.php'">Logout</button>
        <button class="home-btn" onclick="location.href='index.html'">Go to Home</button>
    </div>
</body>
</html>

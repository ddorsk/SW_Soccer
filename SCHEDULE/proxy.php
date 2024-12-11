<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$apiUrl = 'https://api.football-data.org/v4/competitions/PL/matches';
$apiKey = '589c7c3e5f4840bc85f22d2067d6fcef'; // 실제 API 키 사용

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Auth-Token: ' . $apiKey,
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>

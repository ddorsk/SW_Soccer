<?php
// API를 호출하여 데이터를 가져옴
function fetchStandings() {
    $apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings';
    $apiKey = 'd334f8c5a79f4fbaad0d205239fef286';

    $options = [
        "http" => [
            "header" => "X-Auth-Token: $apiKey"
        ]
    ];
    $context = stream_context_create($options);
    $response = file_get_contents($apiUrl, false, $context);

    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch standings"]);
        exit;
    }

    $data = json_decode($response, true);
    return $data['standings'][0]['table'];
}

header('Content-Type: application/json');
echo json_encode(fetchStandings());

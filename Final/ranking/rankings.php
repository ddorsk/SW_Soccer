<?php
// 파일 경로 설정
$filePath = '/var/www/html/VOTE/PL/ranking.txt';

header('Content-Type: application/json');

// 파일 존재 여부 확인
if (!file_exists($filePath)) {
    http_response_code(500);
    echo json_encode(["error" => "ranking.txt file not found at $filePath"]);
    exit;
}

// 파일 읽기 및 데이터 파싱
$data = array_map(function($line) {
    $parts = explode(',', $line);
    if (count($parts) !== 2) return null; // 잘못된 형식은 제외
    return ['name' => trim($parts[0]), 'votes' => (int) trim($parts[1])];
}, file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));

// 배열에서 유효하지 않은 항목 제거
$data = array_filter($data);

// 정렬
usort($data, fn($a, $b) => $b['votes'] - $a['votes']);

// JSON 응답 반환
echo json_encode($data);

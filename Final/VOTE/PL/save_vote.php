<?php
// JSON 데이터 수신
$data = file_get_contents("php://input");
$decodedData = json_decode($data, true);

if ($decodedData) {
    $votes = $decodedData['votes'] ?? [];
    $filePath = 'ranking.txt';

    // 기존 데이터 읽기
    $existingData = [];
    if (file_exists($filePath)) {
        $fileContents = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($fileContents as $line) {
            list($team, $count) = explode(',', $line);
            $existingData[trim($team)] = (int) trim($count);
        }
    }

    // 새로운 데이터 병합
    foreach ($votes as $team => $voteCount) {
        $existingData[$team] = ($existingData[$team] ?? 0) + $voteCount;
    }

    // 파일에 데이터 저장
    $fileContents = "";
    foreach ($existingData as $team => $count) {
        $fileContents .= "{$team}, {$count}\n";
    }

    if (file_put_contents($filePath, $fileContents)) {
        echo json_encode(['success' => true, 'message' => '투표 데이터가 저장되었습니다.']);
    } else {
        echo json_encode(['success' => false, 'message' => '파일 저장 실패']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '유효하지 않은 데이터']);
}
?>

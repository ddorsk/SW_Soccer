<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (isset($data['votes'])) {
        $votes = $data['votes'];
        $filePath = "C:/xampp/htdocs/VOTE/PL/ranking.txt";

        // 내용 구성: 팀 이름, 투표 수 형식
        $content = "";
        foreach ($votes as $team => $count) {
            $content .= "$team, $count\n";
        }

        // 파일 쓰기
        if (file_put_contents($filePath, $content) !== false) {
            echo json_encode(["success" => true, "message" => "Votes saved successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to save votes"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid data format"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

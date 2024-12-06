const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.listen(3000, function () {
    console.log('listening on 3000');
});

// 랭킹 화면
app.get('/', function(req, res){
    // ranking.txt 파일을 읽어서 데이터를 가져오기
    fs.readFile(path.join(__dirname, 'ranking.txt'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('파일을 읽는 데 오류가 발생했습니다.');
        }

        // 텍스트 파일을 쉼표로 구분하여 배열로 변환
        const teams = data.split('\n').map(line => {
            const [name, logo, points] = line.split(',');

            // 각 항목이 모두 존재하는지 확인하고, 존재하지 않으면 해당 항목을 건너뛰기
            if (name && logo && points) {
                return { name, logo, points: parseInt(points.trim()) };  // points를 숫자로 변환
            }
        }).filter(team => team !== undefined);  // 빈 값이 들어가는 것을 방지

        // 팀들을 점수 순으로 내림차순 정렬
        teams.sort((a, b) => b.points - a.points);

        // ranking.html 파일을 읽고 데이터 삽입
        fs.readFile(path.join(__dirname, 'ranking.html'), 'utf8', (err, html) => {
            if (err) {
                return res.status(500).send('HTML 파일을 읽는 데 오류가 발생했습니다.');
            }

            // 팀 데이터를 HTML에 동적으로 삽입
            const teamHtml = teams.map(team => `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${team.logo}" alt="${team.name}" class="team-logo">
                        <h5 class="mb-0">${team.name}</h5>
                    </div>
                    <span class="team-score">${team.points}</span>
                </div>
            `).join('');

            // HTML 안에 팀 데이터를 삽입하고 응답
            const finalHtml = html.replace('<!-- 팀 순위 데이터 삽입 부분 -->', teamHtml);
            res.send(finalHtml);
        });
    });
});












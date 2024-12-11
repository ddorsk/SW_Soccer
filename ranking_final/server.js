import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path'; 

const app = express();

// 현재 파일의 디렉토리 경로를 구하는 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings';
const apiKey = 'd334f8c5a79f4fbaad0d205239fef286';

// 순위 데이터를 가져오기
async function fetchStandings() {
    const response = await fetch(apiUrl, {
        headers: { 'X-Auth-Token': apiKey }
    });

    const data = await response.json();
    return data.standings[0].table; // 순위 데이터 반환
}

// ranking.txt 데이터를 읽어 JSON으로 반환하는 함수
function readRankingFile() {
    const filePath = path.join(__dirname, 'ranking.txt');
    if (!fs.existsSync(filePath)) {
        throw new Error('ranking.txt 파일이 존재하지 않습니다.');
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    return fileData
        .split('\n')
        .filter(line => line.trim() !== '') // 빈 줄 제거
        .map(line => {
            const [name, votes] = line.split(',');
            return { name: name.trim(), votes: parseInt(votes.trim(), 10) };
        });
}

// 루트 경로에서 HTML 파일 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ranking.html');
});

// 순위 데이터를 JSON 형식으로 클라이언트에 제공
app.get('/standings', async (req, res) => {
    try {
        const standings = await fetchStandings();
        res.json(standings);  // 순위 데이터 반환
    } catch (error) {
        console.error('순위 데이터를 가져오는 중 오류 발생:', error);
        res.status(500).send('순위를 가져오는 중 오류 발생');
    }
});

// API 엔드포인트: ranking.txt 데이터를 JSON으로 반환
app.get('/rankings', (req, res) => {
    try {
        const rankings = readRankingFile();
        rankings.sort((a, b) => b.votes - a.votes); // 득표수 내림차순 정렬
        res.json(rankings);
    } catch (error) {
        console.error('ranking.txt 읽기 오류:', error);
        res.status(500).send('랭킹 데이터를 가져오는 중 오류가 발생했습니다.');
    }
});

app.listen(3000, function () {
    console.log('listening on 3000');
});















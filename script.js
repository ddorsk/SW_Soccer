// API URL과 API 키 (여기서 YOUR_API_KEY를 실제 API 키로 교체해야 합니다)
const apiUrl = 'proxy.php';
const apiKey = '589c7c3e5f4840bc85f22d2067d6fcef'; // 실제 API 키 입력

// 일정 테이블에 데이터 추가
const scheduleTableBody = document.getElementById('schedule').getElementsByTagName('tbody')[0];

// 데이터 가져오기
async function fetchMatches() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Auth-Token': apiKey // API 키를 헤더에 포함
            }
        });

        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 발생했습니다.');
        }

        const data = await response.json();
        displayMatches(data.matches); // 일정 표시 함수 호출
    } catch (error) {
        console.error('일정을 가져오는 중 오류 발생:', error);
    }
}

// 일정 표시 함수
function displayMatches(matches) {
    matches.forEach(match => {
        const row = scheduleTableBody.insertRow();
        const date = new Date(match.utcDate); // UTC 날짜를 로컬 날짜로 변환

        // 날짜 형식 지정
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('ko-KR', options);
        const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

        row.insertCell(0).innerText = formattedDate; // 날짜
        row.insertCell(1).innerText = match.homeTeam.name; // 홈팀
        row.insertCell(2).innerText = match.awayTeam.name; // 어웨이팀
        row.insertCell(3).innerText = time; // 시간
    });
}

// 페이지 로드 시 데이터 가져오기
fetchMatches();

const urlParams = new URLSearchParams(window.location.search);
const homeTeam = urlParams.get('home') || "Home Team";
const awayTeam = urlParams.get('away') || "Away Team";

const voteHomeElement = document.getElementById('voteHome');
const voteAwayElement = document.getElementById('voteAway');
const timerElement = document.getElementById('timer');

// 요소가 존재할 때만 텍스트 업데이트
if (voteHomeElement) {
    voteHomeElement.textContent = `Vote for ${homeTeam}`;
}
if (voteAwayElement) {
    voteAwayElement.textContent = `Vote for ${awayTeam}`;
}

let timeLeft = 30;
let votingAllowed = true;

// 타이머 업데이트
const timer = setInterval(() => {
    if (timerElement) {
        timerElement.textContent = `남은 시간: ${timeLeft}초`;
    }
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('투표가 마감되었습니다.');
        votingAllowed = false;

        window.location.href = `linux_2re.html?home=${encodeURIComponent(homeTeam)}&away=${encodeURIComponent(awayTeam)}`;
    }
}, 1000);

// 모든 팀의 투표 데이터를 저장하는 함수
async function updateAllVotesFile() {
    try {
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        const response = await fetch('/VOTE/PL/save_vote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ votes }),
        });

        const result = await response.json();
        if (result.success) {
            console.log('모든 투표 데이터를 저장했습니다.');
        } else {
            console.error('모든 투표 데이터 저장 실패:', result.message);
        }
    } catch (error) {
        console.error('서버 요청 중 오류 발생:', error);
    }
}

// 투표 버튼 처리
function handleVote(teamName, elementId) {
    if (!votingAllowed) return;

    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    votes[teamName] = (votes[teamName] || 0) + 1;
    localStorage.setItem('votes', JSON.stringify(votes));

    alert(`${teamName}에 투표했습니다.`);
    updateAllVotesFile(); // 모든 팀의 데이터를 저장
    disableVoting();
}

// 홈 팀 투표 버튼
document.getElementById('voteHomeButton')?.addEventListener('click', () => {
    handleVote(homeTeam, 'voteHomeButton');
});

// 어웨이 팀 투표 버튼
document.getElementById('voteAwayButton')?.addEventListener('click', () => {
    handleVote(awayTeam, 'voteAwayButton');
});

// 투표 비활성화 함수
function disableVoting() {
    votingAllowed = false;
    document.getElementById('voteHomeButton').disabled = true;
    document.getElementById('voteAwayButton').disabled = true;
}

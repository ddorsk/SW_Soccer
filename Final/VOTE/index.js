const votes = {};
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // 대체 CORS 프록시
const API_URL = "https://api.football-data.org/v4/competitions/PL/matches";
const API_TOKEN = "6851286205ae47ecabdba67f5ac44062";

async function fetchMatches() {
    try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 7);

        const dateFrom = today.toISOString().split('T')[0];
        const dateTo = tomorrow.toISOString().split('T')[0];

        const apiUrl = `${CORS_PROXY}${API_URL}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        console.log("API 호출 URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'X-Auth-Token': API_TOKEN },
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
            generateVotingButtons(data.matches);
        } else {
            document.getElementById('buttons').innerHTML =
                '<p>다음 날 경기가 없습니다.</p>';
        }
    } catch (error) {
        console.error("데이터 로드 중 오류:", error);
        document.getElementById('buttons').innerHTML =
            '<p>데이터를 불러오는 중 문제가 발생했습니다. 관리자에게 문의하세요.</p>';
    }
}

function generateVotingButtons(matches) {
    const buttonsContainer = document.getElementById("buttons");
    buttonsContainer.innerHTML = "";

    matches.forEach((match) => {
        const homeTeam = match.homeTeam?.name || "Unknown Team 1";
        const awayTeam = match.awayTeam?.name || "Unknown Team 2";

        votes[homeTeam] = votes[homeTeam] || 0;
        votes[awayTeam] = votes[awayTeam] || 0;

        const button = document.createElement("button");
        button.textContent = `${homeTeam} vs ${awayTeam}`;
        button.onclick = () => {
            alert("투표창으로 이동합니다.");
            window.location.href = `vote.html?home=${encodeURIComponent(
                homeTeam
            )}&away=${encodeURIComponent(awayTeam)}`;
        };
        buttonsContainer.appendChild(button);
    });
}

window.onload = fetchMatches;

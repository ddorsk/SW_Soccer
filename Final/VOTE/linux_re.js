document.addEventListener('DOMContentLoaded', () => {
    // URL에서 팀 이름 추출
    const urlParams = new URLSearchParams(window.location.search);
    const homeTeam = urlParams.get('home');
    const awayTeam = urlParams.get('away');

    // 투표 결과 가져오기
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const homeVotes = votes[homeTeam] || 0;
    const awayVotes = votes[awayTeam] || 0;

    // 총 투표 수 계산
    const totalVotes = homeVotes + awayVotes || 1; // 0으로 나누는 것을 방지

    // 퍼센트 계산
    const homePercent = ((homeVotes / totalVotes) * 100).toFixed(1);
    const awayPercent = ((awayVotes / totalVotes) * 100).toFixed(1);

    // 차트 생성
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [`${homeTeam} (${homePercent}%)`, `${awayTeam} (${awayPercent}%)`],
            datasets: [
                {
                    data: [homeVotes, awayVotes],
                    backgroundColor: ['skyblue', 'orange'],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const value = tooltipItem.raw;
                            const percentage = ((value / totalVotes) * 100).toFixed(1);
                            return `${value} votes (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });
});

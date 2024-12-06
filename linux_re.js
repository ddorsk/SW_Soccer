document.addEventListener('DOMContentLoaded', () => {
    const n = parseInt(localStorage.getItem('n')) || 0;
    const n2 = parseInt(localStorage.getItem('n2')) || 0;
    const total = n + n2;
    const percentN = total === 0 ? 0 : (n / total) * 100;
    const percentN2 = total === 0 ? 0 : (n2 / total) * 100;

    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [`n (${percentN.toFixed(1)}%)`, `n2 (${percentN2.toFixed(1)}%)`],
            datasets: [
                {
                    data: [n, n2],
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
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value} votes (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });
});

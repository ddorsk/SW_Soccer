document.addEventListener('DOMContentLoaded', () => {
    let n = parseInt(localStorage.getItem('n')) || 0; 
    let n2 = parseInt(localStorage.getItem('n2')) || 0; 
    let timeRemaining = 30;

    const voteNButton = document.getElementById('voteN');
    const voteN2Button = document.getElementById('voteN2');
    const timerElement = document.getElementById('timer');
    const viewResultsButton = document.getElementById('viewResultsButton');

    function vote(team) {
        if (team === 'n') {
            n++;
            localStorage.setItem('n', n);
        } else if (team === 'n2') {
            n2++;
            localStorage.setItem('n2', n2);
        }

        voteNButton.disabled = true;
        voteN2Button.disabled = true;
        alert('Thank you for voting!');
    }

    voteNButton.addEventListener('click', () => vote('n'));
    voteN2Button.addEventListener('click', () => vote('n2'));

    const timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endVoting();
        }
    }, 1000);

    function endVoting() {
        voteNButton.disabled = true;
        voteN2Button.disabled = true;
        viewResultsButton.style.display = 'block';
        timerElement.textContent = 'Voting has ended!';
    }

    viewResultsButton.addEventListener('click', () => {
        window.location.href = 'linux_2re.html';
    });
});

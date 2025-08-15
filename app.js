let timerInterval;
function unlockAccess() {
    const code = document.getElementById('confirmCode').value.trim();
    if (!code) {
        alert('Please enter your Wave confirmation code.');
        return;
    }
    document.querySelector('.confirm-section').classList.add('hidden');
    document.getElementById('session').classList.remove('hidden');
    startTimer(15 * 60);
}
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById('timeRemaining').textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(timerInterval);
            document.getElementById('timeRemaining').textContent = "Session expired. Reloading...";
            setTimeout(() => {
                location.reload();
            }, 3000); // Wait 3 seconds before reloading
        }
    }, 1000);
}
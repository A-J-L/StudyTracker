let startTime, timerInterval;
let elapsedTime = 0;
let totalStudyTime = parseInt(localStorage.getItem('studyTime')) || 0;

const timerDisplay = document.getElementById('timer');
const totalDisplay = document.getElementById('totalTime');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateTimerDisplay() {
  const now = Date.now();
  elapsedTime = Math.floor((now - startTime) / 1000);
  timerDisplay.textContent = formatTime(elapsedTime);
}

function updateTotalTimeDisplay() {
  totalDisplay.textContent = formatTime(totalStudyTime);
}

startBtn.addEventListener('click', () => {
  if (!timerInterval) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimerDisplay, 1000);
  }
});

stopBtn.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    totalStudyTime += elapsedTime;
    localStorage.setItem('studyTime', totalStudyTime);
    updateTotalTimeDisplay();
    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00";
  }
});

updateTotalTimeDisplay(); // Initialize on load

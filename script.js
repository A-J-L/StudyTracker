let startTime, timerInterval;
let elapsedTime = 0;

// Get today's date as a key (e.g., "2025-07-15")
const todayKey = new Date().toISOString().split("T")[0];

let totalStudyTime = parseInt(localStorage.getItem('studyTime')) || 0;
let todayStudyTime = parseInt(localStorage.getItem(todayKey)) || 0;

const timerDisplay = document.getElementById('timer');
const totalDisplay = document.getElementById('totalTime');
const todayDisplay = document.getElementById('todayTime');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const goalInput = document.getElementById('goalInput');
const progressBar = document.getElementById('progressBar');

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

function updateDisplays() {
  totalDisplay.textContent = formatTime(totalStudyTime);
  todayDisplay.textContent = formatTime(todayStudyTime);
  updateProgressBar();
}

function updateProgressBar() {
  const goalMinutes = parseInt(goalInput.value) || 1;
  const goalSeconds = goalMinutes * 60;
  const percentage = Math.min((todayStudyTime / goalSeconds) * 100, 100);
  progressBar.value = percentage;
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

    const sessionTime = elapsedTime;
    totalStudyTime += sessionTime;
    todayStudyTime += sessionTime;

    localStorage.setItem('studyTime', totalStudyTime);
    localStorage.setItem(todayKey, todayStudyTime);

    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00";

    updateDisplays();
  }
});

goalInput.addEventListener('input', updateProgressBar);

// Initialize displays on page load
updateDisplays();

let startTime;
let interval;
let running = false;
let laps = [];
let lapCount = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function startTimer() {
  if (!running) {
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pauseTimer() {
  clearInterval(interval);
  running = false;
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  display.textContent = '00:00:00';
  laps = [];
  lapList.innerHTML = '';
  lapCount = 1;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = new Date(elapsedTime).toISOString().substr(11, 8);
  display.textContent = formattedTime;
}

function lapTimer() {
  if (running) {
    const elapsedTime = Date.now() - startTime;
    const lapTime = new Date(elapsedTime).toISOString().substr(11, 8);
    laps.push(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);



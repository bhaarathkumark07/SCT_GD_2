 let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60));

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);

        running = true;
        startBtn.textContent = "Pause";
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        running = false;
        startBtn.textContent = "Start";
    }
});

lapBtn.addEventListener("click", () => {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(li);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();
    startBtn.textContent = "Start";
    lapBtn.disabled = true;
    lapList.innerHTML = "";
});

class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.currentMode = 'work';
        this.isRunning = false;
        this.timer = null;
        this.remainingTime = this.workTime;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.statusTextElement = document.getElementById('statusText');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    updateWorkTime() {
        const minutes = parseInt(this.workTimeInput.value) || 25;
        this.workTime = minutes * 60;
        if (this.currentMode === 'work') {
            this.remainingTime = this.workTime;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        const minutes = parseInt(this.breakTimeInput.value) || 5;
        this.breakTime = minutes * 60;
        if (this.currentMode === 'break') {
            this.remainingTime = this.breakTime;
            this.updateDisplay();
        }
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = '停止';
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startBtn.textContent = '開始';
        clearInterval(this.timer);
    }

    resetTimer() {
        this.stopTimer();
        this.remainingTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    tick() {
        if (this.remainingTime <= 0) {
            this.switchMode();
            return;
        }

        this.remainingTime--;
        this.updateDisplay();
    }

    switchMode() {
        if (this.currentMode === 'work') {
            this.currentMode = 'break';
            this.statusTextElement.textContent = '休憩時間';
            this.remainingTime = this.breakTime;
        } else {
            this.currentMode = 'work';
            this.statusTextElement.textContent = '作業時間';
            this.remainingTime = this.workTime;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();

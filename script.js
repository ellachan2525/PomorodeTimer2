class PomodoroTimer {
    constructor() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startButton = document.getElementById('start-btn');
        this.resetButton = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
        
        this.isRunning = false;
        this.currentMode = 'work'; // 'work' or 'break'
        this.interval = null;
        
        this.initialize();
        this.setupEventListeners();
    }

    initialize() {
        this.workMinutes = parseInt(this.workTimeInput.value);
        this.breakMinutes = parseInt(this.breakTimeInput.value);
        this.remainingSeconds = this.workMinutes * 60;
        this.updateDisplay();
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
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
        this.startButton.textContent = '停止';
        
        this.interval = setInterval(() => {
            if (this.remainingSeconds > 0) {
                this.remainingSeconds--;
                this.updateDisplay();
            } else {
                this.stopTimer();
                this.switchMode();
            }
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startButton.textContent = '開始';
        clearInterval(this.interval);
    }

    resetTimer() {
        this.stopTimer();
        this.remainingSeconds = this.currentMode === 'work' 
            ? this.workMinutes * 60 
            : this.breakMinutes * 60;
        this.updateDisplay();
    }

    updateWorkTime() {
        this.workMinutes = parseInt(this.workTimeInput.value);
        if (this.currentMode === 'work') {
            this.remainingSeconds = this.workMinutes * 60;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        this.breakMinutes = parseInt(this.breakTimeInput.value);
        if (this.currentMode === 'break') {
            this.remainingSeconds = this.breakMinutes * 60;
            this.updateDisplay();
        }
    }

    switchMode() {
        this.currentMode = this.currentMode === 'work' ? 'break' : 'work';
        this.remainingSeconds = this.currentMode === 'work' 
            ? this.workMinutes * 60 
            : this.breakMinutes * 60;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();

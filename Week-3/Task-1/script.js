const lights = document.querySelectorAll('.light');
const nextBtn = document.getElementById('next');
const autoBtn = document.getElementById('auto');
const realisticBtn = document.getElementById('realistic');
const emergencyBtn = document.getElementById('emergency');
const currentState = document.getElementById('current-state');
const modeDisplay = document.getElementById('mode');
const timerDisplay = document.getElementById('timer');

let currentLight = 0;
let autoInterval = null;
let realisticTimeout = null;
let timerInterval = null;
let timeRemaining = 0;
let currentMode = 'manual';

const states = ['STOP', 'CAUTION', 'GO'];

function clearAllModes() {
    if (autoInterval) clearInterval(autoInterval);
    if (realisticTimeout) clearTimeout(realisticTimeout);
    if (timerInterval) clearInterval(timerInterval);
    autoInterval = null;
    realisticTimeout = null;
    timerInterval = null;
    lights[1].classList.remove('blinking');
    autoBtn.classList.remove('active-btn');
    realisticBtn.classList.remove('active-btn');
    emergencyBtn.classList.remove('active-btn');
}

function updateTimer(seconds) {
    timeRemaining = seconds;
    timerDisplay.textContent = seconds + 's';
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining + 's';
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function changeLight(index) {
    lights.forEach(l => l.classList.remove('active', 'blinking'));
    lights[index].classList.add('active');
    currentLight = index;
    currentState.innerHTML = `Current: <strong>${states[index]}</strong>`;
    
    // Add animation effect
    currentState.style.transform = 'scale(1.1)';
    setTimeout(() => {
        currentState.style.transform = 'scale(1)';
    }, 200);
}

nextBtn.addEventListener('click', () => {
    if (currentMode !== 'manual') {
        clearAllModes();
        currentMode = 'manual';
        modeDisplay.innerHTML = 'Mode: <strong>Manual</strong>';
        timerDisplay.textContent = '';
    }
    const nextIndex = (currentLight + 1) % lights.length;
    changeLight(nextIndex);
});

autoBtn.addEventListener('click', () => {
    clearAllModes();
    if (currentMode === 'auto') {
        currentMode = 'manual';
        modeDisplay.innerHTML = 'Mode: <strong>Manual</strong>';
        timerDisplay.textContent = '';
    } else {
        currentMode = 'auto';
        autoBtn.classList.add('active-btn');
        modeDisplay.innerHTML = 'Mode: <strong>Auto (3s each)</strong>';
        updateTimer(3);
        
        autoInterval = setInterval(() => {
            const nextIndex = (currentLight + 1) % lights.length;
            changeLight(nextIndex);
            updateTimer(3);
        }, 3000);
    }
});

realisticBtn.addEventListener('click', () => {
    clearAllModes();
    if (currentMode === 'realistic') {
        currentMode = 'manual';
        modeDisplay.innerHTML = 'Mode: <strong>Manual</strong>';
        timerDisplay.textContent = '';
    } else {
        currentMode = 'realistic';
        realisticBtn.classList.add('active-btn');
        modeDisplay.innerHTML = 'Mode: <strong>Realistic Timing</strong>';
        
        function realisticCycle() {
            // Red light - 5 seconds
            changeLight(0);
            updateTimer(5);
            
            realisticTimeout = setTimeout(() => {
                // Green light - 5 seconds
                changeLight(2);
                updateTimer(5);
                
                realisticTimeout = setTimeout(() => {
                    // Yellow light - 2 seconds
                    changeLight(1);
                    updateTimer(2);
                    
                    realisticTimeout = setTimeout(() => {
                        if (currentMode === 'realistic') {
                            realisticCycle();
                        }
                    }, 2000);
                }, 5000);
            }, 5000);
        }
        
        realisticCycle();
    }
});

emergencyBtn.addEventListener('click', () => {
    clearAllModes();
    if (currentMode === 'emergency') {
        currentMode = 'manual';
        modeDisplay.innerHTML = 'Mode: <strong>Manual</strong>';
        timerDisplay.textContent = '';
        changeLight(0);
    } else {
        currentMode = 'emergency';
        emergencyBtn.classList.add('active-btn');
        modeDisplay.innerHTML = 'Mode: <strong>Emergency (Blinking)</strong>';
        timerDisplay.textContent = '⚠️';
        
        changeLight(1);
        lights[1].classList.add('blinking');
    }
});

// Initialize
changeLight(0);

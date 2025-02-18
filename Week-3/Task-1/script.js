const lights = document.querySelectorAll('.light');
const button = document.getElementById('next');
let currentLight = 0;

button.addEventListener('click', () => {
    lights[currentLight].classList.remove('active');
    currentLight = (currentLight + 1) % lights.length;
    lights[currentLight].classList.add('active');
});

// Bonus Challenge: Automatic Light Changes
let autoChange = setInterval(() => {
    button.click();
}, 3000);

// Realistic Timings
setInterval(() => {
    button.click();
    setTimeout(() => {
        lights[1].classList.add('active');
        lights[2].classList.remove('active');
    }, 2000);
}, 5000);

// Blinking Yellow Light
setInterval(() => {
    lights[1].classList.toggle('active');
}, 1000);

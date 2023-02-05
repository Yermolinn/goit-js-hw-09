
const getBtnStart = document.querySelector('button[data-start]');
const getBtnStop = document.querySelector('button[data-stop]');
const body = document.body;
let timerId = null;
const CHANGE_COLOR_DELAY = 1000;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


getBtnStart.addEventListener('click', (event) => {
    getBtnStart.disabled = true;
    timerId = setInterval(() => {
        console.log('start');
        body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
    return
});


getBtnStop.addEventListener('click', () => {
    console.log('stop');
    clearInterval(timerId);
    if (getBtnStart.disabled) {
        getBtnStart.disabled = false;
    }
    return
});
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');
let intervalId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function getBgColor() {
  bodyColor.style.backgroundColor = getRandomHexColor();
}
const onStartClick = () => {
  intervalId = setInterval(getBgColor, 1000);
  startBtnEl.toggleAttribute('disabled');
};
startBtnEl.addEventListener('click', onStartClick);
function onStopClick() {
  clearInterval(intervalId);
  startBtnEl.removeAttribute('disabled');
}
stopBtnEl.addEventListener('click', onStopClick);

import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
const dateTimeEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let selectDate = null;
let differenceTime = null;
let timerId = null;
startBtnEl.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    if (selectDate < new Date()) {
      startBtnEl.setAttribute('disabled', true);
      return Notify.failure('Please choose a date in the future');
    }
    startBtnEl.removeAttribute('disabled');
    startBtnEl.addEventListener('click', onStartBtn);
  },
};
flatpickr(dateTimeEl, options);

function onStartBtn() {
  timerId = setInterval(startTimer, 1000);
}
function startTimer() {
  startBtnEl.setAttribute('disabled', true);
  const date = new Date();
  differenceTime = selectDate - date;
  differenceTime -= 1000;
  if (differenceTime <= 0) {
    clearInterval(timerId);
    Notify.success('Time end');
    return;
  }
  let formatDate = convertMs(differenceTime);
  renderDate(formatDate);
}
function renderDate(formatDate) {
  dataSeconds.textContent = formatDate.seconds;
  dataMinutes.textContent = formatDate.minutes;
  dataHours.textContent = formatDate.hours;
  dataDays.textContent = formatDate.days;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

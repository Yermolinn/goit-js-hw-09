import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateFormEl = document.getElementById('datetime-picker');
const getBtnStartEl = document.querySelector('[data-start]');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMin = document.querySelector('[data-minutes]');
const dateSec = document.querySelector('[data-seconds]');
const counterClass = document.querySelector('.timer');


getBtnStartEl.disabled = true;
let selectedDate = 0;
let dateCounter = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    // console.log((selectedDate - Date.now()));
    
      if ((selectedDate - Date.now()) > 0) {
        getBtnStartEl.disabled = false;
      } else {
          Notify.failure('Please choose a date in the future');
          // window.alert("Please choose a date in the future");
          return}
  },
};
// dateFormEl.addEventListener('input', (flatpickr(dateFormEl, options)));
flatpickr(dateFormEl, options);

getBtnStartEl.addEventListener('click', () => {
  // Date.now( установлено только для проверки работы остальной части кода)
  dateCounter = (selectedDate - options.defaultDate);
  getBtnStartEl.disabled = true;
  Notify.success('Начинаем отсчет');
  // console.log(dateCounter);  
  const timerId = setInterval(() => {
    
  if (dateCounter - 600 > 0) {
      convertData(convertMs(dateCounter));
      dateCounter = dateCounter - 600;
  } else {
      Notify.warning('Отсчет окончен. Сделате новый выбор.');
      clearInterval(timerId);
      getBtnStartEl.disabled = false;
      return
    }        
  }, 600);
  return;
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


// const datesInputEl = flatpickr(dateFormEl, options);

function convertData(data) {
  dateDays.textContent = addLeadingZero(`${data.days}`);
  dateHours.textContent = addLeadingZero(`${data.hours}`);
  dateMin.textContent = addLeadingZero(`${data.minutes}`);
  dateSec.textContent = addLeadingZero(`${data.seconds}`);
}

function addLeadingZero(value) {
  return value.padStart(2,'0');
}
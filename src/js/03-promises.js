
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitBtn = document.querySelector("button[type=submit]");
const formEl = document.querySelector(".form");
let refs = {};

formEl.addEventListener('input', (event)=>{
  event.preventDefault();
  const elements = event.currentTarget;
  refs = {
                delay:Number(elements.delay.value),
                step:Number(elements.step.value),
                amount:Number(elements.amount.value)
  };
})

const createPromise = function (position, delay)  {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
      if (shouldResolve) {resolve({position, delay})}
      else {rejected({position, delay})}
    }, delay);
  });
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let delay = 0;
  for (let position=1; position <= refs.amount; position++) {
  delay = refs.delay + refs.step*(position-1);
  createPromise (position, delay).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};
})
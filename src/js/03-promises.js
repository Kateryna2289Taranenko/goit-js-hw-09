import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
let delay = null;
formEl.addEventListener('submit', onSusmitForm);
function onSusmitForm(evt) {
  evt.preventDefault();
  delay = formEl.delay.value;
  for (let i = 1; i <= formEl.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += formEl.step.value;
  }
}
function createPromise(position, delay) {
  const dataObj = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(dataObj);
      } else {
        reject(dataObj);
      }
    }, delay);
  });
}

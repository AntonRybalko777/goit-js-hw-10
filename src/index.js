import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    const markup = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');
    elements.select.innerHTML = markup;
    elements.select.classList.remove('is-hidden');
    new SlimSelect({
      select: '#selector',
    });
  })
  .catch(() => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => elements.loader.classList.add('is-hidden'));

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  elements.div.innerHTML = '';
  elements.loader.classList.remove('is-hidden');
  fetchCatByBreed(evt.target.value)
    .then(data => {
      elements.div.innerHTML = `
      <img class="cat-img" src="${data[0].url}" alt="${data[0].breeds[0].name}" width="400">
      <div>
        <h2 class="cat-header">${data[0].breeds[0].name}</h2>
        <p class="cat-desc">${data[0].breeds[0].description}</p>
        <p class="cat-temp"><b>Temperament: </b>${data[0].breeds[0].temperament}</p>
      </div>`;
      elements.div.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => elements.loader.classList.add('is-hidden'));
}

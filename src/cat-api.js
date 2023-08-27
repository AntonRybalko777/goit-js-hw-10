import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_1RDdQnHiqZq5paELDGqYONHbUEgpT07JyrmKKWG2bEMxPomO01CREDwdUAYJZYsI';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => error(error));
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => error(error));
}

export { fetchBreeds, fetchCatByBreed };

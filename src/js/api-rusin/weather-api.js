const formSearch = document.querySelector('.js-form');
const list = document.querySelector('.js-list');

formSearch.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  const { query, days } = e.currentTarget.elements;
  getWeather(query.value, days.value)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function getWeather(city, days) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = '9b5c61074eae4d77983194356240101';

  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }

    return responce.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(({}) => {
      return `<li>
        <img src="" alt="" />
        <p></p>
        <h2></h2>
        <h3></h3>
      </li>`;
    })
    .join('');
}

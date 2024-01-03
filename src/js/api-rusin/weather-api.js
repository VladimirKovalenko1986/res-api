const formSearch = document.querySelector('.js-form');
const list = document.querySelector('.js-list');

formSearch.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  const { query, days } = e.currentTarget.elements;
  getWeather(query.value, days.value)
    .then(data => {
      console.log(data.forecast.forecastday);
      list.innerHTML = createMarkup(data.forecast.forecastday);
    })
    .catch(err => console.log(err));
}

function getWeather(city, days) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = '8b4fe16a6b6541a5a4c203418240301';

  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: 'uk',
  });

  return fetch(`${BASE_URL}/forecast.json?${params}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }

    return responce.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { text, icon },
        },
      }) => {
        return `<li class="item-weather">
        <img src="${icon}" alt="${text}" />
        <p>${text}</p>
        <h2>${date}</h2>
        <h3>${avgtemp_c}</h3>
      </li>`;
      }
    )
    .join('');
}

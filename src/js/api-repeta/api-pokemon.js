import API from './api-service-pokemon';
import getRefs from './get-refs-pakemon';

const refs = getRefs();

refs.serchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const serchQuery = form.elements.query.value;

  API.fetchPokemon(serchQuery)
    .then(renderPokemonKard)
    .catch(onFetchError)
    .finally(() => refs.serchForm.reset());
}

function CreateMarkup({
  name,
  sprites: { front_default },
  weight,
  height,
  abilities,
}) {
  const abilitiesList = abilities
    .map(({ ability }) => `<li class="list-group-item">${ability.name}</li>`)
    .join('');

  return `<div class="card">
      <div class="card-img-top">
        <img src="${front_default}" alt="${name}" />
      </div>
      <div class="card-body">
        <h2 class="card-title">Ім'я: ${name}</h2>
        <p class="card-text">Вага: ${weight}</p>
        <p class="card-text">Ріст: ${height}</p>

        <p class="card-text"><b>Вміння:</b></p>
       <ul class="list-group">
           ${abilitiesList}
        </ul>
      </div>
    </div>`;
}

function renderPokemonKard(pokemon) {
  const markup = CreateMarkup(pokemon);
  refs.conteiner.innerHTML = markup;
}

function onFetchError() {
  alert('Щось пішло не так!!!!!');
}

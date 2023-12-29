import { NewsApi } from './api';
import { LoadMoreBtn } from './components/loadMoreBtn';

const form = document.getElementById('form-search');
const lodeMoreBtn = new LoadMoreBtn({
  selector: '#lodMoreBtn',
  isHidden: true,
});
const newsApi = new NewsApi();

form.addEventListener('submit', onSubmit);
lodeMoreBtn.button.addEventListener('click', fetchNews);

function onSubmit(e) {
  e.preventDefault();

  newsApi.searchQuery = e.currentTarget.elements.news.value.trim();
  clearNewList();
  newsApi.resetPage();
  lodeMoreBtn.show();

  fetchNews().finally(() => form.reset());
}

function fetchNews() {
  lodeMoreBtn.disable();
  return newsApi
    .getNews()
    .then(({ articles }) => {
      if (articles.length === 0 || newsApi.searchQuery === '') {
        throw new Error('No data');
      }
      return articles.reduce(
        (markup, article) => createMarkup(article) + markup,
        ''
      );
    })
    .then(markup => {
      updateNewsList(markup);
      lodeMoreBtn.enable();
    })
    .catch(onError);
}

function createMarkup({ author, title, description, url, urlToImage }) {
  return `
        <div class="articles-card">
         <img class="article-img" src="${
           urlToImage ||
           'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
         }" alt="#" />
            <h2 class="article-title">${title}</h2>
            <h3 class="article-author"${author || 'Anonym'}></h3>
            <p class="article-text">${description || 'Fack You!!!'}</p>
            <div class="article-link-conteiner">
                <a class="article-link" href="${url}" target="_blank" rel="noopener noreferrer">Reade more</a>
            </div>
        </div>`;
}

function updateNewsList(markup) {
  document
    .getElementById('articlesWrapper')
    .insertAdjacentHTML('beforeend', markup);
}

function clearNewList() {
  document.getElementById('articlesWrapper').innerHTML = '';
}

function onError(error) {
  console.error(error);
  updateNewsList('<p class ="article-error">Articles not found!!!</p>');
}

import NewsApiService from './news-api-submit';
import LoadMoreBtn from './loade-more-btn-submite';

const refs = {
  serchForm: document.querySelector('.js-form-search'),
  list: document.querySelector('.js-articles'),
  //   btnLoadeMore: document.querySelector('.js-btn'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '.js-btn', hidden: true });
const newsApiService = new NewsApiService();

refs.serchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  clearArticlesConteiner();
  newsApiService.query = e.currentTarget.elements.query.value.trim();

  if (newsApiService.query === '') {
    return alert('Hey, please pframeters!!!!');
  }
  loadMoreBtn.show();
  newsApiService.resetPage();

  fetchArticles().finally(() => refs.serchForm.reset());
}

function fetchArticles() {
  loadMoreBtn.disable();
  return newsApiService
    .fetchArticles()
    .then(articles => {
      const murkup = createMarkup(articles);
      updateNewList(murkup, refs.list);
      loadMoreBtn.enable();
    })
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  return arr
    .map(
      ({ urlToImage, title, author, description, url }) => `
      <li class = "articles-item">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class = "articles-link">
          <img src="${urlToImage}" alt="" class = "articles-img" />
          <h2 class = "articles-title">${title}</h2>
          <p>Posted by: ${author}</p>
          <p>${description}</p>
        </a>
      </li>`
    )
    .join('');
}

function updateNewList(murkup, element) {
  element.insertAdjacentHTML('beforeend', murkup);
}

function clearArticlesConteiner() {
  refs.list.innerHTML = '';
}

const API_KEY = 'd8847f02a17a4f339957c5e8d851cb8e';
const BASE_URL = 'https://newsapi.org/v2';
const option = {
  headers: { 'X-Api-Key': API_KEY },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, option)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        return articles;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

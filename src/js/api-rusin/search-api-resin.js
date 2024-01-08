// import { LoadMoreBtn } from './load-more-btn-rusin';

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const ENDPOINT = 'trending/movie/day';
// const list = document.querySelector('.js-list');
// let currentPage = 1;

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.js-loadMore',
//   isHidden: true,
// });
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWExN2Q3MWQzNTAwNzE3Y2EyN2Q2YmQyOTIxNTkwZSIsInN1YiI6IjY0YmQwZmFmYWM2Yzc5MDhkZTVmN2YzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VC2MsN7ExHveRmeoqTrt5NtUQuxLm3x9qkjt-CjxRZI',
//   },
// };

// loadMoreBtn.button.addEventListener('click', onLoad);

// getTrending()
//   .then(data => {
//     console.log(data);
//     list.insertAdjacentHTML('beforeend', createMarkup(data.results));

//     if (data.page !== data.total_pages) {
//       loadMoreBtn.show();
//     }
//   })
//   .catch(err => console.log(err));

// function onLoad() {
//   currentPage += 1;
//   getTrending(currentPage)
//     .then(data => {
//       console.log(data);
//       list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//       if (data.page === data.total_pages / 2) {
//         loadMoreBtn.hide();
//       }
//     })
//     .catch(err => console.log(err));
// }

// function getTrending(page = 1) {
//   return fetch(`${BASE_URL}${ENDPOINT}?page=${page}`, options).then(
//     responce => {
//       if (!responce) {
//         throw new Error(responce.statusText);
//       }
//       return responce.json();
//     }
//   );
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, title }) => `
//       <li class="list-item-card">
//         <img class="list-img-card" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
//         <h2>${title}</h2>
//       </li>`
//     )
//     .join('');
// }

// !!!!!! INFINITI SCROLL !!!!!!!!!

const BASE_URL = 'https://api.themoviedb.org/3/';
const ENDPOINT = 'trending/movie/day';
const list = document.querySelector('.js-list');
const target = document.querySelector('.js-guard');
let currentPage = 1;

let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

const option = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWExN2Q3MWQzNTAwNzE3Y2EyN2Q2YmQyOTIxNTkwZSIsInN1YiI6IjY0YmQwZmFmYWM2Yzc5MDhkZTVmN2YzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VC2MsN7ExHveRmeoqTrt5NtUQuxLm3x9qkjt-CjxRZI',
  },
};

getTrending()
  .then(data => {
    console.log(data);
    list.insertAdjacentHTML('beforeend', createMarkup(data.results));
    observer.observe(target);
  })
  .catch(err => console.log(err));

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;

      getTrending(currentPage)
        .then(data => {
          console.log(data);
          list.insertAdjacentHTML('beforeend', createMarkup(data.results));

          if (data.page === data.total_pages / 2) {
            observer.unobserve(target);
          }
        })
        .catch(err => console.log(err));
    }
  });
}

function getTrending(page = 1) {
  return fetch(`${BASE_URL}${ENDPOINT}?page=${page}`, option).then(responce => {
    if (!responce) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, title }) => `
      <li class="list-item-card">
        <img class="list-img-card" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" />
        <h2>${title}</h2>
      </li>`
    )
    .join('');
}

!function(){var t="https://api.themoviedb.org/3/",n="trending/movie/day",e=document.querySelector(".js-list"),o=document.querySelector(".js-guard"),c=1,r=new IntersectionObserver((function(t,n){t.forEach((function(t){t.isIntersecting&&s(c+=1).then((function(t){console.log(t),e.insertAdjacentHTML("beforeend",a(t.results)),t.page===t.total_pages/2&&n.unobserve(o)})).catch((function(t){return console.log(t)}))}))}),{root:null,rootMargin:"100px",threshold:1}),i={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWExN2Q3MWQzNTAwNzE3Y2EyN2Q2YmQyOTIxNTkwZSIsInN1YiI6IjY0YmQwZmFmYWM2Yzc5MDhkZTVmN2YzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VC2MsN7ExHveRmeoqTrt5NtUQuxLm3x9qkjt-CjxRZI"}};function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return fetch("".concat(t).concat(n,"?page=").concat(e),i).then((function(t){if(!t)throw new Error(t.statusText);return t.json()}))}function a(t){return t.map((function(t){var n=t.poster_path,e=t.title;return'\n      <li class="list-item-card">\n        <img class="list-img-card" src="https://image.tmdb.org/t/p/w500'.concat(n,'" alt="').concat(e,'" />\n        <h2>').concat(e,"</h2>\n      </li>")})).join("")}s().then((function(t){console.log(t),e.insertAdjacentHTML("beforeend",a(t.results)),r.observe(o)})).catch((function(t){return console.log(t)}))}();
//# sourceMappingURL=search-api-rusin.02501cc8.js.map
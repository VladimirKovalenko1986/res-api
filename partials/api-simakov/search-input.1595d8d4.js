!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var n={};function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e};var a=function(){"use strict";function r(){e(t)(this,r),this.queryPage=1,this.searchQuery=""}return e(n)(r,[{key:"getNews",value:function(){var e=this,t="".concat("https://newsapi.org/v2/everything","?q=").concat(this.searchQuery,"&pageSize=8&page=").concat(this.queryPage);return fetch(t,{headers:{"X-Api-Key":"d8847f02a17a4f339957c5e8d851cb8e"}}).then((function(e){return e.json()})).then((function(t){return e.incrementPage(),t}))}},{key:"resetPage",value:function(){this.queryPage=1}},{key:"incrementPage",value:function(){this.queryPage+=1}}]),r}(),i=function(){"use strict";function r(n){var a=n.selector,i=n.isHidden,c=void 0!==i&&i;e(t)(this,r),this.button=this.getButton(a),c&&this.hide()}return e(n)(r,[{key:"getButton",value:function(e){return document.querySelector(e)}},{key:"enable",value:function(){this.button.disabled=!1,this.button.textContent="Load More"}},{key:"disable",value:function(){this.button.disabled=!0,this.button.textContent="Loading....."}},{key:"hide",value:function(){this.button.classList.add("hidden")}},{key:"show",value:function(){this.button.classList.remove("hidden")}}]),r}(),c=document.getElementById("form-search"),o=new i({selector:"#lodMoreBtn",isHidden:!0}),u=new a;function s(){return o.disable(),u.getNews().then((function(e){var t=e.articles;if(0===t.length||""===u.searchQuery)throw new Error("No data");return t.reduce((function(e,t){return function(e){var t=e.author,n=e.title,r=e.description,a=e.url,i=e.urlToImage;return'\n        <div class="articles-card">\n         <img class="article-img" src="'.concat(i||"https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",'" alt="#" />\n            <h2 class="article-title">').concat(n,'</h2>\n            <h3 class="article-author"').concat(t||"Anonym",'></h3>\n            <p class="article-text">').concat(r||"Fack You!!!",'</p>\n            <div class="article-link-conteiner">\n                <a class="article-link" href="').concat(a,'" target="_blank" rel="noopener noreferrer">Reade more</a>\n            </div>\n        </div>')}(t)+e}),"")})).then((function(e){l(e),o.enable()})).catch(d)}function l(e){document.getElementById("articlesWrapper").insertAdjacentHTML("beforeend",e)}function d(e){console.error(e),l('<p class ="article-error">Articles not found!!!</p>')}c.addEventListener("submit",(function(e){e.preventDefault(),u.searchQuery=e.currentTarget.elements.news.value.trim(),document.getElementById("articlesWrapper").innerHTML="",u.resetPage(),o.show(),s().finally((function(){return c.reset()}))})),o.button.addEventListener("click",s)}();
//# sourceMappingURL=search-input.1595d8d4.js.map

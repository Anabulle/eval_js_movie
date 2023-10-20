const apiKey = "bee1a48b3336f860c10892cc059fe4b2";
let article, img, h2, p;
let articleFilm = document.querySelector("#film");
let selectSection = document.querySelector("#accueil")
const input = document.querySelector('#film-name');
const filmTitle = document.querySelector('#film h2');
const filmImg = document.querySelector('#film img');
const errorAside = document.querySelector('#error');
const page = document.querySelector('#page');
let currentPage = 1;
let films = "https://api.themoviedb.org/3/movie/76341?api_key=bee1a48b3336f860c10892cc059fe4b2";


document.querySelector('#film-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input.value}&page=1`
    fetch(`${url}`).then(response => response.json()).then(response => {
       response.results.forEach(Film => {
        console.log(Film);
        selectSection.className = "none";
        pages(Film);
        img = document.createElement("img");
        img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${Film.poster_path}`);
        articleFilm.append(img);
        h2 = document.createElement("h2");
        h2.textContent = Film.title;
        articleFilm.append(h2);
        p = document.createElement("p");
        p.textContent = Film.overview;
        articleFilm.append(p);
       });
    }).catch(error => {
        errorAside.textContent = "Ce film n'existe pas";
        errorAside.removeAttribute('hidden');
        
        setTimeout(() => {
            errorAside.setAttribute('hidden', true);
        }, 3000);
    });
});


let url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr&page=1`
fetch(`${url2}`).then(response => response.json()).then(response => {
   response.results.forEach(Film => {
    console.log(Film)
        film(Film);
   });
}).catch(error => {
    errorAside.textContent = "Ce film n'existe pas";
    errorAside.removeAttribute('hidden');
    
    setTimeout(() => {
        errorAside.setAttribute('hidden', true);
    }, 3000);
});

function film(response) {
    let img = `https://image.tmdb.org/t/p/w500${response.poster_path}`;
    let titre = new Film(response.title, img, response.overview);
    titre.createElement();
    titre.fillElement();
    titre.append();
}

class Film {
    constructor(titre, image, synopsis) {
        this.titre = titre,
            this.image = image,
            this.synopsis = synopsis
    }

    createElement() {
        this.article = document.createElement("article");
        this.img = document.createElement("img");
        this.h2 = document.createElement("h2");
        this.p = document.createElement("p");
    }

    fillElement() {
        this.img.setAttribute("src", this.image);
        this.h2.textContent = this.titre;
        this.p.textContent = this.synopsis;
    }

    append() {
        selectSection.append(this.article);
        this.article.append(this.img);
        this.article.append(this.h2);
        this.article.append(this.p);
    }
}

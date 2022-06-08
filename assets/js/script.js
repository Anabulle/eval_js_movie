let apiKey = "https://api.themoviedb.org/3/movie/76341?api_key=bf26301d9698c1061427652e6ea2f518&language=fr";
let article, img, h2, p;
let selectSection = document.querySelector("section")

fetch(apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        const obj = response;
        film(obj);
    });

class Film {
    constructor(titre, image, synopsis) {
        this.titre = titre,
            this.image = image,
            this.synopsis = synopsis
    }
    createElement() {
        article = document.createElement("article");
        img = document.createElement("img");
        h2 = document.createElement("h2");
        p = document.createElement("p");
    }
    fillElement() {
        img.setAttribute("src", this.image);
        h2.textContent = this.titre;
        p.textContent = this.synopsis;
    }
    append() {
        selectSection.append(article);
        article.append(img);
        article.append(h2);
        article.append(p);
    }
}

function film(response) {
    let img = `https://image.tmdb.org/t/p/w500${response.poster_path}`;
    let titre = new Film(response.title, img, response.overview);
    titre.createElement();
    titre.fillElement();
    titre.append();
}
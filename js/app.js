

/* -------------------------------------------------------------------------- */
/*                                RICERCA FILM                                */
/* -------------------------------------------------------------------------- */

const form = document.querySelector('form');

const filmTrovato = document.querySelector(".film-trovato");

const dettagliFilm = document.querySelector(".dettagli-film");

const updateUI = data =>{

    console.log(data.Response);
    
    
    if(data.Response== "True"){
        if(data.Poster == "N/A"){
            filmTrovato.innerHTML = `
                <h2 class="mb-3"> ${data.Title}</h2>
                <img src="img/error-img.webp" alt="Poster del film">
            `;

        }else {

            /* salviamo il film nel localStorage tramite la funzione saveToLocalStorage */
            filmTrovato.innerHTML = `
                <h2 class="mb-3"> ${data.Title}</h2>
                <a href="pagina-film.html" onclick="saveToLocalStorage('${encodeURIComponent(JSON.stringify(data))}')">
                <img class="shadow-lg" src="${data.Poster}" alt="Poster del film"></a>
                `;
               
        }

    }else {
        filmTrovato.innerHTML= `
                <h2 class="mb-5"> Film non trovato</h2>
                <img class="shadow-lg" src="img/error-img.webp" alt="Poster del film">
            `;
    }


    
}

const findMovie = async movieTitle =>{
    const movieDetails = await getByTitolo(movieTitle);

    console.log(movieDetails);
    
    return movieDetails;
}


form.addEventListener('submit', e =>{
    e.preventDefault();

    const filmCercato = form.movie.value.trim();

    form.reset();

    console.log(filmCercato);
    
    findMovie(filmCercato)
        .then(data => updateUI(data))
        .catch(err => {console.log(err)});

});


/* -------------------------------------------------------------------------- */
/*                               PAGINA DEL FILM                              */
/* -------------------------------------------------------------------------- */

const saveToLocalStorage = (data) => {
    const parsedData = JSON.parse(decodeURIComponent(data));
    //questo funziona come una mappa di Java, cioè è una coppia chiave-valore. Nel file 
    //script-dettagli.js andremo a richiamare l'item tramite getItem(chiave). 
    localStorage.setItem("selectedMovie", JSON.stringify(parsedData)); 
};


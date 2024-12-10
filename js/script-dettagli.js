
document.addEventListener("DOMContentLoaded", () => {
    /* 
        Questa riga fa due operazioni principali:

           - localStorage.getItem("selectedMovie"):

                Recupera il valore associato alla chiave "selectedMovie" nel localStorage.
                Il valore recuperato è una stringa (perché il localStorage può salvare solo stringhe).
                JSON.parse():

            - Converte la stringa recuperata dal localStorage in un oggetto JavaScript.
                Questo è necessario perché quando salvi un oggetto con localStorage, lo converti in stringa usando JSON.stringify.
                Ora devi fare il passaggio inverso per usarlo come oggetto.

    */
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

    if (selectedMovie) {
        const dettagliFilm = document.querySelector(".description");

        let elAttori = linkWiki(selectedMovie);

        dettagliFilm.innerHTML = `
        
        <h1 class="text-center">${selectedMovie.Title}</h1>
        <hr>
        <div class="p-5 ml-5 d-lg-flex flex-wrap justify-content-between align-items-center">
                <img class="col-lg-4 col-sm-12 m-auto" src="${selectedMovie.Poster}" alt="Poster del film">
                <div class="col-lg-6 col-sm-12">
                    <p class="mt-5">
                        <ul class="descrizione-lista">
                            <li><strong>Attori:</strong> ${elAttori}</li>
                            <li><strong>Durata:</strong> ${selectedMovie.Runtime}</li>
                            <li><strong>Anno:</strong> ${selectedMovie.Released}</li>
                            <li><strong>Generi:</strong> ${selectedMovie.Genre}</li>
                            <li><strong>Rating:</strong> ${selectedMovie.imdbRating}</li>
                        </ul>
                    </p>
                    <p class="trama">${selectedMovie.Plot || "Trama non disponibile."}</p>
                </div>
            </div>
        `;
    } else {
        document.querySelector(".dettagli-film").innerHTML = `
            <h2>Errore: Nessun film trovato</h2>
        `;
    }
});



function linkWiki(selectedMovie) {
    let arrayAttori = selectedMovie.Actors.split(",");

    let indexAttori = 0;
    let elAttori = "";

    arrayAttori.forEach(element => {
        element = element.trim();
        let risultato = element.replaceAll(" ", "_");
        console.log(risultato);

        indexAttori++;

        if (indexAttori === arrayAttori.length) {
            elAttori += `<a href="https://it.wikipedia.org/wiki/${risultato}">${element}</a>`;
        } else elAttori += `<a href="https://it.wikipedia.org/wiki/${risultato}">${element}</a>, `;

    });
    return elAttori;
}
// //pulire la pagina: 
// window.addEventListener("beforeunload", () => {
//     localStorage.removeItem("selectedMovie");
// });



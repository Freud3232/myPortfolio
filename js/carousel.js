/* -------------------------------------------------------------------------- */
/*                                  CAROSELLO                                 */
/* -------------------------------------------------------------------------- */
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carosello = document.querySelector(".carosello img");
const descrizioneCarosello = document.querySelector(".descrizione");
const linkFilmCarosello = document.querySelector(".link-film-carosello");


const takeCarouselMovies = async () =>{
    const movie1 = await getByTitolo("Lord of the rings");
    const movie2 = await getByTitolo("inception");
    const movie3 = await getByTitolo("fight club");

    return [movie1,movie2,movie3];

};

// è possibile salvare la lista dei film nel localStorage in modo da non doverli ricaricare ad ogni refresh della pagina.

takeCarouselMovies().then(([movie1,movie2,movie3])=>{

    const arrFilmCarosello = [movie1, movie2, movie3];
    let currentIndex = 0;

    displayHtml(arrFilmCarosello,currentIndex);
    //icona next
    next.addEventListener("click", ()=>{
        
        currentIndex = (currentIndex + 1) % arrFilmCarosello.length;

        // console.log(currentIndex);

        displayHtml(arrFilmCarosello,currentIndex);

        
    });

    // icona prev
    prev.addEventListener("click", ()=>{
        if(currentIndex === 0){
            currentIndex = arrFilmCarosello.length - 1;
        } else{
            currentIndex--;
        }

        // console.log(currentIndex);

        displayHtml(arrFilmCarosello, currentIndex);

    });

})
.catch(err => console.log(err));



//Cambia html
function displayHtml(arrFilmCarosello, currentIndex) {
    carosello.setAttribute('src', arrFilmCarosello[currentIndex].Poster);
    linkFilmCarosello.setAttribute("onclick", `saveToLocalStorage('${encodeURIComponent(JSON.stringify(arrFilmCarosello[currentIndex]))}')`);
    console.log(arrFilmCarosello[currentIndex]);
    
    
    //wikipedia attori
    let elAttori = linkWiki(arrFilmCarosello, currentIndex);

    descrizioneCarosello.innerHTML = `
                <h3>${arrFilmCarosello[currentIndex].Title}</h3>
                <p>
                    <ul class="descrizione-lista">
                        <li><strong>Attori: </strong>${elAttori}</li>
                        <li><strong>Durata:</strong> ${arrFilmCarosello[currentIndex].Runtime}</li>
                        <li><strong>Anno:</strong> ${arrFilmCarosello[currentIndex].Year}</li>
                        <li><strong>Generi:</strong> ${arrFilmCarosello[currentIndex].Genre}</li>
                    </ul>
                </p>
        `;



}



//wikipedia attori:
function linkWiki(arrFilmCarosello, currentIndex) {
    let arrayAttori = arrFilmCarosello[currentIndex].Actors.split(",");

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


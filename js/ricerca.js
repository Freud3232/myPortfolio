const key = "d13c9214";

const getByTitolo = async (title) => {
    const base = `https://www.omdbapi.com/?apikey=${key}&`;
    const query = `t=${title}`;

    const response = await fetch(base + query);
    const data = await response.json();


    return data;
    
}

getByTitolo('Lord of the rings')
    .then(data => console.log(data))
    .catch(err => console.log(err))



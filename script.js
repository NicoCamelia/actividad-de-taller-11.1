document.addEventListener("DOMContentLoaded", function() {

let pagina = 1
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAtras = document.getElementById("btnAtras");

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000){
        pagina += 1;
        URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${KEY}&language=en-US&page=${pagina}`;
        mostrarSeries();
    }
});

btnAtras.addEventListener("click", () => {
    if (pagina > 1){
        pagina -= 1;
        URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${KEY}&language=en-US&page=${pagina}`;
        mostrarSeries();
    }
});


const KEY = 'b0689ad7c2594580b504c73f430c5992';
let URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${KEY}&language=en-US&page=${pagina}`;

const OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${KEY}`
    }
};

const mostrarSeries = async function () {
    try {
        const response = await fetch(URL, OPTIONS);

        if (response.status === 200) {
            const DATA = await response.json();

            let series = "";
            DATA.results.forEach(serie => {
               const URLSERIE = `https://api.themoviedb.org/3/tv/${serie.id}`;
               series += `
               <div class="serie">
                   <div class="imagen-container">
                        <a href="${URLSERIE}" target="_blank">
                           <img class="imagen" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}">
                        </a>   
                   </div>
                    <h3 class="titulo">${serie.name}</h3>
                    <p class="calificacion">${serie.vote_average}</p>
                </div>` 
            });

            document.getElementById("contenedor").innerHTML = series;
            
        }
    } catch(error) {
        console.log(error);
    }
}

mostrarSeries();



});

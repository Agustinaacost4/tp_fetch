const $ = (id) => document.getElementById(id);
const qs = (id) => document.querySelector(id);
window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
  console.log(favorites);
 


  favorites.forEach(async id => {
    try {
      let response = await fetch('http://localhost:3031/api/movies/'+id)
    let movie = await response.json()

    

    let data = movie.data;

    
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = data.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${data.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${data.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (data.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${data.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    ;
  } catch (error) {
      console.log(error);
    }
  });
  
  if (favorites.length===0) {
    const alert = document.createElement('h2')
    alert.innerText='NO HAY PELICULAS AGREGADAS A FAVORITOS';    
    qs('.container').appendChild(alert)
  }
    
    

};
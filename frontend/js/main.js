const $ = (id) => document.getElementById(id);
const qs = (id) => document.querySelector(id);
window.onload = async () => {
  const app = document.getElementById("root");

  const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
  const container1 = document.querySelector('.container')
  
  if (favorites.length > 0) {
    const favoritesButton = document.createElement('a')
    favoritesButton.setAttribute('class', 'botonAgregar')
    favoritesButton.setAttribute('href', 'favoritas.html')
    favoritesButton.setAttribute('id', 'favoritesButton')
    favoritesButton.innerText = 'Ver favoritos'
    container1.appendChild(favoritesButton)
  }
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  console.log(favorites);
 
  try {
    let response = await fetch('http://localhost:3031/api/movies')
    let peliculas = await response.json()
    
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

     
      const editButton = document.createElement("a")
      editButton.textContent = 'Modificar'
      editButton.setAttribute('href', `formulario.html?id=${movie.id}`)
      editButton.setAttribute('class', 'botonModificar')

      
      const star = document.createElement('i')
      if (!favorites.includes(movie.id)) {
        star.setAttribute('class', "far fa-star favStar")
      } else {
        star.setAttribute('class', "fas fa-star favStar favStarFlip")
      }
      star.setAttribute('id', `${movie.id}`)

   
      star.addEventListener("click", () => {

       
        if (!$('favoritesButton')) {

          const favoritesButton = document.createElement('a')
          favoritesButton.setAttribute('class', 'botonAgregar')
          favoritesButton.setAttribute('id', 'favoritesButton')
          favoritesButton.setAttribute('href', 'favoritas.html')
          favoritesButton.innerText = 'Ver favoritos'
          container1.appendChild(favoritesButton)
        }

        console.log(`hice click en la estrella ${movie.id}`);

        star.classList.toggle("far");
        star.classList.toggle("favStarFlip");
        star.classList.toggle("fas");

        
        if (!favorites.includes(movie.id)) {
          favorites.push(movie.id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          console.log(localStorage.favorites);
        } 
        else {
          const index = favorites.indexOf(movie.id)
          favorites.splice(index, 1)
          localStorage.setItem("favorites", JSON.stringify(favorites));
          console.log(localStorage.favorites);
          //si no tengo mas peliculas en favoritos y el boton de favoritos existe lo quito con remove
          if (favorites.length === 0 && favoritesButton) {
            favoritesButton.remove();
          }
        }
      })

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      if (movie.length !== null) {
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
        card.appendChild(duracion);
      }
      card.appendChild(editButton)
      card.appendChild(star)
    });
  } catch (error) {
    console.log(error);
  }


};
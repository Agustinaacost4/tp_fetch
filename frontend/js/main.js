window.onload = async() => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  try {
    let response = await fetch("http://localhost:3031/api/movies");
    let peliculas = await response.json();

    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      const a = document.createElement("a");
      a.setAttribute("href", "formulario.html?id=" + movie.id);
      a.setAttribute("class", "botonAgregar");
      a.textContent = "Ver más";
      card.appendChild(a)

      //Estrella de favoritos:
      const star = document.createElement("a");
      star.setAttribute("class", "botonAgregar");
      star.innerHTML = '<i class="fa-regular fa-star fa-beat" style="color: #f6fa00;"></i>';
      star.setAttribute("id", "movie" + movie.id)
      card.appendChild(star)
    });

  } catch (error) {
    console.error
  }


};
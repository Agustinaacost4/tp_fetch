const $ = (id) => document.getElementById(id);
const qs = (id) => document.querySelector(id);
const urlBase = 'http://localhost:3031/api/movies/'
window.onload = async () => {

    let query = new URLSearchParams(location.search)
   
    const id = query.has('id') && query.get('id')
    
    if (!id) {
        qs('button').setAttribute('hidden', 'hidden')
        qs('button.botonBorrar').setAttribute('hidden', 'hidden')
        qs('h1').innerText = 'Creando pelicula nueva'

        $("crear").addEventListener("click", async (e) => {
            e.preventDefault();
            try {

                let response = await fetch("http://localhost:3031/api/movies/create", {
                    method: "POST",
                    body: JSON.stringify({
                        title: $("title").value,
                        rating: $("rating").value,
                        awards: $("awards").value,
                        release_date: $("release_date").value,
                        length: $("length").value,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let result = await response.json();
                console.log(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Película creada',
                    text: 'La película se ha creado exitosamente.',
                }).then(() => {
                   
                    window.location.href = 'home.html';
                });

            } catch (error) {
                console.error;
            }

        })
    } 
    else {
        $('crear').setAttribute('hidden', 'hidden')
        /* EDICION */
        try {

          
            let response = await fetch(urlBase + id)
            let pelicula = await response.json()
            //console.log(pelicula);

            let { title, rating, awards, length: duracion, release_date } = pelicula.data;
            console.log(title);

            qs('h1').innerText = `Estas editando la pelicula: ${title}`
           
            let formatReleaseDate = moment(release_date).format('YYYY-MM-DD')

            document.querySelector("#title")
            $('title').value = title;
            $('rating').value = rating;
            $('awards').value = awards;
            $('length').value = duracion;
            $('release_date').value = formatReleaseDate;


        } catch (error) {
            console.log(error);
        }
        qs('button').addEventListener('click', async (e) => {
            e.preventDefault();
            try {

                response = await fetch(urlBase + 'update/' + id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: $('title').value,
                        rating: $('rating').value,
                        awards: $('awards').value,
                        length: $('length').value,
                        release_date: $('release_date').value,

                    }),
                    headers: { 'Content-Type': 'application/json' }

                })
                let result = await response.json();
                console.log(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Película modificada',
                    text: 'La película se ha modificado exitosamente.',
                }).then(() => {
                  
                    window.location.href = 'home.html';
                });

            } catch (error) {
                console.log(error);
            }
            

        })
        /* ELIMINACION */
        qs('button.botonBorrar').addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                Swal.fire({
                    title: "¿Estás seguro de que deseas eliminar esta película?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await fetch(urlBase + 'delete/' + id, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' }
                            });

                            Swal.fire("Película eliminada", "", "success").then(() => {
                                
                                window.location.href = 'home.html';
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
        
    }
}
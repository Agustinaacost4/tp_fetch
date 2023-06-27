const $ = (id) => document.getElementById(id)
const urlBase = "http://localhost:3031/api/movies/"

window.onload = async () => {

    let query = new URLSearchParams(location.search);
    let id = query.has("id") && query.get("id");

    try {
        let response = await fetch(urlBase + id)
        let pelicula = await response.json()
        let{title, rating, awards, length = duration, duration, release_date} = pelicula.data
        
        $("title").value = title,
        $("rating").value = rating,
        $("awards").value = awards,
        $("length").value = length,
        $("release_date").value =moment(release_date).format("YYYY-MM-DD")
    } catch (error) {
        
    }
        document.querySelector(".formulario").addEventListener("submit", async(e) => {
            e.preventDefault();
            try {
                let response = await fetch(urlBase + "update/" + id, {
                    method: "PUT",
                    body : JSON.stringify({
                        title : $("title").value,
                        rating : $("rating").value,
                        awards : $("awards").value,
                        length : $("length").value,
                        release_date : $("release_date").value
                    }),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });
                let result = await response.json()
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        })
}
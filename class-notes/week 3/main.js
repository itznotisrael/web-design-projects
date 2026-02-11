//Shorthand ofr the document.addEventListener('load', () =>)
window.onload = () => {
    console.log("Script is connect.");


    let button = document.getElementById('send');
    button.addEventListener('click', () =>{
        let text = document.getElementById('search');
        console.log(text.value);
    });

    //Call my functino
    request(text.value);

    //Resetting my text.value into nothing
    text.value = "";

};

//Add Async function so we can use await
async function request(inputText) {
    let baseURL = "http://www.omdbapi.com/?"

    // My API Key: 46c63764
    //
    let params = new URLSearchParams({
        apikey: "46c63764",
        s: inputText,
        type: "movie"
    });
    //FULL URL with the syntax that is require
    console.log(baseURL + params);

    let url = baseURL + params;
    let response = await fetch(url);
    console.log(response);

    let JSON =  await response.json();
    console.log(json);

    let movies = json.Search;
    console.log(movies);

    // Retrieve where on the webpage my movie data should be added
    let container =  document.getElementById("container");

    container.innerHTML = "";
    

    for(let movie of movies){
        //Create the item to be added
        let m = document.createElement("div");
        m.textContent = movie.Title + " " + movie.Year
        //Adding the poster element
        let img = document.createElement("img");
        img.src = movie.Poster;
        //Add the image to the div
        m.appendChild(img);
        //Add the div to the container
        container.appendChild(m);
    }
}

//git commit -m "Week3 - Adding API Demo Front end Layer"
//git push
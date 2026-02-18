//Imports the express library
const express = require("express");

// Initializes our app as an exxpress server
const app = express();

// All of our files that we want to be on the front-end will go inside the public
app.use(express.static("public"));

//
app.use(express.urlencoded({ extended: true }));

// 1st Parameter is the url or the location where we want to get the data from. 
// The 2nd one is the function, action to happen whne this route is hit
/*app.get("/test", callback);

function callback(request, response){

}*/

app.get("/test", (request, response) => {
    response.send('my server is working!');
});

app.listen(8000, ()=>{
    console.log('server is running');
})


// Import the express library
const express = require("express");

// Import database library
const Datastore = require("@seald-io/nedb");

let nunjucks = require('nunjucks');

let app = express();

// Store database in external file
let database = new Datastore({ filename: "data.db", autoload: true });

//Setting up my nunjucks template
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
//Express will use the templating engine of nunjucks
app.set("view engine", "njk");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (request, response) => {

    database.insert({ data: "Hello" });

    response.send('<h1>h1</h1>');
});

app.get('/data', (request, response) => {

    let query = {};

    database.find(query, (error, foundData) => {
        if (error) {
            response.send('error');
        } else {
            response.json({ allData: foundData });
        }
    });

});

app.get("/guestbook", (request, response) => {
  response.render("guestbook.njk", {
    serverData: "I sent this from my server!",
  });
});

app.post('/sign', (request,response)=>{
// Processing the body of my request in the format I want it tp be displayed at JSON data
    // This is also ohw it will be stord in my database
    let guestSignature = {
        guestName: request.body.guest,
        guestMessage: request.body.guestMessage,
    };

    // Storing the data in the database
    database.insert(guestSignature);

    // Send the user back to the guestbook
    response.redirect("/guestbook");
});

app.get('/display-guest-messages', (request, response) =>{
    let query = {
        guestNmae: {$exists: true}
    }
    database.find(query, (error,foundData)=>{
        if(error){
            response.redirect('/guestbook')
        } else {
            //response.json(foundData);
            response.json('messages.njk', {messages: foundData})
        }
    })
})

// START SERVER
app.listen(9001, () => {
    console.log('Server is now running');
});
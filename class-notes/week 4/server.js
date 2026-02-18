//Imports the express library
const express = require("express");

// Initializes our app as an exxpress server
const app = express();

// All of our files that we want to be on the front-end will go inside the public
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let guestbookMessages = [];

// 1st Parameter is the url or the location where we want to get the data from. 
// The 2nd one is the function, action to happen whne this route is hit
/*app.get("/test", callback);

function callback(request, response){

}

app.get("/test", (request, response) => {
    response.send('my server is working!');
});*/

app.get("/", (request, response) => {
    response.send('I set up my / route');
});

app.get("/gb", (request, response) => {
    response.sendFile('guestbook.html', { root: "./public"});
});

app.post('/sign', (request, response)=>{
    console.log(request.body);


    let guest = request.body.guest;
    let message = request.body.message;

    guestbookMessages.push({
        person: guest,
        note:message
    })

    console.log("sign-in route has been hit");
    //response.send("hihihihi");
    response.redirect("/gb");
});

app.get('/a;;-messages', (request, response)=>{
    response.json({ allMessages: guestbookMessages })
});

app.listen(3000, ()=>{
    console.log('server is running');
})


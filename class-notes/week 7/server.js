const express = require('express');
const nunjucks = require('nunjucks');

// import cookie library
const cookieParser = require('cookie-parser');

let app = express()

nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))


// middleware
// set up cookie library to link with our app
app.use(cookieParser());

//routes xome after middleware, but before the listen
app.get('/', (request, response)=>{

    if(request.cookies.visits){
        console.log(request.cookies.visits);

        let visits = request.cookies.visits;
        visits++;

        response.cookie('visits', visits, {
            expires: new Date(Date.now() + 1000 * 60 * 60),
        });

        response.render('index.njk', { numVisits: visits });

    } else {

        let oneHourInMs = 1000 * 60 * 60;

        response.cookie('visits', 1, {
            expires: new Date(Date.now() + oneHourInMs),
        });

        response.render('index.njk', { numVisits: 1 });
    }
})

app.get('/about', (request, response) => {
    response.render('about.njk');
});
//Last!

app.listen(7001, ()=>{
    console.log('http://localhost:7001')
})
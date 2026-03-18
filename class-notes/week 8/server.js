const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const nedb = require('@seald-io/nedb');


// setting up our application to use express
const app = express();
const database = new nedb({filename: 'data.db', autoload: true});
//set up our multer where our files will be stored
const uploadProcessor = multer({ dest: 'public/uploads/' });


//Confirgure  Use nunkucks inside of our response.render
nunjucks.configure("views", {
    autoescape: true,
    express:app
});

app.set('view engine', 'njk');

app.use(express.static('static'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {

    let query = {};
    database.find(query, (err, foundData) => {
        console.log(foundData);
        response.render('index.njk', {dataToBeSent: foundData});
    })
    //response.render('index.njk', {dataToBeSent: 'hello'});
});

app.get('/make-a-post', (request, response) => {
    response.render('make-a-post.njk');
});

app.post('/post', uploadProcessor.single("upLoadedImage"), (request, response) => {
    console.log(request.body);
    console.log(request.file);

    let dataToBeStored = {
        dataCaption: request.body.caption,
        filePath: "/static" + request.file
    }

    console.log(dataToBeStored);

    database.insert(dataToBeStored);

    response.redirect('/make-a-post');
});

app.get('/post/:id', (request, response) => {
    let query = {
        _id: request.params.id
    }
    database.findOne(query, (err,foundData) =>{
        console.log(foundData);
        response.render('id.njk', { dataToBeSend: foundData });
    })
});

app.listen(9001, () => {
    console.log('server has started on port on 9001');
});
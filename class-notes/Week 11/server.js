const express = require('express');
const nunjucks = require('nunjucks');
//Import new libraries
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express()
//New initialization
const httpServer = createServer(app);
const io = new Server(httpServer);

//Regular middeware
app.use(express.static('public'))
app.set('view engine', 'njk')
nunjucks.configure('views', {
    autoscape: true,
    express: app
})

app.get('/', (request, response)=>{
    response.render('index.njk', {numClient: ioengine.clientsCount});
})

io.on('connection', (socket) => {
	console.log('a user connected');
    console.log('total users ' + io.engine.clientsCount);

	socket.on('silly note', (dataFromClient) => {
		console.log('message: ' + dataFromClient);

        io.emit('Server sent data', dataFromClient);
	});

	// checks if a client has been disconnected
    //Connect / disconnect are reserved words and cannot be used
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

//Replace app.listen and instead 
httpServer.listen(3000), ()=>{
    console.log('Server has started on port 3000')
}
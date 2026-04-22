# Week 11: 4/22/26

## Agenda

1. Upcoming Events
2. Project #3 Concept Review
3. Tutorial: Introduction to WebSockets and Real Time Interaction

---

## Upcoming Events

4/29: Hunter Artist Visit with [Nancy Baker Cahill](https://nancybakercahill.com/)

- THE BLACK BOX, HN543
- 3pm Reception with refreshments
- 3:30-5pm Artist Talk followed by Q&A
- 6-9pm Workshop with IMA students and advanced undergrads
  - The workshop title is: Identifying Creative Focus: Astonishment, Discernment & Integration into Practice
  - Identifying specifically what quickens your pulse as an artist can be murky territory. In this workshop, we will help you discern your area of focus and where/how you can apply your technical skills strategically to support your conceptual goals.

Instead of meeting during our regular session, I will be offering extra credit for students who attend the talk/workshop _in person_. For those not attending in person, we will do 1:1 sessions from 5-6pm and move our reading discussion to next week. Please send me an email if you are planning on attending!

5/1: F(r)ictions: Creative Work in an Age of AI

- https://www.aicreativelabor.com/project/frictions | RSVP: https://frictionscreativeworkinanageof.splashthat.com/
- 9:30 AM–3:30 PM
- The New School 63 5th Ave University Center, Hoerle Lecture Hall Room L105, New York, NY

> This day-long convening brings together practitioners, legal scholars, social scientists, and students to investigate the present and future of creative work in an age of AI.

I will be speaking on the last panel from 1:45-3:00pm with [Ari Melenciano](https://ariciano.earth/) and [Taeyoon Choi](https://taeyoonchoi.com/)

## Project #3 Concept Review

As a class, let's review each group concept proposals. In [this cryptpad](https://cryptpad.fr/doc/#/2/doc/edit/HhLGELHZfvWXt-m2nfablAoo/), write notes and feedback on each group.

## Tools to make your life easier

- Better Nunjucks extension: https://open-vsx.org/extension/ginfuru/better-nunjucks
- Adding a global configuration file for nodemon (_note_ you don't have to do this! you can always just run `nodemon server.js -e js,njk`)
  1. create a new file in vs code
  2. name it `nodemon.json` and save it in your home directory (for me it would be `Users/samheckle/`)
  3. add the following configuration

  ```json
  {
  	"restartable": "rs",
  	"ignore": [".git", "node_modules/**/node_modules"],
  	"ext": "js,njk"
  }
  ```

## Tutorial: Introduction to WebSockets and Real Time Interaction

Currently, our websites are mostly driven by the client, where a user interaction is required in order for a request to be made to a server. Think typing a url or sending a form. But there are a couple other types of communication that allow us to consistently receive new data from the server, especially if we want to have instantaneous updates in a live chatroom. The two methods that exist today are _polling_ and _websockets_.

_Polling_ is a regular request made from a client to a server. There are two types of polling: regular and long. Regular polling is a request that is sent at a specific interval from the client to the server. Long polling is a connection between a client and server that is opened until the request is fulfilled, then another request will trigger. This works ok for infrequent chats or email, but doens't work well for games or speed-based interactions.

_WebSocket_ is a protocol (`http` is also a protocol, as is `sms`) that allows for constant two-way communication. This is because the client and the server have both opted in to receive specific communications. Because both the client and the server have connected to the same protocol, we can leave the connection open and have all clients reflect the changes of the server in real-time. We can see the full Internet Engineering Task Force standard on WebSockets [here](https://datatracker.ietf.org/doc/html/rfc6455#section-1.5)

For our class, we will focus on websockets, but you are welcome and encouraged to experiment with polling as well.

### Existing WebSocket Tools

There are a few tools that are used to handle websockets:

- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) which is native to JavaScript
- [`ws`](https://github.com/websockets/ws) a Node-based websocket package
- [Socket.io](https://socket.io/) a framework built on top of the WebSocket protocol that we will be using for this class

### Socket.io

Socket.io works pretty similarly to `fetch()`, where we are sending data with front-end JS and receiving that data on the back-end. The difference is that it _automatically syncs any client data simultaneously_ and does not need an interaction or a refresh. We can send the data in two ways: from client → server and from server → client.

Let's start with a new project:

```sh
npm init -y
```

And install our dependencies:

```sh
npm install express nunjucks socket.io
```

### Setting up our Socket Server

We have some changes in our `server.js` files that we need to make. Firstly, we need to import `http` package and also import `socket.io`

```js
// imports new libraries
const { createServer } = require('http');
const { Server } = require('socket.io');
```

In the past, Express required us to import `http` in order to use `app.listen`. But with more modern versions of Express we don't need to do that anymore. However, with socket.io, we _do_ need to, which is explicitly mentioned: https://expressjs.com/en/guide/migrating-4.html#other-changes

After that, we need to initialize our variables of our applications

```js
// initialize variables using new libraries
const httpServer = createServer(app);
const io = new Server(httpServer);
```

Instead of routes, we need to detect for "connections". This determines how many / when a client has connected. This _does not replace routes_, but is a different type of handler for socket-based connections.

```js
// checks if a client has been connected
io.on('connection', (socket) => {
	console.log('a user connected');
});
```

This kind of operates simililarly to `addEventListener`, where the server is waiting for a connection from a client. Another useful event is `disconnect`, but this would be an event that triggers only _inside_ the socket connection.

```js
io.on('connection', (socket) => {
	console.log('a user connected');

	// checks if a client has been disconnected
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
```

### Setting up our Socket client

The biggest thing that is important for us is to import the socket.io library. In our `index.njk`, we will add the script imports.

```html
<script src="https://cdn.socket.io/4.8.3/socket.io.min.js"></script>
<script src="main.js"></script>
```

The library import needs to go _before_ our `main.js` import.

Then, we need to add the socket into our client javascript file (`main.js`)

```js
const socket = io();
```

### Sending Data from Client → Server

In `main.js`, we use the `emit` function. The string inside the first parameter is the name of the event we are creating to be handled by our server. We can pretty much use any name here, with some reserved names. See [emit cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/#to-all-connected-clients)

```js
// sending our custom event from our client called "chat message"
socket.emit('chat message' /* some input value */);
```

In `server.js`, we handle our custom event inside our socket connection:

```js
io.on('connection', (socket) => {
	console.log('a user connected');

	// receiving our custom event called "chat message"
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
```

### Sending Data from Server → Client

In a similar way, we can use `emit` in our `server.js` to send all the data to all connected clients. _The previous data will not show up for new clients unless it is stored somewhere_.

```js
io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		// sending the custom event "new message" to all connected clients
		io.emit('new message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
```

In our `main.js`, we handle the event just like we did in the server.

```js
socket.on('new message', (msg) => {
	// do something on the page with the new message
});
```

### Other Real-Time Tools

- https://playhtml.fun/ allows you to manipulate html elements in real-time. unfortunately, it looks like this was heavily built with claude
- https://tinytools.directory/ look through this list and see if there is anything of interest to you!

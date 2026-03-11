# Week 7: 3/11/26

## Agenda

1. Introduction to Cookies
2. In class project work time in groups

## Introduction to Cookies

### What is a Cookie?

First of all, what are cookies? Specifically, we are talking about an HTTP cookie, a web cookie, or a browser cookie. **A cookie is a small piece of data that a server sends to a user's web browser.** The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser — keeping a user logged in, for example. It remembers stateful information for the stateless HTTP protocol.

P.S. stateless HTTP protocol means that there is no link between two requests being successively carried out on the same connection, which is problematic for users attempting to interact with certain pages coherently.

Cookies were once used for general client-side storage. While this made sense when they were the only way to store data on the client, modern storage APIs are now recommended. **Cookies are sent with every request, so they can worsen performance** (especially for mobile data connections).

**Note:** To see stored cookies (and other storage that a web page can use), view, edit, and delete a page's cookies with [Chrome DevTools](https://developer.chrome.com/docs/devtools/storage/cookies/).

#### Cookies are mainly used for three purposes:

1. Session management - Logins, shopping carts, game scores, or anything else the server should remember
2. Personalization - User preferences, themes, and other settings
3. Tracking - Recording and analyzing user behavior

#### Drawbacks of cookies:

- Cookies are included with every HTTP request, thereby slowing down your web application by transmitting the same data.
- Cookies are included with every HTTP request, thereby sending data unencrypted over the internet.
- Cookies are limited to about 4 KB of data. Not enough to store required data.

### Implementing Cookies

Create a week6 folder inside your class demos folder and open that up in VS Code.

First time project setup:

```sh
npm init -y
```

```sh
npm install express nunjucks
```

Adding cookies:

```
npm install cookie-parser
```

Adding to our `server.js`

```js
// import cookie library
const cookieParser = require('cookie-parser');
```

```js
// middleware
// set up cookie library to link with our app
app.use(cookieParser());
```

This enables the use of accessing the cookies inside of a request, and setting a cookie inside of a response:

```js
// creates a new cookie to be sent back to the client
// 3 parameters:
// 1st param: name of the cookie
// 2nd param: initial value
// 3rd param: when the cookie expires
response.cookie('visits', 1, {
	expires: new Date(Date.now() + hundredyears),
});
```

```js
// accessing the cookies that might come in from the client (if they have visited the server before)
request.cookie.visits;
```

## Dynamic Pages in Express

We can add special parameters in each route to create unique pages, known as route parameters. They utilize the `:` to signify what the parameter might be. We can retrieve the unique url using `req.params`, just like we would do with `req.query` or `req.body`.

```js
app.get('/users/:userId', (req, res) => {
	res.send(req.params);
});
```

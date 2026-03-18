# Week 8: 3/18/26

## Agenda

1. Reading Discussion
2. Review
3. In class project work time in groups

## Reading Discussion

- Big takeaways? 
- What did you write about in your blog post?
- How would you define your relationship with the web at this moment in time?
- What do computer programs (and human beings) need to know about the external world in order to build plausible digital representations of it. What kind of cognitive activity is involved in the making and reading of those representations?
- What is your relationship with AI at this time?

## Review

### Uploading Images

In order to process images, we need to use another library to figure out where the images need to be stored in our file hierarchy. If we want the images to be accessible to the client, we need to store them inside the _public_ folder. To do this, we will create a new node project and install our previous libraries.

#### Starting New Project

```sh
npm init -y
```

```sh
npm install express nunjucks multer cookie-parser
```

#### What is multer?

Via the [multer docs](https://github.com/expressjs/multer?tab=readme-ov-file#installation):

> Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

In order to use multer, we need to add inside our client the `enctype` attribute to our form.

CLIENT

```html
<form action="/upload" method="post" enctype="multipart/form-data">
	<input type="file" name="myImage" />
</form>
```

SERVER

```js
// import our libraries
const multer = require('multer');
// this adds the files into the public folder
const uploadProcessor = multer({ dest: 'public/uploads/' });
```

```js
// add an additional parameter
app.post('/upload', uploadProcessor.single('myImage'), (request, response) => {
	// request.file is our file data coming through the name 'myImage'
	console.log(request.file);
	// request.body is the body of our request, with any text fields
	console.log(request.body);
	// handle the response in some way......
});
```

### Displaying Data from Database

Data is sent from the database to the server using `response.render()`. The object in the second parameter is the data to be displayed.

### Hosting on Digital Ocean

Only one person needs to host the live project in the droplet, but everyone will do it for this demo.

1. Ensure your `server.js` has a unique port number in `app.listen()`
1. In Cyberduck -- without your `node_modules` folder, upload your project
1. In Terminal -- `ssh root@{your-ip-address}`
1. Type your password (remember there are no keystrokes)
1. `cd` into your correct folder
1. Test your server is working correctly using `node server.js`
   - If you have the error `MODULE_NOT_FOUND`, you need to run `npm install`
   - If you have the error `NO_ACCESS`, change your port number in `server.js` and re-upload the file
1. Start your server running permanently on your Droplet using `pm2 start server.js --name {your-project-name}`

### Syncing your branch with the main branch

Once you or one of your teammates has added to the main branch, you need to pull from that branch into your own.

```sh
git pull origin main
```

## In-class work time

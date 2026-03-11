# Week 6: 3/4/26

## Agenda

1. Reading Discussion #2
2. Reviewing API for Project #2
3. Parallel Programming: Working on One Repository Together
4. If Time: Introduction to Cookies

---

## Reading Discussion #2

In this [document](https://cryptpad.fr/doc/#/2/doc/edit/V1a7Yz9ssc6cvw0fmKBMeEH3/), take notes with your group on your discussion and lead the class in a conversation about your thoughts.

group 1:

- Can technology be biased? Or is it designed that way?
- Is there such a thing as “morally neutral architecture”?

group 2:

- Would you be willing go go back to pre-algorithmic content? Or is the ease of discovery much better when sacrificing your privacy?
- How would you design a system that doesn't use targeted content?
- How much do you sacrifice for convienance?

group 3:

- Review the privacy policies of [Meta](https://www.facebook.com/privacy/policy/) and other online tools you regularly use. How is your data being used based on the statements in the privacy policies?

## Reviewing API for Project #2

Depending on your project 2 implementation, you will use one or a combination of:

- External API Requests, as detailed in [week 3](../week3/readme.md#introduction-to-apis)
- Internal API Requests, as detailed in [week 4](../week4/readme.md#sending-data-from-server--client)

External API Requests will:

- mostly be client-side
- use `URLSearchParams()`
- `https://` in the url of the fetch request

Internal API Requests will:

- mostly be server-side
- use `response.json` to send JSON data back to the client
- relative route in the url of the fetch request (eg. `/messages`), this will _not_ include `http://`

Both requests will:

- use `fetch()` to retrieve data and display it some way (the url will look different depending on external/internal)
- use Nunjucks (`.njk`) instead of writing `.html` files

Questions:

- ???

## Parallel Programming: Working on One Repository Together

For Project 2 and Project 3, you will be co-working on a single repository together. This can be done in a variety of ways, but we will be working with `branches`, `pull requests`(PR) and git's native version control system.

### Setting up a Collaborative Repository

Can I have one volunteer to be in my "group" for this demo.

To begin, designate roles for your group to follow along with this demo: `Role #1`, `Role #2`, and `Role #3`. Put each person's role in the chat.

1. `Role #1` will create a repository titled `wdp-project-2` or something useful
2. Navigate to Settings → Collaborators → Add People
3. Add the github emails of your group-mates.
4. `Role #2` and `Role #3` should accept the invite.
5. _Everyone_ should clone the repository into using `git clone`
   - you should be running this command in the correct folder in your terminal
   - make sure you are in the correct location using `pwd`
   - ex. my path `/Users/samheckle/dev/spring-26/web-projects-sp-26`
   - ex. my file structure:

   ```
   web-projects-sp-26
   ├── hunter-web-design-projects-sp-26/
   │   ├── class-demos/
   ├── web-design-blog/
   ├── wdp-project-2/ ← *this is the new folder we just cloned*
   ```

6. _Everyone_ should open this folder in your text editor.
7. `Role #2`, should do first time setup on the project.
   - `npm init`
   - `npm install express nunjucks @seald-io/nedb`
   - create `.gitignore` file with the following lines:
     ```
     .DS_Store
     node_modules/
     ```
   - commit and push your changes, probably with a useful message of 'initial commit'
   - _Note_: it might ask you for setting the `upstream`, just copy the line it says and paste it into the terminal.
8. Once the files have been added, _everyone_ should review the changes in github to ensure they are there.
9. `Role #1` and `Role #3` in terminal, in the project folder, will run `git pull`. This syncs your changes with the remote repository and you should have the files reflected.

### Branching

`branches` are apart of the git workflow that allow you to work on multiple versions of code at a time. See [Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) from the git docs.

10. _Everyone_ will create a `branch`, which is keeping a specific copy of your code so that you don't accidentally overwrite files.
    - `git checkout -b ` and include the name of your branch. your name will probably be fine here. so mine would be `git checkout -b sam`
11. Each person in your group will make one file of your project:
    - `Role #1` will make the `public/` folder with a `style.css`
    - `Role #2` will make the `views/` folder with a `index.njk`
    - `Role #3` will make a `server.js` file
    - each of these files will be empty (for now)
12. You can list the branch you are on by doing `git branch`. Make sure you are on the branch with your name. If you need to change the branch, you can write `git checkout ` + the branch name.
13. Push your changes to github on your branch. This isn't anything different from our regular flow.
    - _Note_: it might ask you for setting the `upstream`, just copy the line it says and paste it into the terminal.

### Pull Requests

`pull requests` (PR) are ways for collaborators to review changes before they are put into the main project. See [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) from GitHub Docs.

14. To merge your changes into the main branch, you will need to make a PR. In GitHub, open your repository and nagivate to the `Pull Requests` tab → `New Pull Request` button.
15. Leave the `base: main` dropdown, but change `compare: your-branch-name`. So mine will look like `base: main` ← `compare: sam`
16. Press the `Create Pull Request` button
17. Review the changes. Ensure you didn't modify any files that shouldn't have been changed (like a space or a mistyped character).
    - If you need to remove a change, you will need to go back into your code and your terminal and overwrite the version that exists on the main branch `git checkout origin/main -- path/to/your/mistake/file.js` or something. So if you made a mistake in server.js: `git checkout origin/main -- server.js`. _This will overwrite the whole file_.
    - If you made a mistake in a file you did want to upload, just fix the change in your code and re-push.
18. Have your group mates review the change.
19. To merge your changes into the main branch, press the `merge` button.

### Why are we doing this?

To learn industry practices on how to work on a team of developers. GitHub and version control systems are like the Google Docs of code. We don't have real-time typing systems since we also might need to build or run a server to see the output of the code (think building our blogs, or running our local servers).

We also want to get into the practice of having a log of who is doing what work. The history of the commits will be really clear on attributing who wrote what parts of the code.

We want to review everyone's code and make sure it works _before_ it gets merged into main. We can test everyone's branches on our own computers before we make it live.

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

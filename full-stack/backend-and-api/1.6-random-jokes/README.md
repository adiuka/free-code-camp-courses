# Random Joke Server: What I Learned

Notes from the freeCodeCamp Backend and APIs course, "Build a Random Joke App".

## 1. Setting up an Express server

```javascript
const express = require("express");
const app = express();
const port = 3000;
```

- `require("express")` imports the Express library (install it first with `npm install express`).
- `express()` creates the app object, which has the methods used to build a server.
- Storing the port in a `port` variable keeps it in one place instead of repeating `3000`.

## 2. Starting the server with `app.listen()`

```javascript
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

- The first argument is the port to listen on.
- The callback runs once the server has started, which makes it a good place to log a message.
- Template literals (backticks with `${}`) insert variables into strings.

## 3. Routes with `app.get()`

```javascript
app.get("/", (req, res) => {
  res.send("Welcome to the Random Joke Server! Visit /joke to get a random joke.");
});
```

- `app.get(path, handler)` responds to GET requests for that path.
- `req` is the incoming request and `res` is the response.
- `res.send()` sends data back to the client.
- Without any routes, the server runs but answers every request with "Cannot GET /".

## 4. Picking a random item from an array

```javascript
const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
```

- `Math.random()` gives a number from 0 up to (but not including) 1.
- Multiplying by `jokes.length` scales it to the array size.
- `Math.floor()` rounds down to a whole number that is a valid index.

## 5. The biggest lesson: the server has to be running

My code was correct, but the lesson tests kept failing until I actually ran the server. The tests send real requests to it.

- Start it with `node server.js`.
- After any code change, stop it with `Ctrl + C` and restart it. Node doesn't reload code automatically.
- An old server still running on the same port can cause an `EADDRINUSE` error.

## 6. Troubleshooting habits that helped

- Before assuming a lesson is bugged, check the basics: is the server running, is the file saved, is the file name right?
- Read the failing test's description, since it says what is being checked.
- Searching the forum can show whether others hit the same problem.
- When a guess from one source (like the lesson's seed data) doesn't confirm the cause, test it instead of trusting it.

## Final code

```javascript
const express = require("express");
const app = express();
const port = 3000;

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  "I told my computer I needed a break, and it said \"No problem, I'll go to sleep.\"",
  "Why do Java developers wear glasses? Because they don't see sharp.",
];

app.get("/", (req, res) => {
  res.send("Welcome to the Random Joke Server! Visit /joke to get a random joke.");
});

app.get("/joke", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});

app.get("/about", (req, res) => {
  res.send("This Random Joke Server was built with Express.js");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Next ideas

- Return jokes as JSON with `res.json()`.
- Add a route that takes a parameter, such as `/joke/:id`.
- Use `nodemon` so the server restarts automatically on changes.
- Move the jokes into their own file and `require` it.
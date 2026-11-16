# Build a Data Sanitizer: Summary

## What I built

An Express server with two middleware functions that clean and validate form input.

### `middleware.js`
- `inputCleaner`: lowercases `req.body.username`, strips HTML tags from `req.body.comment` (regex `/<[^>]*>/g`), then calls `next()`.
- `inputValidator`: calls `next()` if `username` is at least 3 characters. Otherwise it redirects to `/form?error=Username must be at least 3 characters.` without calling `next()`.

### `server.js`
- Listens on port `3000`.
- `GET /` redirects to `/form`.
- `GET /form` serves `public/index.html`.
- `POST /submit` runs `inputCleaner`, then `inputValidator`, then responds with the sanitised `username` and `comment` as JSON.

## Problems I hit and how I fixed them

1. **Tests 4-6 failed (middleware unit tests).** I had put the file at `middleware/middleware.js`, but the tests import `./middleware`. Moving it to `middleware.js` in the project root and updating the `require` in `server.js` fixed it.
2. **Test 2 failed (`GET /` redirect).** `express.static` automatically serves `public/index.html` for `/`, and it ran before my redirect route, so the request never reached the redirect. Fix:

   ```js
   app.use(express.static(path.join(__dirname, "public"), { index: false }));
   ```

## Key takeaways

- File location and names must match what the tests `require`.
- Middleware order matters: `express.static` can intercept routes registered after it.
- Route-level middleware (`app.post("/submit", a, b, handler)`) runs left to right, and not calling `next()` stops the chain.
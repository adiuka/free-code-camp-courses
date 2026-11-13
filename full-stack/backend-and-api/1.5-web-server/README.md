# Node.js Static File Server (freeCodeCamp)

## What I built

A basic HTTP server using Node's built-in `http` module that serves static files from a `public/` folder on port **3001**.

## How it works

1. **Routing:** A request to `/` is mapped to `/index.html`. Any other URL is used as-is.
2. **File path:** The URL is joined onto `public/` with `path.join` to get the file location.
3. **Content type:** `path.extname` pulls the file extension, which is looked up in a `mimeTypes` object. Unknown extensions fall back to `application/octet-stream`.
4. **Reading the file:** `fs.readFile` tries to load the file.
   - **Success:** respond with status `200` and the correct `Content-Type` header.
   - **Failure:** read `public/404.html` and respond with status `404` and `Content-Type: text/html`.

## Key concepts

- `response.writeHead(statusCode, headers)` sets the status code and headers. It must be called before `response.end()`.
- The `Content-Type` header tells the browser how to interpret the response (HTML, CSS, image, etc.).
- `return` inside the error branch stops the callback so the `200` response isn't also sent.

## MIME types supported

| Extension | Content-Type |
|-----------|--------------|
| `.html` | `text/html` |
| `.css` | `text/css` |
| `.js` | `text/javascript` |
| `.png` | `image/png` |
| anything else | `application/octet-stream` |

## Commands used for testing

```bash
# Basic request
curl http://localhost:3001

# Verbose output (shows headers and status), 2 second timeout
curl --verbose --max-time 2 http://localhost:3001

# Request a URL that doesn't exist (should return 404)
curl --verbose --max-time 2 http://localhost:3001/test-url
curl -v http://localhost:3001/missing.html

# Load testing: 2 threads, 5 connections, 5 seconds
sudo apt install -y wrk
wrk -t2 -c5 -d5s http://localhost:3001
```

## Possible improvements

- Handle an error when `public/404.html` itself is missing (currently `file` would be `undefined`).
- Guard against path traversal (e.g. `/../server.js`) by checking the resolved path stays inside `public/`.
- Add more MIME types (`.jpg`, `.svg`, `.json`, `.ico`).
- Note: `import` syntax requires `"type": "module"` in `package.json` (or a `.mjs` file extension).
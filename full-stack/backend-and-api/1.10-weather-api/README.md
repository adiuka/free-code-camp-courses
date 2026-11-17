# Weather API

A small REST API built with Express (ES modules) that serves JSON endpoints, proxies weather data from an external API, and hosts a static front-end.

## Project Structure

```
.
├── index.js        # App setup, middleware, and core routes
├── weather.js      # Weather router (mounted at /api/weather)
├── package.json    # Must include "type": "module"
└── public/
    └── index.html  # Static front-end served by express.static
```

## Getting Started

```bash
npm install express
node index.js
```

The server runs at `http://localhost:3000`. Restart it (Ctrl + C, then `node index.js`) after every code change, since Node does not hot-reload.

## Endpoints

| Method | Path                  | Description                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| GET    | `/`                   | Serves `public/index.html` (static files take priority) |
| GET    | `/api/status`         | Returns a status JSON object                          |
| GET    | `/api/info`           | Returns the API name and version                      |
| GET    | `/docs`               | Redirects to `/api/info`                              |
| GET    | `/api/greet/:name`    | Greets the name captured from the URL                 |
| GET    | `/api/data`           | Returns an empty JSON object                          |
| POST   | `/api/data`           | Responds with `201 Created` and a JSON message        |
| GET    | `/api/weather`        | Lists supported cities as `{ "cities": [...] }`       |
| GET    | `/api/weather/:city`  | Fetches weather for a city from an external API       |

Unsupported cities or failed upstream requests return `404` with `{ "error": "..." }`.

## What Was Built

1. **Basic routes** with `app.get()` and `res.json()`.
2. **Route parameters** (`/api/greet/:name`) read from `req.params`.
3. **Chained handlers** with `app.route()` to group GET and POST for `/api/data`.
4. **Redirects** with `res.redirect()` (`/docs` to `/api/info`).
5. **A modular router** in `weather.js`, mounted with `app.use("/api/weather", router)`.
6. **Error handling** around the external `fetch()` call using `try/catch`.
7. **Static file serving** with `express.static()` for the front-end.

## Learning Points

### Routing

- A route pairs an HTTP method and path with a handler: `app.get(path, (req, res) => {...})`.
- `:name` in a path is a placeholder. Captured values land on `req.params` as strings.
- `app.route(path)` lets you chain `.get()`, `.post()`, etc. for one path without repeating it.
- `res.status(201).json(...)` chains because `status()` returns `res`.

### Routers and mounting

- `app.use("/base", router)` strips the base path before the router sees the request. Inside the router, a route for `/api/weather` is just `"/"`, and `/api/weather/London` is `"/:city"`.
- Don't repeat the prefix in router paths, and don't mount the same router twice (for example, an extra `app.use("/api/weather/:city", router)` is unreachable and redundant).

### ES modules

- Set `"type": "module"` in `package.json`.
- Use `import` / `export default`, and include the file extension in relative imports (`./weather.js`).
- `__dirname` doesn't exist in ESM. Recreate it:

  ```js
  import path from "path";
  import { fileURLToPath } from "url";
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  ```

### Error handling with fetch

- `fetch()` only rejects on network failure. A 404 or 500 from the upstream API still resolves, so check `response.ok` and throw yourself.
- `const` and `let` are block-scoped. A variable declared inside `try` is not visible in `catch`, so declare anything the `catch` block needs (like `city`) before the `try`.
- Use `res.json()` rather than `res.send()` when you want an explicit JSON response with the right `Content-Type`.

### Middleware and static files

- Middleware runs in the order it is registered. `express.static()` placed before the routes means a file like `public/index.html` is served for `/` before `app.get("/")` is ever reached.
- `express.static` can only serve files that exist on disk. A 404 for `/index.html` usually means the file is missing or the folder is misnamed or misplaced.
- Build the folder path with `path.join(__dirname, "public")` so it works regardless of where the process is started.

### Debugging habits

- Restart the server after every change.
- Test with `curl -i http://localhost:3000/<path>` to see the status code and headers, not just the body.
- When a test fails, work out whether the problem is in the file under test or in a different file it depends on (for example, `weather.js` rather than `index.js`).

## Possible Next Steps

- Add `express.json()` and read `req.body` in the POST handler.
- Validate the `:city` parameter against `SUPPORTED_CITIES` before calling the external API.
- Return `500` for server errors and `404` only for unknown cities.
- Add a catch-all 404 handler and a global error-handling middleware.
- Move the port into an environment variable (`process.env.PORT`).
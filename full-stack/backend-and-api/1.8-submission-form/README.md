# Express Middleware Workshop

A small Express app (ESM) covering logging, routers, and centralized error handling.

## Project structure

```
server.js
routes/api.routes.js
middleware/error.middleware.js
```

## What I built

### `server.js`
- Imports Express with ESM (`import express from "express"`) and creates `app`.
- **Logger middleware** via `app.use` that logs `req.method` and `req.url`, then calls `next()`.
- **Body parsers**: `express.json()` and `express.urlencoded({ extended: true })`.
- **Mounted the API router** at `/api`.
- Registered `notFoundHandler`, then `finalErrorHandler`, **after** all routes.
- Listens on port `3000`.

### `routes/api.routes.js`
| Route | Behavior |
|---|---|
| `GET /api/` | Responds `200` with `API is available!` |
| `GET /api/crash` | Passes `new Error('Database connection failed.')` to `next` (defaults to `500`) |
| `GET /api/bad-request` | Passes an error with `status = 400` to `next` |

### `middleware/error.middleware.js`
- **`notFoundHandler`**: catch-all 404. Creates an `Error` containing `req.originalUrl`, sets `status = 404`, and calls `next(err)`.
- **`finalErrorHandler(err, req, res, next)`**: reads `err.status || 500`, logs the error, and responds with JSON `{ error: true, status, message }`. For `500`s the message is the generic `'Internal Server Error (Check Server Logs)'`; otherwise it uses `err.message`.

## Key concepts

- **Order matters.** Middleware runs in the order it's registered, so the logger and parsers come first, routes next, then the 404 and error handlers last.
- **`next()` vs. responding.** A middleware either sends a response or calls `next()` to pass control on.
- **`next(err)`** skips all remaining regular middleware and jumps to the nearest error handler.
- **Error handlers are identified by four parameters** (`err, req, res, next`). `next` must stay in the signature even if unused.
- **`req.originalUrl`** keeps the full requested path, while `req.url` is trimmed when a router is mounted at a base path.
- **Generic messages for `500`s** avoid leaking internal details to clients; the full error still goes to the server logs.
- **Routers** can be mounted with a base path: `app.use("/base/path", router)`.

## Expected responses

| Request | Status | Message |
|---|---|---|
| `GET /api` | 200 | `API is available!` (plain text) |
| `GET /api/crash` | 500 | `Internal Server Error (Check Server Logs)` |
| `GET /api/bad-request` | 400 | `Client-side data is missing.` |
| `GET /anything-else` | 404 | `Not found /anything-else` |
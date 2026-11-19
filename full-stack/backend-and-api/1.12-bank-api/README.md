# Tiny Bank API

A small REST API built with Node.js and Express 5. It reads and writes account data through `db.js` and listens on port `9000`.

## Endpoints

| Method | Route | What it does |
|--------|-------|--------------|
| GET | `/` | Returns a status message |
| GET | `/health` | Returns status, uptime, timestamp, and memory usage |
| GET | `/accounts` | Lists all accounts |
| GET | `/accounts/:id` | Returns one account, or a 404 if it doesn't exist |
| POST | `/transfer` | Moves money between two accounts |

## Transfer validation

`POST /transfer` takes `fromId`, `toId`, and `amount`, and returns:

- `400` if a field is missing or the amount isn't positive
- `404` if the sender or recipient doesn't exist
- `409` if the sender has insufficient funds

## Error handling

- Handlers throw errors with a `status` property. Express 5 forwards errors thrown in async handlers to the error middleware automatically, so there's no `try/catch` or `next(err)`.
- A single error-handling middleware, registered last, returns JSON in the form `{ error: { message, status } }`.
- The temporary `/broken` test route was commented out after it was used to verify the error handler.

## Operations

- **Debugging:** `DEBUG=express:* node server.js` logs route registration and request matching.
- **Graceful shutdown:** `SIGTERM` and `SIGINT` handlers call `server.close()` so in-flight requests can finish before the process exits.

## Run it

```bash
node server.js
curl http://localhost:9000/accounts/1
```
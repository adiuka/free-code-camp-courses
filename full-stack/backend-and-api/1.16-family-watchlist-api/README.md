# Family Movie Watchlist API

An Express API where family members log in and manage movie watchlists. Parents can edit anyone's list. Children can edit only their own. Everyone logged in can read any list.

## Stack

- Node.js (ES modules), Express
- `jsonwebtoken` for tokens, `bcryptjs` for password checks
- `helmet` for security headers
- JSON files in `data/` as storage, accessed through `utils/db.js`

## Project layout

| File | Purpose |
|---|---|
| `index.js` | Loads `.env`, applies `helmet` and `express.json()`, mounts the routers |
| `utils/jwt.js` | `signToken(payload)` and `verifyToken(token)` (returns `null` if invalid or expired) |
| `utils/db.js` | Provided helpers: `findByUsername`, `getWatchlist`, `addMovie`, `updateMovie`, `deleteMovie` |
| `middleware/authenticate.js` | Verifies the Bearer token and sets `req.user` |
| `middleware/authorize.js` | `authorizeModification`: decides who may change a watchlist |
| `routes/auth.js` | `POST /api/auth/login` |
| `routes/watchlist.js` | Watchlist CRUD routes |
| `.env` | `JWT_SECRET` (and optionally `PORT`) |

## How a request flows

```
Request -> authenticate -> authorizeModification (POST/PUT/DELETE only) -> handler -> db.js
```

### Login: `POST /api/auth/login`

1. Missing `username` or `password` returns **400**.
2. Unknown username returns **401**.
3. Wrong password (checked with `bcrypt.compare` against `passwordHash`) returns **401**.
4. Success returns **200** with `{ token }`. The token contains only `id`, `username`, and `role`.

### `authenticate`

- No `Authorization: Bearer <token>` header returns **401** `{ "error": "No token provided." }`.
- Invalid or expired token returns **401** `{ "error": "Invalid or expired token." }`.
- Valid token: the decoded payload is attached to `req.user` and the request continues.

### `authorizeModification`

Compares the requester (`req.user`) with the owner of the list (`req.params.userId`):

1. `role === "parent"`: allowed.
2. `role === "child"` and the `userId` matches their own `id`: allowed.
3. Anything else returns **403** `{ "error": "Access denied" }`.

### Watchlist routes (all require a token)

| Method | Route | Who | Success |
|---|---|---|---|
| GET | `/api/watchlist/:userId` | Any logged-in user | 200 + watchlist |
| POST | `/api/watchlist/:userId/movies` | Parent, or child on own list | 201 + new movie |
| PUT | `/api/watchlist/:userId/movies/:movieId` | Parent, or child on own list | 200 + updated movie |
| DELETE | `/api/watchlist/:userId/movies/:movieId` | Parent, or child on own list | 200 + message |

Route params are converted with `Number(...)` before calling `db.js`, because the stored ids are numbers and `req.params` values are strings. A missing user or movie returns **404**.

## Running it

```bash
npm i
npm start     # start the server
npm test      # run the test suite
```

## Known limitations (lab scope)

- JSON-file storage is not safe for concurrent writes.
- No input validation, rate limiting on login, or global error handler.
- Tokens last one day and cannot be revoked.
- Any logged-in user can read any family member's list, as the spec requires.
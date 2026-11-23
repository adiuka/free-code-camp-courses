# JWT-Protected Routes API

A small Express API with user registration, login, JWT authentication, role-based access control, and logout via a token blacklist. Users are stored in a JSON file.

## Endpoints

| Method | Path | Auth | What it does |
|--------|------|------|--------------|
| GET | `/` | none | Health check |
| POST | `/api/auth/register` | none | Creates a user (role `user`), returns `201` + token |
| POST | `/api/auth/login` | none | Checks credentials, returns `200` + token |
| GET | `/api/auth/profile` | token | Returns `{ user }` from the token payload |
| POST | `/api/auth/logout` | token | Blacklists the current token |
| GET | `/api/admin/users` | token + `admin` role | Lists all users without `passwordHash` |

Protected routes expect the header `Authorization: Bearer <token>`.

## Project structure

```
index.js                  App setup: helmet, JSON parsing, route mounting, error handler
routes/
  auth.js                 register, login, profile, logout
  admin.js                admin-only user list
middleware/
  authenticate.js         Validates the Bearer token, sets req.user
  authorize.js            authorizeRole(role): 403 unless req.user.role matches
utils/
  db.js                   readUsers, writeUsers, findByEmail, findById (data/users.json)
  jwt.js                  signToken (1 day expiry), verifyToken (null on failure)
  token-blacklist.js      In-memory Set of invalidated tokens
data/users.json           The "database": an array of users
.env                      PORT and JWT_SECRET
```

## How it works

**Register.** The handler validates `email` and `password`, rejects duplicates with `409`, hashes the password with `bcryptjs` (10 rounds), and saves a new user `{ id, email, passwordHash, role: "user" }` with `writeUsers`. It then signs a JWT containing `id`, `email`, and `role`, and returns it.

**Login.** The handler looks the user up by email and compares the password with `bcrypt.compare`. On success it returns a fresh token. Both "unknown email" and "wrong password" return the same `401 Invalid credentials`, so the API doesn't reveal which emails exist.

**Authenticate middleware.** For each protected request it runs these checks in order:

1. The `Authorization` header must start with `Bearer `, otherwise `401`.
2. The token must not be in the blacklist, otherwise `401`.
3. `verifyToken` must return a payload (valid signature, not expired), otherwise `401`.
4. The decoded payload is stored on `req.user` and `next()` is called.

**Authorize middleware.** `authorizeRole("admin")` returns a middleware that responds `403` unless `req.user.role` matches. Stacking it after `authenticate` means a request is first identified (401 if not), then checked for permission (403 if not).

**Logout.** JWTs are stateless, so a token can't be "deleted". Logout adds the token to a blacklist, and `authenticate` rejects blacklisted tokens from then on.

**Storage.** `db.js` reads and writes `data/users.json` synchronously. An empty file is treated as `[]`.

## Running it

```bash
npm install
npm start      # runs with: node --env-file .env
```

`.env` needs:

```
PORT=8800
JWT_SECRET=<a long random string>
```

## Known limitations

- **The blacklist is in memory.** Restarting the server clears it, so logged-out tokens become valid again until they expire. It also isn't shared across multiple processes. Redis or a database would fix both.
- **Blacklisted tokens are never pruned**, so the set grows over time. Expired tokens could be removed.
- **The JSON file isn't safe for concurrent writes.** Two simultaneous registrations could overwrite each other. A real database avoids this.
- **Everyone registers as `user`.** Admins have to be created by editing `data/users.json` and setting `"role": "admin"`.
- **Tokens last 1 day** and there is no refresh flow.
- **`/api/auth/profile` returns the token payload**, not a fresh lookup. If a user's role changes, the old token still carries the old role until it expires.
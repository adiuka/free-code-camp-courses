# Timestamp Microservice: Notes

## Final route

```js
app.get("/api{/:date}", (req, res) => {
  const { date } = req.params;

  // empty param -> current time
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // digits only -> number, otherwise keep the string
  const parsed = /^\d+$/.test(date) ? Number(date) : date;
  const timestamp = new Date(parsed);

  // invalid date -> error object
  if (isNaN(timestamp.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: timestamp.getTime(),
    utc: timestamp.toUTCString(),
  });
});
```

## How it works

1. **Route params:** `:date` in the path ends up in `req.params.date`.
2. **Optional param:** `{ }` marks the optional part, so `/api` and `/api/xyz` both match. When it is missing, `date` is `undefined`.
3. **Empty param:** `new Date()` with no argument is the current time.
4. **Number vs. string:** `new Date("1451001600000")` is invalid (a string is parsed as a date string), but `new Date(1451001600000)` works. A regex `/^\d+$/` checks for digits only, then `Number()` converts.
5. **Validity check:** `new Date("hello")` does not throw. It returns an "Invalid Date" object, so check `isNaN(date.getTime())` afterwards.
6. **Output:**
   - `getTime()` returns the Unix timestamp in milliseconds.
   - `toUTCString()` returns the format `Fri, 25 Dec 2015 00:00:00 GMT`.

## Learnings

- **`res.json()` does not stop the function.** Use `return res.json(...)` (or `if / else`) to exit early, otherwise a second response is sent and Express throws "headers already sent".
- **A `Date` object is always truthy**, even an invalid one. `if (!timestamp)` never catches bad dates. Check `getTime()` for `NaN`.
- **`!Number(str)` is not a date validity check.** `Number("2015-12-25")` is `NaN`, but that is a perfectly valid date.
- **Express 4 vs. Express 5 syntax:**
  - Express 4: `/api/:date?`
  - Express 5: `/api{/:date}`
  - In Express 5, `/api/{:date}` keeps the slash required, so a request to plain `/api` does not match.
  - If you get a `path-to-regexp` error, check which Express version you are on.
- **Test every branch:** `/api`, `/api/2015-12-25`, `/api/1451001600000`, `/api/hello`.
- **Restart the server** after every code change.
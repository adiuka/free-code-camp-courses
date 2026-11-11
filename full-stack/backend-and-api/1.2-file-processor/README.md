# Node.js Core Modules: What I Learned

A summary of the concepts practiced in `server.js`: `fs`, `Buffer`, `crypto`, `os`, `path`, `process`, and streams.

---

## 1. Reading files (`fs`)

Three styles for the same job:

| Style | Import | Notes |
|---|---|---|
| Promises + `async/await` | `require("fs/promises")` | Modern, recommended |
| Callback | `require("fs")` | Older style; result arrives in the callback |
| Sync | `require("fs")` | Blocks the program; fine for scripts |

```js
const fsPromises = require("fs/promises");

async function main() {
  const data = await fsPromises.readFile("assets/poem.txt", { encoding: "utf8" });
  console.log(data);
}
main();
```

**Gotchas**
- Without `await`, `readFile` returns a `Promise`, not the contents.
- Without `{ encoding: "utf8" }` you get a `Buffer`, not a string.
- The variable name must match the import (`fsPromises` vs `fs`), or you get a `ReferenceError`.

---

## 2. Synchronous file operations

```js
fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!"); // create/overwrite
fs.appendFileSync("assets/output.txt", "\nDragon Punch");      // add to the end
fs.existsSync("assets/output.txt");                            // true / false
fs.readdirSync("assets");                                      // array of entry names
```

- `writeFileSync` **overwrites**; `appendFileSync` **adds**.
- `existsSync` returns a boolean and doesn't throw.

---

## 3. Buffers

A `Buffer` is a fixed-size chunk of raw bytes.

```js
const buf = Buffer.from("Hello, Node!");
buf.toString("hex");      // hexadecimal representation
buf.toString("base64");   // base64 representation

Buffer.alloc(8, 0xff);    // 8 bytes, each filled with 0xff

Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8"); // decode base64 -> "freeCodeCamp"
```

- `Buffer.from(string)` encodes; `.toString(encoding)` decodes or re-encodes.
- `Buffer.alloc(size, fill)` makes a zero-filled (or custom-filled) buffer.
- Base64 and hex are encodings, **not** encryption.

---

## 4. Crypto

```js
const crypto = require("crypto");

crypto.createHash("sha256").update("freeCodeCamp!").digest("hex"); // deterministic hash
crypto.randomBytes(16).toString("hex");                            // 32 hex chars of random data
crypto.randomUUID();                                               // random v4 UUID
```

- Hashing is one-way and deterministic: the same input always gives the same output.
- `randomBytes` and `randomUUID` are cryptographically secure randomness.

---

## 5. OS information (`os`)

```js
os.platform();       // "darwin", "linux", "win32"
os.arch();           // "x64", "arm64"
os.hostname();
os.totalmem();       // bytes
os.freemem();        // bytes
os.uptime();         // seconds
os.cpus().length;    // number of logical cores
```

Memory values are in **bytes**, uptime is in **seconds**.

---

## 6. Paths (`path`)

```js
const fullPath = path.join(__dirname, "assets", "poem.txt");

path.basename(fullPath);   // "poem.txt"
path.dirname(fullPath);    // directory portion
path.extname(fullPath);    // ".txt"

path.join("assets", "..", "server.js");     // "server.js" (normalized, stays relative)
path.resolve("assets", "..", "server.js");  // absolute path to server.js

path.parse("/home/user/assets/poem.txt");
// { root: '/', dir: '/home/user/assets', base: 'poem.txt', ext: '.txt', name: 'poem' }
```

- `path.join` stitches segments and normalizes `..`; the result may be relative.
- `path.resolve` always returns an **absolute** path, resolved from the current working directory.
- `__dirname` anchors paths to the script's folder rather than where `node` was launched.
- `path.parse` splits a path into `root`, `dir`, `base`, `ext`, and `name`.

---

## 7. The `process` object

```js
process.version;       // Node version
process.platform;      // OS platform
process.env.NODE_ENV;  // environment variable (undefined if unset)

process.argv;          // [nodePath, scriptPath, ...userArgs]
process.argv[2];       // first user-supplied argument

process.stdout.write("Hello from stdout\n");
process.stderr.write("Hello from stderr\n");
```

- Run `node server.js hello` and `process.argv[2]` is `"hello"`.
- `stdout` is normal output; `stderr` is for errors and diagnostics. They can be redirected separately.
- `process.stdout.write` doesn't add a newline automatically, unlike `console.log`.

---

## 8. Streams

Streams process data in chunks instead of loading a whole file into memory.

```js
const readable = fs.createReadStream("assets/poem.txt", { encoding: "utf8" });
const writable = fs.createWriteStream("assets/stream-output.txt");

readable.pipe(writable);   // copy file contents chunk by chunk
```

Manual event handling:

```js
readable.on("data", (chunk) => console.log(chunk));
readable.on("end", () => console.log("Done reading"));

writable.write("First chunk\n");
writable.write("Second chunk\n");
writable.end();            // always end a writable stream
```

- `pipe()` connects a readable to a writable and handles flow for you.
- Streams are the right tool for large files.

---

## Quick reference

| Module | Use it for |
|---|---|
| `fs` / `fs/promises` | Reading, writing, listing files |
| `Buffer` | Raw bytes and encodings (hex, base64, utf8) |
| `crypto` | Hashing and secure random values |
| `os` | System info (platform, memory, CPUs) |
| `path` | Building and inspecting file paths safely |
| `process` | Runtime info, env vars, CLI args, stdout/stderr |
| Streams | Efficient chunked I/O for big data |

## Small things to fix in the code

- The `process.stderr.write` message says `"Hello from stdout"`; it should say `"Hello from stderr"`.
- `main()` is commented out, so the poem is never printed. Uncomment it if you want that output.
- Because `readable.pipe(writable)` runs at the end, `stream-output.txt` ends up as a copy of `poem.txt`.
# Case Converter: What I Learned
 
## 1. The module (`index.js`)
 
A small CommonJS module that exports four string-case helpers.
 
| Function | What it does | Example |
|---|---|---|
| `getUpperCase(text)` | `text.toUpperCase()` | `"hello"` → `"HELLO"` |
| `getLowerCase(text)` | `text.toLowerCase()` | `"HELLO"` → `"hello"` |
| `getSentenceCase(text)` | Uppercase the first character, lowercase the rest | `"hello free Code Camp!"` → `"Hello free code camp!"` |
| `getProperCase(text)` | Split into words, capitalise each, rejoin | `"hello free Code Camp!"` → `"Hello Free Code Camp!"` |
 
### Key techniques
 
- **`charAt(0).toUpperCase() + slice(1).toLowerCase()`**: capitalise the first letter and lowercase everything after it. This is the building block for both sentence case and proper case.
- **`split(" ")` → `map(...)` → `join(" ")`**: break a string into an array of words, transform each word, then glue them back together. This is how proper case works.
- **`module.exports = { ... }`**: the CommonJS way to expose several functions at once, using shorthand property names.
### Gotcha
 
The line `const { __esModule } = require("@babel/generator");` at the top is unused. It was most likely auto-imported by the editor by accident. It can be deleted, and it adds an unnecessary dependency.
 
---
 
## 2. The tests (`test.js`)
 
Plain tests using Node's built-in assertion module, with no test framework needed.
 
```javascript
const assert = require("node:assert/strict");
const caseConverter = require("./index");
```
 
### Key concepts
 
- **`node:assert/strict`**: Node's built-in assertion library in strict mode. The `node:` prefix marks it as a core module.
- **`assert.strictEqual(actual, expected)`**: throws an `AssertionError` if the two values aren't strictly equal (`===`). If everything passes, the script exits silently.
- **Importing your own module**: `require("./index")` loads the functions that were exported with `module.exports`.
- **Same input, four outputs**: every test uses `"hello free Code Camp!"`, which makes the differences between the four functions easy to compare:
| Function | Result |
|---|---|
| `getUpperCase` | `HELLO FREE CODE CAMP!` |
| `getLowerCase` | `hello free code camp!` |
| `getProperCase` | `Hello Free Code Camp!` |
| `getSentenceCase` | `Hello free code camp!` |
 
### Running it
 
```bash
node test.js
```
 
No output means all assertions passed. A failure prints the expected and actual values.
 
---
 
## Takeaways
 
- Split code into a module (`index.js`) and a test file, so the logic can be checked independently.
- Write the expected output first, then make the function match it.
- Mixed-case input (`"hello free Code Camp!"`) is a good test case, because it shows whether the function really normalises casing.
- Both functions in the module are limited to a single space as the word separator. Other whitespace, such as tabs or double spaces, isn't handled specially.
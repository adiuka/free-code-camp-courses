# Node.js Basics: Command Cheat Sheet
 
Notes from the learning module: installing Node.js, running one-off code, running files, and using the REPL.
 
---
 
## 1. Installing and checking Node.js
 
| Command | What it does | Expected output |
|---|---|---|
| `sudo apt install -y nodejs` | Installs Node.js with the Ubuntu/Debian package manager. `sudo` runs it as administrator; `-y` auto-answers "yes" to prompts. | Package install log |
| `node -v` | Prints the installed Node.js version (`-v` is short for `--version`). | e.g. `v22.23.4` |
 
---
 
## 2. Running code directly from the command line
 
Two flags let you run JavaScript without creating a file:
 
- `-e` / `--eval`: evaluate a string of JavaScript. Nothing is printed unless you use `console.log`.
- `-p` / `--print`: evaluate a string and automatically print the result of the expression.
| Command | What it does | Output |
|---|---|---|
| `node -e "console.log('Hello, Node')"` | Runs the code and prints a string. | `Hello, Node` |
| `node -e "console.log(2 + 2)"` | Evaluates an arithmetic expression and prints it. | `4` |
| `node -p "typeof process"` | Prints the type of the global `process` object, which is available in every Node program. | `object` |
| `node -p "Math.PI.toFixed(4)"` | Rounds π to 4 decimal places (returns a string). | `3.1416` |
 
**Tip:** `-p` is just `-e` with an automatic `console.log` around the result, so `node -p "2 + 2"` is the same as `node -e "console.log(2 + 2)"`.
 
---
 
## 3. Running a JavaScript file
 
| Command | What it does | Output |
|---|---|---|
| `echo "console.log('Hello from a file')" > hello.js` | Creates `hello.js` containing one line of JavaScript. `>` writes the text into the file (overwriting it if it exists). | None |
| `node --check hello.js` | Checks the file for syntax errors **without running it**. | Nothing if the syntax is valid; an error message if not |
| `node hello.js` | Runs the file. | `Hello from a file` |
 
---
 
## 4. The Node REPL (interactive mode)
 
Start it by typing `node` with no arguments. REPL stands for **R**ead–**E**val–**P**rint **L**oop: it reads a line, evaluates it, prints the result, and waits for the next line.
 
| Input | What it does | Output |
|---|---|---|
| `let city = "Paris"` | Declares a variable. | `undefined` (declarations return nothing) |
| `city` | Evaluates the variable. | `'Paris'` |
| `10 * 10` | Evaluates an expression. | `100` |
| `_ + 5` | `_` holds the result of the last expression (here `100`). | `105` |
| `function double(n) { return n * 2; }` | Defines a function. | `undefined` |
| `double(21)` | Calls the function. | `42` |
| `const os = require('os')` | Loads Node's built-in `os` module. | `undefined` |
| `os.platform()` | Returns the operating system name. | e.g. `'linux'` |
| `.help` | Lists all special REPL commands. | Command list |
| `.exit` | Leaves the REPL (`Ctrl+D` also works). | Returns to the shell |
 
**Notes**
- Lines starting with `.` are REPL commands, not JavaScript.
- Other handy REPL commands: `.clear` (reset context), `.editor` (multi-line mode), `.save` / `.load` (save or load a session to or from a file).
- `_` only works in the REPL, not in normal scripts.
---
 
## 5. Using ES modules from piped input
 
```bash
echo "import { createRequire } from 'module'; console.log(typeof createRequire);" | node --input-type=module
```
 
Breaking it down:
 
- `echo "..."` outputs a line of JavaScript.
- `|` (pipe) sends that output into the next command as input.
- `node` with no file reads code from standard input (stdin).
- `--input-type=module` tells Node to treat the code as an **ES module**, which is what makes `import` syntax work. Without it, Node treats piped code as CommonJS and `import` would fail.
- `createRequire` (from the built-in `module` package) lets you use the older `require()` function inside ES modules.
**Output:** `function`
 
---
 
## 6. CommonJS vs ES modules
 
| | CommonJS | ES modules |
|---|---|---|
| Import syntax | `const os = require('os')` | `import os from 'os'` |
| Default for | `.js` files and the REPL | `.mjs` files, or `.js` with `"type": "module"` in `package.json` |
 
---
 
## Quick reference
 
```bash
node -v                      # version
node -e "code"               # run code (use console.log to print)
node -p "expression"         # run and auto-print the result
node file.js                 # run a file
node --check file.js         # syntax check only
node                         # start the REPL
node --input-type=module     # treat piped/-e code as an ES module
```
# prime-checker

A tiny npm module that checks whether a number is prime.

A prime is a whole number greater than 1 whose only divisors are 1 and itself (2, 3, 5, 7, 11...).

## Usage

```js
const { isPrime } = require("./index");

isPrime(7); // true
isPrime(6); // false
isPrime(1); // false
```

## How it works

`isPrime(number)` returns `false` for anything below 2. Otherwise it tries dividing by every number from 2 up to `number - 1`. If any divides evenly (`number % i === 0`), the number is not prime. If none do, it is.

## Testing

```bash
node test.js
```

## Files

- `index.js`: the `isPrime` function, exported with `module.exports = { isPrime }`
- `package.json`: package info (`"type": "commonjs"`)
- `test.js`: quick assertions using `node:assert`
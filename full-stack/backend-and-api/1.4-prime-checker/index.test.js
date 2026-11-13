const assert = require("node:assert/strict");
const isPrime = require("./index");

assert.strictEqual(
	isPrime.isPrime(7),
	true,
);

assert.strictEqual(
	isPrime.isPrime(6),
	false,
);

console.log("All tests passed");
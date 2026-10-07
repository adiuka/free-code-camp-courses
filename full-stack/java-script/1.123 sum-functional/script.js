const isValidNumber = (n) => typeof n === "number" && !Number.isNaN(n);

function addTogether(a, b) {
  if (!isValidNumber(a)) {
    return undefined;
  }

  if (arguments.length >= 2) {
    return isValidNumber(b) ? a + b : undefined;
  }
	
  return function (c) {
    return isValidNumber(c) ? a + c : undefined;
  };
}

const sumTwoAnd = addTogether(2);

console.log(sumTwoAnd(3));
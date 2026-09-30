function countdown(number) {
  let countArray = [];
  if (number < 1) {
    return [];
  } else {
    countArray = countdown(number - 1);
    countArray.unshift(number);
    return countArray;
  }
}
console.log(countdown(5));
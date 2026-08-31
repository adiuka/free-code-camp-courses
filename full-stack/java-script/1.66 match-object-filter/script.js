const test1 = [
  { first: "Romeo", last: "Montague" },
  { first: "Mercutio", last: null },
  { first: "Tybalt", last: "Capulet" }
];

const source = {last: "Capulet"};

function whatIsInAName(arr, source) {
    const sourceKeys = Object.keys(source);
    console.log(sourceKeys);

    const sourcedArr = arr.filter(obj => 
        sourceKeys.every(key => obj[key] === source[key])
    );

    return sourcedArr;
}

console.log(whatIsInAName(test1, source));
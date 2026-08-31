const test1 = ["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"];
const test2 = ["diorite", "andesite", "grass", "dirt", "dead shrub"];

function diffArray(arr1, arr2) {
  const filter1 = arr1.filter((word) => !arr2.includes(word));
  const filter2 = arr2.filter((word) => !arr1.includes(word));
  return filter1.concat(filter2)
}

console.log(diffArray(test1, test2));
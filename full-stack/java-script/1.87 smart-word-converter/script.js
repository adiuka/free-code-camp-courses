function myReplace(sentence, word, replacement) {
  const replacementRegex = new RegExp(word, "gi");

  return sentence.replace(replacementRegex, function(match) {
    if (match[0] == match[0].toUpperCase()) {
      match = String(replacement).charAt(0).toUpperCase() + String(replacement).slice(1);
    } else {
      match = replacement.toLowerCase();
    }
    return match;
  })
}

console.log(myReplace("Let us go to the Store", "store", "mall"));
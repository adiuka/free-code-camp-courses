const consonantRegex = /^([^aeiou]+)(.*)$/;
const vowelRegex = /[aeiou]/;

function translatePigLatin(string) {
  if (consonantRegex.test(string)){
    return string.replace(consonantRegex, `$2$1`) + "ay";
  } else if (!vowelRegex.test(string)) {
    return string + "ay";
  } else {
    return string + "way";
  }
}

console.log(translatePigLatin("egg"));
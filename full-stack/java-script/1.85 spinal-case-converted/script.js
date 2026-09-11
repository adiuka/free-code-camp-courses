const camelCaseRegex = /([a-z])([A-Z])/g;
const separatorRegex = /[\s_-]+/g;

function spinalCase(string) {
  const cleanedString = string.replace(camelCaseRegex, `$1-$2`).replace(separatorRegex, " ");
  const spinalCaseString = cleanedString.split(" ").map((word) => word.toLowerCase()).join("-");
  return spinalCaseString;
}

console.log(spinalCase("ProductLanding page"));
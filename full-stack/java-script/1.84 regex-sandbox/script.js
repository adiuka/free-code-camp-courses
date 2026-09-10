const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
  let flags = "";
  if (caseInsensitiveFlag.checked) {
    flags += "i";
  }
  if (globalFlag.checked) {
    flags += "g";
  }

  return flags;
}

testButton.addEventListener("click", () => {
  const flags = getFlags();
  const regex = new RegExp(regexPattern.value, flags);
  const text = stringToTest.textContent;
  const matches = text.match(regex);

  if (matches) {
    stringToTest.innerHTML = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    testResult.textContent = matches.join(", ");
  } else {
    stringToTest.innerHTML = text;
    testResult.textContent = "no match";
  }
})
const textArea = document.getElementById("text-input");
const maxChars = 50;

textArea.addEventListener("input", () => {
  let textContent = textArea.value;
  const charCount = document.getElementById("char-count");

  if (textContent.length >= maxChars) {
    textContent = textContent.slice(0, maxChars);
    textArea.value = textContent;
    charCount.style.color = "red";
  }

  if (textContent.length < maxChars) {
    charCount.style.color = "";
  }
  
  charCount.textContent = `Character Count: ${textContent.length}/50`;
})
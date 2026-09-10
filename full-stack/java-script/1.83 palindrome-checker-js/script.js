const palindromeInput = document.getElementById("text-input");
const palindromeBtn = document.getElementById("check-btn");
const palindromeResults = document.getElementById("result");

const palindromeRegex = /[^a-z0-9]/g;

function isPalindrome(input) {
    const cleanInput = input.toLowerCase().replace(palindromeRegex, "");
    return cleanInput === cleanInput.split("").reverse().join("");
}

palindromeBtn.addEventListener("click", () => {
    const result = palindromeInput.value;
    if (!result) {
        alert("Please input a value");
        return;
    }

    if (isPalindrome(result)) {
        palindromeResults.innerHTML = `${result} is a palindrome`;
    } else {
        palindromeResults.innerHTML = `${result} is not a palindrome`;
    }
    palindromeResults.hidden = false;
})
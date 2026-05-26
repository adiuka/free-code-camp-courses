const confirmEnding = (string1, string2) => {
    const ending = string1.substring(string1.length - string2.length);
    return (ending === string2);
}

console.log(confirmEnding("New world", "ld")); 
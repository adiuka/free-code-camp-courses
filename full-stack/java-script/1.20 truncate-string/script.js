function truncateString(string, number) {
    if (string.length > number) {
        const slicedString = string.slice(0, number);
        return `${slicedString}...`;
    } else {
        return string;
    }
}

console.log(truncateString("Peter Piper picked a peck of pickled peppers", 11));
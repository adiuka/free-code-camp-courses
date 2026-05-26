const email = "abcdefg@email.com";

const maskEmail = (email) => {
    const splitMail = email.split("@");
    const emailLength = splitMail[0].length - 1;
    return `${splitMail[0][0]}${"*".repeat(emailLength - 1)}${splitMail[0][emailLength]}@${splitMail[1]}`;
}

console.log(maskEmail(email));
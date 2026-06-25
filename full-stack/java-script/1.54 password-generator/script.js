const generatePassword = (passwordLength) => {
	const passwordChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*().";
	let generatedPassword = "";
	for (let i = 0; i < passwordLength; i++) {
		let randomIndex = Math.floor(Math.random() * (passwordChars.length - 0)) + 0;
		generatedPassword += passwordChars[randomIndex];
	}

	return generatedPassword;
}

const password = generatePassword(16);
console.log(`Generated password: ${password}`);
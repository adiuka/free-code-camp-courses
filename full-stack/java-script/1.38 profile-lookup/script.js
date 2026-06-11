let contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

const lookUpProfile = (name, property) => {
	let foundContact = null;
	for (let i = 0; i < contacts.length; i++) {
		console.log(`checking: ${contacts[i].firstName}`);
		if (contacts[i]["firstName"] === name) {
			console.log(`Contact found at index ${i}`);
			foundContact = contacts[i];
		} 
	}
	if (foundContact === null) {
		return "No such contact";
	}

	if (!Object.hasOwn(foundContact, property)) {
		return "No such property";
	} else {
		return foundContact[property];
	}
}

console.log(lookUpProfile("Kristian", "likes"));
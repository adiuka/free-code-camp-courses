For this example imagine there is a contact named Akira Laine, the lookUpProfile("Akira", "lastName") should return Laine.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named lookUpProfile that takes a name and a property as arguments.
You should retrieve contact information from the provided contacts array.
If the function receives a contact name and the property exists on the related contact, then the property's value should be returned.
If the name passed to the function does not match any contacts in the contacts array, then the function should return "No such contact".
If the property does not exist on a found contact, then the function should return "No such property".

let foundContact = null;
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i]["firstName"] === name) {
			foundContact = contacts[i];
		} else {
			return "No such contact";
		}
		if (!Object.hasOwn(foundContact, property)) {
			return "No such property";
		} else {
			return foundContact[property];
		}
	}
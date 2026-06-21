const inventory = [
	{name: "FLOUR", quantity: 5},
];

function findProductIndex(productName) {
	let productIndex = -1;
	for (let i = 0; i < inventory.length; i++) {
		if (inventory[i].name.toLowerCase() === productName.toLowerCase()) {
			productIndex = i;
		}
	}

	return productIndex;
}

console.log(findProductIndex("flour"));

function addProduct({name, quantity}) {
	let productExists = false;
	for (let i = 0; i < inventory.length; i++) {
		if (inventory[i].name.toLowerCase() === name.toLowerCase()) {
			productExists = true;
			inventory[i].quantity += quantity;
			console.log(`${inventory[i].name.toLowerCase()} quantity updated`)
			continue;
		}
	}

	if (!productExists) {
		inventory.push({name: name.toLowerCase(), quantity: quantity});
		console.log(`${name.toLowerCase()} added to inventory`);
	}
}

console.log(findProductIndex("flour"));
console.log(addProduct({name: "gurken", quantity: 4}));
console.log(addProduct({name: "FLOUR", quantity: 5}));

console.log(inventory);

function removeProduct(name, quantity) {
	let productExists = false;
	for (let i = 0; i < inventory.length; i++) {
		if (inventory[i].name.toLowerCase() === name.toLowerCase()) {
			productExists = true;
			const remainingProductPieces = inventory[i].quantity - quantity;

			if (remainingProductPieces > 0) {
				inventory[i].quantity = remainingProductPieces;
				console.log(`Remaining ${inventory[i].name.toLowerCase()} pieces: ${remainingProductPieces}`);
			}

			if (remainingProductPieces === 0) {
				inventory.splice(i, 1);
			}

			if (remainingProductPieces < 0) {
				console.log(`Not enough ${inventory[i].name.toLowerCase()} available, remaining pieces: ${inventory[i].quantity}`);
			}
		}
	}

	if (!productExists) {
		console.log(`${name.toLowerCase()} not found`);
	}
}

removeProduct({name: "flour", quantity: 2});


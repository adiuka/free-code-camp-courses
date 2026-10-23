interface Item {
	type: "book" | "electronics" | "clothing";
	id: string;
	price: number;
}

interface Book extends Item {
	type: "book";
	title: string;
	author: string;
}

interface Electronics extends Item {
	type: "electronics";
	item: string;
	model: string;
	warranty?: number;
}

interface Clothing extends Item {
	type: "clothing";
	item: string;
	brand: string;
	size?: "S" | "M" | "L";
}

type Product = Book | Electronics | Clothing;

class Collection<T> {
	items: T[];

	constructor(items: T[]) {
		this.items = items
	}

	getAll() {
		return this.items;
	}

	filter(callback: (item: T) => boolean): T[] {
		return this.items.filter(callback);
	}
}

const renderProduct = (product: Product):string => {
	let info: string;

	switch (product.type) {
		case "book":
			info = `Book: ${product.title} by ${product.author}`;
			break;

		case "electronics":
			info = `Electronics: ${product.item} - ${product.model}`;
			if (product.warranty) {
				info += ` - Warranty: ${product.warranty} year(${product.warranty > 1 ? 's' : ''})`;
			}
			break;

		case "clothing":
			info = `Clothing: ${product.item} by ${product.brand}`;
			if (product.size) {
				info += ` - Size ${product.size}`;
			}
			break;

		default: {
      const unknownProduct: never = product;
      throw new Error(`Unknown product type: ${JSON.stringify(unknownProduct)}`);
    }
	}

	return `
		<div class="item" id="${product.id}">
      <strong>${product.type}:</strong>
			${info}
			<p class="price">$${product.price}</p>
		</div>
	`
}

const products = new Collection<Product>([
	{
    type: "book",
    id: "b1",
    price: 15,
    title: "Dune",
    author: "Frank Herbert",
  },
  {
    type: "electronics",
    id: "e1",
    price: 999,
    item: "Laptop",
    model: "X200",
    warranty: 2,
  },
  {
    type: "clothing",
    id: "c1",
    price: 40,
    item: "Jacket",
    brand: "Acme",
    size: "M",
  },
]);

const showProducts = (filter?: Product["type"]): void => {
	const output = document.querySelector<HTMLElement>("#output");
	if (!output) return;

	const items = filter ? products.filter((product) => product.type === filter) : products.getAll();

	output.innerHTML = items.map(product => renderProduct(product)).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#all")?.addEventListener("click", () => showProducts());
  document.querySelector("#books")?.addEventListener("click", () => showProducts("book"));
  document.querySelector("#electronics")?.addEventListener("click", () => showProducts("electronics"));
  document.querySelector("#clothing")?.addEventListener("click", () => showProducts("clothing"));

  showProducts();
});
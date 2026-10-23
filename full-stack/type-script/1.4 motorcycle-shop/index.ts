type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
	id: string,
	name: string,
	manufacturer: string,
	category: Category,
	price: number,
	image_url: string,
	created_at: Date,
	description: string,
	year: number,
};

const fetchMotorcycles = async (): Promise<Motorcycle[]> => {
	try {
		const response = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
		const data: Motorcycle[] = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Request failed: ${error}`);
	}
}

const renderMotorcycleCard = (motorcycle: Motorcycle): string => {
  return `
    <div class="motorcycle-card">
      <img src="${motorcycle.image_url}" alt="${motorcycle.name}" class="motorcycle-card-image-container" />
      <span class="motorcycle-card-year-badge">${motorcycle.year}</span>
      <div class="motorcycle-card-content">
        <h2 class="motorcycle-card-title">${motorcycle.name}</h2>
        <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
        <p class="motorcycle-card-category">${motorcycle.category}</p>
        <p class="motorcycle-card-description">${motorcycle.description}</p>
        <p class="motorcycle-card-price">$${motorcycle.price}</p>
        <p class="motorcycle-card-engine">${/* engine horsepower, see below */ ""}</p>
      </div>
    </div>
  `;
};

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];

	constructor() {
		document.getElementById("name-filter-input")?.addEventListener("input", () => this.renderMotorcycles());
	}

  async renderMotorcycles(): Promise<void> {
    if (this.allMotorcycles.length === 0) {
      this.allMotorcycles = await fetchMotorcycles();
    }

    const grid = document.getElementById("motorcycle-grid") as HTMLElement;
		const input = document.getElementById("name-filter-input") as HTMLInputElement || null;
		const term = (input?.value ?? "").trim().toLowerCase();

		const shown = this.allMotorcycles.filter((motorcycle) => motorcycle.name.toLowerCase().includes(term));


    grid.innerHTML = shown.map(renderMotorcycleCard).join("");

    const count = document.getElementById("results-number");
    if (count) count.textContent = String(this.allMotorcycles.length);
  }
}

const app = new MotorcycleGalleryApp();
app.renderMotorcycles();
function generateElement() {
	return Math.floor(Math.random() * 100) + 1;
}

function generateArray() {
	return Array.from({ length: 5}, () => generateElement());
}

function generateContainer() {
	const newContainer = document.createElement("div");
	return newContainer;
}

function fillArrContainer(container, array) {
	container.innerHTML = "";
	array.forEach(element => {
		container.innerHTML += `<span>${element}</span>\n`	
	});
}

function isOrdered(x, y) {
	return x <= y;
}

function swapElements(array, index) {
	if (!isOrdered(array[index], array[index + 1])) {
		[array[index], array[index + 1]] = [array[index + 1], array[index]];
	}
}

function highlightCurrentEls(element, index) {
	element.children[index].style.border = "3px dashed red";
  element.children[index + 1].style.border = "3px dashed red";
}

const startingArrayElement = document.getElementById("starting-array");
const arrayContainer = document.getElementById("array-container");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");

generateBtn.addEventListener("click", () => {
  Array.from(arrayContainer.children).forEach((child) => {
    if (child !== startingArrayElement) child.remove();
  });
  fillArrContainer(startingArrayElement, generateArray());
});

sortBtn.addEventListener("click", () => {
	Array.from(arrayContainer.children).forEach((child) => {
    if (child !== startingArrayElement) child.remove();
  });
	const arr = Array.from(startingArrayElement.children).map((span) => Number(span.textContent));

	highlightCurrentEls(startingArrayElement, 0);

	let swapped = true;

	while (swapped) {
		swapped = false;

		for (let i = 0; i < arr.length - 1; i++) {
			if (!isOrdered(arr[i], arr[i + 1])) {
				swapElements(arr, i);
				swapped = true;
			}
			
			const stepContainer = generateContainer();

			fillArrContainer(stepContainer, [...arr]);

			const isLastPair = i === arr.length - 2;

			if (!isLastPair) {
				highlightCurrentEls(stepContainer, i + 1);
			} else if (swapped) {
				highlightCurrentEls(stepContainer, 0);
			}
		arrayContainer.appendChild(stepContainer);
		}
	}
})



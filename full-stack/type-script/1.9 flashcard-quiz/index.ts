interface FlashCard {
	questionText: string;
	questionAnswer: string;
}

const currentCards: FlashCard[] = [
	{ questionText: "Hej", questionAnswer: "Hello"},
	{ questionText: "Tak", questionAnswer: "Thank you" },
	{ questionText: "Vand", questionAnswer: "Water" },
];

let currentIndex = 0;

const flashcard = document.getElementById("flashcard") as HTMLDivElement;
const frontFace = document.getElementById("card-front-text") as HTMLParagraphElement;
const backFace = document.getElementById("card-back-text") as HTMLParagraphElement;
const deleteBtn = document.getElementById("delete-btn") as HTMLButtonElement;
const form = document.getElementById("entry-form") as HTMLFormElement;
const frontInput = document.getElementById("front-text") as HTMLTextAreaElement;
const backInput = document.getElementById("back-text") as HTMLTextAreaElement;
const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
  }
}

const render = (): void => {
	flashcard.classList.remove("flipped");
	const card = currentCards[currentIndex];
	frontFace.textContent = card ? card.questionText : "No cards left";
	backFace.textContent = card ? card.questionAnswer : "Add one below";
};

flashcard.addEventListener("click", () => {
	flashcard.classList.toggle("flipped");
});

deleteBtn.addEventListener("click", () => {
	if (currentCards.length === 0) {
		return;
	}

	currentCards.splice(currentIndex, 1);
	currentIndex = Math.max(0, currentIndex - 1);
	render();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const questionText = frontInput.value.trim();
  const questionAnswer = backInput.value.trim();

  if (!questionText || !questionAnswer) {
  	errorMessage.textContent = "Both the front and back text are required.";
  	throw new InvalidUserInputError("Both the front and back text are required.");
	}

  currentCards.push({ questionText, questionAnswer });
  currentIndex = currentCards.length - 1;
  form.reset();
  errorMessage.textContent = "";
  render();
});

render();
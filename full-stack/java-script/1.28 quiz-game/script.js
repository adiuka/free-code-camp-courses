const questions = [
	{
		category: "Astronomy",
		question: "Which planet is known as the Red Planet?",
		choices: ["Venus", "Mars", "Jupyter"],
		answer: "Mars",
	},
	{
		category: "Geography",
		question: "What is the largest ocean on Earth?",
		choices: ["Atlantic", "Indian", "Pacific"],
		answer: "Pacific",
	},
	{
		category: "Theater",
		question: "Who wrote the play Romeo and Juliet?",
		choices: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
		answer: "William Shakespeare",
	},
	{
		category: "Chemistry",
		question: "What is the chemical symbol for gold?",
		choices: ["Ag", "Au", "Go"],
		answer: "Au",
	},
	{
		category: "Geography",
		question: "Which country is home to the city of Kyoto?",
		choices: ["China", "South Korea", "Japan"],
		answer: "Japan",
	},
];


const getRandomQuestion = (questions) => {
	const randomIndex = Math.floor(Math.random() * Object.keys(questions).length);
	return questions[randomIndex];
}

const getRandomComputerChoice = (question) => {
	const randomIndex = Math.floor(Math.random() * question.choices.length);
	return question.choices[randomIndex];
}

const randomQuestion = getRandomQuestion(questions);
const randomAnswer = getRandomComputerChoice(randomQuestion);

const getResults = (question, answer) => {
	if (answer !== question.answer) {
		return `The computer's choice is wrong. The correct answer is ${question.answer}`;
	} else {
		return "The computer's choice is correct!";
	}
}

console.log(randomQuestion);
console.log(randomAnswer);
console.log(getResults(randomQuestion, randomAnswer));
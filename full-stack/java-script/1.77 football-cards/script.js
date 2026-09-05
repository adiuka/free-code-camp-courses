const footballTeam = {
	team: "Manchester United",
	year: 1992,
	headCoach: "Alex Fergusson",
	players: [
		{ name: "Peter Schmeichel", position: "goalkeeper", isCaptain: false },
  	{ name: "Steve Bruce", position: "defender", isCaptain: true },
  	{ name: "Gary Pallister", position: "defender", isCaptain: false },
  	{ name: "Denis Irwin", position: "defender", isCaptain: false },
  	{ name: "Paul Parker", position: "defender", isCaptain: false },
  	{ name: "Lee Martin", position: "defender", isCaptain: false },
  	{ name: "Bryan Robson", position: "midfielder", isCaptain: false },
  	{ name: "Paul Ince", position: "midfielder", isCaptain: false },
  	{ name: "Ryan Giggs", position: "midfielder", isCaptain: false },
  	{ name: "Andrei Kanchelskis", position: "midfielder", isCaptain: false },
  	{ name: "Neil Webb", position: "midfielder", isCaptain: false },
  	{ name: "Mike Phelan", position: "midfielder", isCaptain: false },
  	{ name: "Darren Ferguson", position: "midfielder", isCaptain: false },
  	{ name: "Brian McClair", position: "forward", isCaptain: false },
  	{ name: "Mark Hughes", position: "forward", isCaptain: false },
  	{ name: "Eric Cantona", position: "forward", isCaptain: false },
  	{ name: "Dion Dublin", position: "forward", isCaptain: false },
	],
}

const headCoach = document.getElementById("head-coach");
const year = document.getElementById("year");
const team = document.getElementById("team");
const selectContainer = document.getElementById("players");
const playerCards = document.getElementById("player-cards");

const playersArr = footballTeam.players;

function setPlayerCards(playerPosition) {
	const players = playerPosition === "all" ? playersArr : playersArr.filter(
		({ position }) => position === playerPosition
	);

	return players.map(
		({ name, position, isCaptain }) => {
			return `
				<div class="player-card">
					<h2>${isCaptain ? "(Captain) " : ""}${name}</h2>
					<p>Position: ${position}</p>
				</div>
			`;
		}
	).join(",");
}

team.innerHTML = footballTeam.team;
year.innerHTML = footballTeam.year;
headCoach.innerHTML = footballTeam.headCoach;

selectContainer.addEventListener("change", () => {
	playerCards.innerHTML = setPlayerCards(selectContainer.value);
});

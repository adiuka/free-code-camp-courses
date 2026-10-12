export const MoodBoardItem = ({color, image, description}) => {
	return (
		<div className="mood-board-item" style={{backgroundColor: color}}>
			<img className="mood-board-image" src={image} />
			<h3 class="mood-board-text">{description}</h3>
		</div>
	);
}

export const MoodBoard = () => {
	const destinations = [
		{
			id: 1,
			color: "rgb(45, 166, 79)",
			image: "https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg",
			description: "Pathway",
		},
		{
			id: 2,
			color: "rgb(52, 152, 219)",
			image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
			description: "Shore",
		},
		{
			id: 3,
			color: "rgb(142, 68, 173)",
			image: "https://cdn.freecodecamp.org/curriculum/labs/grass.jpg",
			description: "Grass",
		},
	]
	return (
		<div>
			<h1 className="mood-board-heading">Destination Mood Board</h1>

			<div className="mood-board">
				{destinations.map((destination) => (
					<MoodBoardItem key={destination.color} color={destination.color} image={destination.image} description={destination.description} />
				))}
			</div>
		</div>
	);
}
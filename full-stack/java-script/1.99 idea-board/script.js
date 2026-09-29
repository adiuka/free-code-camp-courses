const projectStatus = {
	PENDING : {
		description: "Pending Execution",
	},
	SUCCESS: {
		description: "Executed Successfully",
	},
	FAILURE: {
		description: "Execution Failed",
	},
};

class ProjectIdea {
	constructor(title, description) {
		this.title = title;
		this.description = description;
		this.status = projectStatus.PENDING;
	}

	updateProjectStatus(newStatus) {
		this.status = newStatus;
	};
}

class ProjectIdeaBoard {
	constructor(title) {
		this.title = title;
		this.ideas = [];
	}

	pin(projectIdea) {
		this.ideas.push(projectIdea);
	}

	unpin(projectIdea) {
		const index = this.ideas.indexOf(projectIdea);

		if (index !== -1) {
			this.ideas.splice(index, 1);
		}
	}

	count() {
		return this.ideas.length;
	}

	formatToString() {
		let string = `${this.title} has ${this.count()} idea(s)\n`;

		this.ideas.forEach((idea) => {
			string += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
		})

		return string;
	}
}

const team1ProjectIdeaBoard = new ProjectIdeaBoard("Team 1 Project Board");

const team1ProjectIdea = new ProjectIdea("Coral Swimming Pool", "Let us import so me coral or something man");

team1ProjectIdea.updateProjectStatus(projectStatus.SUCCESS);
team1ProjectIdeaBoard.pin(team1ProjectIdea);
console.log(team1ProjectIdeaBoard.formatToString());
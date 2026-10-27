import React, { useState, useRef, useEffect } from "react";

enum PetMood {
  HAPPY,
  EXCITED,
  CONTENT,
  SAD,
  TIRED,
  SICK,
  HUNGRY,
}

const MOOD_EMOJI: Record<PetMood, string> = {
  [PetMood.HAPPY]: "🐶😊",
  [PetMood.EXCITED]: "🐕🎉",
  [PetMood.CONTENT]: "🐩😌",
  [PetMood.SAD]: "🐶😢",
  [PetMood.TIRED]: "🐕😴",
  [PetMood.SICK]: "🐶🤒",
  [PetMood.HUNGRY]: "🦮🍖",
};

export const PetGame = () => {
	const [view, setView] = useState(2);
	const [name, setName] = useState("Roger");
	const nameInputRef = useRef<HTMLInputElement>(null);

	const [hunger, setHunger] = useState(0);
	const [happiness, setHappiness] = useState(100);
	const [energy, setEnergy] = useState(100);

	const handlePetInfoSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		const petName = nameInputRef.current?.value.trim() ?? ""
		if (!petName) {
			return;
		}
		setName(petName);
		setView(2);
	}

	const handleEat = () => {
		if (hunger > 0) {
			setHunger(hunger - 5);
		}
		if (energy < 100) {
			setEnergy(energy + 5);
		}
	};

	const handleSleep = () => {
		if (hunger < 100) {
			setHunger(hunger + 5);
		}
		if (energy < 100) {
			setEnergy(energy + 5);
		}
	};

	const handlePlay = () => {
		if (energy > 0) {
			setEnergy(energy - 5);
		}
		if (happiness < 100 && energy !== 0) {
			setHappiness(happiness + 5);
		}
	}

	const getMood = () => {
		if (hunger > 70) return PetMood.HUNGRY;
  	if (energy < 30) return PetMood.TIRED;
  	if (happiness < 30) return PetMood.SAD;
  	if (happiness > 80 && energy > 70) return PetMood.EXCITED;
  	if (happiness > 60) return PetMood.HAPPY;
  	return PetMood.CONTENT;
	}

	const mood = getMood()

	useEffect(() => {
		if (view !== 2) return;

		const id = setInterval(() => {
			setHunger((h) => Math.min(100, h + 5));
			setHappiness((h) => Math.max(0, h - 5));
		}, 1000);

		return () => clearInterval(id);
	}, [view]);
	
	return (
		<main>
			<header>
				<h1>Digital Pet Game</h1>
				<p>Take care of your virtual companion!</p>
			</header>
			{view === 1 &&
				<section className="base-container info-panel">
					<form className="start-questions" onSubmit={handlePetInfoSubmit}>
						<label htmlFor="pet-name">What is your pet name?</label>
						<input
							id="pet-name"
							name="pet-name"
							ref={nameInputRef}
							onChange={(e) => setName(e.target.value)}
						/>
						<button id="set-name-btn" type="submit">
							Start Game
						</button>
					</form>
				</section>
				
			}
			{view === 2 && 
				<>
					<section className="base-container game-container">
						<div className="pet-screen">
							<div className="pet-sprite">{MOOD_EMOJI[mood]}</div>
							<h2 className="pet-name">{name}</h2>
						</div>

						<div className="pet-buttons">
							<button id="eat-action" className="pet-button pet-buttons-left" type="button" onClick={handleEat}>EAT</button>
							<button id="play-action" className="pet-button pet-buttons-center" type="button" onClick={handlePlay}>PLAY</button>
							<button id="sleep-action" className="pet-button pet-buttons-right" type="button" onClick={handleSleep}>SLEEP</button>
						</div>
					</section>

					<section className="stats-grid">
						<div className="stat-bar stat">
							<div className="stat-header">
								<div className="stat-label">
									<span className="stat-icon">🍽️</span>
									<span className="stat-name">Hunger</span>
								</div>
								<span className="stat-value">{hunger}%</span>
							</div>
							<div className="stat-progress">
								<div className="stat-fill low" style={{ width: `${hunger}%` }}></div>
							</div>
						</div>

						<div className="stat-bar stat">
							<div className="stat-header">
								<div className="stat-label">
									<span className="stat-icon">😊</span>
									<span className="stat-name">Happiness</span>
								</div>
								<span className="stat-value">{happiness}%</span>
							</div>
							<div className="stat-progress">
								<div className="stat-fill low" style={{ width: `${happiness}%` }}></div>
							</div>
						</div>

						<div className="stat-bar stat">
							<div className="stat-header">
								<div className="stat-label">
									<span className="stat-icon">⚡</span>
									<span className="stat-name">Energy</span>
								</div>
								<span className="stat-value">{energy}%</span>
							</div>
							<div className="stat-progress">
								<div className="stat-fill low" style={{ width: `${energy}%` }}></div>
							</div>
						</div>
					</section>

					<section className="base-container info-panel">
						<div id="hud">
							<p id="pet-species">Species: Cat</p>
							<p id="pet-fact">
								<b>Pet Fact: </b>
								Cats who eat too much become addicted
							</p>
						</div>
					</section>
				</>
			}
		</main>
	)
};
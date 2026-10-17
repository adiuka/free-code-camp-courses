const { useState } = React;

export function EventRSVPForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [numberOfAttendees, setNumberOfAttendees] = useState(1);
	const [dietaryPreferences, setDietaryPreferences] = useState("");
	const [additionalGuests, setAdditionalGuests] = useState(false);
	const [submitted, setSubmitted] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();

		setSubmitted({
			name,
			email,
			numberOfAttendees,
			dietaryPreferences,
			additionalGuests,
		});
	}

	return (
		<div id="form-container">
			<h2 id="form-title">Halloween at the Disco!</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input 
						type="text"
						name="name"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</label>

				<label>
					Email:
					<input 
						type="email"
						name="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</label>

				<label>
					Number of Attendees:
					<input 
						type="number"
						name="number-of-attendees"
						min="1"
						value={numberOfAttendees}
						onChange={e => setNumberOfAttendees(e.target.value)}
						required
					/>
				</label>

				<label>
					Dietary Preferences:
					<input 
						type="text"
						name="dietary-preferences"
						value={dietaryPreferences}
						onChange={e => setDietaryPreferences(e.target.value)}
					/>
				</label>

				<label>
					Bringing Additional Guests?
					<input 
						type="checkbox"
						name="additional-guests"
						value={additionalGuests}
						onChange={e => setAdditionalGuests(e.target.checked)}
					/>
				</label>

				<button
					id="submit-btn"
					type="submit"

				>
					Submit RSVP
				</button>
			</form>

			{submitted && 
				<div id="submitted-message">
					<h3>RSVP Submitted</h3>
					<p>Name: {submitted.name}</p>
					<p>Email: {submitted.email}</p>
					<p>Number of Attendees: {submitted.numberOfAttendees}</p>
					<p>Dietary Preferences: {submitted.dietaryPreferences}</p>
					<p>Bringing Others: {submitted.additionalGuests ? "Yes" : "No"}</p>
				</div>
			}
		</div>
	);
}
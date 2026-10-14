const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
	const [otp, setOtp] = useState("");
	const [timeLeft, setTimeLeft] = useState(0);

	const generateOtp = () => {
		const numbers = [];
		for (let i = 0; i < 6; i++) {
			numbers.push(Math.floor(Math.random() * 10));
		}
		return numbers.join("");
	}

	const handleGenerate = () => {
		setTimeLeft(5);
		setOtp(generateOtp());
	}

	useEffect(() => {
		if (timeLeft === 0) {
			return;
		}

		const timeoutId = setTimeout(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [timeLeft]);

	let timerMessage = "";
	if (timeLeft > 0) {
		timerMessage = `Expires in: ${timeLeft} seconds`;
	} else if (otp !== "") {
		timerMessage = "OTP expired. Click the button to generate a new OTP.";
	}

	return (
		<div className="container">
			<h1 id="otp-title">OTP Generator</h1>
			<h2 id="otp-display">{otp.trim().length > 0 ? otp : "Click 'Generate OTP' to get a code"}</h2>
			<p id="otp-timer" aria-live="polite">{timerMessage}</p>
			<button 
				id="generate-otp-button"
				onClick={handleGenerate}
				disabled={timeLeft > 0}
			>
				Generate OTP
			</button>
		</div>
	)
};


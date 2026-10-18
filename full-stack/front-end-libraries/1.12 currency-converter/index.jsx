const { useState, useMemo } = React;

const rates = {
	USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
}

export function CurrencyConverter() {
	const [amount, setAmount] = useState(1);
	const [startCurrency, setStartCurrency] = useState("GBP");
	const [targetCurrency, setTargetCurrency] = useState("EUR");

	const amountInUSD = useMemo(() => {
		return Number(amount) / rates[startCurrency];
	}, [amount, startCurrency]);
	
	const converted = (amountInUSD * rates[targetCurrency]).toFixed(2);
	
	return (
		<div className="conversion-container">
			<p className="conversion-display">{startCurrency} to {targetCurrency} Conversion</p>
			<input 
				type="number" 
				value={amount} 
				onChange={(e) => setAmount(e.target.value)}
				min="0"
			/>

			<label>
				Start Currency
				<select value={startCurrency} onChange={(e) => setStartCurrency(e.target.value)}>
					{Object.keys(rates).map((code) => (
						<option key={code} value={code}>{code}</option>
					))}
				</select>
			</label>

			<label>
				Target Currency
				<select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
					{Object.keys(rates).map((code) => (
						<option key={code} value={code}>{code}</option>
					))}
				</select>
			</label>

			<p className="conversion-display">
				{converted} {targetCurrency}
			</p>
		</div>
	)
}
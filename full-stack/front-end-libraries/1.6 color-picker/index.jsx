const { useState } = React;

export const ColorPicker = () => {
	const [color, setColor] = useState("#ffffff");
	return (
		<div id="color-picker-container" style={{ background: color }}>
			<p className="title">Pick a Color</p>
			<input 
				type="color" 
				id="color-input"
				value={color}
				onChange={(e) => setColor(e.target.value)}
				/>
		</div>
	)
};
function parseShipment(rawData) {
	const dataArray = [];
	for (let i = 0; i < rawData.length; i++) {
		let splitArray = rawData[i].split("|");
		let dataObject = {
			sku: splitArray[0], 
			name: splitArray[1], 
			qty: Number(splitArray[2]), 
			expires: splitArray[3], 
			zone: splitArray[4] ? splitArray[4] : "general"
		};
		if (!dataArray.some(item => item.sku === dataObject.sku)) {
			dataArray.push(dataObject);
		}
	}
	return dataArray;
}

const planRestock = (pantry, shipment) => {
	const actions = [];
	for (let i = 0; i < shipment.length; i++) {
		if (shipment[i].qty <= 0) {
			actions.push({type: "discard", item: shipment[i]});
			continue;
		} 
		
		if (pantry.some(item => item.sku === shipment[i].sku)) {
			actions.push({type: "restock", item: shipment[i]});
		} else {
			actions.push({type: "donate", item: shipment[i]});
		}
	}
	return actions;
}

function groupByZone(actions) {
	const groupedActions = {};

	for (const action of actions) {
		const zone = action.item.zone;

		if (!groupedActions[zone]) {
			groupedActions[zone] = [];
		}

		groupedActions[zone].push(action);
	}

	return groupedActions;
}

const clonePantry = (pantry) => {
	const pantryClone = JSON.parse(JSON.stringify(pantry));
	return pantryClone;
}

const rawData = [
  "A10|Tomatoes|5|2027-01-01",        // no zone field
  "B21|Bananas|10|2027-01-01|fridge", // zone: "fridge"
  "C32|Eggs|3|2027-01-01|pantry",     // zone: "pantry"
];

const shipmentData = [
  "A10|Tomatoes|0|2027-01-01",        // no zone field
  "B21|Bananas|10|2027-01-01|fridge", // zone: "fridge"
  "C32|Eggs|0|2027-01-01|pantry",     // zone: "pantry"
];

const pantry = parseShipment(rawData);
const shipment = parseShipment(shipmentData);

const actions = planRestock(pantry, shipment);
const grouped = groupByZone(actions);

console.log(grouped);
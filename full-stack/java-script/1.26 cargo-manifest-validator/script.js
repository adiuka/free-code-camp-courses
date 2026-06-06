const testContainer = { containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false};

const normalizeUnits = (manifest) => {
    const updatedManifest = { ...manifest };
    if (updatedManifest.unit === "lb") {
        updatedManifest.weight = updatedManifest.weight * 0.45;
        updatedManifest.unit = "kg";
    }
    return updatedManifest;
}

const validateManifest = (manifest) => {
  const errors = {};
  
	if (manifest.hasOwnProperty("containerId")) {
		if (manifest.containerId == null || manifest.containerId <= 0 || !Number.isInteger(manifest.containerId)) {
			errors.containerId = "Invalid";
		}
	} else {
		errors.containerId = "Missing";
	}

	if (manifest.hasOwnProperty("destination")) {
		if (manifest.destination == null || typeof manifest.destination !== "string" || manifest.destination.trim() === "") {
			errors.destination = "Invalid";
		}
	} else {
		errors.destination = "Missing";
	}

	if (manifest.hasOwnProperty("weight")) {
		if (manifest.weight == null || typeof manifest.weight !== "number" || isNaN(manifest.weight) || manifest.weight <= 0 ) {
			errors.weight = "Invalid";
		}
	} else {
		errors.weight = "Missing";
	}

	if (manifest.hasOwnProperty("unit")) {
		if (manifest.unit == null || typeof manifest.unit !== "string" || manifest.unit !== "kg" && manifest.unit !== "lb" ) {
			errors.unit = "Invalid";
		}
	} else {
		errors.unit = "Missing";
	}

	if (manifest.hasOwnProperty("hazmat")) {
		if (manifest.hazmat == null || typeof manifest.hazmat !== "boolean") {
			errors.hazmat = "Invalid";
		}
	} else {
		errors.hazmat = "Missing";
	}

  return errors;
}

const processManifest = (manifest) => {
	const errors = validateManifest(manifest);
	if (Object.keys(errors) == 0) {
		const updatedManifest = normalizeUnits(manifest);
		console.log(`Validation success: ${manifest.containerId}`);
		console.log(`Total weight: ${updatedManifest.weight} kg`);
	} else {
		console.log(`Validation error: ${manifest.containerId}`);
		console.log(errors);
	}
}

console.log(processManifest(testContainer));

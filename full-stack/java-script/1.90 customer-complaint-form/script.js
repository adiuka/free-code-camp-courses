const form = document.getElementById("form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNumber = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");

// complaint variables
const complaintsGroup = [...document.querySelectorAll('input[name="complaint"]')];
const complaintFieldset = document.getElementById("complaints-group");
const otherComplaint = document.getElementById("other-complaint");
const complaintDescription = document.getElementById("complaint-description");

// solution variables
const desiredSollution = [...document.querySelectorAll('input[name="solutions"]')];
const solutionsFieldset = document.getElementById("solutions-group");
const otherSolution = document.getElementById('other-solution');
const solutionDescription = document.getElementById('solution-description');

// helper functions
function isValidFullName(name) {
	return name.trim().length > 0;
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function isValidOrderNumber(orderNumber) {
	const orderNumberRegex = /^2024\d{6}$/;
	return orderNumberRegex.test(orderNumber);
}

function isValidProductCode(productCode) {
	const productCodeRegex = /^[a-z]{2}\d{2}-[a-z]\d{3}-[a-z]{2}\d$/i;
	return productCodeRegex.test(productCode);
}

function isValidQuantity(quantity) {
	const quantityRegex = /^\d+$/;
	return quantityRegex.test(quantity) && Number(quantity) > 0;
}

function isValidComplaints(checkboxes) {
	return checkboxes.some(checkbox => checkbox.checked);
}

function isValidComplaintDescription(isOtherChecked, description) {
	if (!isOtherChecked) return true;
	return description.trim().length >= 20;
}

function isValidSolution(checkboxes) {
	return checkboxes.some(checkbox => checkbox.checked);
}

function isValidSolutionDescription(isOtherChecked, description) {
	if (!isOtherChecked) return true;
	return description.trim().length >= 20;
}

function validateForm() {
	return {
		"full-name": isValidFullName(fullName.value),
		"email": isValidEmail(email.value),
		"order-no": isValidOrderNumber(orderNumber.value),
		"product-code": isValidProductCode(productCode.value),
		"quantity": isValidQuantity(quantity.value),
		"complaints-group": isValidComplaints(complaintsGroup),
		"complaint-description": isValidComplaintDescription(otherComplaint.checked, complaintDescription.value),
		"solutions-group": isValidSolution(desiredSollution),
		"solution-description": isValidSolutionDescription(otherSolution.checked, solutionDescription.value),
	};
}

function isValid(validationResults) {
	return Object.values(validationResults).every(value => value === true);
}

fullName.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidFullName(e.target.value) ? "green" : "red";
});

email.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidEmail(e.target.value) ? "green" : "red";
});

orderNumber.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidOrderNumber(e.target.value) ? "green" : "red";
});

productCode.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidProductCode(e.target.value) ? "green" : "red";
});

quantity.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidQuantity(e.target.value) ? "green" : "red";
});

complaintsGroup.forEach(checkbox => {
	checkbox.addEventListener("change", (e) => {
		complaintFieldset.style.borderColor = isValidComplaints(complaintsGroup) ? "green" : "red";
	})
});

desiredSollution.forEach(radio => {
	radio.addEventListener("change", () => {
		const container = document.getElementById("solution-description-container");
		const isChecked = otherSolution.checked;

		container.style.display = isChecked ? "block" : "none";
		solutionDescription.style.borderColor = isValidSolutionDescription(isChecked, solutionDescription.value) ? "green" : "red";
	});
});

otherComplaint.addEventListener("change", (e) => {
	const container = document.getElementById("complaint-description-container");
	const isChecked = otherComplaint.checked;

	container.style.display = isChecked ? "block" : "none";

	complaintDescription.style.borderColor = isValidComplaintDescription(isChecked, complaintDescription.value) ? "green" : "red";
});

complaintDescription.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidComplaintDescription(otherComplaint.checked, complaintDescription.value) ? "green" : "red";
});

solutionDescription.addEventListener("change", (e) => {
	e.target.style.borderColor = isValidSolutionDescription(otherSolution.checked, solutionDescription.value) ? "green" : "red";
})

const fieldsToHighlight = {
	"full-name": fullName,
	"email": email,
	"order-no": orderNumber,
	"product-code": productCode,
	"quantity": quantity,
	"complaints-group": complaintFieldset,
	"complaint-description": complaintDescription,
	"solutions-group": solutionsFieldset,
	"solution-description": solutionDescription,
};


form.addEventListener("submit", (e) => {
	e.preventDefault();
	const results = validateForm();

	Object.entries(results).forEach(([field, valid]) => {
		fieldsToHighlight[field].style.borderColor = valid ? "green" : "red";
	});

	console.log(isValid(results));
});
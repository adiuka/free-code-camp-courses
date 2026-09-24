const currentDate = new Date();

const currentDateFormat = `Current Date and Time: ${currentDate}`;

console.log(currentDateFormat);

function formatDateMMDDYY(date) {
	const options = {
		month: 'numeric',
		day: 'numeric',
		year: 'numeric',
	};
  const formatedDate = date.toLocaleString("en-US", options);
	return `Formatted Date (MM/DD/YYYY): ${formatedDate}`;
}

console.log(formatDateMMDDYY(currentDate));

function formatDateLong(date) {
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}
	const formatedDate = date.toLocaleString("en-US", options);
	return `Formatted Date (Month Day, Year): ${formatedDate}`;
}

console.log(formatDateLong(currentDate));
const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

const headingRegex = /^ *(#{1,3}) (.+)/gm;
const blockQuoteRegex = /^ *> (.+)/gm;
const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
const linkRegex = /\[(.*?)\]\((.*?)\)/g;
const boldRegex = /(\*\*|__)(.+?)\1/g;
const italicRegex = /([*_])(.+?)\1/g;

function convertMarkdown() {
	let html = markdownInput.value;

	// heading regex
	html = html.replace(headingRegex, (matches, hashes, text) => {
		const level = hashes.length;
		return `<h${level}>${text}</h${level}>`;
	});

	// blockquote regex
	html = html.replace(blockQuoteRegex, '<blockquote>$1</blockquote>')

	// img regex
	html = html.replace(imgRegex, '<img alt="$1" src="$2">')

	// url regex
	html = html.replace(linkRegex, '<a href="$2">$1</a>');

	// bold regex 
	html = html.replace(boldRegex, '<strong>$2</strong>');

	// italic regex
	html = html.replace(italicRegex, '<em>$2</em>');

	return html;
}

markdownInput.addEventListener("input", () => {
	const conversion = convertMarkdown();
	htmlOutput.textContent = conversion;
	preview.innerHTML = conversion;
});
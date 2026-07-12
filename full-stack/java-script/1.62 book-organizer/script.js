const books = [
	{
		title: "The fellowship of the ring",
		authorName: "J. R. R. Tolkien",
		releaseYear: 1954,
	},

	{
		title: "1984",
		authorName: "George Orwell",
		releaseYear: 1949,
	},

	{
		title: "The two towers",
		authorName: "J. R. R. Tolkien",
		releaseYear: 1954,
	},

	{
		title: "The return of the King",
		authorName: "J. R. R. Tolkien",
		releaseYear: 1955,
	},

	{
		title: "The Great Gatsby",
		authorName: "Charles Schnibner",
		releaseYear: 1925,
	}
]

function sortByYear(book1, book2) {
	if (book1.releaseYear < book2.releaseYear) {
		return -1;
	}

	if (book1.releaseYear > book2.releaseYear) {
		return 1;
	}

	if (book1.releaseYear === book2.releaseYear) {
		return 0
	}
}

const filteredBooks = books.filter((book) => book.releaseYear <= 1954);
const sortedBooks = filteredBooks.sort(sortByYear);
console.log(sortedBooks);

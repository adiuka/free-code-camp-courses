const mainSection = document.getElementById("main-section");
const categoryDropdown = document.getElementById("category-dropdown");
const categoryNames = document.querySelectorAll(".category-name");
const bookmarkName = document.getElementById("name");
const bookmarkUrl = document.getElementById("url");
const viewCategoryBtn = document.getElementById("view-category-button");
const addBookmarkSectionBtn = document.getElementById("add-bookmark-button");
const formSection = document.getElementById("form-section");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkFormBtn = document.getElementById("add-bookmark-button-form");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

function getBookmarks() {
	try {
		const data = JSON.parse(localStorage.getItem("bookmarks"));
		return Array.isArray(data) && data.every(({ name, category, url }) => name && category && url) ? data : [];
	} catch {
		return [];
	}
}

function displayOrCloseForm() {
	mainSection.classList.toggle("hidden");
	formSection.classList.toggle("hidden");
}

function displayOrHideCategory() {
	mainSection.classList.toggle("hidden");
	bookmarkListSection.classList.toggle("hidden");
}

function updateCategoryLists() {
	const bookmarks = getBookmarks();
	const selectedCategory = categoryDropdown.value;
	const categoryBookmarks = bookmarks.filter((bookmark) => bookmark.category === selectedCategory);

	if (categoryBookmarks.length === 0) {
		categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
		return;
	}

	let html = "";

	categoryBookmarks.forEach(({name, url}) => {
		html += `<input type="radio" id="${name}" value="${name}" name="category-bookmarks"><label for="${name}"><a href="${url}">${name}</a></label> `
	})
	categoryList.innerHTML = html;
}

function addBookmark() {
	const bookmarks = getBookmarks();

	const bookmarkObj = {
		name: bookmarkName.value,
		category: categoryDropdown.value,
		url: bookmarkUrl.value,
	}

	bookmarks.push(bookmarkObj);
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function deleteBookmark() {
	const selectedRadio = document.querySelector('input[name="category-bookmarks"]:checked');

	if (!selectedRadio) {
		return;
	}

	const bookmarks = getBookmarks();

	const bookmarkIndex = bookmarks.findIndex(
		(bookmark) =>
			bookmark.name === selectedRadio.value &&
			bookmark.category === categoryDropdown.value
	);

	if (bookmarkIndex === -1) {
		return;
	}

	bookmarks.splice(bookmarkIndex, 1);
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	updateCategoryLists();
}

function resetForm() {
	bookmarkName.value = "";
	bookmarkUrl.value = "";
}

addBookmarkSectionBtn.addEventListener("click", () => {
	categoryNames[0].innerText = categoryDropdown.options[categoryDropdown.selectedIndex].text;
	displayOrCloseForm();
});

closeFormBtn.addEventListener("click", () => {
	displayOrCloseForm();
});

addBookmarkFormBtn.addEventListener("click", () => {
	addBookmark();
	resetForm()
	displayOrCloseForm();
});

viewCategoryBtn.addEventListener("click", () => {
	categoryNames[1].innerText = categoryDropdown.options[categoryDropdown.selectedIndex].text;
	updateCategoryLists();
	displayOrHideCategory();
});

closeListBtn.addEventListener("click", () => {
	displayOrHideCategory();
})

deleteBookmarkBtn.addEventListener("click", () => {
	deleteBookmark();
})
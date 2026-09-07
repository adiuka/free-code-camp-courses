const themes = [
  {name: "light", message: "bright as the sun!"},
  {name: "dark", message: "dark as the night!"}
];

const switchThemeButton = document.getElementById("theme-switcher-button");
const themeDropdown = document.getElementById("theme-dropdown");
const lightThemeButton = document.getElementById("theme-light");
const darkThemeButton = document.getElementById("theme-dark");
let themeText = document.getElementById("theme-text");

switchThemeButton.addEventListener("click", () => {
  const expanded = switchThemeButton.getAttribute("aria-expanded") === 'true';
  switchThemeButton.setAttribute('aria-expanded', String(!expanded));
  themeDropdown.hidden = expanded;
});

lightThemeButton.addEventListener("click", () => {
	document.body.className = "theme-light";
	themeText.innerHTML = themes[0].message;
});

darkThemeButton.addEventListener("click", () => {
	document.body.className = "theme-dark";
	themeText.innerHTML = themes[1].message;
});
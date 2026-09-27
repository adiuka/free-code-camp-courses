const display = document.getElementById("display");

function getDisplayName(padId) {
  if (padId === "heater-1") return "Heater 1";
  if (padId === "heater-2") return "Heater 2";
  if (padId === "heater-3") return "Heater 3";
  if (padId === "heater-4") return "Heater 4";
  if (padId === "clap") return "Clap";
  if (padId === "open-hh") return "Open HH";
  if (padId === "kick-n-hat") return "Kick n' Hat";
  if (padId === "kick") return "Kick";
  if (padId === "closed-hh") return "Closed HH";
  return "";
}

// key listeners
document.addEventListener("keydown", (e) => {
		const key = e.key.toUpperCase();
		const clip = document.getElementById(key);
		if (!clip) return;

		const pad = clip.closest(".drum-pad");
		pad.classList.add("active");
		display.textContent = getDisplayName(pad.id);
		clip.currentTime = 0;
		clip.play();
	}
);

// click listeners
document.querySelectorAll(".drum-pad").forEach((pad) => {
	pad.addEventListener("click", () => {
		const clip = pad.querySelector(".clip");
		if (!clip) return;

		pad.classList.add("active");
		display.textContent = getDisplayName(pad.id);
		clip.currentTime = 0;
		clip.play();
	})
})

// ended listeners
document.querySelectorAll(".clip").forEach((clip) => {
	clip.addEventListener("ended", () => {
		clip.closest(".drum-pad").classList.remove("active");
	});
});
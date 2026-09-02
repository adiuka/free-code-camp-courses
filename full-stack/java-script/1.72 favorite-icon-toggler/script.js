const buttons = document.querySelectorAll(".favorite-icon");

function handleLike(btn) {
  if (btn.className === "favorite-icon filled") {
    btn.className = "favorite-icon";
    btn.innerHTML = "&#9825;";
  } else {
    btn.className = "favorite-icon filled";
    btn.innerHTML = "&#10084;";
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleLike(btn));
})
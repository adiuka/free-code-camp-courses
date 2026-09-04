const paintings = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.getElementById("close-btn");

function handleOpen(painting) {
  lightbox.style.display = "flex";
  const fullSrc = painting.src.split("-")[0].concat(".jpg");
  lightboxImage.src = fullSrc;
}

function handleClose() {
  lightbox.style.display = "none";
  lightboxImage.src = "";
}

paintings.forEach((painting) => {
  painting.addEventListener("click", () => handleOpen(painting));
})

closeBtn.addEventListener("click", () => handleClose());
lightbox.addEventListener("click", () => handleClose());
// Fade-in effect for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade");

  sections.forEach(section => {
    section.classList.add("visible");
  });
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".project-media img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

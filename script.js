// Fade-in effect for sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade");

  sections.forEach(section => {
    section.classList.add("visible");
  });
});

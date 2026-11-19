document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     Footer year
  ====================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ======================
     Lightbox (click a project image to enlarge)
  ====================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".project-media img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => lightbox.classList.remove("active"));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") lightbox.classList.remove("active");
    });
  }

  /* ======================
     Project quick links: jump to the project and open it
  ====================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (target.tagName === "DETAILS") target.open = true;
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Opening the page with a link like micsam.me/#project-uvc opens that project
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target && target.tagName === "DETAILS") target.open = true;
  }
});

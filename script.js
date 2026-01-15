document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     Fade-in Sections
  ====================== */
  const sections = document.querySelectorAll(".fade");
  sections.forEach(section => section.classList.add("visible"));

  /* ======================
     Lightbox
  ====================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".project-media img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  /* ======================
     Smooth Scroll
  ====================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ======================
     Scroll Reveal
  ====================== */
  const reveals = document.querySelectorAll(".reveal");
  window.addEventListener("scroll", () => {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  });

  /* ======================
     Form Validation
  ====================== */
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      const email = document.querySelector("#email")?.value || "";
      if (!email.includes("@")) {
        e.preventDefault();
        alert("Please enter a valid email.");
      }
    });
  }

  /* ======================
     Custom Cursor + Trail
  ====================== */
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  let lastTime = 0;

  window.addEventListener("mousemove", e => {
    // Move cursor dot
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Trail (throttled)
    const now = Date.now();
    if (now - lastTime > 20) {
      lastTime = now;

      const trail = document.createElement("div");
      trail.className = "trail";
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;

      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 600);
    }
  });

  // Cursor hover scale
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

});

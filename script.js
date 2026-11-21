document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     Cover: split the name into letters for the entrance animation
  ====================== */
  let letterIndex = 0;
  document.querySelectorAll(".cover-name > span").forEach(line => {
    const text = line.textContent;
    line.textContent = "";
    [...text].forEach(char => {
      const span = document.createElement("span");
      span.className = "ch";
      span.setAttribute("aria-hidden", "true");
      span.textContent = char;
      span.style.setProperty("--i", letterIndex++);
      line.appendChild(span);
    });
  });

  /* ======================
     Cover: "Explore my work" dropdown
  ====================== */
  const toggle = document.querySelector(".cover-toggle");
  const menu = document.getElementById("cover-links");
  if (toggle && menu) {
    const setOpen = open => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", e => {
      e.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", e => {
      if (!menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ======================
     Light / dark mode switch (choice is remembered)
  ====================== */
  const root = document.documentElement;
  const setTheme = (theme, save) => {
    root.setAttribute("data-theme", theme);
    if (save) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
  };
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  });

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

  /* ======================
     Scroll reveal animations
  ====================== */
  const revealTargets = document.querySelectorAll(
    ".section-dark > h2, .section-hint, .project-nav, .project-card, .contact-card, .about-box"
  );
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    revealTargets.forEach(el => el.classList.add("in-view"));
  } else {
    // Stagger items that sit side by side (contact cards)
    document.querySelectorAll(".contact-card, .about-grid .about-box").forEach(el => {
      const i = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--delay", `${i * 0.08}s`);
    });
    revealTargets.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ======================
     Custom cursor dot + trail (desktop mouse only)
  ====================== */
  const cursor = document.getElementById("cursor");
  const fineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!cursor || !fineMouse || reducedMotion) return;

  let lastTime = 0;

  window.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

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

  // Grow the dot over anything clickable
  document.querySelectorAll("a, button, summary, .project-media img").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
});

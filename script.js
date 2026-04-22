(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia("(min-width: 769px)").matches;
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const heroText = document.getElementById("heroText");
  const resumeIframe = document.getElementById("resume-iframe");
  const resumeFallback = document.getElementById("resume-fallback");
  const hoverTargets = document.querySelectorAll("a, button, .project-card, .pill");

  if (isDesktop) {
    document.body.style.cursor = "none";
  } else {
    cursorDot.style.display = "none";
    cursorRing.style.display = "none";
  }

  if (isDesktop) {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursorRing.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal, .stagger");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));

  if (resumeIframe && resumeFallback) {
    resumeIframe.addEventListener("error", () => {
      resumeIframe.style.display = "none";
      resumeFallback.style.display = "flex";
    });
  }

  if (!reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (heroText) {
            const scale = 1 + scrollY * 0.0002;
            const translateY = scrollY * -0.2;
            heroText.style.transform = `translateY(${translateY}px) scale(${scale})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();

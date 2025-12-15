/* =====================================================
   MAIN.JS — RANGA CARPENTER WORKS
   Advanced UI Animations & Effects
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1. SCROLL REVEAL (FADE-UP)
  =============================== */
  const revealElements = document.querySelectorAll(".fade-up");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach(el => revealObserver.observe(el));


  /* ===============================
     2. NAVBAR SHADOW ON SCROLL
  =============================== */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  /* ===============================
     3. HERO PARALLAX (DESKTOP ONLY)
     Subtle & smooth — professional
  =============================== */
  const hero = document.querySelector(".hero-section");

  function heroParallax() {
    if (!hero) return;

    // Disable parallax on mobile
    if (window.innerWidth < 768) return;

    const scrollY = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
  }

  window.addEventListener("scroll", heroParallax);


  /* ===============================
     4. SERVICE CARD MICRO-MOTION
     (Extra polish, very light)
  =============================== */
  const cards = document.querySelectorAll(".service-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * -6;

      card.style.transform =
        `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0) scale(1)";
    });
  });


  /* ===============================
     5. SMOOTH SCROLL FOR ANCHORS
     (Services link etc.)
  =============================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* ===============================
     6. IMAGE LOAD FADE-IN
     (Avoids sudden pop-in)
  =============================== */
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    img.style.opacity = "0";
    img.style.transition = "opacity .6s ease";

    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    }
  });

});


/* ======================================
   HERO SLIDER — CONTINUOUS LOOP SLIDE
   (Door / Panel Style)
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length <= 1) return;

  let current = 0;

  // initial state
  slides.forEach((slide, i) => {
    slide.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
  });

  setInterval(() => {
    const currentSlide = slides[current];
    const nextIndex = (current + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    // move current out
    currentSlide.classList.add("exit-left");

    // prepare next
    nextSlide.style.transition = "none";
    nextSlide.style.transform = "translateX(100%)";

    // force reflow
    nextSlide.offsetHeight;

    // slide next in
    nextSlide.style.transition = "transform 0.9s ease-in-out";
    nextSlide.style.transform = "translateX(0)";

    // cleanup after animation
    setTimeout(() => {
      currentSlide.classList.remove("exit-left");
      currentSlide.style.transition = "none";
      currentSlide.style.transform = "translateX(100%)";

      // re-enable transition
      currentSlide.offsetHeight;
      currentSlide.style.transition = "transform 0.9s ease-in-out";
    }, 900);

    current = nextIndex;

  }, 4000); // change every 4 seconds
});

if (window.innerWidth > 768) {
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-bg");
    hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  });
}
/* =====================================
   MOBILE + DESKTOP FAKE PARALLAX
===================================== */

document.addEventListener("scroll", () => {
  const layer = document.querySelector(".hero-parallax-layer");
  if (!layer) return;

  const scrollTop = window.scrollY;

  // very subtle movement
  layer.style.transform = `translateY(${scrollTop * 0.25}px)`;
});
/* ===============================
   TESTIMONIAL AUTO SLIDER
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");

  if (!track || cards.length <= 1) return;

  let index = 0;

  setInterval(() => {
    index = (index + 1) % cards.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 5000); // slow & calm
});
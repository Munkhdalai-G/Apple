// =============================================
// SCROLL DOTS — synced to movie scroll track
// =============================================
(function () {
  const track = document.getElementById("scrollTrack");
  const dotsContainer = document.getElementById("scrollDots");
  if (!track || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll(".movie-card"));
  let currentDot = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "scroll-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll(".scroll-dot"));

  // Update active dot on scroll
  track.addEventListener("scroll", () => {
    const scrollLeft = track.scrollLeft;
    const cardWidth = cards[0]?.offsetWidth + 12 || 286; // card + gap
    const idx = Math.round(scrollLeft / cardWidth);
    if (idx !== currentDot && idx >= 0 && idx < dots.length) {
      dots[currentDot].classList.remove("active");
      dots[idx].classList.add("active");
      currentDot = idx;
    }
  }, { passive: true });
})();

// =============================================
// ANIMATION STRIP — play / pause toggle
// =============================================
(function () {
  const btn = document.getElementById("playBtn");
  const section = btn?.closest(".anim-section");
  if (!btn || !section) return;

  let paused = false;

  btn.addEventListener("click", () => {
    paused = !paused;
    if (paused) {
      section.classList.add("paused");
      btn.innerHTML = "&#9654;"; // play triangle
      btn.title = "Play animation";
    } else {
      section.classList.remove("paused");
      btn.innerHTML = "&#9646;&#9646;"; // pause bars
      btn.title = "Pause animation";
    }
  });
})();
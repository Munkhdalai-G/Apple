const carousel = document.getElementById("carousel");
const indicators = document.querySelectorAll(".indicator a");
const boxes = document.querySelectorAll(".box");

// Click on indicators to scroll
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    const boxWidth = boxes[0].offsetWidth;
    const gap = 12;
    carousel.scrollLeft = index * (boxWidth + gap);
  });
});

// Update active indicator on scroll
carousel.addEventListener("scroll", () => {
  const scrollLeft = carousel.scrollLeft;
  const boxWidth = boxes[0].offsetWidth;
  const gap = 12;
  const currentIndex = Math.round(scrollLeft / (boxWidth + gap));

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
});

const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const boxes = document.querySelectorAll(".box");

let currentIndex = 0;
let autoPlayInterval;
let isAutoPlaying = true;

// Create indicator dots
boxes.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.dataset.index = index;
  if (index === 0) dot.classList.add("active");
  indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function scrollToIndex(index) {
  const boxWidth = boxes[0].offsetWidth;
  const gap = 20;
  carousel.scrollLeft = index * (boxWidth + gap);
  currentIndex = index;
  updateIndicators();
}

function updateIndicators() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % boxes.length;
  scrollToIndex(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + boxes.length) % boxes.length;
  scrollToIndex(currentIndex);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 3000);
  isAutoPlaying = true;
  pauseBtn.classList.add("active");
  pauseBtn.textContent = "Auto-Play";
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  isAutoPlaying = false;
  pauseBtn.classList.remove("active");
  pauseBtn.textContent = "Paused";
}

// Click on indicators
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    stopAutoPlay();
    scrollToIndex(parseInt(dot.dataset.index));
  });
});

// Update indicators on manual scroll
carousel.addEventListener("scroll", () => {
  const scrollLeft = carousel.scrollLeft;
  const boxWidth = boxes[0].offsetWidth;
  const gap = 20;
  const newIndex = Math.round(scrollLeft / (boxWidth + gap));

  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    updateIndicators();
  }
});

// Control buttons
pauseBtn.addEventListener("click", () => {
  if (isAutoPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

prevBtn.addEventListener("click", () => {
  stopAutoPlay();
  prevSlide();
});

nextBtn.addEventListener("click", () => {
  stopAutoPlay();
  nextSlide();
});

// Start auto-play on load
startAutoPlay();

// Pause on hover
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", () => {
  if (pauseBtn.classList.contains("active")) {
    startAutoPlay();
  }
});

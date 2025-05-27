// Page loaded animation
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`;
  });

  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Fade-in on scroll
function handleFadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeInOnScroll);
window.addEventListener('DOMContentLoaded', handleFadeInOnScroll);

// Contact form handler
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    form.reset();
  });
}

console.log("Portfolio page loaded successfully.");
const reveals = document.querySelectorAll(".reveal");

function handleScrollReveal() {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 120) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
handleScrollReveal();

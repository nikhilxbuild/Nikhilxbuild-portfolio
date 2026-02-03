document.querySelectorAll(".icon, .btn, .skill, .card").forEach(el => {
  el.addEventListener("touchstart", () => {
    el.classList.add("active");
  });

  el.addEventListener("touchend", () => {
    el.classList.remove("active");
  });
});

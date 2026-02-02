document.querySelectorAll(".icon, .btn").forEach(el => {
  el.addEventListener("click", () => {
    el.style.transform = "scale(0.9)";
    setTimeout(() => {
      el.style.transform = "";
    }, 120);
  });
});

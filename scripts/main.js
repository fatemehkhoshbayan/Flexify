const header = document.querySelector("header");

document.querySelector("#current-year").textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  // If the user scrolls more than 50px, add the 'scrolled' class
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

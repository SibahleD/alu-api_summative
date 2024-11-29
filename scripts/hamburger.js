// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".index-menu");
  
hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});
  
document.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);
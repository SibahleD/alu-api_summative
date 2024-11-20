// API KEY : 577a3092146f49e2bcd2c5d8b68d323a

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".index-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))
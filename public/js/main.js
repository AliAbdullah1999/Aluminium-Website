// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;

function handleScroll() {
  if (rootElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.addEventListener("scroll", handleScroll);
scrollToTopBtn.addEventListener("click", scrollToTop);

// Theme toggler
const themeToggler = document.getElementById("theme-toggler");

themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}
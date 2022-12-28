let headerMenu = document.getElementById("menu");
// let targetTop;
let winY;
document.addEventListener("scroll", () => {
    winY = window.pageYOffset
    // targetTop = headerMenu.getBoundingClientRect().top
    if (winY > 58) {
        headerMenu.classList.add("menuFixed")
    } else {
        headerMenu.classList.remove("menuFixed")
    }
})
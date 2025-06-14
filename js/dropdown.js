const dropdown = document.querySelector(".dropdown");
const menu_button = document.querySelector(".menu-button");
const astraCube = document.querySelector(".astra-cube");

menu_button.onclick = () => {
    dropdown.classList.toggle("show");
}

document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

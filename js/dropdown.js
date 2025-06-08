const dropdown = document.querySelector(".dropdown");
const menu_button = document.querySelector(".menu-button");

menu_button.onclick = () => {
    dropdown.classList.toggle("show")
}
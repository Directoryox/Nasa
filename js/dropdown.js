const dropdown = document.querySelector(".dropdown");
const menu_button = document.querySelector(".menu-button");

menu_button.onclick = () => {
    dropdown.classList.toggle("show");
};

document.addEventListener("click", (event) => {
    if (event.target !== menu_button) {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    }
});

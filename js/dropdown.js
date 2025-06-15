const dropdown = document.querySelector(".dropdown");
const menu_button = document.querySelector(".menu-button");
const astraCube = document.querySelector(".astra-cube");
let fa_solid = document.querySelector(".fa-solid")

menu_button.onclick = () => {
    dropdown.classList.toggle("show");

    if (dropdown.classList.contains("show")) {
        fa_solid.style.transform = "rotate(180deg)";
    }   
    else {
        fa_solid.style.transform = "rotate(0deg)";
    }
};

document.addEventListener("click", (event) => {
    if (event.target !== menu_button) {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
            fa_solid.style.transform = "rotate(0deg)";
        }
    }
});


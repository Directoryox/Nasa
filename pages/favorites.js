import {getFavorites} from "../storage/favorites.js";
import {removeFavPhoto} from "../storage/favorites.js";

export async function favoritesPage(app) {
    app.innerHTML = `
    <h2>Ваши избранные</h2>
    <p>Идёт загрузка...</p>
    `
    const data = await getFavorites();
    if (data.length !== 0) {
        const favorites = data.map((item) => {
            return `<div><p>${item.title}</p><div class="image-card" style="background-image: url(${item.url})">
        <div class="icon-cover"><i class="fa-solid fa-star"></i></div>
        </div>
        </div>
        `
        }).join('');
        app.innerHTML = `
    <h2>Ваши избранные</h2>
    <div class="favorites">${favorites}</div>
    `

        const favButtons = document.getElementsByClassName('fa-star')
        Array.from(favButtons).forEach((btn, index) => {
            btn.onclick = () => removeFavPhoto(data[index].url, data[index].title);
        })
    } else {
        app.innerHTML = `
        <h2>Ваши избранные</h2>
        <div class="favorites">К сожалению у вас нет избранных фото</div>
        `
    }


}
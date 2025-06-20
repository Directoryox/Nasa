import {getFavorites} from "../storage/favorites.js";
import {removeFavPhoto} from "../storage/favorites.js";

export async function favoritesPage(app) {
    app.innerHTML = `
    <h2>Your favorites</h2>
    <hr>
    <p>Loading, please wait...</p>
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
    <h2>Your favorites</h2>
    <hr>
    <div class="favorites">${favorites}</div>
    `

        document.querySelectorAll('.fa-star').forEach((btn, index) => {
            btn.onclick = () => removeFavPhoto(data[index].url, data[index].title, index);
        })
    } else {
        app.innerHTML = `
        <h2>Your favorites</h2>
    <hr>
        <div class="favorites">You're don't have any favorites</div>
        `
    }
}
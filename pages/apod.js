import {aPOD} from "../services/nasa.js";
import {addFavPhoto} from "../storage/favorites.js";

export async function aPlanetOFDPage(app) {
    const data = await aPOD();
    app.innerHTML = `
    <h2>Просмотр космического фото дня</h2>
    <hr>
    <div class="astra-photo-of-day">
        <div class="image-card" style="background-image: url(${data.url})">
        <div class="icon-cover"><i class="fa-regular fa-star"></i></div>
        
        </div>
        <div class="information">
            <p>${data.title} (${data.date})</p>
            <p>${data.explanation.slice(0, 340)}-</p>
        </div>
            <p class="full-info">${data.explanation.slice(340)}</p>
    </div>
    `
    console.log(data);
    document.getElementsByClassName('fa-star')[0].onclick = () => addFavPhoto(data.url, data.title);
}
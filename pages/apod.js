import {aPOD} from "../services/nasa.js";
import {addFavPhoto} from "../storage/favorites.js";
import {getFavorites} from "../storage/favorites.js";
import {removeFavPhoto} from "../storage/favorites.js";

export async function aPhotoOFDPage(app) {
    const data = await aPOD();
    const favCheck = await getFavorites();
    app.innerHTML = `
    <h2>Astronomy photo of day</h2>
    <hr>
    <div class="astra-photo-of-day">
        <div class="image-card" style="background-image: url(${data.url})">
        <div class="icon-cover"><i class="fa-regular fa-star"></i></div>
        
        </div>
        <div class="information">
            <p>${data.title} (${data.date})</p>
            <p>${data.explanation.slice(0, 370)}-</p>
        </div>
            <p class="full-info">${data.explanation.slice(370)}</p>
    </div>
    `

    const addFavBtn = document.getElementsByClassName('fa-star')[0];
    addFavBtn.onclick = () => addFavPhoto(data.url, data.title, 0);
    if (favCheck.some(fav => fav.url === data.url)) {
        addFavBtn.classList.remove('fa-regular');
        addFavBtn.classList.add('fa-solid');
        addFavBtn.onclick = () => removeFavPhoto(data.url, data.title, 0);
    }
}
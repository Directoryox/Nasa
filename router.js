import {homePage} from "./pages/home.js";
import {aPhotoOFDPage} from "./pages/apod.js";
import {favoritesPage} from "./pages/favorites.js";
import {aboutPage} from "./pages/about.js";
import {asteroidsPage} from "./pages/asteroids.js";
import {exoplanetsPage} from "./pages/exoplanets.js";
import {cosmicWeatherPage} from "./pages/cosmicWeather.js";

const app = document.getElementById('app');

export async function router() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const route = parts[1] || 'home';

    app.style.transition = "opacity 0.5s ease-in-out"; // Это простое плавное затухание. Чуть позже сделаю другое.
    app.style.opacity = "0"

    await new Promise(resolve => setTimeout(resolve, 500));
    switch (route) {
        case 'home': homePage(app); break;
        case 'apod': await aPhotoOFDPage(app); break;
        case 'favorites': await favoritesPage(app); break;
        case 'about': aboutPage(app); break;
        case 'asteroids': await asteroidsPage(app); break;
        case 'exoplanets': await exoplanetsPage(app); break;
        case 'cosmicWeather': await cosmicWeatherPage(app); break;
        default: app.innerHTML = `<h2>Error 404. Page not found</h2>`; break;
    }
    requestAnimationFrame(() => {
        app.style.transition = "opacity 1s ease-in-out";
        app.style.opacity = "1"
    });
}
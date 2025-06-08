import {homePage} from "./pages/home.js";
import {aPlanetOFDPage} from "./pages/apod.js";
import {favoritesPage} from "./pages/favorites.js";
import {aboutPage} from "./pages/about.js";
import {asteroidsPage} from "./pages/asteroids.js";

const app = document.getElementById('app');

export function router() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const route = parts[1] || 'home';

    switch (route) {
        case 'home': homePage(app); break;
        case 'apod': aPlanetOFDPage(app); break;
        case 'favorites': favoritesPage(app); break;
        case 'about': aboutPage(app); break;
        case 'asteroids': asteroidsPage(app); break;
        default: app.innerHTML = `<h2>Error 404. Page not found</h2>`; break;
    }

    app.style.transition = ""; // Это простое плавное затухание. Чуть позже сделаю другое.
    app.style.opacity = "0"
    setTimeout(() => {
        app.style.transition = "opacity 0.5s ease-in-out";
        app.style.opacity = "1";
    }, 50)
}
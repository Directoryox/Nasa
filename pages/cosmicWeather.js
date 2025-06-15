import {getCosmicWeatherData} from "../services/nasa.js";

export function cosmicWeatherPage(app) {
    app.innerHTML = `
    <h2>Это проект о космосе</h2>
    <hr>
    <div class="inputDiv">
    <input id="startDate" placeholder="Start Date"><input id="endDate" placeholder="End Date">
    <select id="selectType">
        <option value="CME">CME</option>
        <option value="GST">Geomagnetic Storm</option>
    </select>
    <button id="showWeather"></button>
    </div>
    `

    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const selectType = document.getElementById('selectType');
    const showWeatherBth = document.getElementById('showWeather');

    flatpickr(startDate, {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });

    flatpickr(endDate, {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });
}
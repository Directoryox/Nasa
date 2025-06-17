import {transformCSV} from '../js/operations.js';

export async function aPOD() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=1AZPGujj69PHctLSrLCCt5B4avSDrMmHGDy2apBY');
    return await response.json();
}

export async function getAsteroids() {
    const response = await fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=1AZPGujj69PHctLSrLCCt5B4avSDrMmHGDy2apBY');
    const data = await response.json();
    return data.near_earth_objects;
}

export const loadExoPlanetsData = (async () => {
    const res = await fetch('/services/preloaded/confirmed_planets.csv')
    const text = await res.text();
    return transformCSV(text);
})

export async function getCosmicWeatherData(startDate, endDate, type) {
    const response = await fetch(`https://api.nasa.gov/DONKI/${type}?startDate=${startDate}&endDate=${endDate}&api_key=1AZPGujj69PHctLSrLCCt5B4avSDrMmHGDy2apBY`);
    return await response.json();
}
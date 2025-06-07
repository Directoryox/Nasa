export async function aPOD() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=1AZPGujj69PHctLSrLCCt5B4avSDrMmHGDy2apBY');
    const data = await response.json();
    return data;
}
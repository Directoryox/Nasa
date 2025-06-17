export function aboutPage(app) {
    app.innerHTML = `
    <h2>About a project</h2>
    <hr>
    <div class="text-page">
    <h2>What is an API?</h2>
    <p>API (Application Programming Interface) - is an interface by which programs can exchange data. There are various APIs. Most of them return JSON, but in our project we had to use CSV data as well</p>
    <p>In our case, we use the NASA API to retrieve data as:</p>
    <ul class="task-list"><li>Daily astronomy photo</li><li>Near asteroids</li><li>Exoplanets</li><li>Space events</li></ul>
    <p>What does the project do and what are its functions?</p>
    <p>A daily photo with a space theme appears on the "Daily photo" page. You can add it to your favorites and see it in your "Favorites"</p>
    <p>The "Asteroids" page displays all asteroids closest to Earth. You can sort them by size and date of discovery</p>
    <p>On the "Exoplanets" page, you can select a star system by clicking on the cube, which will show the star's characteristics and a list of exoplanets belonging to it</p>
    <p>On the "Space Events" page, you can track magnetic storms and solar coronal mass ejections by date</p>
    </div>
    `
}
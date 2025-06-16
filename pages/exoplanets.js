import {loadExoPlanetsData} from "/services/nasa.js";
import {debounce} from "/js/operations.js"

export async function exoplanetsPage(app) {
    app.innerHTML = `
    <div class="system">
        <h2>Search for exoplanets by systems</h2>
    <div class="astra-system">
        <h2>Choose the star</h2>
        <div class="astra-cube">
            <div class="astra-cube-face front">
            <div id="astraSystemContainer"><input id="searchAstraSystem" placeholder="Input a system"><div id="buttonContainer"></div></div>
            </div>
            <div class="astra-cube-face back"></div>
            <div class="astra-cube-face top"></div>
            <div class="astra-cube-face bottom"></div>
        </div>
        <ul class="star-information"></ul>
        </div>
    <div class="exo-planets"></div>
    </div>
    `
    const searchInput = document.getElementById('searchAstraSystem');
    const astraSystemsContainer = document.getElementById('astraSystemContainer')
    const exoPlanets = await loadExoPlanetsData();
    const astraSystems = [...new Set(exoPlanets.map(planet => planet.hostname))];
    const astraCube = document.querySelector(".astra-cube");
    const astraContainer = document.querySelector(".astra-system");

    let currentIndex = 0;
    function loadNextSystems() {
        for (let i = currentIndex; i < currentIndex + 80 && i < astraSystems.length; i++) {
            const button = document.createElement("button");
            button.className = 'astra-system-button';
            button.textContent = astraSystems[i];
            button.onclick = () => showSystem(astraSystems[i]);
            astraSystemsContainer.appendChild(button);
        }``
        currentIndex += 80;
    }

    loadNextSystems();
    astraSystemsContainer.addEventListener('scroll', () => {
        const {scrollTop, scrollHeight, clientHeight} = astraSystemsContainer;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadNextSystems();
        }
    });

    astraCube.onclick = () => {
        astraCube.classList.add("show");
        astraContainer.classList.remove("active");
        astraContainer.querySelector("h2").textContent = "Choose the star";
    };
    document.addEventListener("click", (event) => {
        if (!astraCube.contains(event.target)) {
            astraCube.classList.remove("show");
            astraSystemsContainer.querySelectorAll('.astra-system-button').forEach(button => button.remove());
            currentIndex = 0;
            loadNextSystems();
        }
    });

    const onInput = debounce((e => {
        let input = e.target.value.toLowerCase().trim();
        if (input.length === 0) {
            return;
        }
        const findSystem = astraSystems.find(system => system.toLowerCase() === input);
        if (findSystem) {
            showSystem(findSystem);
        }
    }), 1000);
    searchInput.addEventListener('input', onInput);
}

async function showSystem(astraSystem) {
    const astraContainer = document.querySelector(".astra-system");
    const astraCube = document.querySelector(".astra-cube");
    const exoPlanets = document.querySelector(".exo-planets");
    const exoPlanetsData = await loadExoPlanetsData();
    const filteredPlanets = exoPlanetsData
        .filter(planet => planet.hostname === astraSystem)
        .filter((planet, index, self) => index === self.findIndex(p => p.pl_name === planet.pl_name));
    exoPlanets.innerHTML = '';
    document.querySelector(".star-information").innerHTML = `
        <li>Star Temperature: ${filteredPlanets[0].st_teff || "?"}K</li>
        <li>Star Radius: ${filteredPlanets[0].st_rad || "?"}R☉</li>
        <li>Star Mass: ${filteredPlanets[0].st_mass || "?"}M☉</li>
        <li>Star Age: ${filteredPlanets[0].st_age || "?"}Gyr</li>
    `;

    filteredPlanets.forEach(planet => {
        exoPlanets.innerHTML += `
        <div class="exo-planet-block"><div class="exo-planet"></div>
        <ul class="planet-info">
        <h3>${planet.pl_name}</h3>
        <li>Temperature: ${planet.pl_eqt || "?"}K</li>
        <li>Discovered: ${planet.disc_pubdate}</li>
        <li>${planet.disc_instrument}</li>
        </ul></div>
        `
    })
    astraContainer.querySelector("h2").textContent = filteredPlanets[0].hostname;
    setTimeout(() => {
        astraCube.classList.remove("show");
        astraContainer.classList.add("active");
    }, 10)
}
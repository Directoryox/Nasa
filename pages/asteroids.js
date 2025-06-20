import {getAsteroids} from "../services/nasa.js";

export async function asteroidsPage(app) {
    const asteroids = await getAsteroids();

    render_page(app);
    setup(app, asteroids);
}

function render_page(app) {
    app.innerHTML = `
        <h2>Asteroids</h2>
        <div class="center_bth">
            <button id="filter_size">Filter by size</button>
            <button id="filter_date">Filter by date</button>
        </div>
        <ul id="list"></ul>
    `;
}

function setup(app, asteroids) {
    const ul = document.getElementById("list");
    render(ul, asteroids);

    document.getElementById("filter_size").onclick = () => {
        const sortedAsteroids = sortSize(asteroids);
        render(ul, sortedAsteroids);
    };

    document.getElementById("filter_date").onclick = () => {
        const goodOnes = filterDate(asteroids);
        const sortedAsteroids = sortDate(goodOnes);

        if (sortedAsteroids.length > 0) {
            render(ul, sortedAsteroids);
        } else {
            render_page(app);
            setup(app, asteroids);
            document.getElementById("list").innerHTML = `<li>Ниче не найдено</li>`;
        }
    };
}

function render(listElement, data) {
    listElement.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const min = item.estimated_diameter.meters.estimated_diameter_min.toFixed(1);
        const max = item.estimated_diameter.meters.estimated_diameter_max.toFixed(1);
        const date = item.orbital_data.first_observation_date || "unknown";

        listElement.innerHTML += `
        <li>
            <b>${item.name}</b><br>
            Диаметр: ${min} - ${max} м<br>
            Дата обнаружения: ${date}
        </li>
        `;
    }
}

function sortSize(data) {
    const result = [...data];
    result.sort((a, b) => {
        return b.estimated_diameter.meters.estimated_diameter_max -
            a.estimated_diameter.meters.estimated_diameter_max;
    });
    return result;
}

function filterDate(data) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].orbital_data.first_observation_date) {
            result.push(data[i]);
        }
    }
    return result;
}

function sortDate(data) {
    const result = [...data];
    result.sort((a, b) => {

        if (b.orbital_data.first_observation_date > a.orbital_data.first_observation_date) {
            return 1;
        }

        if (b.orbital_data.first_observation_date < a.orbital_data.first_observation_date) {
            return -1;
        }
        return 0;
    });
    return result;
}

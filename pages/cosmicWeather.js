import {getCosmicWeatherData} from "../services/nasa.js";

export function cosmicWeatherPage(app) {
    app.innerHTML = `
    <h2>Find information about cosmic events</h2>
    <hr>
    <div class="inputDiv">
        <input id="startDate" placeholder="Start Date"><input id="endDate" placeholder="End Date">
        <select id="selectType">
            <option value="CME">Coronal Mass Ejection</option>
            <option value="GST">Geomagnetic Storm</option>
        </select>
        <button id="showWeather">Search</button>
    </div>

    <div id="result"> </div> `

    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const selectType = document.getElementById('selectType');
    const showWeatherBth = document.getElementById('showWeather');
    const result = document.getElementById("result");

    flatpickr(startDate, {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });

    flatpickr(endDate, {
        dateFormat: "Y-m-d",
        maxDate: "today"
    });

    showWeatherBth.addEventListener("click", async () => {
        const type = selectType.value;
        const start = startDate.value;
        const end = endDate.value;

        if (!start || !end) {
            result.innerHTML = "<h2>Please, input dates</h2>";
            return;
        }

        try {
            const get_cosmic = await getCosmicWeatherData(start, end, type);

            const startFilter = new Date(start);
            const endFilter = new Date(end);

            const filtered = get_cosmic.filter(el => {
                const eventStart = new Date(el.startTime);
                return eventStart >= startFilter && eventStart <= endFilter;
            });

            if (!filtered.length) {
                result.innerHTML = "<h2>Nothing found for this period</h2>";
                return;
            }

            result.innerHTML = filtered.map(el => {
                switch (type) {
                    case "CME":
                        return `
                            <div class="event">
                                <h3>ID: ${el.activityID}</h3>
                                <h3>Discovered with: ${el.catalog} </h3>
                                <h3>Started in: ${el.startTime} </h3>
                                <h3>Ended in: ${el.cmeAnalyses?.[0]?.time21_5 || ''}</h3>
                                <h3>Speed: ${el.cmeAnalyses?.[0]?.speed || ''}</h3>
                                <h3 class="text_js">Description: ${el.note || ''}</h3>
                            </div>`;
                    case "GST":
                        return `
                            <div class="event">
                                <h3>ID: ${el.gstID}</h3>
                                <h3>Started in: ${el.startTime}</h3>
                                <h3>Observed time: ${el.allKpIndex?.[0]?.observedTime || ''}</h3>
                                <h3>KP Index: ${el.allKpIndex?.[0]?.kpIndex || ''}</h3>
                                <h3>Source: ${el.allKpIndex?.[0]?.source || ''}</h3>
                            </div>`;
                }
            }).join("");
        }

        catch (error) {
            result.innerHTML = `An error occurred ${error}`;
        }
    });
}
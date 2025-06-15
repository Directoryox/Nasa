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
        <button id="showWeather">Найти</button>
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
            result.innerHTML = "Укажите даты";
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
                result.innerHTML = "Ничего не найдено за тот период";
                return;
            }

            result.innerHTML = filtered.map(el => {
                switch (type) {
                    case "CME":
                        return `
                            <div class="event">
                                <h3>Начало ${el.activityID}</h3>
                                <h3>Инструменты ${el.catalog} </h3>
                                <h3>Стартовое время ${el.startTime} </h3>
                                <h3>Время: ${el.cmeAnalyses?.[0]?.time21_5 || ''}</h3>
                                <h3>Скорость ${el.cmeAnalyses?.[0]?.speed || ''}</h3>
                                <h3 class="text_js">Примечание ${el.note || ''}</h3>
                            </div>`;
                    case "GST":
                        return `
                            <div class="event">
                                <h3>Начало ${el.gstID}</h3>
                                <h3>Стартовое время ${el.startTime}</h3>
                                <h3>Наблюдное время ${el.allKpIndex?.[0]?.observedTime || ''}</h3>
                                <h3>Кп индекс ${el.allKpIndex?.[0]?.kpIndex || ''}</h3>
                                <h3>Источник ${el.allKpIndex?.[0]?.source || ''}</h3>
                            </div>`;
                }
            }).join("");
        }
        
        catch (error) {
            result.innerHTML = `Произошла ошибка ${error}`;
        }
    });
}

export function homePage(app) {
    app.innerHTML = `
    <h2>Space Explorer</h2>
    <hr>
    <div class="text-page">
    <p>Этот проект был создан для того, чтобы показывать космические фото дня. Для просмотра вы можете нажать кнопку ниже.</p>
    <a href="#/apod"></a>
    </div>
    `
}
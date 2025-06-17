const KEY = 'nasa-favorites';
export function addFavPhoto(url, title) {
    const favBtn = document.getElementsByClassName('fa-star')[0];
    favBtn.classList.toggle('fa-regular');
    favBtn.classList.toggle('fa-solid');
    favBtn.onclick = () => removeFavPhoto(url, title);

    const list = getFavorites();
    const exist = list.find(item => item.url === url);
    if (!exist) {
        list.push({url, title});
        localStorage.setItem(KEY, JSON.stringify(list));
    }
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function removeFavPhoto(url, title) {
    const favBtn = document.getElementsByClassName('fa-star')[0];
    favBtn.classList.toggle('fa-regular');
    favBtn.classList.toggle('fa-solid');
    favBtn.onclick = () => addFavPhoto(url, title);

    const list = getFavorites();
    const newList = list.filter(item => item.url !== url);
    localStorage.setItem(KEY, JSON.stringify(newList));
}
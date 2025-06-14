export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function transformCSV(csv) {
    const filterKeys = ['hostname', 'pl_name', 'disc_pubdate', 'pl_eqt', 'disc_instrument', 'st_mass', 'st_teff', 'st_rad', 'st_age']
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const object = {};
        filterKeys.forEach((key) => {
            const index = headers.indexOf(key);
            if (index !== -1) {
                let value = values[index]?.trim() || '';
                if (value.length > 1 && value[0] === '"' && value[value.length - 1] === '"') {
                    value = value.slice(1, -1);
                }
                value = value.replace(/""/g, '"');
                object[key] = value;
            }
        });
        return object;
    });
}
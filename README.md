# Space Explorer – NASA Data Dashboard

Single-page app displaying real NASA space data. Built with vanilla JavaScript and minimal dependencies.

## Features
- **Asteroid Tracker** – filter by size/discovery date (NeoWs API)
- **Space Weather** – solar events with Flatpickr calendar (DONKI API)
- **Exoplanet Explorer** – 3D cube interface with CSV database
- **Daily Space Photos** – NASA's Astronomy Picture of the Day (APOD API)
- **Responsive Navigation** – Font Awesome icons, dropdown menu

## Tech Stack
- **Core:** Vanilla JavaScript (ES6 modules, CSV parsing)
- **APIs:** NASA (APOD, NeoWs, DONKI) + local CSV data
- **External Libraries:**
  - Flatpickr – elegant date selection
  - Font Awesome – icon toolkit
- **Data Sources:**
  - NASA real-time APIs
  - Preloaded CSV: `confirmed_planets.csv` (4,000+ exoplanets)
- **CSS:** 3D transforms, animations, responsive design

## Project Structure

```
Nasa/
├── index.html              # Main HTML file
├── styles.css             # Global styles & 3D animations
├── app.js                 # Application bootstrap
├── router.js              # Client-side hash routing
├── js/                    # Utilities
│   ├── dropdown.js       # Responsive navigation menu
│   ├── lazyLoading.js    # Image performance optimization
│   └── operations.js     # CSV parsing & data transformations
├── pages/                 # Page components
│   ├── about.js          # About page
│   ├── apod.js           # Astronomy Picture of the Day
│   ├── asteroids.js      # Asteroid tracker with filters
│   ├── cosmicWeather.js  # Space weather monitor
│   ├── exoplanets.js     # 3D exoplanet explorer
│   ├── favorites.js      # Saved items page
│   └── home.js           # Landing page
├── services/              # Data layer
│   ├── nasa.js           # NASA API wrapper functions
│   └── favorites.js      # Local storage management
├── storage/               # Storage utilities
├── preloaded/             # Local datasets
    └── confirmed_planets.csv  # Exoplanet database (4,000+)
```

const map = L.map('map').setView([20, 0], 2);

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON from CDN or local
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => {
        const iso = feature.properties.ISO_A3;
        if (visitedCountries[iso]) {
          return { color: "#2e8b57", weight: 1, fillOpacity: 0.7 };
        } else if (wishlistCountries.includes(iso)) {
          return { color: "#f39c12", weight: 1, fillOpacity: 0.5 };
        } else {
          return { color: "#ccc", weight: 1, fillOpacity: 0.2 };
        }
      },
      onEachFeature: (feature, layer) => {
        const iso = feature.properties.ISO_A3;
        if (visitedCountries[iso]) {
          layer.bindPopup(`<strong>${feature.properties.ADMIN}</strong><br>${visitedCountries[iso]}`);
        } else if (wishlistCountries.includes(iso)) {
          layer.bindPopup(`<strong>${feature.properties.ADMIN}</strong><br><em>Wishlist!</em>`);
        }
      }
    }).addTo(map);
  });

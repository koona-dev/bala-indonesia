$(document).ready(function () {
  //------- Google Map  js --------//
  if (document.getElementById("map")) {
    // Initial map position
    const initialLat = 22.286566;
    const initialLng = 114.1445362;
    const initialZoom = 20;

    // Create map
    const map = L.map("map").setView([initialLat, initialLng], initialZoom);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add marker
    const marker = L.marker([initialLat, initialLng])
      .addTo(map)
      .bindPopup(
        `
  <a href="https://www.google.com/maps?q=${initialLat},${initialLng}" 
     target="_blank" 
     style="text-decoration:none;color:blue;">
     Open in Google Maps
  </a>
`
      );

    map.flyTo(marker.getLatLng(), zoomLevel, {
      animate: true,
      duration: 1.5, // seconds
    });

    // Add custom control button for reset
    const resetButton = new L.Control.ResetView({ position: "topRight" });

    resetButton.onAdd = function () {
      const button = L.DomUtil.create(
        "button",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      button.innerHTML = "⟳";
      button.style.background = "white";
      button.style.width = "30px";
      button.style.height = "30px";
      button.style.cursor = "pointer";

      L.DomEvent.on(button, "click", function () {
        map.setView(initialLatLng, 13); // Reset to initial position
      });

      return button;
    };

    resetButton.addTo(map);
  }
});

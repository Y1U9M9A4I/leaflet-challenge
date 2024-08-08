let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url).then(function (data) {
  createFeatures(data.features);
});

// map object created 

let Map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// add tile layer to to map 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(Map);

// data markers should reflect the magnitude of the earthquake 
// by their size and the depth of the earthquake by color. 
// Earthquakes with higher magnitudes should appear larger, 
// and earthquakes with greater depth should appear darker in color.

// add features as indicated above (markers)

function createFeatures(eqdata) {
  L.geoJSON(eqdata, {
    pointlayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 5, 
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
    }
  }).addTo(Map);
}

// color based on depth range 

function getColor(depth) {
  return depth > 90 ?
}
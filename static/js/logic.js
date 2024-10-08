// map object created 

let Map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// add tile layer to to map 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(Map);

// color based on depth range
function getColor(depth) {
  return depth > 90 ? "#FF0000" :
         depth > 70 ? "#FF4500" :
         depth > 50 ? "#FF8c00" :
         depth > 30 ? "#FFD700" :
         depth > 10 ? "#ADFF2F" :
                      "#32CD32";
}

// data markers should reflect the magnitude of the earthquake 
// by their size and the depth of the earthquake by color. 
// Earthquakes with higher magnitudes should appear larger, 
// and earthquakes with greater depth should appear darker in color.

// add features as indicated above (markers)

function createFeatures(eqdata) {
  L.geoJSON(eqdata, {
    pointToLayer: function (feature, latlng) {
      let marker = L.circleMarker(latlng, {
        radius: feature.properties.mag * 5, 
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
      
      marker.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
      return marker;
    }
  }).addTo(Map);
}

// Create a legend using legend control
let legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'info legend');
  let depths = [10, 30, 50, 70, 90];
  div.innerHTML = '<h4>Earthquake Depth</h4>';
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background-color:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }

  return div;
};
legend.addTo(Map);


// fetch eq data + call createfeatures

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function (data) {
  createFeatures(data.features);
});
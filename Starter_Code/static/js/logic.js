let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url).then(function (data) {

    createFeatures(data.features);
});

function createFeatures(eqdata) {
    function onEachFeature(feature,layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    let earthquakes = L.geoJSON(eqdata, {
        onEachFeature: onEachFeature
    });

    function createMap(eqdata){
        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })
        
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          });
        
          let baseMaps = {
            "street map": street,
            "topographic map": top
          };

          let overlayMaps = {
            Earthquakes: earthquakes
          }; 

          let Map = L.map("coordinates",{
            center:[
                37.09, -95.71]
          });

          L.control.layers(baseMaps, overlayMaps, {
            collapsed:false 

          }).addTo(myMap);

          function createMarkers(locat) {
            let coords = response.data.coordinations;

            let coordmarkers =[];

            for (let index=0; index < coords.length; index++) {
                let coord = coord[index];

                let coordmarker = L.marker([coord.lat, coord.lon])
                .bindPopup("<h3>" + title + "<h3><h3>Capacity: " + coord.capacity + "</h3>"); )
                coordmarkers.push[coordmarker];

                createMap(L.layerGroup(coordmarkers))
            }
          }





    }
}

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url).then(data => {
  data.features.forEach(feature => {
    let mag = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];
  })
}
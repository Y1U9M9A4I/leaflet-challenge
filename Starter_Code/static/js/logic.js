let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url).then(data => {

    console.log(data);
    datafeatures(data.features);
});
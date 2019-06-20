export default function handleSaveToPC(locations)
{
    const jsonData = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": locations
              }
          }
        ]
    }
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'locations.geojson';
    link.href = url;
    link.click();
}
import React, {Component} from 'react'
import L from 'leaflet';
import SaveSystem from './Utils/SaveJsonSystem';

class MapComponent extends Component   
{
    state = { 
        latlngs: []
    }
    SetConfig = () => {
        let mymap = L.map('mymap').setView([38.573803, 68.787117], 13);
        
        const { latlngs } = this.state;
        // Adding event listener when click on the map
        mymap.addEventListener('click', (e) => 
        { 
            const { lat, lng } = e.latlng;
            var marker = new L.Marker(e.latlng);
            mymap.addLayer(marker);

            //Adding it to array
            latlngs.push([lat, lng]);
            
            //Drawing line between points
            L.polyline(latlngs, { color: '#F62459' }).addTo(mymap);

            this.setState(latlngs);
        });


        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWlsYWQ0NDA1NTAiLCJhIjoiY2p4NGZvanVwMDk4dTN6bnc4M3phbGhqOCJ9.-FeoXV9ypxx2Kk0uTqaIyA'
        }).addTo(mymap);
    }
    componentDidMount()
    {
        this.SetConfig();
    }
    SaveAsGeoJSON = () => 
    {
        if(this.state.latlngs.length > 0)
            SaveSystem(this.state.latlngs)
        else 
            alert("No points has been selected!")
    }
    render() 
    {   
        return (
            <div>
                <div id="mymap" style={{height:"95vh"}}></div>
                <button onClick={this.SaveAsGeoJSON} type="button" class="btn btn-primary btn-lg btn-block">Save it as GeoJSON</button>
            </div>
        )
    }
}
export default MapComponent;
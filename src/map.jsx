import React, {Component} from 'react'
import L from 'leaflet';
import SaveSystem from './Utils/SaveJsonSystem';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';
import './css/home.css';
import ixon from './images/pegman.png';

class MapComponent extends Component   
{
    humanIcon = L.icon({
        iconUrl: ixon,
        iconSize: [18, 35]
    });
    
    state = { 
        userLocation: {  },
        selectedCoordinates: [ ]
    }

    AddNewCoordinate = (e) => 
    {
        const newPos = [e.latlng.lat, e.latlng.lng];
        this.setState(prevState => (
        {
            selectedCoordinates: prevState.selectedCoordinates.concat([newPos])
        }));

        // const { selectedCoordinates } = this.state;
        // const { lat, lng } = e.latlng;
        
        // selectedCoordinates.push([lat, lng]);

        // this.setState(selectedCoordinates);
    }

    SaveAsGeoJSON = () => 
    {
        if(this.state.selectedCoordinates.length > 0)
            SaveSystem(this.state.selectedCoordinates)
        else 
            alert("No points has been selected!")
    }
    GetUserLocation = () => 
    {
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                this.setState({ userLocation: { lat: latitude, lng: longitude }, zoomLevel: 18 })
            });
        } 
        else 
        {
            alert("Geolocation is not supported by this browser.");
        }
    }
    render() 
    {     
        const { lat, lng } = this.state.userLocation;
        const { selectedCoordinates } = this.state;
        return (
            <div>
                <Map id="map" className="map" onClick={this.AddNewCoordinate} zoom={lat ? 18 : 3} center={lat ? [lat, lng] : [ 30, 0 ]}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { 
                        lat &&
                        <Marker icon={this.humanIcon} position={[ lat, lng ]}/>
                    }
                    
                    {
                        selectedCoordinates.length > 0 &&
                        selectedCoordinates.map((position) => <Marker position={position}/>) 
                    }
                    {
                        selectedCoordinates.length > 1 &&
                        <Polyline color="red" positions={selectedCoordinates} />
                    }
                </Map>
               
                <span id="marker-span">
                    <section id="btns-section">
                        <button className='btn btn-info w-100' onClick={this.GetUserLocation}>  <i className="far fa-compass fa-lg monos"/> Find Me </button>
                        <button className='btn find-me-btn w-100' onClick={this.SaveAsGeoJSON}> Download GeoJSON <i className="fas fa-file-download fa-lg"/> </button>
                    </section>
                    <section>
                        { 
                            selectedCoordinates.length > 0 ? (
                                <React.Fragment>
                                    <h4>Coordinates</h4>
                                    { selectedCoordinates.map((coord) => <p>Longitude: {coord[0]}, Latitude: {coord[1]}</p> )}
                                </React.Fragment>
                            ) 
                            :
                            <h6>No Coordinates has been selected</h6>
                        }
                   </section>
                </span>
            </div>
        )
    }
}
export default MapComponent;
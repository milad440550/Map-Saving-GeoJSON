import React, {Component} from 'react';
import './App.css';
import Map from './map';

class App extends Component {
  state = {
    // latlngs: []
  }

  AddNewPosition = (longitude, latitude) => 
  {
    // let latlngs = this.state.latlngs;
    // latlngs.push([longitude, latitude]);
    
    // this.setState(latlngs);
  }
  render()
  {
      return (
        <div className="App">
          <Map 
            // AddNewPosition={this.AddNewPosition}
            // latlngs={this.state.latslngs}
          />
        </div>
      );
  }
}


export default App;

// const { lng, lat } = e.latlng;
// const { latlngs, AddNewPosition } = this.props;

// leaflet.marker([lat, lng]).addTo(mymap);
// AddNewPosition(lng, lat);
// leaflet.polyline(latlngs, { color: '#FF5757' }).addTo(mymap);
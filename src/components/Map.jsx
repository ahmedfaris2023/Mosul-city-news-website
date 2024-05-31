import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import  React, { Component } from "react";
import './mapContainer.css'; // Import your CSS file

export class MapContainer extends Component {
  render() {
    return (
      <div className="map-container"> {/* Wrapper div for responsiveness */}
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 36.356647,
            lng: 43.164001
          }}
            style={{ width: "60vh", height: "50vh" }}
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHUvB2lypsg_wmLAdvJXZx9tA3l0OWmSc")
})(MapContainer)
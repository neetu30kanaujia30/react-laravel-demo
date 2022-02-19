import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Component} from "react";
import React from 'react';
export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>
                <Marker
                        name={'Current location'} />
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>Test</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyBpBNFP1F6pnUl5pdugOuRLTszt2CCJUyU')
})(MapContainer)

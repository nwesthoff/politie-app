import React, { Component } from "react";
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import styled from "styled-components";

const layerPaint = {
  "heatmap-weight": {
    property: "priceIndicator",
    type: "exponential",
    stops: [[0, 0], [5, 2]]
  },
  "heatmap-intensity": {
    stops: [[0, 0], [5, 1.2]]
  },
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.25,
    "rgb(103,169,207)",
    0.5,
    "rgb(209,229,240)",
    0.8,
    "rgb(253,219,199)",
    1,
    "rgb(239,138,98)",
    2,
    "rgb(178,24,43)"
  ],
  "heatmap-radius": {
    stops: [[0, 1], [5, 50]]
  }
};

const Map = styled(
  ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoibmlsc3dlc3Rob2ZmIiwiYSI6ImNqcDU5bmptMTA2NGYzcm84bWU1MDM5b3gifQ.g48vkOiMRECoKa6uN1EuDA"
  })
)`
  z-index: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.watchId = undefined;

    this.state = {
      agentLocation: [5.9726903, 50.882751000000006],
      zoom: [15],
      meldingen: this.props.meldingen ? Object.values(this.props.meldingen) : []
    };
  }

  componentDidMount = () => {
    this.watchId = navigator.geolocation.watchPosition(
      location => {
        if (location) {
          this.setState({
            agentLocation: [location.coords.longitude, location.coords.latitude]
          });
        }
      },
      e => {
        console.log(e);
      },
      {
        enableHighAccuracy: true
      }
    );
  };
  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchId);
  };

  render() {
    return (
      <Map
        center={this.state.agentLocation}
        zoom={this.state.zoom}
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
      >
        {this.state.agentLocation && (
          <Marker coordinates={this.state.agentLocation}>
            <Mark />
          </Marker>
        )}
        <Layer type="heatmap" paint={layerPaint}>
          {this.state.meldingen.length > 0 &&
            this.state.meldingen
              .filter(melding => {
                return (
                  melding.locatie && melding.locatie.lat && melding.locatie.lng
                );
              })
              .map((melding, index) => (
                <Feature
                  key={index}
                  coordinates={[melding.locatie.lng, melding.locatie.lat]}
                  properties={melding}
                />
              ))}
        </Layer>
      </Map>
    );
  }
}

const Mark = styled.div`
  font-size: 2.4em;

  &:after {
    content: "🚓";
  }
`;

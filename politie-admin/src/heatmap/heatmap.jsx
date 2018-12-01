import React, { Component } from "react";
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

import extrusionLayer from "./threedeelayer";
import heatmapLayer from "./heatmaplayer";

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
      zoom: [13],
      bearing: [0],
      pitch: [45],
      meldingen: this.props.meldingen
        ? Object.values(this.props.meldingen)
        : [],
      detachedCenter: [5.9726903, 50.882751000000006]
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
        center={
          this.state.detachedCenter !== undefined
            ? this.state.detachedCenter
            : this.state.agentLocation
        }
        pitch={this.state.pitch}
        bearing={this.state.bearing}
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
        <Layer
          id="3d-buildings"
          sourceId="composite"
          sourceLayer="building"
          filter={["==", "extrude", "true"]}
          type="fill-extrusion"
          minZoom={14}
          paint={extrusionLayer}
        />
        <Layer type="heatmap" paint={heatmapLayer}>
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

export class Mark extends Component {
  render() {
    return (
      <StyledMark>
        <Grid container direction="column" justify="center">
          <Grid item>🚓</Grid>
          <Grid item>Danny</Grid>
        </Grid>
      </StyledMark>
    );
  }
}

const StyledMark = styled(Mark)`
  font-size: 2.4em;
`;

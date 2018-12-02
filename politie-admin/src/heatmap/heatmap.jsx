import React, { Component } from "react";
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import styled from "styled-components";

import extrusionLayer from "./threedeelayer";
import heatmapLayer from "./heatmaplayer";

const Map = styled(
  ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoibmlsc3dlc3Rob2ZmIiwiYSI6ImNqcDU5bmptMTA2NGYzcm84bWU1MDM5b3gifQ.g48vkOiMRECoKa6uN1EuDA"
  })
)`
  color: black;
`;

export default class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.watchId = undefined;

    this.state = {
      zoom: [13],
      bearing: [0],
      pitch: [30],
      cases: [],
      detachedCenter: undefined,
      fitBounds: null
    };
  }

  getFitBounds = () => {
    let newFitBounds = [
      this.props.agentLocation,
      [this.props.currentMarker.lng, this.props.currentMarker.lat]
    ];

    if (this.props.currentMarker.lng === undefined) {
      newFitBounds = null;
    }

    console.log(newFitBounds);

    this.setState({
      fitBounds: newFitBounds
    });
  };

  componentDidMount() {
    this.getFitBounds();
  }

  render() {
    return (
      <Map
        center={
          this.state.detachedCenter !== undefined
            ? this.state.detachedCenter
            : this.props.agentLocation
        }
        fitBounds={this.state.fitBounds}
        pitch={this.state.pitch}
        bearing={this.state.bearing}
        zoom={this.state.zoom}
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
      >
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
          {Object.values(this.props.cases).length > 0 &&
            Object.values(this.props.cases)
              .filter(melding => {
                return (
                  melding.location &&
                  melding.location.lat &&
                  melding.location.lng
                );
              })
              .map((melding, index) => (
                <Feature
                  key={index}
                  coordinates={[melding.location.lng, melding.location.lat]}
                  properties={melding}
                />
              ))}
        </Layer>
        {this.props.currentMarker.lng && (
          <Marker coordinates={this.props.currentMarker}>
            <MarkTarget />
          </Marker>
        )}

        {this.props.agentLocation && (
          <Marker coordinates={this.props.agentLocation}>
            <MarkPolice />
          </Marker>
        )}
      </Map>
    );
  }
}

const MarkPolice = styled.div`
  font-size: 2.4em;

  &:after {
    content: "👮🏻‍";
  }
`;

const MarkTarget = styled.div`
  font-size: 2.4em;

  &:after {
    content: "😈";
  }
`;

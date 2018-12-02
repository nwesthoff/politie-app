import React, { Component } from "react";
import ReactDOM from "react-dom";
import HeatMap from "./heatmap/heatmap";
import InterfaceOverlay from "./interfaceoverlay/interfaceoverlay";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import fb from "./api/firebase";

const StyledApp = styled.div`
  margin: 0;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agentLocation: this.props.agentLocation || [5.9726903, 50.282751000000006],
      currentMarker: {}
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

  createMarker = (marker, index) => {
    let newMarkerValue = {};

    if (
      marker.lat !== this.state.currentMarker.lat ||
      marker.lng !== this.state.currentMarker.lng
    ) {
      newMarkerValue = marker;
    }

    this.setState({ currentMarker: newMarkerValue, selectedCase: index });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StyledApp>
          <Grid container direction="row">
            <Grid item>
              <InterfaceOverlay
                agentLocation={this.state.agentLocation}
                createMarkerCb={this.createMarker}
                {...this.props}
              />
            </Grid>

            <Grid item style={{ flex: 1 }}>
              <HeatMap
                meldingen={this.props.meldingen}
                cases={this.props.cases}
                agentLocation={this.state.agentLocation}
                currentMarker={this.state.currentMarker}
              />
            </Grid>
          </Grid>
        </StyledApp>
      </MuiThemeProvider>
    );
  }
}

fb.on("value", snapshot => {
  const store = snapshot.val();
  ReactDOM.render(<App {...store} />, document.getElementById("root"));
});

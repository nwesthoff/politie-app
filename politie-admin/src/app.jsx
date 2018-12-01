import React, { Component } from "react";
import ReactDOM from "react-dom";
import HeatMap from "./heatmap/heatmap";
import InterfaceOverlay from "./interfaceoverlay/interfaceoverlay";
import styled from "styled-components";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import fb from "./api/firebase";

const StyledApp = styled.div`
  margin: 0;
`;

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StyledApp>
          <InterfaceOverlay />
          <HeatMap meldingen={this.props.meldingen} />
        </StyledApp>
      </MuiThemeProvider>
    );
  }
}

fb.on("value", snapshot => {
  const store = snapshot.val();
  ReactDOM.render(<App {...store} />, document.getElementById("root"));
});

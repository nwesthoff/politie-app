import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";
import HeatMap from "./heatmap/heatmap";

export default class App extends Component {
  render() {
    return (
      <div>
        <Typography variant="h1">Admin</Typography>
        <HeatMap />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

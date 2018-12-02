import React, { Component } from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import ArchiveIcon from "@material-ui/icons/Archive";
import StoreIcon from "@material-ui/icons/Store";

export default class TypedIcon extends Component {
  render() {
    switch (this.props.type) {
      case "geluidsoverlast":
        return <VolumeUpIcon />;

      case "verdacht persoon":
        return <DirectionsRunIcon />;

      case "verdacht object":
        return <ArchiveIcon />;

      case "winkeldiefstal":
        return <StoreIcon />;

      default:
        return <HelpOutlineIcon />;
    }
  }
}

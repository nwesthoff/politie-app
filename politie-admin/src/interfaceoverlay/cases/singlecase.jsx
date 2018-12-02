import React, { Component } from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

import TypedIcon from "./typedicon";

export default class SingleCase extends Component {
  render() {
    return (
      <ListItem
        button
        dense
        onClick={() => {
          this.props.createMarkerCb(this.props.case.location);
        }}
      >
        <ListItemIcon>
          <TypedIcon type={this.props.case.type} />
        </ListItemIcon>
        <ListItemText
          primary={
            this.props.case.type +
            " (" +
            Math.round(this.props.case.distance / 1000, 2) +
            "km)"
          }
          secondary={"Urgentie: " + Math.round(this.props.case.level * 10, 2)}
        />
      </ListItem>
    );
  }
}

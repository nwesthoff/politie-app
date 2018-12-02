import React, { Component, Fragment } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import geolib from "geolib";

import SingleCase from "./singlecase";

export default class CaseOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cases: this.props.cases || [],
      distanceSortedCases: [],
      casesShown: 5
    };
  }

  componentDidMount = () => {
    this.manipulatedCases();
  };

  manipulatedCases = () => {
    const slicedCases = Object.values(this.state.cases);

    const distanceEnabledCases = slicedCases
      .filter(singleCase => {
        return (
          singleCase.location &&
          singleCase.location.lat &&
          singleCase.location.lng
        );
      })
      .map(singleCase => {
        singleCase.distance = geolib.getDistance(
          {
            latitude: singleCase.location.lat,
            longitude: singleCase.location.lng
          },
          {
            latitude: this.props.agentLocation[1],
            longitude: this.props.agentLocation[0]
          }
        );

        return singleCase;
      });

    const sortedCases = distanceEnabledCases.sort((prevCase, nextCase) => {
      return prevCase.distance - nextCase.distance;
    });

    this.setState({
      distanceSortedCases: sortedCases
    });
  };

  showMoreCases = () => {
    this.setState({
      casesShown: this.state.casesShown + 5
    });
  };

  showFewerCases = () => {
    this.setState({
      casesShown: this.state.casesShown - 5
    });
  };

  render() {
    if (this.props.agentLocation === undefined) {
      return null;
    } else if (
      this.state.distanceSortedCases &&
      this.state.distanceSortedCases.length > 0
    ) {
      return (
        <Grid container direction="column">
          <Grid item>
            <List>
              {this.state.distanceSortedCases.length > 0 &&
                this.state.distanceSortedCases
                  .slice(0, this.state.casesShown)
                  .map((singleCase, index) => (
                    <SingleCase
                      case={singleCase}
                      createMarkerCb={this.props.createMarkerCb}
                      key={index}
                    />
                  ))}
            </List>
          </Grid>
          <Grid item style={{ padding: "0 1.2rem" }}>
            <Grid container spacing={16}>
              <Grid item style={{ flex: 1 }}>
                <Button
                  color="primary"
                  variant="text"
                  fullWidth
                  onClick={this.showMoreCases}
                >
                  <KeyboardArrowDownIcon />
                </Button>
              </Grid>
              <Grid item style={{ flex: 1 }}>
                <Button
                  color="primary"
                  variant="text"
                  fullWidth
                  onClick={this.showFewerCases}
                >
                  <KeyboardArrowUpIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <List>
          <ListItem>
            <ListItemText primary="There are no cases to display" />
          </ListItem>
        </List>
      );
    }
  }
}

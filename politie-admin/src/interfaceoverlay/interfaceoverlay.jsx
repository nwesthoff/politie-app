import React, { Component } from "react";
import { Drawer, List, Divider, ListSubheader } from "@material-ui/core";
import styled from "styled-components";

import CaseOverview from "./cases/caseoverview";

const StyledInterfaceOverlay = styled.div`
  position: relative;
  z-index: 1;
`;

export default class InterfaceOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: true
    };
  }

  render() {
    return (
      <StyledInterfaceOverlay>
        <Drawer variant="permanent" anchor="left">
          <List>
            <ListSubheader>Cases</ListSubheader>
            <CaseOverview
              agentLocation={this.props.agentLocation}
              cases={this.props.cases}
              createMarkerCb={this.props.createMarkerCb}
            />
            <Divider />
          </List>
        </Drawer>
      </StyledInterfaceOverlay>
    );
  }
}

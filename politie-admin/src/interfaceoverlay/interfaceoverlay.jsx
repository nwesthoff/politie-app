import React, { Component } from "react";
import {
  Divider,
  Typography,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import styled from "styled-components";

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

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <StyledInterfaceOverlay>
        <Drawer variant="permanent" anchor="left">
          <List>
            {["Route", "Acties", "Meldingen"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </StyledInterfaceOverlay>
    );
  }
}

import React, { Component } from "react";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import ConnectedParticipant from "./BuisnessMemberInfoTab/ConnectedParticipant";
import PaymentRequest from "./BuisnessMemberInfoTab/PaymentRequest";
import PropTypes from "prop-types";
import "./buisness.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default class BuisnessMemberInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  componentWillMount() {}

  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    return (
      <div className="participantTab">
        <AppBar position="static">
          <Tabs
            variant="scrollable"
            indicatorColor="primary"
            className="tab-appbar"
            style={{ color: "black" }}
            value={this.state.value}
            onChange={this.handleTabs}
            aria-label="simple tabs example"
          >
            <Tab
              className="tab"
              label="Connected Participants"
              {...a11yProps(0)}
            />
            <Tab className="tab" label="Payment Requests" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ConnectedParticipant id={this.props.storeId} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <PaymentRequest id={this.props.id} />
        </TabPanel>
      </div>
    );
  }
}

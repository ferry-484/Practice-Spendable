import React, { Component } from "react";
import "./supporter.css";
import AdminSupporter from "./AdminSupporter";
import GuardianSupporter from "./GuardianSupporter";
export default class Supporter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "ADMIN" ? (
          <AdminSupporter />
        ) : (
          <GuardianSupporter />
        )}
      </div>
    );
  }
}

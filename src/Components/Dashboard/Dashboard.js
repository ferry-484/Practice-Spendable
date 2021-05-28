import React, { Component } from "react";
import AdminDashboard from "./AdminDashboard";
import GuardianDashboard from "./GuardianDashboard";
import "./dashboard.css";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "ADMIN" ? (
          <AdminDashboard />
        ) : (
          <GuardianDashboard />
        )}
      </div>
    );
  }
}

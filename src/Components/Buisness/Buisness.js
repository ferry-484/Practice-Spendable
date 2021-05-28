import React, { Component } from "react";
import AdminBuisness from "./AdminBuisness";
import "./buisness.css";
import GuardianBuisness from "./GuardianBuisness";

export default class Buisness extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "ADMIN" ? (
          <AdminBuisness />
        ) : (
          <GuardianBuisness />
        )}
      </div>
    );
  }
}

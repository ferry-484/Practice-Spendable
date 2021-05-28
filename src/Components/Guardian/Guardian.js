import React, { Component } from "react";
import AdminGuardian from "./AdminGuardian";
import "./guardian.css";

export default class Buisness extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "ADMIN" ? <AdminGuardian /> : ""}
      </div>
    );
  }
}

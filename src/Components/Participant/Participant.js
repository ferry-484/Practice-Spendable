import React, { Component } from "react";
import GuardianParticipant from "./GuardianParticipant";
import AdminParticipant from "./AdminParticipant";
import "./participant.css";
export default class Participant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "GUARDIAN" ? (
          <GuardianParticipant />
        ) : (
          <AdminParticipant />
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "./addBuisness.css";
export default class DocumentVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Document Verification</h3>
        <div>
          <TextField
            value={this.state.documentName}
            //   variant="outlined"
            margin="normal"
            id="documentName"
            name="documentName"
            placeholder="Document Name"
            onChange={this.handleChange}
            // helperText={this.state.errors.email ? this.state.errors.email : ""}
          />
        </div>
      </div>
    );
  }
}

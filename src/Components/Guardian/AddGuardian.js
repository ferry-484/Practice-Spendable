import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import swal from "sweetalert";
import { fetchMethod } from "../../FetchMethod";
import { saveUserdata } from "./GuardianQuery";
import { addGuardianConfig } from "./GuardianConfig";
import "./addGuardian.css";
export default class AddGuardian extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeForm = () => {
    this.props.history.push("/guardians");
  };

  preSubmitChanges = e => {
    e["active"] = 1;
    e["role"] = "GUARDIAN";
    e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    fetchMethod(saveUserdata, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id = response.data.saveUserdata;
        if (id && id !== null) {
          swal({ text: "Guardian added successfully", icon: "success" });
          this.props.history.push("/guardians");
        } else if (id === null) {
          swal("Email already exists", { icon: "error" });
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/guardians");
        }
      });
    return false;
  };

  render() {

    return (
      <div className="addGuardianSection">
        <h3>Add Guardian</h3>
        <FormComponent
          formConfig={addGuardianConfig}
          preSubmitChanges={this.preSubmitChanges}
          buttonTitleCSS="guardianButton"
          modalCloseCallback={() => { }}
          closeButton={this.closeForm}
        />
      </div>
    );
  }
}

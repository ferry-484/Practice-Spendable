import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { fetchMethod } from "../../FetchMethod";
import { saveUserdata } from "./GuardianQuery";
import { addGuardianParticipantConfig } from "./GuardianConfig";
import swal from "sweetalert";
import "./addGuardian.css";
export default class AddGuardianParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeForm = () => {
    this.props.history.push("/guardians");
  };

  preSubmitChanges = e => {
    e["guardianId"] = this.props.location.state.id;
    e["active"] = 1;
    e["role"] = "PARTICIPANT";
    e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;

    fetchMethod(saveUserdata, { obj: e })
      .then(res => res.json())

      .then(response => {
        const id = response.data.saveUserdata;
        if (id && id !== null) {
          swal({ text: "Participant added successfully", icon: "success" });
          this.props.history.push("/guardians");
        } else if (id === null) {
          swal("Email already exists", { icon: "error" });
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/guardians");
        }
      });
    // .then(response => {

    //   const id = response.data.saveUserdata.id;
    //   if (id) {
    //     swal({ text: "Participant added successfully", icon: "success" });
    //     this.props.history.push("/guardians");
    //   }
    // });
    return false;
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          <div className="addGuardianParticipantSection">
            <h3>Add Guardian Participant</h3>
            <FormComponent
              formConfig={addGuardianParticipantConfig}
              preSubmitChanges={this.preSubmitChanges}
              buttonTitleCSS="GuaridanParticipantSaveButton"
              modalCloseCallback={() => {}}
              closeButton={this.closeForm}
            />
          </div>
        ) : (
          this.props.history.push("/guardians")
        )}
      </div>
    );
  }
}

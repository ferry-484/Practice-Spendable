import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import {
  addGuardianParticipantConfig,
  editGuardianParticipantConfig
} from "./GuardianConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { editGuardianPaticipantInfo, saveUserdata } from "./GuardianQuery";
import "./addGuardian.css";
export default class EditGuardianParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableData: undefined
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.editGuardianParticipantData(this.props.location.state.details);
    }
  }

  editGuardianParticipantData = id => {
    fetchMethod(editGuardianPaticipantInfo(id))
      .then(res => res.json())
      .then(res => {
        this.setState({
          editableData: res.data.allUserdata.Userdata[0]
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/guardians");
      });
  };

  closeForm = () => {
    this.props.history.push("/guardians");
  };

  preSubmitChanges = e => {
    e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    fetchMethod(saveUserdata, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id = response.data.saveUserdata.id;
        if (id) {
          swal({
            text: "Participant updated successfully",
            icon: "success"
          });
          this.props.history.push("/guardians");
        }
      });
    return false;
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.editableData !== undefined ? (
            <div className="addGuardianParticipantSection">
              <h3>Edit Guardian Participant</h3>
              <FormComponent
                editableData={this.state.editableData}
                formConfig={editGuardianParticipantConfig}
                preSubmitChanges={this.preSubmitChanges}
                buttonTitleCSS="GuaridanParticipantSaveButton"
                modalCloseCallback={() => {}}
                closeButton={this.closeForm}
              />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/guardians")
        )}
      </div>
    );
  }
}

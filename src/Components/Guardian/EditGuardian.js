import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addGuardianConfig, editGuardianConfig } from "./GuardianConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { allGuardianData, saveUserdata } from "./GuardianQuery";
import "./addGuardian.css";
export default class EditGuardian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableData: undefined
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.editGuardianData(this.props.location.state.details);
    }
  }

  editGuardianData = id => {
    fetchMethod(allGuardianData(id))
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
        const id = response.data.saveUserdata;
        if (id && id !== null) {
          swal({ text: "Guardian updated successfully", icon: "success" });
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
      <div>
        {this.props.location.state !== undefined ? (
          this.state.editableData !== undefined ? (
            <div className="addGuardianSection">
              <h3>Edit Guardian</h3>
              <FormComponent
                editableData={this.state.editableData}
                // formConfig={addGuardianConfig}
                formConfig={editGuardianConfig}
                preSubmitChanges={this.preSubmitChanges}
                buttonTitleCSS="guardianButton"
                modalCloseCallback={() => { }}
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

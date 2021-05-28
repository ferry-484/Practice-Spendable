import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addBuisnessMemberConfig } from "./BuisnessConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { saveUserdata } from "./BuisnessQuery";
import "./addBuisness.css";
export default class AddBuisnessMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeForm = () => {
    this.props.history.push("/buisnessMember");
  };

  preSubmitChanges = e => {
    e["role"] = "BUSINESSMEMBER";
    e["businessId"] = this.props.location.state.id;
    e["active"] = 1;
    e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;

    fetchMethod(saveUserdata, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id = response.data.saveUserdata;
        if (id && id !== null) {
          swal({
            text: "Buisness Member added successfully",
            icon: "success"
          });
          this.props.history.push("/buisness");
        } else if (id === null) {
          swal("Email already exists", { icon: "error" });
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/buisness");
        }
      });
    return false;
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          <div className="addBuisnessMemberSection">
            <h3>Add Business Member</h3>
            <FormComponent
              formConfig={addBuisnessMemberConfig}
              preSubmitChanges={this.preSubmitChanges}
              buttonTitleCSS="buisnessMemberSaveButton"
              modalCloseCallback={() => {}}
              closeButton={this.closeForm}
            />
          </div>
        ) : (
          this.props.history.push("/buisness")
        )}
      </div>
    );
  }
}

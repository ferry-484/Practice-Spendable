import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import {
  addBuisnessMemberConfig,
  editBuisnessMemberConfig
} from "./BuisnessConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { editBusinessesMemberInfo, saveUserdata } from "./BuisnessQuery";
import "./addBuisness.css";
export default class EditBuisnessMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableMemberData: undefined
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.editBuisnessMemberData(this.props.location.state.details);
    }
  }

  editBuisnessMemberData = id => {
    fetchMethod(editBusinessesMemberInfo(id))
      .then(res => res.json())
      .then(res => {
        this.setState({
          editableMemberData: res.data.allUserdata.Userdata[0]
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/buisness");
      });
  };

  closeForm = () => {
    this.props.history.push("/buisness");
  };

  preSubmitChanges = e => {
    e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    fetchMethod(saveUserdata, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id = response.data.saveUserdata;
        if (id && id !== null) {
          swal({
            text: "Buisness Member updated successfully",
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
          this.state.editableMemberData !== undefined ? (
            <div className="addBuisnessMemberSection">
              <h3>Edit Business Member</h3>
              <FormComponent
                editableData={this.state.editableMemberData}
                formConfig={editBuisnessMemberConfig}
                preSubmitChanges={this.preSubmitChanges}
                buttonTitleCSS="buisnessMemberSaveButton"
                modalCloseCallback={() => {}}
                closeButton={this.closeForm}
              />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/buisnessMember")
        )}
      </div>
    );
  }
}

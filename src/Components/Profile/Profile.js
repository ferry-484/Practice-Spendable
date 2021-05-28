import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { profileConfig, changePasswordConfig } from "./ProfileConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  editProfileData,
  saveUserdata,
  UserdataChangePassword,
  getCardDetailsQuery,
  updateBankDetail
} from "./ProfileQuery";
import Grid from "@material-ui/core/Grid";
import "./profile.css";
import { from } from "zen-observable";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableData: undefined,
      cardno: undefined,
      cardId: undefined
    };
  }

  componentWillMount() {
    this.profileData();
  }

  profileData = () => {
    fetchMethod(
      editProfileData(JSON.parse(localStorage.getItem("userInfo")).id)
    )
      .then(res => res.json())
      .then(res => {
        fetchMethod(getCardDetailsQuery, {
          where: { userId: JSON.parse(localStorage.getItem("userInfo")).id }
        })
          .then(resp => resp.json())
          .then(resp => {
            res.data.allUserdata.Userdata[0].cardNumber = resp.data
              .allCardDetails.CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].cardNumber
              : "";
            this.setState({
              editableData: res.data.allUserdata.Userdata[0],
              cardno: resp.data.allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].cardNumber
                : "",
              cardId: resp.data.allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].id
                : ""
            });
          });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  preSubmitChanges = e => {
    if (e.cardNumber) {
      fetchMethod(getCardDetailsQuery, { where: { cardNumber: e.cardNumber } })
        .then(res => res.json())
        .then(response => {
          if (
            response.data.allCardDetails.CardDetails.length > 0 &&
            this.state.cardno != e.cardNumber
          ) {
            swal({ title: "card already exist.", icon: "warning" });
            return false;
          } else {
            let cardnumber = e.cardNumber;
            e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            delete e.email;
            delete e.cardNumber;
            fetchMethod(saveUserdata, { obj: e })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveUserdata;
                if (id && id !== null) {
                  let Obj = {
                    obj: {
                      userId: id.id,
                      cardNumber: cardnumber,
                      createdAt: Date.now(),
                      cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1
                    }
                  };

                  if (this.state.cardId) {
                    Obj.obj.id = this.state.cardId;
                  }
                  fetchMethod(updateBankDetail, Obj)
                    .then(response => response.json())
                    .then(res => {
                      // setLoading(false);
                      // console.log("res _updateBankDetail => ", res);
                      // navigation.navigate("Profile");
                    })
                    .catch(e => {
                      // setLoading(false);
                      // alert(e);
                      // console.log("_updateBankDetail error ", e);
                    });

                  swal({
                    text: "Profile updated successfully",
                    icon: "success"
                  });
                  this.profileData();
                } else if (id === null) {
                  swal("Email already exists", { icon: "error" });
                } else {
                  swal("Please try again", { icon: "error" });
                }
              });
            return false;
          }
        });
    } else {
      e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      delete e.email;
      delete e.cardNumber;
      fetchMethod(saveUserdata, { obj: e })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveUserdata;
          if (id && id !== null) {
            swal({ text: "Profile updated successfully", icon: "success" });
          } else if (id === null) {
            swal("Email already exists", { icon: "error" });
          } else {
            swal("Please try again", { icon: "error" });
          }
        });
      return false;
    }
  };

  preSubmitChangesPassword = e => {
    delete e.confirmPassword;

    fetchMethod(UserdataChangePassword, {
      id: JSON.parse(localStorage.getItem("userInfo")).id,
      oldPassword: e.oldPassword,
      newPassword: e.newPassword
    })
      .then(res => res.json())
      .then(response => {
        const id = response.data.UserdataChangePassword;
        if (id === null) {
          swal({
            title: "Password updated successfully",
            icon: "success"
          }).then(data => {
            if (data || data === null) {
              localStorage.clear();
              window.location = "/";
            }
          });
        } else {
          swal("Please try again", { icon: "error" });
        }
      });
    return false;
  };

  render() {
    return (
      <div>
        {this.state.editableData !== undefined ? (
          <div className="profilemodifySection">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <h3>Edit Profile</h3>
                <FormComponent
                  formConfig={profileConfig}
                  editableData={this.state.editableData}
                  preSubmitChanges={this.preSubmitChanges}
                  buttonTitleCSS="salesbottomAction"
                  modalCloseCallback={() => {}}
                  continueButton="Update Profile"
                />
              </Grid>
              <Grid item xs={6}>
                <h3>Change Password</h3>
                <FormComponent
                  formConfig={changePasswordConfig}
                  buttonTitleCSS="salesbottomAction"
                  modalCloseCallback={() => {}}
                  preSubmitChanges={this.preSubmitChangesPassword}
                  continueButton="Update Password"
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Profile;

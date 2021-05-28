import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import {
  addGuardianParticipantConfig,
  addAdminParticipantConfig,
  editGuardianParticipantConfig,
  editAdminParticipantConfig
} from "./ParticipantConfig";
import { fetchMethod } from "../../FetchMethod";
import moment from "moment";
import swal from "sweetalert";
import {
  editParticipantData,
  saveUserdata,
  guardianDropdownData,
  getCardDetailsQuery,
  updateBankDetail,
  allcardtypes
} from "./ParticipantQuery";
import "./addParticipant.css";
export default class EditPaticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardid: undefined,
      editableData: undefined,
      guardianName: undefined,
      cardtypeOptions: undefined,
      cardnumber: undefined
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.editParticipantData(this.props.location.state.details);
      const filter = {
        where: {
          role: "GUARDIAN",
          active: 1,
          order: "firstname asc"
        }
      };
      fetchMethod(guardianDropdownData, filter)
        .then(res => res.json())
        .then(res => {
          return res !== undefined && res.data.allUserdata !== undefined
            ? this.setState({
                guardianName: res.data.allUserdata.Userdata.map(item => {
                  return {
                    id: item.id,
                    name: item.firstname.concat(
                      item.lastname !== null ? " " + item.lastname : ""
                    )
                  };
                })
              })
            : "";
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
        });

      fetchMethod(allcardtypes)
        .then(res => res.json())
        .then(res => {
          return res !== undefined && res.data.allCardtypes !== undefined
            ? this.setState({
                cardtypeOptions: res.data.allCardtypes.Cardtypes.map(item => {
                  return {
                    id: item.id,
                    name: item.cardtype
                  };
                })
              })
            : "";
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
        });
    }
  }

  editParticipantData = id => {
    fetchMethod(editParticipantData(id))
      .then(res => res.json())
      .then(res => {
        let data = res.data.allUserdata.Userdata[0];
        data.guardianId =
          data.userguardianidmaprel.Userdata.length > 0
            ? {
                id: data.userguardianidmaprel.Userdata[0].id,
                name: data.userguardianidmaprel.Userdata[0].firstname.concat(
                  data.userguardianidmaprel.Userdata[0].lastname !== null
                    ? " " + data.userguardianidmaprel.Userdata[0].lastname
                    : ""
                )
              }
            : null;

        if (localStorage.getItem("role") === "ADMIN") {
          fetchMethod(getCardDetailsQuery, {
            where: { userId: id }
          })
            .then(resp => resp.json())
            .then(resp => {
              res.data.allUserdata.Userdata[0].BSB = resp.data.allCardDetails
                .CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].bsb
                : "";
              res.data.allUserdata.Userdata[0].cardNumber = resp.data
                .allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].cardNumber
                : "";
              res.data.allUserdata.Userdata[0].accNo = resp.data.allCardDetails
                .CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].accountnumber
                : "";

              res.data.allUserdata.Userdata[0].cardtypeid =
                resp.data.allCardDetails.CardDetails[0] &&
                resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                  .Cardtypes[0]
                  ? {
                      id:
                        resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                          .Cardtypes[0].id,
                      name:
                        resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                          .Cardtypes[0].cardtype
                    }
                  : null;

              res.data.allUserdata.Userdata[0].holdername = resp.data
                .allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].accountname
                : "";
              this.setState({
                cardid: resp.data.allCardDetails.CardDetails[0]
                  ? resp.data.allCardDetails.CardDetails[0].id
                  : undefined,
                editableData: res.data.allUserdata.Userdata[0],
                cardnumber: resp.data.allCardDetails.CardDetails[0]
                  ? resp.data.allCardDetails.CardDetails[0].cardNumber
                  : ""
              });
            });
        } else {
          this.setState({
            editableData: res.data.allUserdata.Userdata[0]
            // cardnumber: resp.data.allCardDetails.CardDetails[0]
            //   ? resp.data.allCardDetails.CardDetails[0].cardNumber
            //   : ""
          });
        }
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/participants");
      });
  };

  closeForm = () => {
    this.props.history.push("/participants");
  };

  preSubmitChanges = e => {
    // if (e.expirydate) {
    //   if (e.expirydate.length > 7) {
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //   }

    //   let expDateM = null;
    //   if (e.expirydate) {
    //     expDateM = `01/${e.expirydate}`;
    //   }
    //   console.log("expDateM", expDateM);

    //   let GettedMonth = 0;
    //   let CurrMonth = moment(new Date()).month() + 1;
    //   if (expDateM) {
    //     GettedMonth = moment(expDateM, "DD/MM/YYYY").month() + 1;
    //   }
    //   console.log("GettedMonth", GettedMonth, " CurrMonth", CurrMonth);

    //   let Gettedyear = 0;
    //   let Curryear = moment(new Date()).year();
    //   if (expDateM) {
    //     Gettedyear = moment(expDateM, "DD/MM/YYYY").year();
    //   }
    //   console.log("Gettedyear", Gettedyear, " Curryear", Curryear);

    //   let yearOkay = true;
    //   let monthOkay = true;

    //   if (Gettedyear && Gettedyear < Curryear) {
    //     yearOkay = false;
    //   }
    //   if (Gettedyear == Curryear && GettedMonth <= CurrMonth) {
    //     monthOkay = false;
    //   } else if (
    //     e.expirydate &&
    //     (String(e.expirydate).length < 7 || !String(e.expirydate).includes("/"))
    //   ) {
    //     console.log("inside alert  of e;lse if  string 7");
    //     swal({ title: "please fill valid exp date.", icon: "warning" });
    //     // alert("please fill valid exp date.");
    //     return;
    //   } else if (!yearOkay || (yearOkay && !monthOkay)) {
    //     if (!yearOkay) {
    //       console.log("inside alert  year okayh");
    //       swal({ title: "Enter valid year", icon: "warning" });
    //       // alert("Enter valid year");
    //       return;
    //     }

    //     if (yearOkay && !monthOkay) {
    //       console.log("inside alert  valid mionoth");
    //       swal({ title: "Enter valid month", icon: "warning" });
    //       // alert("Enter valid month");
    //       return;
    //     }
    //   } else if (isNaN(GettedMonth) || GettedMonth == 0) {
    //     console.log("inside alert  *********************** mionoth");
    //     swal({ title: "Enter valid month", icon: "warning" });
    //     // alert("Enter valid month");
    //     return;
    //   } else if (isNaN(Gettedyear) || Gettedyear == 0) {
    //     console.log(
    //       "inside alert  *******gettted yearl;;;;;;;;;;;;;**************** mionoth"
    //     );
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //     // alert("Enter valid year");
    //     // return;
    //   } else if (e.expirydate.length > 7) {
    //     console.log("*********yyyyyyyyyyyyyyy");
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //   } else if (!e.expirydate.includes("/")) {
    //     console.log("ejejjejee");
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //   }
    // }

    if (e.cardNumber) {
      fetchMethod(getCardDetailsQuery, { where: { cardNumber: e.cardNumber } })
        .then(res => res.json())
        .then(response => {
          if (
            response.data.allCardDetails.CardDetails.length > 0 &&
            this.state.cardnumber !== e.cardNumber
          ) {
            swal({ title: "card already exist.", icon: "warning" });
            return false;
          } else {
            let userObj = {
              id: this.props.location.state.details,
              firstname: e.firstname,
              lastname: e.lastname,
              dob: e.dob,
              email: e.email,
              phonenumber: e.phonenumber,
              address: e.address,
              city: e.city,
              state: e.state,
              country: e.country,
              zipcode: e.zipcode,
              updatedby: JSON.parse(localStorage.getItem("userInfo")).id
            };

            if (localStorage.getItem("role") === "GUARDIAN") {
              e.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
            }
            e.guardianId = e.guardianId === null ? null : e.guardianId.id;
            delete e.userguardianidmaprel;
            userObj.guardianId = e.guardianId;
            // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            fetchMethod(saveUserdata, { obj: userObj })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveUserdata;
                if (id && id !== null) {
                  if (localStorage.getItem("role") === "ADMIN") {
                    let Obj = {
                      obj: {
                        // id: this.state.cardid,
                        userId: id.id,
                        // userId: userInfo.id,
                        // businessId: id.id,
                        // id: CardID ? CardID : null,
                        cvc: e.cvv,
                        expiryDate: e.expirydate,
                        cardNumber: e.cardNumber,
                        createdAt: Date.now(),
                        accountname: e.holdername,
                        accountnumber: e.accNo,
                        bsb: e.BSB,
                        cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1,
                        cardstatus: "0"
                      }
                    };
                    if (this.state.cardid) {
                      Obj.obj.id = this.state.cardid;
                    }
                    if (
                      e.cvv ||
                      e.expirydate ||
                      e.cardNumber ||
                      e.holdername ||
                      e.accNo ||
                      e.BSB ||
                      e.cardtypeid
                    ) {
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
                    }
                  }
                  swal({
                    text: "Participant updated successfully",
                    icon: "success"
                  });
                  this.props.history.push("/participants");
                } else if (id === null) {
                  swal("Email already exists", { icon: "error" });
                } else {
                  swal("Please try again", { icon: "error" });
                  this.props.history.push("/participants");
                }
              });
            return false;
          }
        });
    } else {
      let userObj = {
        id: this.props.location.state.details,
        firstname: e.firstname,
        lastname: e.lastname,
        dob: e.dob,
        email: e.email,
        phonenumber: e.phonenumber,
        address: e.address,
        city: e.city,
        state: e.state,
        country: e.country,
        zipcode: e.zipcode,
        updatedby: JSON.parse(localStorage.getItem("userInfo")).id
      };

      if (localStorage.getItem("role") === "GUARDIAN") {
        e.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
      }
      e.guardianId = e.guardianId === null ? null : e.guardianId.id;
      delete e.userguardianidmaprel;
      userObj.guardianId = e.guardianId;
      // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      fetchMethod(saveUserdata, { obj: userObj })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveUserdata;
          if (id && id !== null) {
            if (localStorage.getItem("role") === "ADMIN") {
              let Obj = {
                obj: {
                  // id: this.state.cardid,
                  userId: id.id,
                  // userId: userInfo.id,
                  // businessId: id.id,
                  // id: CardID ? CardID : null,
                  cvc: e.cvv,
                  expiryDate: e.expirydate,
                  cardNumber: e.cardNumber,
                  createdAt: Date.now(),
                  accountname: e.holdername,
                  accountnumber: e.accNo,
                  bsb: e.BSB,
                  cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1,
                  cardstatus: "0"
                }
              };
              if (this.state.cardid) {
                Obj.obj.id = this.state.cardid;
              }
              if (
                e.cvv ||
                e.expirydate ||
                e.cardNumber ||
                e.holdername ||
                e.accNo ||
                e.BSB ||
                e.cardtypeid
              ) {
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
              }
            }
            swal({ text: "Participant updated successfully", icon: "success" });
            this.props.history.push("/participants");
          } else if (id === null) {
            swal("Email already exists", { icon: "error" });
          } else {
            swal("Please try again", { icon: "error" });
            this.props.history.push("/participants");
          }
        });
      return false;
    }
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.editableData !== undefined &&
          this.state.guardianName !== undefined &&
          this.state.cardtypeOptions != undefined ? (
            <div className="addParticipantSection">
              <h3>Edit Participant</h3>
              <FormComponent
                editableData={this.state.editableData}
                // formConfig={
                //   localStorage.getItem("role") === "ADMIN"
                //     ? addAdminParticipantConfig
                //     : addGuardianParticipantConfig
                // }
                formConfig={
                  localStorage.getItem("role") === "ADMIN"
                    ? editAdminParticipantConfig
                    : editGuardianParticipantConfig
                }
                preSubmitChanges={this.preSubmitChanges}
                buttonTitleCSS="salesbottomAction"
                modalCloseCallback={() => {}}
                closeButton={this.closeForm}
                params={{
                  guardiansOptions: this.state.guardianName,
                  cardtypeOptions: this.state.cardtypeOptions
                }}
              />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/participants")
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import moment from "moment";
import FormComponent from "../../Form/FormComponent";
import {
  addGuardianParticipantConfig,
  addAdminParticipantConfig
} from "./ParticipantConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  saveUserdata,
  guardianDropdownData,
  updateBankDetail,
  allcardtypes,
  getCardDetailsQuery
} from "./ParticipantQuery";
import "./addParticipant.css";
export default class AddPaticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guardianName: undefined,
      cardtypeOptions: undefined
    };
  }

  componentWillMount() {
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

  closeForm = () => {
    this.props.history.push("/participants");
  };

  preSubmitChanges = e => {
    // if (e.expirydate) {
    //   console.log("EEEEEEEEEEEEEe aaya ya ni aaya", e.expirydate.length);
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
          if (response.data.allCardDetails.CardDetails.length > 0) {
            swal({ title: "card already exist.", icon: "warning" });
            return false;
          } else {
            let userObj = {
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
              active: 1,
              role: "PARTICIPANT",
              createdby: JSON.parse(localStorage.getItem("userInfo")).id,
              updatedby: JSON.parse(localStorage.getItem("userInfo")).id
            };
            // e["active"] = 1;
            // e["role"] = "PARTICIPANT";
            if (localStorage.getItem("role") === "GUARDIAN") {
              e["guardianId"] = JSON.parse(localStorage.getItem("userInfo")).id;
              // var filterdata = this.state.filter;
              // filterdata.createdBy = JSON.parse(localStorage.getItem("userInfo")).id;
              // this.setState({
              //   filter: filterdata
              // });
            }

            // e["guardianId"] = JSON.parse(localStorage.getItem("userInfo")).id;

            e["guardianId"] =
              e.guardianId === null
                ? null
                : typeof e["guardianId"] == "object"
                ? e.guardianId.id
                : (e["guardianId"] = JSON.parse(
                    localStorage.getItem("userInfo")
                  ).id);
            // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            userObj.guardianId = e.guardianId;
            // console.log("EDDDDDDDDDDDDDDDDDDD", userObj);
            fetchMethod(saveUserdata, { obj: userObj })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveUserdata;

                if (id && id !== null) {
                  if (localStorage.getItem("role") === "ADMIN") {
                    // return;

                    let Obj = {
                      obj: {
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
                        cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1
                      }
                    };

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
                    text: "Participant added successfully",
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
        active: 1,
        role: "PARTICIPANT",
        createdby: JSON.parse(localStorage.getItem("userInfo")).id,
        updatedby: JSON.parse(localStorage.getItem("userInfo")).id
      };
      // e["active"] = 1;
      // e["role"] = "PARTICIPANT";
      if (localStorage.getItem("role") === "GUARDIAN") {
        e["guardianId"] = JSON.parse(localStorage.getItem("userInfo")).id;
        // var filterdata = this.state.filter;
        // filterdata.createdBy = JSON.parse(localStorage.getItem("userInfo")).id;
        // this.setState({
        //   filter: filterdata
        // });
      }

      // e["guardianId"] = JSON.parse(localStorage.getItem("userInfo")).id;

      e["guardianId"] =
        e.guardianId === null
          ? null
          : typeof e["guardianId"] == "object"
          ? e.guardianId.id
          : (e["guardianId"] = JSON.parse(localStorage.getItem("userInfo")).id);
      // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      userObj.guardianId = e.guardianId;
      // console.log("EDDDDDDDDDDDDDDDDDDD", userObj);
      fetchMethod(saveUserdata, { obj: userObj })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveUserdata;

          if (id && id !== null) {
            if (localStorage.getItem("role") === "ADMIN") {
              // return;

              let Obj = {
                obj: {
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
                  cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1
                }
              };

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
              text: "Participant added successfully",
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
  };

  render() {
    return (
      <div>
        {this.state.guardianName !== undefined &&
        this.state.cardtypeOptions != undefined ? (
          <div className="addParticipantSection">
            <h3>Add Participant</h3>
            <FormComponent
              formConfig={
                localStorage.getItem("role") === "ADMIN"
                  ? addAdminParticipantConfig
                  : addGuardianParticipantConfig
              }
              preSubmitChanges={this.preSubmitChanges}
              buttonTitleCSS="adminParticipant"
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
        )}
      </div>
    );
  }
}

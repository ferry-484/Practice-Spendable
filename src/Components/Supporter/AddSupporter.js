import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addSupporterConfig } from "./SupporterConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  saveUserdata,
  updateBankDetail,
  allcardtypes,
  getCardDetailsQuery
} from "./SupporterQuery";
import "./addSupporter.css";
export default class AddSupporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardtypeOptions: undefined
    };
  }

  componentWillMount() {
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
    this.props.history.push("/supporter");
  };

  preSubmitChanges = e => {
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
              role: "SUPPORTER",
              createdby: JSON.parse(localStorage.getItem("userInfo")).id,
              updatedby: JSON.parse(localStorage.getItem("userInfo")).id
            };
            // e["active"] = 1;
            // e["role"] = "SUPPORTER";
            // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
            fetchMethod(saveUserdata, { obj: userObj })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveUserdata;
                if (id && id !== null) {
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

                  swal({
                    text: "Supporter added successfully",
                    icon: "success"
                  });
                  this.props.history.push("/supporter");
                } else if (id === null) {
                  swal("Email already exists", { icon: "error" });
                } else {
                  swal("Please try again", { icon: "error" });
                  this.props.history.push("/supporter");
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
        role: "SUPPORTER",
        createdby: JSON.parse(localStorage.getItem("userInfo")).id,
        updatedby: JSON.parse(localStorage.getItem("userInfo")).id
      };
      // e["active"] = 1;
      // e["role"] = "SUPPORTER";
      // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
      fetchMethod(saveUserdata, { obj: userObj })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveUserdata;
          if (id && id !== null) {
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

            swal({ text: "Supporter added successfully", icon: "success" });
            this.props.history.push("/supporter");
          } else if (id === null) {
            swal("Email already exists", { icon: "error" });
          } else {
            swal("Please try again", { icon: "error" });
            this.props.history.push("/supporter");
          }
        });
      return false;
    }
  };
  render() {
    return this.state.cardtypeOptions != undefined ? (
      <div className="addSupporterForm">
        <h3>Add Supporter</h3>
        <FormComponent
          formConfig={addSupporterConfig}
          preSubmitChanges={this.preSubmitChanges}
          buttonTitleCSS="supporterButton"
          modalCloseCallback={() => {}}
          closeButton={this.closeForm}
          params={{
            cardtypeOptions: this.state.cardtypeOptions
          }}
        />
      </div>
    ) : (
      ""
    );
  }
}

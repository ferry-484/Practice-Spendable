import React, { Component } from "react";
import { Button } from "@material-ui/core";
import EditIcon from "../../assets/edit.svg";
import profile from "../../assets/photo.svg";
import { fetchMethod } from "../../FetchMethod";
import { API_URL } from "../../Config";
import swal from "sweetalert";
import { getSupporterData, getCardDetailsQuery } from "./SupporterQuery";
import SupporterTab from "./SupporterTab";

export default class SupporterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supporterData: undefined,
      cardDetails: []
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.supporterInfo(this.props.location.state.details);
      this.getCardDetails();
    }
  }

  getCardDetails = () => {
    fetchMethod(getCardDetailsQuery, {
      where: { userId: this.props.location.state.details }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp &&
          resp.data &&
          resp.data.allCardDetails &&
          resp.data.allCardDetails.CardDetails
        ) {
          this.setState({
            cardDetails: resp.data.allCardDetails.CardDetails
          });
        }
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  };

  supporterInfo = id => {
    fetchMethod(getSupporterData(id))
      .then(res => res.json())
      .then(res => {
        this.setState({
          supporterData: res.data.allUserdata.Userdata[0]
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  editButton = data => {
    this.props.history.push({
      pathname: "/editSupporter",
      state: { details: data.id }
    });
  };

  formatDate = date => {
    var date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return (date = dd + "/" + mm + "/" + yyyy);
  };

  render() {
    // console.log("`${this.state.supporterData.profileimage}`", `${this.state.supporterData.profileimage}`)
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.supporterData !== undefined ? (
            <div className="supporterTabHeader">
              <div className="supporterTabHeaderProfileInfo">
                <div className="supporterTabHeaderProfileDetails">
                  <div className="supporterName">
                    <div className="Image">
                      <img
                        src={
                          this.state.supporterData.profileimage !== null &&
                          this.state.supporterData.profileimage !== undefined
                            ? API_URL +
                              "/api/containers/images/download/" +
                              this.state.supporterData.profileimage
                            : profile
                        }
                        alt="supporter profile"
                      />
                    </div>
                    <h5>
                      {this.state.supporterData.firstname
                        ? this.state.supporterData.firstname
                        : "" + " " + this.state.supporterData.lastname
                        ? this.state.supporterData.lastname
                        : ""}
                    </h5>
                    <div className="editLink">
                      {localStorage.getItem("role") === "ADMIN" ? (
                        <Button
                          startIcon={<img src={EditIcon} alt="" />}
                          onClick={() =>
                            this.editButton(this.state.supporterData)
                          }
                        >
                          Edit
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>


                  <span className="address" style={{ display: "block" }}>
                    {this.state.supporterData.address !== null
                      ? this.state.supporterData.address
                          // .concat(
                          //   this.state.supporterData.city !== null
                          //     ? ', ' + this.state.supporterData.city
                          //     : ''
                          // )
                          .concat(
                            this.state.supporterData.city !== null
                              ? " " + this.state.supporterData.city
                              : ""
                          )
                          .concat(
                            this.state.supporterData.state !== null
                              ? " " + this.state.supporterData.state
                              : ""
                          )
                          .concat(
                            this.state.supporterData.country !== null
                              ? " " + this.state.supporterData.country
                              : ""
                          )
                          .concat(
                            this.state.supporterData.zipcode !== null
                              ? " " + this.state.supporterData.zipcode
                              : ""
                          )
                      : ""}
                  </span>
                  <ul className="supporterInformationDetails">
                    <li className="participantDetail">
                      <span>Date Of Birth</span>
                      <span>
                        {this.state.supporterData.dob !== null
                          ? this.formatDate(this.state.supporterData.dob)
                          : ""}
                      </span>
                    </li>
                    <li className="participantMobile">
                      <span>Mobile</span>
                      <span>
                        {this.state.supporterData.phonenumber !== null
                          ? this.state.supporterData.phonenumber
                          : ""}
                      </span>
                    </li>
                    <li className="participantEmail">
                      <span>Email Address</span>
                      <span>
                        {this.state.supporterData.email !== null
                          ? this.state.supporterData.email
                          : ""}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="participantDocumentVerifivation">
                <h6> Bank/Card Details</h6>
                <table>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      {/* <th>Account Name</th>
                      <th>Account Number</th> */}
                      <th>BSB</th>
                      <th>PPAN</th>
                      <th>Card Type</th>
                      {/* <th>Card Limit</th> */}
                      {/* <th>Expiry Date</th>
                      <th>Locked</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cardDetails
                      ? this.state.cardDetails.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            {/* <td>{item.accountname}</td>
                            <td>{item.accountnumber}</td> */}
                            <td>{item.bsb}</td>
                            <td>{item.cardNumber}</td>
                            <td>
                              {item.fkcardtypeidrel.Cardtypes[0]
                                ? item.fkcardtypeidrel.Cardtypes[0].cardtype
                                : ""}
                            </td>
                            {/* <td>
                              {item.cardLimit ? "$" + item.cardLimit : ""}
                            </td> */}

                            {/* <td>{item.expiryDate}</td>
                            <td>{item.isCardLocked === 1 ? "Yes" : "No"}</td> */}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
              <div className="participantDocumentVerifivation">
                <table>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Document Verification Name</th>
                      <th>Document Verification Url</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        {this.state.supporterData.verificationDoc1Name !== null
                          ? this.state.supporterData.verificationDoc1Name
                          : ""}
                      </td>
                      <td>
                        {this.state.supporterData.verificationDoc1Url !==
                          null &&
                        this.state.supporterData.verificationDoc1Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.supporterData.verificationDoc1Url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        {this.state.supporterData.verificationDoc2Name !== null
                          ? this.state.supporterData.verificationDoc2Name
                          : ""}
                      </td>
                      <td>
                        {this.state.supporterData.verificationDoc2Url !==
                          null &&
                        this.state.supporterData.verificationDoc2Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.supporterData.verificationDoc2Url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        {this.state.supporterData.verificationDoc3Name !== null
                          ? this.state.supporterData.verificationDoc3Name
                          : ""}
                      </td>
                      <td>
                        {this.state.supporterData.verificationDoc3Url !==
                          null &&
                        this.state.supporterData.verificationDoc3Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.supporterData.verificationDoc3Url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <SupporterTab id={this.state.supporterData.id} />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/supporter")
        )}
      </div>
    );
  }
}

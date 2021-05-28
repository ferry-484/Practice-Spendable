import React, { Component } from "react";
import BuisnessMemberInfoTab from "./BuisnessMemberInfoTab";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { allBusinessesMemberDataInfo } from "./BuisnessQuery";
import profile from "../../assets/photo.svg";
import { Image_GETURL } from "../../Config";
import "./buisness.css";
import { API_URL } from "../../Config";
export default class BuisnessMemberInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buisnessMemberData: undefined
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.buisnessMemberInfo(this.props.location.state.details);
    }
  }

  buisnessMemberInfo = id => {
    fetchMethod(allBusinessesMemberDataInfo(id))
      .then(res => res.json())
      .then(res => {
        this.setState({
          buisnessMemberData: res.data.allUserdata.Userdata[0]
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
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
    // console.log(
    //   "inside business member.....................................",
    //   this.props.location.state
    // );
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.buisnessMemberData !== undefined ? (
            <div className="buisnessMemberInfo">
              <div className="companyTabHeader">
                <div className="companyTabHeaderProfileInfo">
                  <div className="companyTabHeaderProfileDetails">
                    <div className="participantName">
                      <div className="Image">
                        <img
                          src={
                            this.state.buisnessMemberData.profileimage !==
                              null &&
                            this.state.buisnessMemberData.profileimage !==
                              undefined
                              ? Image_GETURL +
                                this.state.buisnessMemberData.profileimage
                              : profile
                          }
                        />
                      </div>
                      <h5>
                        {this.state.buisnessMemberData.firstname +
                          " " +
                          this.state.buisnessMemberData.lastname}
                      </h5>
                    </div>

                    <span className="address" style={{ display: "block" }}>
                      {this.state.buisnessMemberData.address !== null
                        ? this.state.buisnessMemberData.address
                            .concat(
                              this.state.buisnessMemberData.city !== null
                                ? ", " + this.state.buisnessMemberData.city
                                : ""
                            )
                            .concat(
                              this.state.buisnessMemberData.state !== null
                                ? " " + this.state.buisnessMemberData.state
                                : ""
                            )
                            .concat(
                              this.state.buisnessMemberData.country !== null
                                ? " " + this.state.buisnessMemberData.country
                                : ""
                            )
                            .concat(
                              this.state.buisnessMemberData.zipcode !== null
                                ? " " + this.state.buisnessMemberData.zipcode
                                : ""
                            )
                        : ""}
                    </span>
                    <ul className="participantInformationDetails">
                      <li className="participantMobile">
                        <span>Mobile</span>
                        <span>
                          {this.state.buisnessMemberData.phonenumber !== null
                            ? this.state.buisnessMemberData.phonenumber
                            : ""}
                        </span>
                      </li>
                      <li className="participantEmail">
                        <span>Email Address</span>
                        <span>
                          {this.state.buisnessMemberData.email !== null
                            ? this.state.buisnessMemberData.email
                            : ""}
                        </span>
                      </li>
                      <li className="participantDetail">
                        <span>Business Name</span>
                        <span>
                          {this.state.buisnessMemberData
                            .fkUserdataBusinessIdrel !== undefined &&
                          this.state.buisnessMemberData
                            .fkUserdataBusinessIdrel !== null &&
                          this.state.buisnessMemberData.fkUserdataBusinessIdrel
                            .Businesses.length > 0
                            ? this.state.buisnessMemberData
                                .fkUserdataBusinessIdrel.Businesses[0].storeName
                            : ""}
                        </span>
                      </li>
                      <li className="participantDetail">
                        <span>Date Of Birth</span>
                        <span>
                          {this.state.buisnessMemberData.dob !== null
                            ? this.formatDate(this.state.buisnessMemberData.dob)
                            : ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="participantDocumentVerifivation">
                  {this.state.buisnessMemberData ? (
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
                            {this.state.buisnessMemberData
                              .verificationDoc1Name !== null
                              ? this.state.buisnessMemberData
                                  .verificationDoc1Name
                              : ""}
                          </td>

                          <td>
                            {this.state.buisnessMemberData
                              .verificationDoc1Url !== null &&
                            this.state.buisnessMemberData
                              .verificationDoc1Url !== undefined ? (
                              <a
                                href={
                                  API_URL +
                                  "/api/containers/images/download/" +
                                  this.state.buisnessMemberData
                                    .verificationDoc1Url
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
                            {this.state.buisnessMemberData
                              .verificationDoc2Name !== null
                              ? this.state.buisnessMemberData
                                  .verificationDoc2Name
                              : ""}
                          </td>

                          <td>
                            {this.state.buisnessMemberData
                              .verificationDoc2Url !== null &&
                            this.state.buisnessMemberData
                              .verificationDoc2Url !== undefined ? (
                              <a
                                href={
                                  API_URL +
                                  "/api/containers/images/download/" +
                                  this.state.buisnessMemberData
                                    .verificationDoc2Url
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

                          {/* <td>
                            {this.state.buisnessMemberData
                              .verificationDoc2Url !== null
                              ? this.state.buisnessMemberData
                                  .verificationDoc2Url
                              : ""}
                          </td> */}
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            {this.state.buisnessMemberData
                              .verificationDoc3Name !== null
                              ? this.state.buisnessMemberData
                                  .verificationDoc3Name
                              : ""}
                          </td>

                          <td>
                            {this.state.buisnessMemberData
                              .verificationDoc3Url !== null &&
                            this.state.buisnessMemberData
                              .verificationDoc3Url !== undefined ? (
                              <a
                                href={
                                  API_URL +
                                  "/api/containers/images/download/" +
                                  this.state.buisnessMemberData
                                    .verificationDoc3Url
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
                          {/* <td>
                            {this.state.buisnessMemberData
                              .verificationDoc3Url !== null
                              ? this.state.buisnessMemberData
                                  .verificationDoc3Url
                              : ""}
                          </td> */}
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    "Details not found"
                  )}
                </div>

                <BuisnessMemberInfoTab
                  id={this.state.buisnessMemberData.id}
                  storeId={this.props.location.state.storeId}
                />
              </div>
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

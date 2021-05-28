import React, { Component } from "react";
import profile from "../../assets/photo.svg";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { allBusinessesInfo } from "./BuisnessQuery";

// import MapContainer from "./GoogleMap";
import "./buisness.css";
import MapSection from "../../Components/map/Map.jsx"; // import the map here
import Geocode from "react-geocode";

export default class BuisnessInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buisnessData: undefined,
      contactAddress: "",
      transactionAddress: "",
      contactLat: "",
      contactLong: "",
      transactionLat: "",
      transactionLong: ""
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.buisnessInfo(this.props.location.state.details);
    }
  }

  buisnessInfo = id => {
    fetchMethod(allBusinessesInfo(id))
      .then(res => res.json())
      .then(res => {
        const respData = res.data.allBusinesses.Businesses[0];
        const contactAddress =
          respData.contactLocationAdress !== null
            ? respData.contactLocationAdress
                .concat(
                  respData.contactLocationCity !== null
                    ? ", " + respData.contactLocationCity
                    : ""
                )
                .concat(
                  respData.contactLocationState !== null
                    ? " " + respData.contactLocationState
                    : ""
                )
                .concat(
                  respData.contactLocationCountry !== null
                    ? " " + respData.contactLocationCountry
                    : ""
                )
                .concat(
                  respData.contactLocationZipCode !== null
                    ? " " + respData.contactLocationZipCode
                    : ""
                )
            : "";
        const transactionAddress =
          respData.txnLocationAddress !== null
            ? respData.txnLocationAddress
                .concat(
                  respData.txnLocationCity !== null
                    ? "," + respData.txnLocationCity
                    : ""
                )
                .concat(
                  respData.txnLocationState !== null
                    ? " " + respData.txnLocationState
                    : ""
                )
                .concat(
                  respData.txnLocationCountry !== null
                    ? " " + respData.txnLocationCountry
                    : ""
                )
                .concat(
                  respData.txnLocationZipCode !== null
                    ? " " + respData.txnLocationZipCode
                    : ""
                )
            : "";
        this.setState(
          {
            buisnessData: respData,
            contactAddress: contactAddress,
            transactionAddress: transactionAddress
          },
          () => {
            Geocode.setApiKey("AIzaSyA6_-G9HVVxXIrClNWwhIdEvpK6QH53c4A");
            Geocode.setLanguage("en");
            Geocode.fromAddress(this.state.contactAddress).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ contactLat: lat, contactLong: lng });
              },
              error => {
                // console.error("eerror geocode", error);
              }
            );

            Geocode.fromAddress(this.state.transactionAddress).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ transactionLat: lat, transactionLong: lng });
              },
              error => {
                // console.error("eerror geocode", error);
              }
            );
          }
        );
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.buisnessData !== undefined ? (
            <div className="companyTabHeader">
              <div className="companyTabHeaderProfileInfo">
                <div className="companyTabHeaderProfileDetails">
                  <div className="participantName">
                    {/* <div className='Image'>
                      <img
                        src={
                          this.state.buisnessData.profileimage !== undefined &&
                          this.state.buisnessData.profileimage !== null
                            ? `${this.state.buisnessData.profileimage}`
                            : profile
                        }
                        alt='Business logo'
                      />
                    </div> */}
                    <h5>
                      {this.state.buisnessData.storeName !== null
                        ? this.state.buisnessData.storeName
                        : ""}
                    </h5>
                  </div>
                  <br />
                  <span className="address" style={{ display: "block" }}>
                    {this.state.contactAddress}
                  </span>
                  <ul className="participantInformationDetails">
                    <li className="participantMobile">
                      <span>Mobile Number</span>
                      <span>
                        {this.state.buisnessData.mobileNo !== null
                          ? this.state.buisnessData.mobileNo
                          : ""}
                      </span>
                    </li>
                    <li className="participantEmail">
                      <span>Email Address</span>
                      <span>
                        {this.state.buisnessData.email !== null
                          ? this.state.buisnessData.email
                          : ""}
                      </span>
                    </li>
                    <li className="participantDetail">
                      <span>ABN Number</span>
                      <span>
                        {this.state.buisnessData.abnNumber !== null
                          ? this.state.buisnessData.abnNumber
                          : ""}
                      </span>
                    </li>
                    <li className="participantDetail">
                      <span>Store Telephone Number</span>
                      <span>
                        {this.state.buisnessData.storeTelephoneNo !== null
                          ? this.state.buisnessData.storeTelephoneNo
                          : ""}
                      </span>
                    </li>
                  </ul>
                  <ul className="participantInformationDetails">
                    <li className="participantDetail">
                      <span>Website Url</span>
                      <span>
                        {this.state.buisnessData.websiteUrl !== null
                          ? this.state.buisnessData.websiteUrl
                          : ""}
                      </span>
                    </li>
                    <li className="participantDetail">
                      <span>Transaction Address</span>
                      <span>{this.state.transactionAddress}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mapFrame">
                <h5>Contact Address Map</h5>
                <h5>Transaction Address Map</h5>
                {this.state.contactLat && this.state.contactLong ? (
                  <div className="contactAddress">
                    <MapSection
                      location={{
                        address: this.state.contactAddress,
                        lat: this.state.contactLat,
                        lng: this.state.contactLong
                      }}
                      zoomLevel={17}
                      // title='Contact Address Map'
                    />
                  </div>
                ) : (
                  <div className="contactAddress">No Place Found</div>
                )}

                {this.state.transactionLat && this.state.transactionLong ? (
                  <div className="transactionAddress">
                    <MapSection
                      location={{
                        address: this.state.transactionAddress,
                        lat: 28.609831,
                        lng: 77.3675
                      }}
                      zoomLevel={17}
                      // title='Transaction Address Map'
                    />
                  </div>
                ) : (
                  <div className="transactionAddress">No Place Found </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/buisness")
        )}
      </div>
    );
  }
}

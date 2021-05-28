import React, { Component } from "react";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  Typography,
  Input
} from "@material-ui/core";
import EditIcon from "../../assets/edit.svg";
import ParticipantTab from "./ParticipantTab";
import profile from "../../assets/photo.svg";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { getParticipantData, getCardDetailsQuery } from "./ParticipantQuery";
import { API_URL } from "../../Config";
import "./participant.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogButton = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);
export default class ParticipantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsData: undefined,
      // openModal: false,
      BusinessesOptions: [],
      cardDetails: []
    };
  }

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

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.participantInfo(this.props.location.state.details);
      this.getCardDetails();
    }
    // this.getCardDetails();
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

  participantInfo = id => {
    fetchMethod(getParticipantData(id))
      .then(res => res.json())
      .then(res => {
        this.setState({
          detailsData: res.data.allUserdata.Userdata[0]
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  editButton = data => {
    this.props.history.push({
      pathname: "/editParticipants",
      state: { details: data.id }
    });
  };
  // handleClose = () => {
  //   this.setState({ openModal: false });
  // };
  // openModalBox = () => {
  //   this.setState({ openModal: true });
  // };
  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.detailsData !== undefined ? (
            <div className="companyTabHeader">
              <div className="companyTabHeaderProfileInfo">
                <div className="companyTabHeaderProfileDetails">
                  <div className="participantName">
                    <div className="Image">
                      <img
                        src={
                          this.state.detailsData.profileimage !== null &&
                          this.state.detailsData.profileimage !== undefined
                            ? API_URL +
                              "/api/containers/images/download/" +
                              this.state.detailsData.profileimage
                            : profile
                        }
                        alt="participant profile"
                      />
                    </div>
                    <h5>
                      {this.state.detailsData.firstname != null
                        ? this.state.detailsData.firstname
                        : "" + " " + this.state.detailsData.lastname != null
                        ? this.state.detailsData.lastname
                        : ""}
                    </h5>
                    <div className="editLink">
                      <Button
                        startIcon={<img src={EditIcon} alt="" />}
                        onClick={() => this.editButton(this.state.detailsData)}
                      >
                        Edit
                      </Button>
                    </div>
                    {/* <Button
                      className="cardDetailBtn"
                      onClick={() => {
                        this.openModalBox();
                      }}
                    > 
                      Card Details
                    </Button> */}
                  </div>
                  <span className="address" style={{ display: "block" }}>
                    {this.state.detailsData.address !== null
                      ? this.state.detailsData.address
                          .concat(
                            this.state.detailsData.city !== null
                              ? ", " + this.state.detailsData.city
                              : ""
                          )
                          .concat(
                            this.state.detailsData.state !== null
                              ? " " + this.state.detailsData.state
                              : ""
                          )
                          .concat(
                            this.state.detailsData.country !== null
                              ? " " + this.state.detailsData.country
                              : ""
                          )
                          .concat(
                            this.state.detailsData.zipCode !== null
                              ? " " + this.state.detailsData.zipcode
                              : ""
                          )
                      : ""}
                  </span>
                  <ul className="participantInformationDetails">
                    <li className="participantMobile">
                      <span>Date Of Birth</span>
                      <span>
                        {this.state.detailsData.dob !== null
                          ? this.formatDate(this.state.detailsData.dob)
                          : ""}
                      </span>
                    </li>
                    <li className="participantMobile">
                      <span>Mobile</span>
                      <span>
                        {this.state.detailsData.phonenumber !== null
                          ? this.state.detailsData.phonenumber
                          : ""}
                      </span>
                    </li>
                    <li className="participantEmail">
                      <span>Email Address</span>
                      <span>
                        {this.state.detailsData.email !== null
                          ? this.state.detailsData.email
                          : ""}
                      </span>
                    </li>
                    {/* <li className='participantDetail'>
                      <span>NDIS Number</span>
                      <span>
                        {this.state.detailsData.ndisNumber !== null
                          ? this.state.detailsData.ndisNumber
                          : ''}
                      </span>
                    </li> */}
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
                      <th>Card Limit</th>

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
                            <td>
                              {item.cardLimit ? "$" + item.cardLimit : ""}
                            </td>
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
                        {this.state.detailsData.verificationDoc1Name !== null
                          ? this.state.detailsData.verificationDoc1Name
                          : ""}
                      </td>
                      <td>
                        {this.state.detailsData.verificationDoc1Url !== null &&
                        this.state.detailsData.verificationDoc1Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.detailsData.verificationDoc1Url
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
                        {this.state.detailsData.verificationDoc2Name !== null
                          ? this.state.detailsData.verificationDoc2Name
                          : ""}
                      </td>
                      <td>
                        {this.state.detailsData.verificationDoc2Url !== null &&
                        this.state.detailsData.verificationDoc2Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.detailsData.verificationDoc2Url
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
                        {this.state.detailsData.verificationDoc3Name !== null
                          ? this.state.detailsData.verificationDoc3Name
                          : ""}
                      </td>
                      <td>
                        {this.state.detailsData.verificationDoc3Url !== null &&
                        this.state.detailsData.verificationDoc3Url !==
                          undefined ? (
                          <a
                            href={
                              API_URL +
                              "/api/containers/images/download/" +
                              this.state.detailsData.verificationDoc3Url
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

              <ParticipantTab id={this.state.detailsData.id} />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/participants")
        )}

        {/* <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="cardDetailModal"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Card Details
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl>
                <MenuItem>
                  <span>
                    <b>Card Number </b>
                  </span>{" "}
                  <span>123434334</span>
                </MenuItem>
                <MenuItem>
                  <span>
                    <b>Card Name </b>
                  </span>{" "}
                  <span>MasterCard</span>
                </MenuItem>            
                <MenuItem>
                  <span>
                    <b>Limit </b>
                  </span>{" "}
                  <span>$100000</span>
                </MenuItem>
                <MenuItem>
                  <span>
                    <b>Spent </b>
                  </span>{" "}
                  <span>$80000</span>
                </MenuItem>
                <MenuItem>
                  <span>
                    <b>Balance </b>
                  </span>{" "}
                  <span>$20000</span>
                </MenuItem>
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton></DialogButton>
        </Dialog>
       */}
      </div>
    );
  }
}

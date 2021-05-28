import React, { Component } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  Input
} from "@material-ui/core";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ConnectedBuisness from "./ParticipantTabSetup/ConnectedBuisness";
import ConnectedSupporter from "./ParticipantTabSetup/ConnectedSupporter";
import PaymentRequest from "./ParticipantTabSetup/PaymentRequest";
import "./participant.css";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import swal from "sweetalert";
import { fetchMethod } from "../../FetchMethod";
import moment from "moment";
import {
  connectedSupporterQuery,
  allSupporterConnectedwithParticipant,
  OnlyParticipantConnectedBusinesses,
  connectedBuisnessQuery,
  supporterdata
} from "../Participant/ParticipantTabSetup/ParticipantTabQuery";
import {
  supporterParticipantQuery,
  saveParticipantSupporterQuery,
  dropdownQuery
} from "../Supporter/SupporterQuery";
import {
  businessQuery,
  saveBusiness,
  businessParticipantQuery,
  saveParticipantBusinessQuery
} from "../Buisness/BuisnessQuery";
import { isNullableType } from "graphql";
import { SignalCellularNullRounded } from "@material-ui/icons";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

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
class ParticipantTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      filter: {
        active: 1,
        role: "SUPPORTER",
        order: "id desc"
      },
      // listData: undefined,
      count: 0,
      openModal: false,
      openModalBox: false,
      supporterOptions: [],
      supporterId: undefined,
      participantId: this.props.id,
      storeId: undefined,
      filterData: {
        participantId: this.props.id,
        active: 1,
        order: "id desc"
      },
      refetchConnect: false,
      refetchBusinessConnect: false,
      ConnectedSupporteraAllData: [],
      totalData: undefined,
      totalBusinessData: undefined
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
    fetchMethod(dropdownQuery, {
      where: { role: "PARTICIPANT", active: 1 }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.allUserdata != undefined && res.data.id1 != undefined) {
          this.setState({
            participantOptions: res.data.id1.Userdata.map(item => {
              return {
                id: item.id,
                name:
                  item.firstname + " " + item.lastname != null
                    ? item.lastname
                    : ""
              };
            }),
            supporterOptions: res.data.allUserdata.Userdata.map(item => {
              return {
                id: item.id,
                supporter:
                  item.firstname +
                  " " +
                  (item.lastname != null ? item.lastname : "")
              };
            })
          });
          this.getParticipantSupporterData();
        } else this.setState({ loading: true });
      })
      .catch(e => console.log(e));
    fetchMethod(businessQuery, {
      where: { order: "id desc" }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.allBusinesses !== undefined) {
          this.setState({
            BusinessesOptions: res.data.allBusinesses.Businesses.map(item => {
              return {
                id: item.id,
                business: item.storeName
              };
            })
          });
          this.getBuisnessParticipantData();
        } else this.setState({ loading: true });
      })
      .catch(e => console.log(e));
  }

  // componentDidMount() {
  //   this.modalDropdownData();
  // }

  getParticipantSupporterData = () => {
    if (localStorage.getItem("role") === "ADMIN") {
      fetchMethod(connectedSupporterQuery, {
        where: this.state.filterData,
        last: this.state.rows,
        first: this.state.pageNo
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.error && res.error.statusCode === 401) {
            swal({ title: res.error.message, icon: "warning" }).then(() => {
              localStorage.clear();
              window.location = "/";
            });
          } else {
            this.setState({
              totalData: res.data.id1.ParticipantConnectedSupporters
            });
            res.data.allParticipantConnectedSupporters.ParticipantConnectedSupporters.map(
              item => {
                return (
                  (item.firstname =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .firstname
                      : ""),
                  (item.lastname =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .lastname
                      : ""),
                  (item.email =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .email
                      : ""),
                  (item.flagged = item.isSupporterFlagged === 0 ? "NO" : "YES"),
                  //SUPPORTER ACTIVATED OR DEACTIVATED
                  (item.status =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .active === 0
                        ? "DEACTIVATED"
                        : "ACTIVATED"
                      : ""),
                  (item.address =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .address !== null &&
                        item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .address !== ""
                        ? item.fkParticipantConnectedSupporterIdrel.Userdata[0].address.concat(
                            item.fkParticipantConnectedSupporterIdrel
                              .Userdata[0].city &&
                              item.fkParticipantConnectedSupporterIdrel
                                .Userdata[0].city !== null
                              ? " " +
                                  item.fkParticipantConnectedSupporterIdrel
                                    .Userdata[0].city
                              : ""
                          )
                        : ""
                      : ""),
                  (item.phonenumber =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .phonenumber !== null
                        ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                            .phonenumber
                        : ""
                      : ""),
                  (item.dob =
                    item.fkParticipantConnectedSupporterIdrel &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .dob !== null
                        ? this.formatDate(
                            item.fkParticipantConnectedSupporterIdrel
                              .Userdata[0].dob
                          )
                        : ""
                      : "")
                );
              }
            );
            this.setState(
              {
                count:
                  res.data &&
                  res.data.allParticipantConnectedSupporters &&
                  res.data.allParticipantConnectedSupporters !== null
                    ? res.data.allParticipantConnectedSupporters.totalCount
                    : "",
                listData:
                  res.data &&
                  res.data.allParticipantConnectedSupporters !== undefined &&
                  res.data.allParticipantConnectedSupporters !== null
                    ? res.data.allParticipantConnectedSupporters
                        .ParticipantConnectedSupporters
                    : ""
              },
              () => {
                this.disablerefetchConnect();
                this.modalDropdownData(this.state.totalData);

                // this.props.disablerefetchConnect();
                // this.props.listModalData(this.state.totalData);
              }
            );
          }
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
          this.setState({ listData: [] });
        });
    }

    if (localStorage.getItem("role") === "GUARDIAN") {
      fetchMethod(allSupporterConnectedwithParticipant, {
        where: this.state.filter
        // last: this.state.rows,
        // first: this.state.pageNo
      })
        .then(res => res.json())
        .then(res => {
          if (
            res.data &&
            res.data.allParticipantConnectedSupporters &&
            res.data.allParticipantConnectedSupporters
              .ParticipantConnectedSupporters &&
            res.data.allParticipantConnectedSupporters
              .ParticipantConnectedSupporters != ""
          ) {
            let DATA =
              res.data.allParticipantConnectedSupporters
                .ParticipantConnectedSupporters;
            let myData = [];
            DATA.map((item, index) => {
              let UData =
                item.fkParticipantConnectedSupporterIdrel &&
                item.fkParticipantConnectedSupporterIdrel.Userdata != ""
                  ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                  : null;
              if (UData) {
                let mainData = {
                  ...item,
                  ...UData,
                  fkParticipantConnectedSupporterIdrel: null
                };

                myData.push(mainData);
              } else {
                // console.log(
                //   "getAllConnectedParticipant user data not availalable",
                //   res
                // );
              }
            });
            // console.log("getAllConnectedSupportertest Final data", myData);

            myData.map((item, index) => {
              // console.log(
              //   "response data",
              //   item.address,
              //   ":::::::::::::",
              //   item.city
              // );

              let dob = "";
              if (item.dob) {
                dob = item.dob;
              }
              let dobN = "";
              if (dob && !dob.includes("/")) {
                dobN = moment(dob).format("DD/MM/YYYY");
              } else {
                dobN = dob;
              }
              return (
                // (item.S No=
                (item.firstname = item.firstname),
                (item.lastname = item.lastname),
                (item.email = item.email),
                (item.flagged = item.isSupporterFlagged === 0 ? "NO" : "YES"),
                //SUPPORTER ACTIVATED OR DEACTIVATED
                (item.status = item.active === 0 ? "DEACTIVATED" : "ACTIVATED"),
                // (item.address =
                //   item.address != null
                //     ? item.address
                //     : "" + " " + (item.city != null ? item.city : "")),

                (item.address =
                  item.address != null
                    ? item.address + " " + (item.city != null ? item.city : "")
                    : ""),
                (item.phonenumber = item.phonenumber),
                (item.dob = dobN)
              );
            });

            this.setState({
              // count:
              //   res.data &&
              //   res.data.allParticipantConnectedSupporters &&
              //   res.data.allParticipantConnectedSupporters !== null
              //     ? res.data.allParticipantConnectedSupporters.totalCount
              //     : "",
              count: myData ? myData.length : 0,
              listData: myData ? myData : ""
            });
            // this.setState(
            // {
            // count:
            //   res.data &&
            //   res.data.allParticipantConnectedSupporters &&
            //   res.data.allParticipantConnectedSupporters !== null
            //     ? res.data.allParticipantConnectedSupporters.totalCount
            //     : "",
            // listData: myData
            // res.data &&
            // res.data.allParticipantConnectedSupporters !== undefined &&
            // res.data.allParticipantConnectedSupporters !== null
            //   ? res.data.allParticipantConnectedSupporters
            //       .ParticipantConnectedSupporters
            //   : ""
            // },
            // () => {
            //   this.props.disablerefetchConnect();
            //   this.props.listModalData(this.state.totalData);
            // }
            // );
            // setpeople(myData);
          } else {
            this.setState({ listData: [] });
            // setNoData(true);
          }
        })
        .catch(e => {
          this.setState({ listData: [] });
          // console.log("error supporter", e);
        });
    }
  };
  getBuisnessParticipantData = () => {
    if (localStorage.getItem("role") === "ADMIN") {
      fetchMethod(connectedBuisnessQuery, {
        where: this.state.filterData,
        last: this.state.rows,
        first: this.state.pageNo
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.error && res.error.statusCode === 401) {
            swal({ title: res.error.message, icon: "warning" }).then(() => {
              localStorage.clear();
              window.location = "/";
            });
          } else {
            this.setState({
              totalBusinessData: res.data.id1.ParticipantConnectedBusinesses
            });
            res.data.allParticipantConnectedBusinesses.ParticipantConnectedBusinesses.map(
              item => {
                return (
                  (item.storeName =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].storeName
                      : ""),
                  (item.abnNumber =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].abnNumber
                      : ""),
                  (item.mobileNo =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].mobileNo
                      : ""),
                  (item.address =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].txnLocationAddress !== null &&
                        item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].txnLocationAddress !== ""
                        ? item.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].txnLocationAddress.concat(
                            item.fkParticipantConnectedBusinessStoreIdrel
                              .Businesses[0].txnLocationCity &&
                              item.fkParticipantConnectedBusinessStoreIdrel
                                .Businesses[0].txnLocationCity !== null
                              ? " " +
                                  item.fkParticipantConnectedBusinessStoreIdrel
                                    .Businesses[0].txnLocationCity
                              : ""
                          )
                        : ""
                      : ""),
                  (item.email =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].email
                      : ""),
                  (item.flagged = item.isBusinessFlagged === 0 ? "NO" : "YES"),
                  //SUPPORTER ACTIVATED OR DEACTIVATED
                  (item.status =
                    item.fkParticipantConnectedBusinessStoreIdrel &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].active === 0
                        ? "DEACTIVATED"
                        : "ACTIVATED"
                      : "")
                );
              }
            );
            this.setState(
              {
                count:
                  res.data &&
                  res.data.allParticipantConnectedBusinesses &&
                  res.data.allParticipantConnectedBusinesses !== null
                    ? res.data.allParticipantConnectedBusinesses.totalCount
                    : "",
                listData:
                  res.data &&
                  res.data.allParticipantConnectedBusinesses &&
                  res.data.allParticipantConnectedBusinesses !== null
                    ? res.data.allParticipantConnectedBusinesses
                        .ParticipantConnectedBusinesses
                    : 0
              },
              () => {
                this.disablerefetchBusinessConnect();
                this.BusinessmodalDropdownData(this.state.totalBusinessData);
              }
            );
          }
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
          this.setState({ listData: [] });
        });
    }

    if (localStorage.getItem("role") === "GUARDIAN") {
      fetchMethod(OnlyParticipantConnectedBusinesses, {
        where: this.state.filter
        // last: this.state.rows,
        // first: this.state.pageNo
      })
        // fetchMethod(allSupporterConnectedwithParticipant(id))
        .then(res => res.json())
        .then(res => {
          // console.log("res getAllConnectedSupporter", res);
          // setLoading(false);
          if (
            res.data &&
            res.data.allParticipantConnectedBusinesses &&
            res.data.allParticipantConnectedBusinesses
              .ParticipantConnectedBusinesses &&
            res.data.allParticipantConnectedBusinesses
              .ParticipantConnectedBusinesses != ""
          ) {
            let DATA =
              res.data.allParticipantConnectedBusinesses
                .ParticipantConnectedBusinesses;
            let myData = [];
            DATA.map((item, index) => {
              let UData =
                item.fkParticipantConnectedBusinessStoreIdrel &&
                item.fkParticipantConnectedBusinessStoreIdrel.Businesses != ""
                  ? item.fkParticipantConnectedBusinessStoreIdrel.Businesses[0]
                  : null;
              if (UData) {
                let mainData = {
                  ...item,
                  ...UData,
                  fkParticipantConnectedBusinessStoreIdrel: null
                };

                myData.push(mainData);
              } else {
                this.setState({
                  listData: []
                });
              }
            });
            // console.log(
            //   " Final data++++++++++business data+++++++++++++++++",
            //   myData
            // );

            myData.map(item => {
              return (
                (item.storeName = item.storeName),
                (item.abnNumber = item.abnNumber),
                (item.email = item.email),
                (item.mobileNo = item.mobileNo),
                (item.flagged = item.isBusinessFlagged === 0 ? "NO" : "YES"),
                //SUPPORTER ACTIVATED OR DEACTIVATED
                (item.status = item.active === 0 ? "DEACTIVATED" : "ACTIVATED"),
                (item.address =
                  item.txnLocationAddress != null
                    ? item.txnLocationAddress +
                      " " +
                      (item.txnLocationCity != null ? item.txnLocationCity : "")
                    : "")

                // "{"),
                //  item.fkParticipantConnectedSupporterIdrel.Userdata[0].address.concat(
                //     item.fkParticipantConnectedSupporterIdrel
                //       .Userdata[0].city &&
                //       item.fkParticipantConnectedSupporterIdrel
                //         .Userdata[0].city !== null
                //       ? " " +
                //           item.fkParticipantConnectedSupporterIdrel
                //             .Userdata[0].city
                //       : ""
                //   )

                // (item.dob =
                //   item.dob != null ? this.formatDate(item.dob) : "")
              );
            });

            this.setState({
              // count:
              //   res.data &&
              //   res.data.allParticipantConnectedSupporters &&
              //   res.data.allParticipantConnectedSupporters !== null
              //     ? res.data.allParticipantConnectedSupporters.totalCount
              //     : "",
              count: myData ? myData.length : 0,
              listData: myData ? myData : []
            });
            // this.setState(
            // {
            // count:
            //   res.data &&
            //   res.data.allParticipantConnectedSupporters &&
            //   res.data.allParticipantConnectedSupporters !== null
            //     ? res.data.allParticipantConnectedSupporters.totalCount
            //     : "",
            // listData: myData
            // res.data &&
            // res.data.allParticipantConnectedSupporters !== undefined &&
            // res.data.allParticipantConnectedSupporters !== null
            //   ? res.data.allParticipantConnectedSupporters
            //       .ParticipantConnectedSupporters
            //   : ""
            // },
            // () => {
            //   this.props.disablerefetchConnect();
            //   this.props.listModalData(this.state.totalData);
            // }
            // );
            // setpeople(myData);
          } else {
            this.setState({
              listData: []
            });
            // setNoData(true);
          }
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
          this.setState({ listData: [] });
        });
    }
  };
  handleTabs = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };
  openModalBox = () => {
    this.setState({ openModal: true });
  };
  openBusinessModel = () => {
    this.setState({ openModalBox: true });
  };
  handleCloseBusiness = () => {
    this.setState({ openModalBox: false, storeId: undefined });
  };
  handleClose = () => {
    this.setState({ supporterId: undefined, openModal: false });
  };
  filterData = () => {
    const { filter } = this.state;
    filter["participantId"] = this.state.participantId;
    this.setState(
      {
        filter
      },
      () => this.getParticipantSupporterData()
    );
  };

  filterBusinessData = () => {
    const { filterData } = this.state;
    // filter["storeId"] = this.state.storeId;
    filterData["participantId"] = this.state.participantId;
    this.setState(
      {
        filterData
      },
      () => this.getBuisnessParticipantData()
    );
  };
  submitButton = () => {
    if (
      this.state.supporterId !== undefined &&
      this.state.supporterId !== " " &&
      this.state.supporterId !== null
    ) {
      const test = {
        supporterId: this.state.supporterId,
        participantId: this.state.participantId,
        createdBy: JSON.parse(localStorage.getItem("userInfo")).id,
        updatedBy: JSON.parse(localStorage.getItem("userInfo")).id
      };
      fetchMethod(saveParticipantSupporterQuery, { obj: test })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveParticipantConnectedSupporter;
          if (id && id !== null) {
            // this.filterData();

            this.setState({ refetchConnect: true, supporterId: undefined });

            swal({
              text: "Participant connected supporter successfully",
              icon: "success"
            });
            this.handleClose();
          } else {
            swal("Please try again", { icon: "error" });
          }
          // this.filterData();
        });
    } else {
      swal({ title: "Please select supporter", icon: "warning" });
    }
  };
  handleSupporterFilter = e => {
    const {
      target: { name, value }
    } = e;

    const { filter } = this.state;
    filter[name] = value;
    this.setState({
      [name]: value,
      filter
    });
  };

  handleBuisnessFilter = e => {
    const {
      target: { name, value }
    } = e;

    const { filter } = this.state;
    filter[name] = value;
    this.setState({
      [name]: value,
      filter
    });
  };

  submitBusinessButton = () => {
    if (this.state.storeId !== undefined) {
      const test = {
        storeId: this.state.storeId,
        participantId: this.state.participantId,
        createdBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
        updatedBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`
      };
      fetchMethod(saveParticipantBusinessQuery, { obj: test })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveParticipantConnectedBusiness;
          if (id && id !== null) {
            // this.filterBusinessData();
            this.setState({
              refetchBusinessConnect: true,
              storeId: undefined
            });
            swal({
              text: "Business connected successfully",
              icon: "success"
            });
            this.handleCloseBusiness();

            // this.modalDropdownData()
          } else {
            swal("Please try again", { icon: "error" });
          }
        });
    } else {
      swal({ title: "Please select business", icon: "warning" });
    }
  };

  disablerefetchConnect = () => {
    this.setState({ refetchConnect: false });
  };

  disablerefetchBusinessConnect = () => {
    this.setState({ refetchBusinessConnect: false });
  };
  handleBusiness = (e, v) => {
    if (v !== null && v !== undefined && v.id) {
      this.setState({
        storeId: v.id
      });
    }
  };
  handleSupporter = (e, v) => {
    if (v !== null && v !== undefined && v.id) {
      this.setState({
        supporterId: v.id
      });
    }
  };

  modalDropdownData = (e, flag) => {
    // fetchMethod(supporterdata)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("REs initial test", res);
    //     if (
    //       res &&
    //       res.data &&
    //       res.data.allUserdata &&
    //       res.data.allUserdata.Userdata
    //     ) {
    //       console.log("EEEEREST", res);
    //       this.setState(
    //         {
    //           supporterOptions: res.data.allUserdata.Userdata.map(item => {
    //             return {
    //               id: item.id,
    //               supporter:
    //                 item.firstname +
    //                 " " +
    //                 (item.lastname != null ? item.lastname : "")
    //             };
    //           })

    //           // allParticipantList: resp.data.allUserdata.Userdata
    //         },
    //         () => {
    //           let temp = [...this.state.supporterOptions];
    //           console.log("Temp....................if flkag.......", temp);
    //           console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
    //           let userId = e.map(
    //             i => i.fkParticipantConnectedSupporterIdrel.Userdata[0].id
    //           );
    //           console.log("*user id .luser id ", userId);
    //           for (let i = 0; i < userId.length; i++) {
    //             for (let x = 0; x < temp.length; x++) {
    //               if (temp[x].id === userId[i]) temp.splice(x, 1);
    //             }
    //           }
    //           console.log("+++++++++++++++++++++++++++++++++++", temp);
    //           this.setState({ supporterOptions: temp });
    //         }
    //       );
    //     }
    //   })
    //   .catch(error => {
    //     swal({ title: error.message, icon: "warning" });
    //   });
    if (flag == 1) {
      fetchMethod(supporterdata)
        .then(res => res.json())
        .then(res => {
          if (
            res &&
            res.data &&
            res.data.allUserdata &&
            res.data.allUserdata.Userdata
          ) {
            this.setState(
              {
                supporterOptions: res.data.allUserdata.Userdata.map(item => {
                  return {
                    id: item.id,
                    supporter:
                      item.firstname +
                      " " +
                      (item.lastname != null ? item.lastname : "")
                  };
                })

                // allParticipantList: resp.data.allUserdata.Userdata
              },
              () => {
                let temp = [...this.state.supporterOptions];

                let userId = e.map(
                  i => i.fkParticipantConnectedSupporterIdrel.Userdata[0].id
                );

                for (let i = 0; i < userId.length; i++) {
                  for (let x = 0; x < temp.length; x++) {
                    if (temp[x].id === userId[i]) temp.splice(x, 1);
                  }
                }
                this.setState({ supporterOptions: temp });
              }
            );
          }
        })
        .catch(error => {
          swal({ title: error.message, icon: "warning" });
        });
    } else {
      let temp = [...this.state.supporterOptions];
      let userId = e.map(
        i => i.fkParticipantConnectedSupporterIdrel.Userdata[0].id
      );

      for (let i = 0; i < userId.length; i++) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x].id === userId[i]) temp.splice(x, 1);
        }
      }

      this.setState({ supporterOptions: temp });
    }
  };

  BusinessmodalDropdownData = (e, flag) => {
    if (flag == 1) {
      fetchMethod(businessQuery, {
        where: { order: "id desc" }
      })
        .then(res => res.json())
        .then(res => {
          if (res.data.allBusinesses !== undefined) {
            this.setState(
              {
                BusinessesOptions: res.data.allBusinesses.Businesses.map(
                  item => {
                    return {
                      id: item.id,
                      business: item.storeName
                    };
                  }
                )
              },
              () => {
                if (
                  this.state.BusinessesOptions !== null &&
                  this.state.BusinessesOptions !== undefined
                ) {
                  let temp = [...this.state.BusinessesOptions];
                  let businessId = e.map(
                    i =>
                      i.fkParticipantConnectedBusinessStoreIdrel.Businesses[0]
                        .id
                  );
                  for (let i = 0; i < businessId.length; i++) {
                    for (let x = 0; x < temp.length; x++) {
                      if (temp[x].id === businessId[i]) temp.splice(x, 1);
                    }
                  }
                  this.setState({ BusinessesOptions: temp });
                }
              }
            );
            // this.getBuisnessParticipantData();
          } else this.setState({ loading: true });
        })
        .catch(e => console.log(e));
    } else {
      if (
        this.state.BusinessesOptions !== null &&
        this.state.BusinessesOptions !== undefined
      ) {
        let temp = [...this.state.BusinessesOptions];
        let businessId = e.map(
          i => i.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].id
        );
        for (let i = 0; i < businessId.length; i++) {
          for (let x = 0; x < temp.length; x++) {
            if (temp[x].id === businessId[i]) temp.splice(x, 1);
          }
        }
        this.setState({ BusinessesOptions: temp });
      }
    }
  };

  render() {
    return (
      <div className="participantTab">
        <AppBar position="static">
          <Tabs
            variant="scrollable"
            indicatorColor="primary"
            className="tab-appbar"
            style={{ color: "black" }}
            value={this.state.value}
            onChange={this.handleTabs}
            aria-label="simple tabs example"
          >
            <Tab
              className="tab"
              label="Connected Supporter"
              {...a11yProps(0)}
            />
            <Tab className="tab" label="Connected BusIness" {...a11yProps(1)} />
            {/* <Tab className="tab" label="Payment Request" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <ConnectedSupporter
            id={this.props.id}
            hasRefetch={this.state.refetchConnect}
            disablerefetchConnect={this.disablerefetchConnect}
            listModalData={this.modalDropdownData}
          />
          {localStorage.getItem("role") === "ADMIN" ? (
            <Button
              className="addsupportBtn"
              onClick={() => {
                this.openModalBox();
              }}
            >
              CONNECT SUPPORTER{" "}
            </Button>
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <ConnectedBuisness
            id={this.props.id}
            hasRefetch={this.state.refetchBusinessConnect}
            disablerefetchConnect={this.disablerefetchBusinessConnect}
            listModalData={this.BusinessmodalDropdownData}
          />
          {localStorage.getItem("role") === "ADMIN" ? (
            <Button
              className="addbusinessBtn"
              onClick={() => {
                this.openBusinessModel();
              }}
            >
              CONNECT BUSINESS{" "}
            </Button>
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <PaymentRequest id={this.props.id} />
        </TabPanel>

        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          // className="chooseBuisness"
          className="chooseBuisness selectSupportModal"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Select Supporter
          </DialogTitle>
          <DialogContent>
            <div>
              {/* <FormControl>
                <InputLabel id="demo-simple" margin="dense" variant="outlined">
                  Supporter
                </InputLabel>
                <Select
                  labelid="demo-simple"
                  value={this.state.supporterId}
                  name="supporterId"
                  onChange={this.handleSupporterFilter}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {this.state.supporterOptions !== undefined
                    ? this.state.supporterOptions.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.supporter}
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
              </FormControl> */}
              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.supporterOptions}
                  getOptionLabel={option =>
                    // console.log("optins---", option)
                    option && option.supporter ? option.supporter : ""
                  }
                  style={{ width: 300 }}
                  onChange={(e, v) => this.handleSupporter(e, v)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Supporter"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton>
            <Button onClick={() => this.handleClose()}>Cancel</Button>
            <Button
              onClick={() => {
                this.submitButton();
              }}
            >
              Save
            </Button>
          </DialogButton>
        </Dialog>

        <Dialog
          open={this.state.openModalBox}
          onClose={this.handleCloseBusiness}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="chooseBuisness"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Select Buisness
          </DialogTitle>
          <DialogContent>
            <div>
              {/* <FormControl>
                <InputLabel id="demo-simple" margin="dense" variant="outlined">
                  Business
                </InputLabel>
                <Select
                  labelid="demo-simple"
                  value={this.state.storeId}
                  name="storeId"
                  onChange={this.handleBuisnessFilter}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {this.state.BusinessesOptions !== undefined
                    ? this.state.BusinessesOptions.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.business}
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
              </FormControl> */}

              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.storeId}
                  options={this.state.BusinessesOptions}
                  onChange={(e, v) => this.handleBusiness(e, v)}
                  getOptionLabel={option =>
                    option && option.business ? option.business : ""
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Business"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton>
            <Button onClick={() => this.handleCloseBusiness()}>Cancel</Button>
            <Button
              onClick={() => {
                this.submitBusinessButton();
              }}
            >
              Save
            </Button>
          </DialogButton>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(ParticipantTab);

import React, { Component } from "react";
import "./superLedger.css";
import { superLedgerList } from "./SuperLedgerConfig";
import ReactTableComponent from "../../ReactTable/ReactTable";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  Typography,
  Input,
  TextField
} from "@material-ui/core";
import { DotLoader } from "react-spinners";
import { dropdownQuery, GetUserdataNotification } from "./LedgerQuery";
import { fetchMethod } from "../../FetchMethod";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import swal from "sweetalert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import { formatDate } from "../FormatDate";
import {
  participantQuery,
  businessQuery,
  superLedgerQuery,
  saveLedger,
  updateCardLimit,
  participantQueryData,
  businessQueryData,
  cardData
} from "../SuperLedger/LedgerQuery";
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

export default class SuperLedger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0,
      participantOptions: [],
      Options: [],
      openModal: false,
      isRemoveFund : false,
      participantId: undefined,
      userId: undefined,
      businessId: undefined,
      role: undefined,
      roleselect: undefined,
      userIdSelect: undefined,
      businessIdSelect: undefined,
      amount: 0,
      filter: {
        order: "id desc"
      },

      role1: "",
      id: "",
      userData: [],
      businessData: [],
      selecetedRole: "",
      userxyz: null,
      txnxyz: null,
      Role: [
        {
          role: "PARTICIPANT",
          id: "PARTICIPANT"
        }
        // {
        //   role: "SUPPORTER", id: "SUPPORTER"

        // },
        // {
        //   role: "BUSINESS", id: "BUSINESS"

        // }
      ],
      cardLimit: undefined,
      cardOptions: [],
      cardId: null,
      txnType: "",
      CardType: [
        {
          txnType: "CREDIT",
          id: "CREDIT"
        },
        {
          txnType: "DEBIT",
          id: "DEBIT"
        }
      ]
    };
  }

  // componentDidMount() {

  // }

  componentWillMount() {
    this.getLedgerDetails();
    this.getdropdown();
    this.getPaticipnatDropDown();
    fetchMethod(dropdownQuery, {
      where: this.state.role
    })
      .then(res => res.json())
      .then(res => {
        res.data.allUserdata != undefined
          ? this.setState({
              participantOptions: res.data.allUserdata.Userdata.map(item => {
                return {
                  id: item.id,
                  phonenumber: item.phonenumber,
                  name:
                    item.firstname +
                    " " +
                    (item.lastname != null ? item.lastname : "")
                };
              })
            })
          : this.setState({ loading: true });
      })
      .catch(e => console.log(e));
  }

  getPaticipnatDropDown = () => {
    var obj = { role: "PARTICIPANT", active: 1 };
    if (localStorage.getItem("role") === "GUARDIAN") {
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
    }
    fetchMethod(participantQueryData, {
      where: obj
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          userData: res.data.allUserdata.Userdata
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  getCardDetails = () => {
    if (this.state.userId) {
      fetchMethod(cardData, {
        where: { userId: this.state.userId }
      })
        .then(res => res.json())
        .then(res => {
          res.data.allCardDetails != undefined
            ? this.setState({
                cardOptions: res.data.allCardDetails.CardDetails
              })
            : this.setState({ loading: true });
        })
        .catch(e => console.log(e));
    } else {
      fetchMethod(cardData, {
        where: { businessId: this.state.businessId }
      })
        .then(res => res.json())
        .then(res => {
          res.data.allCardDetails != undefined
            ? this.setState({
                cardOptions: res.data.allCardDetails.CardDetails
              })
            : this.setState({ loading: true });
        })
        .catch(e => console.log(e));
    }
  };

  getBusinessList = () => {
    fetchMethod(businessQuery, {
      where: { active: 1 }
    })
      .then(res => res.json())
      .then(res => {
        res.data.allBusinesses != undefined
          ? this.setState({
              Options: res.data.allBusinesses.Businesses.map(item => {
                return {
                  id: item.id,
                  phonenumber: item.mobileNo,
                  name: item.storeName
                };
              })  
            })
          : this.setState({ loading: true });
      })
      .catch(e => console.log(e));
  };

  getdropdown = () => {
    let filterData;
    filterData = { active: 1, role: "PARTICIPANT" };
    fetchMethod(participantQuery, {
      where: filterData
    })
      .then(res => res.json())
      .then(res => {
        res.data.allUserdata != undefined
          ? this.setState({
              Options: res.data.allUserdata.Userdata.map(item => {
                return {
                  id: item.id,
                  // phonenumber: item.phonenumber,
                  name:
                    item.firstname +
                    " " +
                    (item.lastname != null ? item.lastname : "")
                };
              })
            })
          : this.setState({ loading: true });
      })
      .catch(e => console.log(e));
  };

  // getdropdown = flag => {

  //   var filterData;
  //   if (flag === 1) {
  //     filterData = { active: 1, role: this.state.roleselect };
  //   } else {
  //     filterData = { active: 1, role: this.state.role };
  //   }
  //   fetchMethod(participantQuery, {
  //     where: filterData
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       res.data.allUserdata != undefined
  //         ? this.setState({
  //           Options: res.data.allUserdata.Userdata.map(item => {
  //             return {
  //               id: item.id,
  //               phonenumber: item.phonenumber,
  //               name:
  //                 item.firstname +
  //                 " " +
  //                 (item.lastname != null ? item.lastname : "")
  //             };
  //           })
  //         })
  //         : this.setState({ loading: true });
  //     })
  //     .catch(e => console.log(e));
  // };

  addFunds = () => {
    this.props.history.push("/addFunds");
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      cardId: null,
      userId: undefined,
      amount: 0,
      cardOptions: []
    });
  };

  // handleRole = (e, v) => {

  //   this.setState({
  //     options: [],
  //     role: undefined,
  //     cardOptions: [],
  //     cardId: null,

  //   });
  //   if (v !== null && v !== undefined) {
  //     if (v.role === "PARTICIPANT" || v.role === "SUPPORTER") {
  //       this.setState(
  //         {
  //           role: v.role
  //         },
  //         () => {
  //           this.getdropdown();

  //         }
  //       );
  //     } else if (v.role === "BUSINESS") {
  //       this.setState(
  //         {
  //           role: v.role
  //         },
  //         () => {
  //           this.getBusinessList();
  //         }
  //       );
  //     }
  //   }
  // };
  handleParticipant = (e, v) => {
    this.setState({
      businessId: undefined,
      userId: undefined,
      cardOptions: [],
      cardId: null
    });
    if (v !== null && v !== undefined) {
      this.setState(
        {
          userId: v.id
        },
        () => {
          this.getCardDetails();
        }
      );
    }
  };

  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        this.getLedgerDetails();
      }
    );
  };

  openModalBox = (x) => {
    this.setState({ openModal: true, isRemoveFund : x == 'add' ? false : true });
  };

  getLedgerDetails = () => {
    if (
      localStorage.getItem("role") === "GUARDIAN" &&
      !this.state.filter.userId
    ) {
      var filterdata = this.state.filter;
      var obj = { role: "PARTICIPANT", active: 1 };
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
      fetchMethod(participantQueryData, {
        where: obj
      })
        .then(resp => resp.json())
        .then(resp => {
          if (
            resp &&
            resp.data &&
            resp.data.allUserdata &&
            resp.data.allUserdata.Userdata
          ) {
            var ids = [];
            resp.data.allUserdata.Userdata.map(i => {
              ids.push(i.id);
            });
            filterdata.userId = { inq: [ids] };
            this.setState({
              filter: filterdata
            });
          }
        })
        .then(() => {
          fetchMethod(superLedgerQuery, {
            where: this.state.filter,
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
                res.data.allSuperLedgers.SuperLedgers.map(item => {
                  console.log("@cardd card ", item.txnId);
                  console.log(res);
                  return (
                    (item["name"] =
                      item.fkcreatebysuperledgermaprel &&
                      item.fkcreatebysuperledgermaprel.Userdata &&
                      item.fkcreatebysuperledgermaprel.Userdata.length > 0 &&
                      item.fkcreatebysuperledgermaprel.Userdata[0]
                        ? item.fkcreatebysuperledgermaprel.Userdata[0]
                            .firstname +
                          (item.fkcreatebysuperledgermaprel.Userdata[0]
                            .lastname != null
                            ? " " +
                              item.fkcreatebysuperledgermaprel.Userdata[0]
                                .lastname
                            : "")
                        : ""),
                    (item["txnId"] = item.txnId ? item.txnId : ""),
                    (item["participantname"] =
                      item.fkuseridsuperledgermaprel &&
                      item.fkuseridsuperledgermaprel.Userdata &&
                      item.fkuseridsuperledgermaprel.Userdata.length > 0 &&
                      item.fkuseridsuperledgermaprel.Userdata[0]
                        ? item.fkuseridsuperledgermaprel.Userdata[0].firstname +
                          (item.fkuseridsuperledgermaprel.Userdata[0]
                            .lastname != null
                            ? " " +
                              item.fkuseridsuperledgermaprel.Userdata[0]
                                .lastname
                            : "")
                        : ""),
                    (item["amountAdded"] = item.amountAdded
                      ? "$" + item.amountAdded
                      : ""),
                    (item["cardNumber"] =
                      item.fkcarddetailiimaprel &&
                      item.fkcarddetailiimaprel.CardDetails &&
                      item.fkcarddetailiimaprel.CardDetails.length > 0 &&
                      item.fkcarddetailiimaprel.CardDetails[0]
                        ? item.fkcarddetailiimaprel.CardDetails[0].cardNumber
                        : ""),
                    (item["cardLimit"] = item.cardlimit
                      ? "$" + item.cardlimit
                      : 0),
                    (item["createdAt"] =
                      item != null && item.createdAt
                        ? formatDate(item.createdAt)
                        : ""),
                    (item["itemDescription"] =
                      item.fkpaymentmaprel &&
                      item.fkpaymentmaprel.PaymentRequests &&
                      item.fkpaymentmaprel.PaymentRequests.length > 0 &&
                      item.fkpaymentmaprel.PaymentRequests[0]
                        ? item.fkpaymentmaprel.PaymentRequests[0].extraNotes
                        : ""),
                    (item["storeName"] =
                      item.fkbusinessidsuperledgermaprel &&
                      item.fkbusinessidsuperledgermaprel.Businesses &&
                      item.fkbusinessidsuperledgermaprel.Businesses.length >
                        0 &&
                      item.fkbusinessidsuperledgermaprel.Businesses[0]
                        ? item.fkbusinessidsuperledgermaprel.Businesses[0]
                            .storeName
                        : ""),
                    (item["storeCity"] =
                      item.fkbusinessidsuperledgermaprel &&
                      item.fkbusinessidsuperledgermaprel.Businesses &&
                      item.fkbusinessidsuperledgermaprel.Businesses.length >
                        0 &&
                      item.fkbusinessidsuperledgermaprel.Businesses[0]
                        ? item.fkbusinessidsuperledgermaprel.Businesses[0]
                            .txnLocationCity
                        : ""),
                    (item["storeCountry"] =
                      item.fkbusinessidsuperledgermaprel &&
                      item.fkbusinessidsuperledgermaprel.Businesses &&
                      item.fkbusinessidsuperledgermaprel.Businesses.length >
                        0 &&
                      item.fkbusinessidsuperledgermaprel.Businesses[0]
                        ? item.fkbusinessidsuperledgermaprel.Businesses[0]
                            .txnLocationCountry
                        : ""),
                    (item["mcc"] = "N/A")
                  );
                });

                this.setState({
                  count:
                    res.data &&
                    res.data.allSuperLedgers &&
                    res.data.allSuperLedgers !== null
                      ? res.data.allSuperLedgers.totalCount
                      : "",
                  listData:
                    res.data &&
                    res.data.allSuperLedgers &&
                    res.data.allSuperLedgers !== null
                      ? res.data.allSuperLedgers.SuperLedgers
                      : ""
                });
              }
            })
            .catch(e => {
              swal({ title: e.message, icon: "warning" });
              this.setState({ listData: [] });
            });
        });
    } else {
      fetchMethod(superLedgerQuery, {
        where: this.state.filter,
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
            res.data.allSuperLedgers.SuperLedgers.map(item => {
              console.log("@cardd card ", item.txnId);
              return (
                (item["name"] =
                  item.fkcreatebysuperledgermaprel &&
                  item.fkcreatebysuperledgermaprel.Userdata &&
                  item.fkcreatebysuperledgermaprel.Userdata.length > 0 &&
                  item.fkcreatebysuperledgermaprel.Userdata[0]
                    ? item.fkcreatebysuperledgermaprel.Userdata[0].firstname +
                      (item.fkcreatebysuperledgermaprel.Userdata[0].lastname !=
                      null
                        ? " " +
                          item.fkcreatebysuperledgermaprel.Userdata[0].lastname
                        : "")
                    : ""),
                (item["txnId"] = item.txnId ? item.txnId : ""),
                (item["participantname"] =
                  item.fkuseridsuperledgermaprel &&
                  item.fkuseridsuperledgermaprel.Userdata &&
                  item.fkuseridsuperledgermaprel.Userdata.length > 0 &&
                  item.fkuseridsuperledgermaprel.Userdata[0]
                    ? item.fkuseridsuperledgermaprel.Userdata[0].firstname +
                      (item.fkuseridsuperledgermaprel.Userdata[0].lastname !=
                      null
                        ? " " +
                          item.fkuseridsuperledgermaprel.Userdata[0].lastname
                        : "")
                    : ""),
                (item["amountAdded"] = item.amountAdded
                  ? "$" + item.amountAdded
                  : ""),
                (item["cardNumber"] =
                  item.fkcarddetailiimaprel &&
                  item.fkcarddetailiimaprel.CardDetails &&
                  item.fkcarddetailiimaprel.CardDetails.length > 0 &&
                  item.fkcarddetailiimaprel.CardDetails[0]
                    ? item.fkcarddetailiimaprel.CardDetails[0].cardNumber
                    : ""),
                (item["cardLimit"] = item.cardlimit ? "$" + item.cardlimit : 0),
                // ? "$" + item.cardlimit
                // : item.fkcarddetailiimaprel &&
                //   item.fkcarddetailiimaprel.CardDetails &&
                //   item.fkcarddetailiimaprel.CardDetails.length > 0 &&
                //   item.fkcarddetailiimaprel.CardDetails[0]
                // ? "$" + item.fkcarddetailiimaprel.CardDetails[0].cardLimit
                // : ""),
                (item["createdAt"] =
                  item != null && item.createdAt
                    ? moment(item.createdAt).format("DD MMM YYYY hh:mm A")
                    : ""),
                (item["itemDescription"] =
                  item.fkpaymentmaprel &&
                  item.fkpaymentmaprel.PaymentRequests &&
                  item.fkpaymentmaprel.PaymentRequests.length > 0 &&
                  item.fkpaymentmaprel.PaymentRequests[0]
                    ? item.fkpaymentmaprel.PaymentRequests[0].extraNotes
                    : ""),
                (item["storeName"] =
                  item.fkbusinessidsuperledgermaprel &&
                  item.fkbusinessidsuperledgermaprel.Businesses &&
                  item.fkbusinessidsuperledgermaprel.Businesses.length > 0 &&
                  item.fkbusinessidsuperledgermaprel.Businesses[0]
                    ? item.fkbusinessidsuperledgermaprel.Businesses[0].storeName
                    : ""),
                (item["storeCity"] =
                  item.fkbusinessidsuperledgermaprel &&
                  item.fkbusinessidsuperledgermaprel.Businesses &&
                  item.fkbusinessidsuperledgermaprel.Businesses.length > 0 &&
                  item.fkbusinessidsuperledgermaprel.Businesses[0]
                    ? item.fkbusinessidsuperledgermaprel.Businesses[0]
                        .txnLocationCity
                    : ""),
                (item["storeCountry"] =
                  item.fkbusinessidsuperledgermaprel &&
                  item.fkbusinessidsuperledgermaprel.Businesses &&
                  item.fkbusinessidsuperledgermaprel.Businesses.length > 0 &&
                  item.fkbusinessidsuperledgermaprel.Businesses[0]
                    ? item.fkbusinessidsuperledgermaprel.Businesses[0]
                        .txnLocationCountry
                    : ""),
                (item["mcc"] = "N/A")
              );
            });

            this.setState({
              count:
                res.data &&
                res.data.allSuperLedgers &&
                res.data.allSuperLedgers !== null
                  ? res.data.allSuperLedgers.totalCount
                  : "",
              listData:
                res.data &&
                res.data.allSuperLedgers &&
                res.data.allSuperLedgers !== null
                  ? res.data.allSuperLedgers.SuperLedgers
                  : ""
            });
          }
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
          this.setState({ listData: [] });
        });
    }
  };
  CallsendNotificationApi = (token, title, body, data) => {
    console.log(
      "GetUserdataNotification token,title,body,data",
      token,
      title,
      body,
      data
    );
    fetchMethod(GetUserdataNotification(token, title, body, data))
      .then(response => response.json())
      .then(res => {
        console.log("GetUserdataNotification on payment confirm", res);
      })
      .catch(e => {
        console.log("GetUserdataNotification on payment confirm error ", e);
      });
  };
  submitButton = () => {
    var limit;
    fetchMethod(cardData, {
      where: { id: this.state.cardId }
    })
      .then(res => res.json())
      .then(res => {
        limit =
          res.data.allCardDetails != undefined &&
          res.data.allCardDetails.CardDetails[0] != undefined
            ? res.data.allCardDetails.CardDetails[0].cardLimit //this.setState({ cardLimit: res.data.allCardDetails.CardDetails[0].cardLimit})
            : 0; //this.setState({loading:true});
        if (
          this.state.userId !== undefined ||
          this.state.businessId !== undefined
        ) {
          if (this.state.amount === 0 || isNaN(parseInt(this.state.amount))) {
            swal({ title: "Please enter numeric amount", icon: "warning" });
          } else {
            if(this.state.isRemoveFund == true && (parseInt(this.state.amount) > limit)  ){
              swal({ title: "Amount entered is greater than the card limit. Current limit is $"+limit, icon: "warning" });  
              return false;
            }

            var userid = this.state.userId;
            const test = {
              txnType: this.state.isRemoveFund == true ? 'DEBIT' : 'CREDIT',
              userId: this.state.userId,
              // businessId: this.state.businessId,
              cardDetailId: this.state.cardId,
              amountAdded: parseFloat(this.state.amount),
              cardlimit: this.state.isRemoveFund == true ? limit - parseFloat(this.state.amount) : limit + parseFloat(this.state.amount),
              createdBy: JSON.parse(localStorage.getItem("userInfo")).id,
              updatedBy: JSON.parse(localStorage.getItem("userInfo")).id,
              flag: 1
            };
            fetchMethod(saveLedger, { obj: test })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveSuperLedger;
                if (id && id !== null) {
                  this.getLedgerDetails();
                  swal({
                    title: this.state.isRemoveFund == true ? "Funds removed successfully." :  "Funds added successfully.",
                    icon: "success"
                  });
                  this.handleClose();

                  // if (loginDevice) {
                  //   CallsendNotificationApi(loginDevice, title, body, title);
                  // }
                  if(this.state.isRemoveFund == false){
                    fetchMethod(participantQuery, {
                      where: { id: userid }
                    })
                      .then(res => res.json())
                      .then(res => {
                        if (
                          res.data.allUserdata != undefined &&
                          res.data.allUserdata.Userdata[0].loginDevice != null
                        ) {
                          let title = "Fund Added";
                          let body = ` ${
                            JSON.parse(localStorage.getItem("userInfo")).fullName
                          } Added $${test.amountAdded} in your card limit.`;
                          this.CallsendNotificationApi(
                            res.data.allUserdata.Userdata[0].loginDevice,
                            title,
                            body,
                            title
                          );
                        }
                      })
                      .catch(e => console.log(e));
                  }
                  

                  this.setState({
                    cardId: null,
                    cardOptions: [],
                    amount: 0,
                    userId: undefined
                  });
                } else {
                  swal("Please try again", { icon: "error" });
                }
              });
            //limit += test.amountAdded;
            const cardData = {
              id: this.state.cardId,
              cardLimit: test.cardlimit
            };
            fetchMethod(updateCardLimit, { obj: cardData });
          }
        } else {
          swal({ title: "Please select options", icon: "warning" });
        }
      })
      .catch(e => console.log(e));
  };
  handleAmount = e => {
    this.setState({
      amount: 0
    });
    console.log("################card data", this.state.cardId);
    if (e.target.value.length > 6) {
      swal({ title: "Amount can be only be upto 6 digit.", icon: "warning" });
      return false;
    } else if (
      e.target.value.length === 0 ||
      e.target.value === 0 ||
      e.target.value <= 0
    ) {
      swal({ title: "Please enter valid amount", icon: "warning" });
      return false;
    } else if (this.state.cardId === null) {
      this.setState({
        amount: 0
      });
      swal({ title: "Please select ppan", icon: "warning" });
    } else {
      this.setState({
        amount: e.target.value
      });
    }
  };

  // handleroleselect = e => {
  //   console.log("(((((((((((((((((((((((", e.target.value);

  //   if (e.target.value === "PARTICIPANT" || e.target.value === "SUPPORTER") {
  //     this.setState({
  //       Options: [],
  //       roleselect: e.target.value
  //     },()=>{ this.getdropdown(1);});
  //   } else if (e.target.value === "BUSINESS") {
  //     console.log("::::::::::::::::::::::::::", )
  //     this.setState({
  //       Options: [],
  //       roleselect: e.target.value
  //     },()=>{this.getBusinessList()});
  //   }
  // };

  handleroleselect = e => {
    // delete this.state.filter.participantId
    delete this.state.filter.userId;
    delete this.state.filter.businessId;

    let temp = this.state.filter;
    this.setState({ filter: temp });
    this.getLedgerDetails();
    const {
      target: { name, value }
    } = e;

    // const { filter } = this.state;
    // filter[name] = value;

    this.setState({
      role1: e.target.value,
      selecetedRole: e.target.value,
      userData: [],
      id: "",
      businessData: []
    });

    if (e.target.value === "PARTICIPANT" || e.target.value === "SUPPORTER") {
      fetchMethod(participantQueryData, {
        where: { role: e.target.value, active: 1 }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            userData: res.data.allUserdata.Userdata
          });
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
        });
    } else {
      fetchMethod(businessQueryData, {
        where: { active: 1 }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            userData: res.data.allBusinesses.Businesses
          });
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
        });
    }

    // this.setState({
    //     [name]: value,
    //     filter,
    // });
  };

  handleFilter1 = e => {
    // console.log("this.setlecdRole", this.state.selecetedRole)
    this.setState({ id: e.target.value });
    const {
      target: { name, value }
    } = e;

    const { filter } = this.state;

    filter[name] = value;

    this.getLedgerDetails();

    this.setState({
      [name]: value,
      filter
    });
  };

  handleFilterautocomplete = (e, v) => {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^VVVVVVVVVVVVVVVVVVVVVVVVV", v);
    // console.log("this.setlecdRole", this.state.selecetedRole)

    if (v !== null && v !== undefined) {
      const { filter } = this.state;
      filter.userId = v.id;
      this.setState({ userxyz: v, filter }, () => {
        console.log(
          "id test///////////////////",
          this.state.id,
          "jjjjjjjjjjjjjjjj",
          v.id
        );
      });

      this.getLedgerDetails();

      // this.setState({
      //   [name]: value,
      //   filter
      // });
    }
  };
  handleTransactionType = e => {
    this.setState({ txnType: e.target.value });
    const {
      target: { name, value }
    } = e;

    const { filter } = this.state;

    filter[name] = value;
    this.getLedgerDetails();

    this.setState({
      [name]: value,
      filter
    });
  };

  handleTransactionTypeAutocomplete = (e, v) => {
    if (v !== null && v !== undefined) {
      console.log("ccccccccccccccccccccccccc", v.txnType);
      const { filter } = this.state;
      filter.txnType = v.txnType;
      this.setState({ txnxyz: v, filter });
      this.getLedgerDetails();
    }
  };
  handlecardFilter = e => {
    console.log("%^&^&^&^^&*", e);
    this.setState({ cardId: e.target.value });
  };

  resetFilters = () => {
    console.log("this ,,,,ste filter", this.state.filter);
    delete this.state.filter.userId;
    delete this.state.filter.txnType;
    this.setState(
      {
        // userId: "",
        // userData: [],
        id: "",
        txnType: "",
        userxyz: null,
        txnxyz: null
      },
      () => {
        this.getLedgerDetails();
      }
    );
  };
  render() {
    const roleOptions = [
      { role: "PARTICIPANT" }
      // { role: "BUSINESS" },
      // { role: "SUPPORTER" }
    ];

    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];
    const columns = nameColumn.concat(superLedgerList.columns);
    return (
      <div className="SuperledgerSection">
        <h2> Super Ledger</h2>
        <div>
          {/* <FormControl>
            <InputLabel id="demo-simple">Participant</InputLabel>
            <Select
              labelid="demo-simple"
              value={this.state.role1}
              onChange={this.handleroleselect}
              input={<Input />}
              name="role1"
              MenuProps={MenuProps}
            // disabled={true}

            >
              {this.state.Role
                ? this.state.Role.map((item, index) => {

                  return (
                    <MenuItem
                      className="EmployeeType"
                      key={index}
                      value={item.id}
                    >
                      {item.role}
                    </MenuItem>
                  );
                })
                : ""}
            </Select>
          </FormControl> */}
          <FormControl>
            {/* <InputLabel id="demo-simple">Participant</InputLabel> */}
            {/* <Select
              labelid="demo-simple"
              value={this.state.id}
              onChange={this.handleFilter1}
              input={<Input />}
      
              name="userId"
              MenuProps={MenuProps}
            >
              {this.state.userData
                ? this.state.userData.map((item, index) => {
                    return (
                      <MenuItem
                        className="EmployeeType"
                        key={index}
                        value={item.id}
                      >
                        {item.firstname +
                          " " +
                          (item.lastname !== null ? item.lastname : "")}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select> */}

            <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.userxyz}
              // defaultValue=""
              // name={this.state.id}
              options={this.state.userData}
              onChange={(e, v) => this.handleFilterautocomplete(e, v)}
              getOptionLabel={option =>
                option
                  ? option.firstname +
                    (option.lastname ? " " + option.lastname : "")
                  : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Participants"
                  variant="outlined"
                />
              )}
            />
          </FormControl>

          <FormControl>
            {/* <InputLabel id="demo-simple">Transaction Type</InputLabel> */}
            {/* <Select
              labelid="demo-simple"
              value={this.state.txnType}
              onChange={this.handleTransactionType}
              input={<Input />}
              // name={this.state.selecetedRole === "PARTICIPANT" ? "userId" :
              //   this.state.selecetedRole === "SUPPORTER" ? "userId" : "businessId"
              // }
              name="txnType"
              MenuProps={MenuProps}
            >
              {this.state.CardType
                ? this.state.CardType.map((item, index) => {
                    return (
                      <MenuItem
                        className="EmployeeType"
                        key={index}
                        value={item.id}
                      >
                        {item.txnType}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select> */}

            <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.txnxyz}
              options={this.state.CardType}
              onChange={(e, v) => this.handleTransactionTypeAutocomplete(e, v)}
              getOptionLabel={option =>
                option && option.txnType ? option.txnType : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Transaction Type"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          
          
        </div>

        <div className="actions">
          <Button className="resetBtn" onClick={this.resetFilters}>
            Reset
          </Button>
          {localStorage.getItem("role") === "ADMIN" ? (
            <>
            <Button onClick={() => this.openModalBox('add')} className="addfundBtn">
              Add Funds
            </Button>
            <Button onClick={() => this.openModalBox('remove')} className="addfundBtn">
              Remove Funds
            </Button>
            </>
          ) : (
            ""
          )}
        </div>
        {this.state.listData ? (
          <div className="superledgerTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={superLedgerList}  
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              initialPage={this.state.pageNo / this.state.rows}
              onRowClick={() => {}}
              forSerialNo={{
                pageNo: this.state.pageNo,  
                pageSize: this.state.rows
              }}
            />
          </div>
        ) : (
          <div className="spinner">
            <DotLoader size={70} color={"#020f1f"} />
          </div>
        )}

        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="chooseBuisness superledgerAddfundModal"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            { this.state.isRemoveFund == true ? 'REMOVE FUNDS' : 'ADD FUNDS'}
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl>
                {/* <Autocomplete
                  id="combo-box-demo"
                  value={this.state.storeId}
                  options={roleOptions}
                  onChange={(e, v) => this.handleRole(e, v)}
                  getOptionLabel={option =>
                    option && option.role ? option.role : ""
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField {...params} label="Participant" variant="outlined" />
                  )}
                /> */}

                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.storeId}
                  options={this.state.Options}
                  onChange={(e, v) => this.handleParticipant(e, v)}
                  getOptionLabel={option =>
                    option && option.name ? option.name : ""
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Participant"
                      variant="outlined"
                    />
                  )}
                />
                <FormControl>
                  <InputLabel
                    id="demo-simple"
                    margin="dense"
                    variant="outlined"
                  >
                    PPAN LIST
                  </InputLabel>
                  <Select
                    labelid="demo-simple"
                    label=" CARDS"
                    // value={this.state.storeId}
                    name="cardNumber"
                    // onChange={this.handleBuisnessFilter}
                    onChange={this.handlecardFilter}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {this.state.cardOptions
                      ? this.state.cardOptions.map((item, index) => {
                          return (
                            <MenuItem
                              className="EmployeeType"
                              key={index}
                              value={item.id}
                            >
                              {item.cardNumber}
                            </MenuItem>
                          );
                        })
                      : ""}
                  </Select>
                </FormControl>
              </FormControl>
              {/* <FormControl> */}
              <TextField
                id="standard-basic"
                label="AMOUNT"
                className="amountfield"
                onChange={this.handleAmount}
                keyboardType="numeric"
               // maxLength={4}
                value={this.state.amount ? this.state.amount : ""}
                // helperText="Incorrect entry."
                InputLabelProps={{
                  shrink: true
                }}
              />
              {/* </FormControl> */}
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
      </div>
    );
  }
}

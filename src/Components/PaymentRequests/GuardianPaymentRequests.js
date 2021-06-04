import React, { Component } from "react";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { adminPaymentRequestList } from "./PaymentRequestsConfig";
import { withRouter } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import SearchIcon from "../../assets/search.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Image_GETURL } from "../../Config";
import { TextField } from "@material-ui/core";
import {
  paymentQuery,
  paymentImagesList,
  paymentShoppingList,
  userdataQuery,
  paymentDisputes,
  paymentGuardianRequestQuery,
  paymentGuardianRequestAllQuery,
  UserdataCardtransfer,
  UserdataCheckBalance,
  UserdataCardBlock,
  updateCardStatus,
  updateSuperledger,
  getCardDetailsQuery,
  updateCardLimit,
  GetUserdataNotification,
  getUserBudget,
  updateUserBudget,
} from "./PaymentRquestQuery";
import "./paymentRequests.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Carousel from "react-bootstrap/Carousel";
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
} from "@material-ui/core";
import noImgFound from "../../assets/images/noImgFound.jpg";
import { ContactSupportOutlined } from "@material-ui/icons";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogButton = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
class GuardianPaymentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      openModal: false,
      openShoppingList: false,
      openDispute: false,
      paymentImages: [],
      paymentShopping: undefined,
      paymentDispute: undefined,
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      images: [],
      loading: false,
      filter: {
        // paymentRequestId:
        order: "id desc",
      },
      role1: "",
      userData: undefined,
      paymentId: undefined,
      count: 0,
      createdBy: "",
      paymentxyz: null,
    };
  }

  formatDate = (date) => {
    var date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return (date = dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes);
  };

  componentWillMount() {
    this.paymentRequestData();
    this.getPaticipnatDropDown();
  }

  getPaymentImages = (id) => {
    fetchMethod(paymentImagesList, {
      where: { paymentRequestId: id },
    })
      .then((res) => res.json())
      .then((res) => {
        res.data.allRequestItemImages.RequestItemImages.length > 0
          ? this.setState({
              paymentImages:
                res.data.allRequestItemImages.RequestItemImages.map((item) => {
                  return {
                    id: item.id,
                    url: item.itemImageUrl,
                  };
                }),
            })
          : this.setState({ loading: true });
      })
      .catch((e) => console.log(e));
  };

  getPaymentGuardianRequestAllQuery = (guardianId) => {
    fetchMethod(paymentGuardianRequestAllQuery(guardianId), {
      where: this.state.filter,
    })
      .then((res) => res.json())
      .then((res) => {
        let paymentData = res.data.allPaymentRequests.PaymentRequests || [];
        paymentData = paymentData.filter(
          (item) => item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
        );

        this.setState({
          count: paymentData !== null ? paymentData.length : "",
        });
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ count: [] });
      });
  };

  paymentRequestData = async () => {
    await this.getPaymentGuardianRequestAllQuery(
      localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).id
        : ""
    );
    fetchMethod(
      paymentGuardianRequestQuery(
        localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).id
          : ""
      ),
      {
        where: this.state.filter,
        last: this.state.rows,
        first: this.state.pageNo,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
          let paymentData = res.data.allPaymentRequests.PaymentRequests || [];
          //res.data.allPaymentRequests.PaymentRequests =

          paymentData = paymentData.filter(
            (item) => item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
          );

          console.log(paymentData);

          paymentData.map((item) => {
            return (
              (item.cardNumber =
                item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
                item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
                  ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
                      .cardNumber
                  : ""),
              (item.cardStatus =
                item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
                item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
                  ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
                      .cardstatus === "0" ||
                    item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
                      .cardstatus === 0 ||
                    item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
                      .cardstatus === null
                    ? "UNBLOCK"
                    : "BLOCK"  
                  : ""),
              // (item.cardLimit =
              //   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
              //   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
              //     ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
              //         .cardLimit
              //     : ""),
              (item.madefor =
                item.createdBy === item.participantId
                  ? "SELF"
                  : item.fkPaymentRequestParticipantIdrel.Userdata &&
                    item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
                  ? item.fkPaymentRequestParticipantIdrel.Userdata[0].firstname.concat(
                      item.fkPaymentRequestParticipantIdrel.Userdata &&
                        item.fkPaymentRequestParticipantIdrel.Userdata.length >
                          0
                        ? " " +
                            (item.fkPaymentRequestParticipantIdrel.Userdata[0]
                              .lastname != null
                              ? item.fkPaymentRequestParticipantIdrel
                                  .Userdata[0].lastname
                              : "")
                        : ""
                    )
                  : ""),
              (item.madeby =
                item.fkpaymentrequestcreatebymaprel.Userdata &&
                item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
                  ? item.fkpaymentrequestcreatebymaprel.Userdata[0].firstname.concat(
                      item.fkpaymentrequestcreatebymaprel.Userdata &&
                        item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
                        ? " " +
                            (item.fkpaymentrequestcreatebymaprel.Userdata[0]
                              .lastname != null
                              ? item.fkpaymentrequestcreatebymaprel.Userdata[0]
                                  .lastname
                              : "")
                        : ""
                    )
                  : ""),
              // (item.buisnessMemberName =
              //   item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
              //   item.fkPaymentRequestBusinessMemberIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestBusinessMemberIdrel.Userdata[0].firstname.concat(
              //         item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
              //           item.fkPaymentRequestBusinessMemberIdrel.Userdata
              //             .length > 0
              //           ? " " +
              //               (item.fkPaymentRequestBusinessMemberIdrel
              //                 .Userdata[0].lastname !== null
              //                 ? item.fkPaymentRequestBusinessMemberIdrel
              //                     .Userdata[0].lastname
              //                 : "")
              //           : ""
              //       )
              //     : ""),
              (item.categoryName =
                item.fkPaymentRequestItemCategoryIdrel !== null &&
                item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories &&
                item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories
                  .length > 0
                  ? item.fkPaymentRequestItemCategoryIdrel
                      .MasterItemCategories[0].categoryName
                  : ""),
                  (item.storeName =
                  item.fkPaymentRequestStoreIdrel &&
                  item.fkPaymentRequestStoreIdrel !== null && 
                  item.fkPaymentRequestStoreIdrel.Businesses &&
                  item.fkPaymentRequestStoreIdrel.Businesses.length > 0 &&
                  item.fkPaymentRequestStoreIdrel.Businesses[0]
                    ? item.fkPaymentRequestStoreIdrel.Businesses[0].storeName
                    : ""),
              (item.requestedAmount =
                item.requestedAmount !== undefined &&
                item.requestedAmount !== null
                  ? `$${item.requestedAmount}`
                  : ""),

              (item.createdAt =
                item.createdAt !== undefined && item.createdAt !== null
                  ? this.formatDate(item.createdAt)
                  : "")
            );
          });
          this.setState({
            listData: paymentData !== null ? paymentData : "",
          });
        }
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  // paymentRequestData = (type) => {
  //   let obj = {};
  //   if(type == 'all'){
  //     obj['where'] = this.state.filter;
  //   }else{
  //     obj['where'] = this.state.filter;
  //     obj['last'] = this.state.rows;
  //     obj['first'] =this.state.pageNo;
  //   }
  //   fetchMethod(paymentQuery, obj)
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       if (res && res.error && res.error.statusCode === 401) {
  //         swal({ title: res.error.message, icon: "warning" }).then(() => {
  //           localStorage.clear();
  //           window.location = "/";
  //         });
  //       } else {
  //         res.data.allPaymentRequests.PaymentRequests.map(item => {
  //           return (
  //             (item.cardNumber =
  //               item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
  //               item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
  //                 ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
  //                     .cardNumber
  //                 : ""),
  //             (item.cardStatus =
  //               item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
  //               item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
  //                 ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
  //                     .cardstatus === "0" ||
  //                   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
  //                     .cardstatus === 0 ||
  //                   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
  //                     .cardstatus === null
  //                   ? "UNBLOCK"
  //                   : "BLOCK"
  //                 : ""),
  //             // (item.cardLimit =
  //             //   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails &&
  //             //   item.fkPaymentRequestCreatedbyCardIdrel.CardDetails.length > 0
  //             //     ? item.fkPaymentRequestCreatedbyCardIdrel.CardDetails[0]
  //             //         .cardLimit
  //             //     : ""),
  //             (item.madefor =
  //               item.createdBy === item.participantId
  //                 ? "SELF"
  //                 : item.fkPaymentRequestParticipantIdrel.Userdata &&
  //                   item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
  //                 ? item.fkPaymentRequestParticipantIdrel.Userdata[0].firstname.concat(
  //                     item.fkPaymentRequestParticipantIdrel.Userdata &&
  //                       item.fkPaymentRequestParticipantIdrel.Userdata.length >
  //                         0
  //                       ? " " +
  //                           (item.fkPaymentRequestParticipantIdrel.Userdata[0]
  //                             .lastname != null
  //                             ? item.fkPaymentRequestParticipantIdrel
  //                                 .Userdata[0].lastname
  //                             : "")
  //                       : ""
  //                   )
  //                 : ""),
  //             (item.madeby =
  //               item.fkpaymentrequestcreatebymaprel.Userdata &&
  //               item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
  //                 ? item.fkpaymentrequestcreatebymaprel.Userdata[0].firstname.concat(
  //                     item.fkpaymentrequestcreatebymaprel.Userdata &&
  //                       item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
  //                       ? " " +
  //                           (item.fkpaymentrequestcreatebymaprel.Userdata[0]
  //                             .lastname != null
  //                             ? item.fkpaymentrequestcreatebymaprel.Userdata[0]
  //                                 .lastname
  //                             : "")
  //                       : ""
  //                   )
  //                 : ""),
  //             // (item.buisnessMemberName =
  //             //   item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
  //             //   item.fkPaymentRequestBusinessMemberIdrel.Userdata.length > 0
  //             //     ? item.fkPaymentRequestBusinessMemberIdrel.Userdata[0].firstname.concat(
  //             //         item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
  //             //           item.fkPaymentRequestBusinessMemberIdrel.Userdata
  //             //             .length > 0
  //             //           ? " " +
  //             //               (item.fkPaymentRequestBusinessMemberIdrel
  //             //                 .Userdata[0].lastname !== null
  //             //                 ? item.fkPaymentRequestBusinessMemberIdrel
  //             //                     .Userdata[0].lastname
  //             //                 : "")
  //             //           : ""
  //             //       )
  //             //     : ""),
  //             (item.categoryName =
  //               item.fkPaymentRequestItemCategoryIdrel !== null &&
  //               item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories &&
  //               item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories
  //                 .length > 0
  //                 ? item.fkPaymentRequestItemCategoryIdrel
  //                     .MasterItemCategories[0].categoryName
  //                 : ""),
  //             (item.requestedAmount =
  //               item.requestedAmount !== undefined &&
  //               item.requestedAmount !== null
  //                 ? `$${item.requestedAmount}`
  //                 : ""),
  //             (item.createdAt =
  //               item.createdAt !== undefined && item.createdAt !== null
  //                 ? this.formatDate(item.createdAt)
  //                 : "")
  //           );
  //         });

  //         if(type == 'all'){

  //           let allData = res.data.allPaymentRequests.PaymentRequests.map(function(obj) {
  //             return {
  //               ['Payment Made For'] : obj.madefor ,
  //               ['Payment Made By'] : obj.madeby ,
  //               ['Item Category'] : obj.categoryName,
  //               ['Item Detail'] : obj.itemDetail,
  //               ['Requested Amount'] : obj.requestedAmount,
  //               ['Extra Notes'] : obj.extraNotes,
  //               ['Added On'] : obj.createdAt,
  //               ['Payment Status'] : obj.paymentStatus ,
  //               ['PPAN'] : obj.cardNumber ,
  //               ['Card Status'] : obj.cardStatus ,
  //               ['Ext Txn Id'] : obj.externaltransid ,
  //             };
  //           });

  //           // return (<CSVDownload data={
  //           //   res.data &&
  //           //   res.data.allPaymentRequests &&
  //           //   res.data.allPaymentRequests !== null
  //           //     ? res.data.allPaymentRequests.PaymentRequests
  //           //     : []
  //           // } target="_blank" />);

  //           this.setState({
  //             allCSVData : res.data &&
  //             res.data.allPaymentRequests &&
  //             res.data.allPaymentRequests !== null
  //               ? allData
  //               : []
  //           })
  //         }else{
  //           this.setState({
  //             count:
  //               res.data &&
  //               res.data.allPaymentRequests &&
  //               res.data.allPaymentRequests !== null
  //                 ? res.data.allPaymentRequests.totalCount
  //                 : "",
  //             listData:
  //               res.data &&
  //               res.data.allPaymentRequests &&
  //               res.data.allPaymentRequests !== null
  //                 ? res.data.allPaymentRequests.PaymentRequests
  //                 : ""
  //           });

  //         }

  //       }
  //     })
  //     .catch(e => {
  //       swal({ title: e.message, icon: "warning" });
  //       this.setState({ listData: [] });
  //     });
  // };

  resetFilters = () => {
    delete this.state.filter.createdBy;

    // delete this.state.filter.txnType;
    this.setState(
      {
        // filter,
        paymentxyz: null,
      },
      () => {
        this.paymentRequestData();
      }
    );
  };
  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size,
      },
      () => {
        this.paymentRequestData();
      }
    );
  };
  handleClose = () => {
    this.setState({ openModal: false, paymentImages: [] });
  };
  handleCloseShopping = () => {
    this.setState({ openShoppingList: false, paymentShopping: undefined });
  };
  handleCloseDispute = () => {
    this.setState({ openDispute: false, paymentDispute: undefined });
  };
  openModalBox = (data) => {
    this.setState({ openModal: true });
    this.getPaymentImages(data.id);
  };
  openShoppingList = (data) => {
    this.setState({ openShoppingList: true });
    this.getShoppingList(data.id);
  };
  openDispute = (data) => {
    this.setState({ openDispute: true });
    this.getDisputes(data.id);
  };
  getShoppingList = (id) => {
    fetchMethod(paymentShoppingList, {
      where: { paymentRequestId: id },
    })
      .then((res) => res.json())
      .then((res) => {
        res.data.allRequestItemShoppingLists.RequestItemShoppingLists.length > 0
          ? this.setState({
              loading: false,
              paymentShopping:
                res.data.allRequestItemShoppingLists.RequestItemShoppingLists.map(
                  (item) => {
                    return {
                      id: item.id,
                      name: item.itemName,
                      price: item.itemPrice ? item.itemPrice : 0,
                    };
                  }
                ),
            })
          : this.setState({ loading: true });
      })
      .catch((e) => console.log(e));
  };

  getDisputes = (id) => {
    fetchMethod(paymentDisputes, {
      where: { paymentRequestId: id },
    })
      .then((res) => res.json())
      .then((res) => {
        res.data.allDisputes.Disputes.length > 0
          ? this.setState({
              loading: false,
              paymentDispute: res.data.allDisputes.Disputes.map((item) => {
                return {
                  id: item.id,
                  // name: item.itemName,
                  createdBy:
                    item.fkDisputeCreatedbyrel &&
                    item.fkDisputeCreatedbyrel.Userdata[0]
                      ? item.fkDisputeCreatedbyrel.Userdata[0].firstname +
                        (item.fkDisputeCreatedbyrel.Userdata[0].lastname
                          ? " " +
                            item.fkDisputeCreatedbyrel.Userdata[0].lastname
                          : "")
                      : "",
                  disputeStatus: item.disputeStatus ? item.disputeStatus : "",
                  createdAt: (item.createdAt =
                    item.createdAt !== undefined && item.createdAt !== null
                      ? this.formatDate(item.createdAt)
                      : ""),
                };
              }),
            })
          : this.setState({ loading: true });
      })
      .catch((e) => console.log(e));
  };

  handleFilter1 = (e) => {
    this.setState({ createdBy: e.target.value });
    const {
      target: { name, value },
    } = e;
    const { filter } = this.state;
    filter[name] = value;
    this.paymentRequestData();
    this.setState({
      [name]: value,
      filter,
    });
  };

  handleFilterAutocomplete = (e, v) => {
    if (v !== null && v !== undefined) {
      const { filter } = this.state;
      filter.createdBy = v.id;

      this.setState({ createdBy: v.id, filter, paymentxyz: v });
      // const {
      //   target: { name, value }
      // } = e;
      // const { filter } = this.state;
      // filter[name] = value;

      this.paymentRequestData();
      // this.setState({
      //   [name]: value,
      //   filter
      // });
    }
  };

  debounce = (debounceTimer, func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
    return debounceTimer;
  };
  debounceTimer = null;

  getParticipantData = () => {
    fetchMethod(paymentGuardianRequestAllQuery, {
      where: this.state.filter,
      last: this.state.rows,
      first: this.state.pageNo,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
          res.data.allUserdata.Userdata
           .map(item => {
             return (
               (item["storeId"] =
                 item.storeId && item.storeId !== null && item.storeId !== ""
                   ? item.storeId.concat(
                       item.storeId && item.storeId !== null ? " " + item.storeId : ""
                     )
                   : ""),
               (item.createdAt = this.formatDate(item.createdAt))
             );
           });

          this.setState({
             count:
               res.data && res.data.allUserdata && res.data.allUserdata !== null
                 ? res.data.allUserdata.totalCount
                 : "",
             listData:
               res.data && res.data.allUserdata && res.data.allUserdata !== null
                 ? res.data.allUserdata.Userdata
                : "",
            userData: res.data.allPaymentRequests.PaymentRequests.map(
              (item) => {
                return {
                  id: item.id,
                  name:
                    item.firstname +
                    " " +
                    (item.lastname != null ? item.lastname : ""),
                    amount: item.requestedAmount
                };
              }
            ),
          });
        }
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  handleSearchChange = (event) => {
    const { filter } = this.state;
    // const result = await this.props.filter({
      
    // })
    filter["and"] = [
      {
        or: [
        //{ storeId : { like: `%${event.target.value}%` } },
         { participantId : { like: `%${event.target.value}%` } },
         //{ id : { like: `%${event.target.value}%` } },

          //{ firstname: { like: `%${event.target.value}%` } },
           //{ lastname: { like: `%${event.target.value}%` } },
           //{ createdAt: { like: `%${event.target.value}%` } },
           //{ madefor: { like: `%${event.target.value}%` } },
           //{ madeby: { like: `%${event.target.value}%` } },
           
           //{ storeName: { like: `%${event.target.value}%` } },
           //{ requestedAmount: { like: `%${event.target.value}%` } },
        ],
      },
    ];

    this.setState({ listData: undefined });
    this.setState({
      search: event.target.value,
      filter,
      pageNo: this.state.rows,
    });
    this.debounceTimer = this.debounce(
      this.debounceTimer,
      () => {
        this.paymentRequestData();
      },
      200
    );
  };

  getPaticipnatDropDown = () => {
    fetchMethod(userdataQuery, {
      where: {
        active: 1,
        guardianId: localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).id
          : "",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          userData: res.data.allUserdata.Userdata.map((item) => {
            return {
              id: item.id,
              name:
                item.firstname +
                " " +
                (item.lastname != null ? item.lastname : ""),
              storename: item.storeName,
            };
          }),
        });
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
      });
  };

  UserdataCardtransferCall = (id, amt, desc, flag, isbusiness) => {
    fetchMethod(UserdataCardtransfer(id, amt, desc, flag, isbusiness))
      .then((response) => response.json())
      .then((res) => {})
      .catch((e) => {
        console.log("UserdataCardtransfer error ", e);
      });
  };

  GetBalanceData = (id) => {
    fetchMethod(UserdataCheckBalance(id))
      .then((response) => response.json())
      .then((res) => {
        // fetchMethod(UserdataCardtransfer(id, amt, desc))
        //   .then(response => response.json())
        //   .then(res => {
        //     console.log(
        //       "res status card UserdataCardtransfer at PaymentStatus screen",
        //       res
        //     );
        //   })
        //   .catch(e => {
        //     alert(e);
        //     console.log("UserdataCardtransfer error ", e);
        //   });
      })
      .catch((e) => {
        swal({ title: e, icon: "warning" });
      });
  };

  CallsendNotificationApi = (token, title, body, data) => {
    // console.log(
    //   "GetUserdataNotification token,title,body,data",
    //   token,
    //   title,
    //   body,
    //   data
    // );
    fetchMethod(GetUserdataNotification(token, title, body, data))
      .then((response) => response.json())
      .then((res) => {
        // console.log("GetUserdataNotification on payment status", res);
      })
      .catch((e) => {
        swal({ title: e, icon: "warning" });
      });
  };

  Blockusercard = (data) => {
    this.unloadApi(data, 1);
  };
  blockfunction = (createdBy, cardId, businessflag) => {
    // console.log("")
    fetchMethod(UserdataCardBlock(createdBy, businessflag))
      .then((response) => response.json())
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.UserdataCardBlock &&
          res.data.UserdataCardBlock.resultCode &&
          res.data.UserdataCardBlock.resultCode !== "0"
        ) {
        } else {
          fetchMethod(updateCardStatus(cardId))
            .then((response) => response.json())
            .then((res) => {
              this.paymentRequestData();
              swal({ title: "CARD BLOCKED", icon: "success" });
            })
            .catch((e) => {
              swal({ title: e, icon: "warning" });
            });
        }
      })
      .catch((e) => {
        swal({ title: e, icon: "warning" });
      });
  };
  unloadApi = (data, blockflag) => {
    console.log(
      "EEEEEDATA /................./",
      data.fkpaymentrequestcreatebymaprel.Userdata[0].role,
      blockflag
    );

    if (data.createdBy) {
      let isbusiness =
        data.fkpaymentrequestcreatebymaprel &&
        data.fkpaymentrequestcreatebymaprel.Userdata[0] &&
        data.fkpaymentrequestcreatebymaprel.Userdata[0].role ===
          "BUSINESSMEMBER"
          ? 1
          : 0;
      let userid = isbusiness === 1 ? data.storeId : data.createdBy;

      fetchMethod(UserdataCheckBalance(userid, isbusiness))
        .then((response) => response.json())
        .then((res) => {
          if (
            res &&
            res.data &&
            res.data.UserdataCheckBalance &&
            res.data.UserdataCheckBalance.data &&
            res.data.UserdataCheckBalance.data.balance &&
            res.data.UserdataCheckBalance.data.balance.availableAmount > 0
          ) {
            // this.UserdataCardtransferCall(
            //   userid,
            //   res.data.UserdataCheckBalance.data.balance.availableAmount,
            //   "withdraw",
            //   0,
            //   isbusiness
            // );
            // console.log(
            // "REset....................",
            // data.requestedAmount.substring(1, data.requestedAmount.length)
            // );

            fetchMethod(
              UserdataCardtransfer(
                userid,
                res.data.UserdataCheckBalance.data.balance.availableAmount,
                "withdraw",
                0,
                isbusiness
              )
            )
              .then((response) => response.json())
              .then((response) => {
                if (
                  response &&
                  response.data &&
                  response.data.UserdataCardtransfer &&
                  response.data.UserdataCardtransfer.resultCode &&
                  response.data.UserdataCardtransfer.resultCode === "0"
                ) {
                  if (blockflag == 1) {
                    this.blockfunction(
                      userid,
                      data.createdbycardid,
                      isbusiness
                    );
                  }

                  fetchMethod(
                    getUserBudget(data.participantId, data.itemCategoryId)
                  )
                    .then((response) => response.json())
                    .then((respp) => {
                      let budget =
                        respp.data.allBudgets &&
                        respp.data.allBudgets.Budgets[0]
                          ? respp.data.allBudgets.Budgets[0]
                          : {};
                      let amount = parseFloat(
                        budget.budgetAvailable
                          ? budget.budgetAvailable +
                              res.data.UserdataCheckBalance.data.balance
                                .availableAmount
                          : 0 +
                              res.data.UserdataCheckBalance.data.balance
                                .availableAmount
                      );
                      const Obj = {
                        obj: {
                          budgetAvailable: amount,
                          id: budget.id,
                        },
                      };
                      fetchMethod(updateUserBudget, Obj)
                        .then((respUpdate) => respUpdate.json())
                        .then((respUpdate) => {
                          console.log(
                            "res status PaymentConfirmation updateUserBudget",
                            res
                          );
                          // alert("Payment Cancelled Successfully!");
                          // swal({title:})
                        })
                        .catch((e) => {
                          console.log(
                            "updateUserBudget on PaymentConfirmation error ",
                            e
                          );
                        });
                    });
                  fetchMethod(getCardDetailsQuery, {
                    where: { userId: data.participantId },
                  })
                    .then((resp) => resp.json())
                    .then((resp) => {
                      if (
                        resp &&
                        resp.data &&
                        resp.data.allCardDetails &&
                        resp.data.allCardDetails.CardDetails &&
                        resp.data.allCardDetails.CardDetails != ""
                      ) {
                        // let cardlimit = resp.data.allCardDetails.CardDetails[0]
                        //   .cardLimit
                        //   ? resp.data.allCardDetails.CardDetails[0].cardLimit +
                        //     res.data.UserdataCheckBalance.data.balance
                        //       .availableAmount
                        //   : res.data.UserdataCheckBalance.data.balance
                        //       .availableAmount;

                        let DATA = resp.data.allCardDetails.CardDetails;

                        let cardlimit =
                          DATA &&
                          DATA[DATA.length - 1] &&
                          DATA[DATA.length - 1].cardLimit
                            ? DATA[DATA.length - 1].cardLimit
                            : 0;

                        let Bal =
                          res.data.UserdataCheckBalance.data.balance
                            .availableAmount;

                        if (Bal && Bal > 0) {
                          cardlimit = cardlimit ? cardlimit + Bal : 0 + Bal;
                        }

                        let cardId =
                          DATA &&
                          DATA[DATA.length - 1] &&
                          DATA[DATA.length - 1].id
                            ? DATA[DATA.length - 1].id
                            : 0;

                        // let cardId = resp.data.allCardDetails.CardDetails[0].id;
                        const Obj = {
                          obj: {
                            // paymentrequestid: data.id,
                            id:
                              response.data.UserdataCardtransfer &&
                              response.data.UserdataCardtransfer.ledgerid
                                ? response.data.UserdataCardtransfer.ledgerid
                                : "",
                            createdBy: JSON.parse(
                              localStorage.getItem("userInfo")
                            ).id,
                            cardlimit: cardlimit,
                            userId: data.participantId,
                            cardDetailId: data.cardId,
                            amountAdded:
                              res.data.UserdataCheckBalance.data.balance
                                .availableAmount,
                            // txnId:
                            //   res.data.UserdataCardtransfer &&
                            //   res.data.UserdataCardtransfer.transNo
                            //     ? res.data.UserdataCardtransfer.transNo
                            //     : "",
                            txnType: "CREDIT",
                          },
                        };
                        fetchMethod(updateSuperledger, Obj)
                          .then((response) => response.json())
                          .then((res) => {
                            if (
                              res &&
                              res.data &&
                              res.data.saveSuperLedger &&
                              res.data.saveSuperLedger.id
                            ) {
                              fetchMethod(userdataQuery, {
                                where: { id: data.participantId },
                              })
                                .then((res) => res.json())
                                .then((res) => {
                                  if (
                                    res.data.allUserdata != undefined &&
                                    res.data.allUserdata.Userdata[0]
                                      .loginDevice != null
                                  ) {
                                    let title = "Payment";
                                    let body = ` ${
                                      JSON.parse(
                                        localStorage.getItem("userInfo")
                                      ).fullName
                                    } Added $${
                                      res.data.UserdataCheckBalance.data.balance
                                        .availableAmount
                                    } to your card.`;
                                    this.CallsendNotificationApi(
                                      res.data.allUserdata.Userdata[0]
                                        .loginDevice,
                                      title,
                                      body,
                                      title
                                    );
                                  }
                                })
                                .catch((e) => console.log(e));

                              fetchMethod(
                                updateCardLimit(
                                  data.participantId,
                                  cardId,
                                  cardlimit
                                )
                              )
                                .then((res) => res.json())
                                .then((res) => {
                                  if (
                                    res &&
                                    res.data &&
                                    res.data.saveCardDetail &&
                                    res.data.saveCardDetail.id
                                  ) {
                                    if (blockflag != 1) {
                                      swal({
                                        text: "Unload successfully.",
                                        icon: "success",
                                      });
                                    }
                                  } else {
                                    // console.log(
                                    //   "updateCardLimit not done error",
                                    //   res
                                    // );
                                  }
                                })
                                .catch((e) => {
                                  // setLoading(false);
                                  // alert(e);
                                  swal({ title: e, icon: "warning" });
                                });

                              // swal({
                              //   title: "Unload successfully.",
                              //   icon: "success."
                              // });
                            }
                          })
                          .catch((error) => {
                            swal({ title: error.message, icon: "warning" });
                          });
                      }
                    })
                    .catch((error) => {
                      swal({ title: error.message, icon: "warning" });
                    });
                } else {
                  let Err =
                    response.data.UserdataCardtransfer.resultDescription;

                  swal({
                    title: response.data.UserdataCardtransfer.resultDescription,
                    icon: "warning",
                  });
                }
              })
              .catch((e) => {
                console.log("UserdataCardtransfer error ", e);
              });

            // getCardDetailsQuery

            // console.log("updateSuperledger on payment status", res);
            // let Data = {};
            // if (
            //   res &&
            //   res.data &&
            //   res.data.saveSuperLedger &&
            //   res.data.saveSuperLedger.id
            // ) {
            //   Data = res.data.saveSuperLedger;
            //   if (data.participantId && CardID) {
            //     callUpdateCardLimit(data.participantId, CardID, CardL);
            //   }
            // }
            // let loginDevice = "";
            // if (
            //   Data &&
            //   Data.fkuseridsuperledgermaprel &&
            //   Data.fkuseridsuperledgermaprel.Userdata &&
            //   Data.fkuseridsuperledgermaprel.Userdata != "" &&
            //   Data.fkuseridsuperledgermaprel.Userdata[0].loginDevice
            // ) {
            //   loginDevice =
            //     Data.fkuseridsuperledgermaprel.Userdata[0].loginDevice;
            // }
            // if (loginDevice && userRole && userRole !== "PARTICIPANT") {
            //   CallsendNotificationApi(loginDevice, title, body, title);
            // }
            // })
            // .catch(e => {
            //   alert(e);
            //   console.log("updateSuperledger on payment status error ", e);
            // });
          } else if (
            res &&
            res.data &&
            res.data.UserdataCheckBalance &&
            res.data.UserdataCheckBalance.data &&
            res.data.UserdataCheckBalance.data.balance &&
            res.data.UserdataCheckBalance.data.balance.availableAmount <= 0
          ) {
            if (blockflag == 1) {
              this.blockfunction(userid, data.createdbycardid, isbusiness);
            } else {
              swal({ title: "There are no fund to unload.", icon: "warning" });
            }
          } else if (
            res &&
            res.data &&
            res.data.UserdataCheckBalance &&
            res.data.UserdataCheckBalance.resultDescription
          ) {
            swal({
              title: res.data.UserdataCheckBalance.resultDescription,
              icon: "warning",
            });
          }
        })
        .catch((e) => {
          swal({ title: e, icon: "warning" });
        });
    } else {
      return;
    }
    // .then(res => {
    //   // this.
    // });
  };
  render() {
    // const roleOptions = [
    //   { role: "PARTICIPANT" },
    //   { role: "BUSINESSMEMBER" },
    //   { role: "SUPPORTER" }
    // ];
    const nameColumn = [
      {
        Header: "S No.",
        Cell: (row) => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45,
      },
    ];

    const actionButton = [
      {
        Header: "View Images",
        sortable: false,
        Cell: (row) => (
          <div
            onClick={() => {
              this.openModalBox(row.original);
            }}
          >
            <span className="viewimageLink">
              <u>View</u>
            </span>
          </div>
        ),
      },
      {
        Header: "View Shopping ",
        sortable: false,
        Cell: (row) => (
          <div
            onClick={() => {
              this.openShoppingList(row.original);
            }}
          >
            <span className="viewshoppingLink">
              <u>View</u>
            </span>
          </div>
        ),
      },
      {
        Header: "View Dispute ",
        sortable: false,
        Cell: (row) => (
          <div
            onClick={() => {
              this.openDispute(row.original);
            }}
          >
            <span className="viewshoppingLink">
              <u>View</u>
            </span>
          </div>
        ),
      },
      {
        Header: "UNLOAD CARD",
        sortable: false,
        Cell: (row) => (
          <div>
            {row.original.paymentStatus === "Complete" &&
            row.original.isrelated === 1 ? (
              <Button
                className="resetBtn"
                onClick={() => {
                  this.unloadApi(row.original);
                }}
              >
                UNLOAD
              </Button>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        Header: "BLOCK CARD",
        sortable: false,
        Cell: (row) => (
          <div>
            {row.original.cardStatus === "UNBLOCK" &&
            row.original.isrelated === 1 &&
            row.original.fkpaymentrequestcreatebymaprel &&
            row.original.participantId !== row.original.createdBy ? (
              <Button
                className="resetBtn"
                onClick={() => {
                  this.Blockusercard(row.original);
                }}
              >
                BLOCK
              </Button>
            ) : (
              ""
            )}
          </div>
        ),

        //   onClick={() => {
        //     this.openDispute(row.original);
        //   }}
        // <span className="viewshoppingLink">
        //   <u>View</u>
        // </span>

        // </div>
      },
    ];

    const columns = nameColumn
      .concat(adminPaymentRequestList.columns)
      .concat(actionButton);
    return (
      <div className="adminPaymentSection">
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="viewImageScrollModal"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Images
          </DialogTitle>
          <DialogContent>
            <Carousel>
              {this.state.paymentImages.length > 0 ? (
                this.state.paymentImages.map((item, index) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Image_GETURL + item.url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))
              ) : (
                <div>
                  <img
                    src={noImgFound}
                    alt="noImgFound"
                    className="noImageFound"
                  />
                </div>
              )}
            </Carousel>
          </DialogContent>
          <DialogButton></DialogButton>
        </Dialog>
        <Dialog
          open={this.state.openShoppingList}
          onClose={this.handleCloseShopping}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="shoppinglistMOdal"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseShopping}
          >
            Shopping List
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl>
                <ul
                  className={
                    this.state.paymentShopping ? "showtable" : "hidetable"
                  }
                >
                  <li>
                    <b>Product</b>
                  </li>
                  <li>
                    <b>Price</b>
                  </li>
                </ul>
                <span className="shoppingListData">
                  {this.state.paymentShopping
                    ? this.state.paymentShopping.map((item, index) => {
                        return (
                          <FormControl>
                            <MenuItem>
                              <span> {item.name}</span>
                            </MenuItem>{" "}
                            <MenuItem>
                              {" "}
                              <span>${item.price}</span>{" "}
                            </MenuItem>
                          </FormControl>
                        );
                      })
                    : "There is no shopping list found."}
                </span>
                {/* </ol> */}
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton></DialogButton>
        </Dialog>

        <Dialog
          open={this.state.openDispute}
          onClose={this.handleCloseDispute}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="shoppinglistMOdal "
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseDispute}
          >
            Dispute
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl>
                <ul
                  className={
                    this.state.paymentDispute ? "showtable" : "hidetable"
                  }
                >
                  <li>
                    <b>Raised By</b>
                  </li>
                  <li>
                    <b>Created At</b>
                  </li>
                  <li>
                    <b> Dispute Status</b>
                  </li>
                </ul>
                <span className="shoppingListData">
                  {this.state.paymentDispute
                    ? this.state.paymentDispute.map((item, index) => {
                        return (
                          <FormControl>
                            <MenuItem>
                              <span> {item.createdBy}</span>
                            </MenuItem>{" "}
                            <MenuItem>
                              {" "}
                              <span>{item.createdAt}</span>{" "}
                            </MenuItem>
                            <MenuItem>
                              {" "}
                              <span>{item.disputeStatus}</span>{" "}
                            </MenuItem>
                          </FormControl>
                        );
                      })
                    : "There is no Dispute Raised."}
                </span>
                {/* </ol> */}
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton></DialogButton>
        </Dialog>
        <h2>Payment Request</h2>
        <div className="paymentFex">
          {/* <FormControl className="searchTextField">
            {/* <InputLabel id="demo-simple">Payment MadeBy</InputLabel> */}
          {/* <Select
            labelid="demo-simple"
            value={this.state.createdBy}
            onChange={this.handleFilter1}
            input={<Input />}
            name="createdBy"
            MenuProps={MenuProps}
            // disabled={true}
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

          {/* <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.paymentxyz}
              options={this.state.userData ? this.state.userData : ""}
              onChange={(e, v) => this.handleFilterAutocomplete(e, v)}
              getOptionLabel={option =>
                option &&
                option
                  ? option.firstname +
                    (option.lastname ? " " + option.lastname : "")
                  : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Payment Made By"
                  variant="outlined"
                />
              )}
            />
          </FormControl>  */}

          <div className="searchPayment">
            <TextField
              style={{ width: 605 }}
              type="text"
              placeholder="Search Payment Made By, 
              Payment Made For, Requested Amount,
           Store Name, Added On"
              value={this.state.search}
              onChange={this.handleSearchChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <img
                    src={SearchIcon}
                    alt=""
                    style={{ width: "15px", cursor: "pointer" }}
                  />
                ),
              }}
            />
          </div>
          <div>
            <Button className="resetBtn" onClick={this.resetFilters}>
              Reset
            </Button>
          </div>
        </div>
        {this.state.listData ? (
          <div className="adminPaymentTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminPaymentRequestList}
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              initialPage={this.state.pageNo / this.state.rows}
              onRowClick={() => {}}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows,
              }}
            />
          </div>
        ) : (
          <div className="spinner">
            <DotLoader size={70} color={"#020f1f"} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(GuardianPaymentRequest);


// getBuisnessData = async () => {
//   try{
//     const resp = await fetchMethod(guardianPartiQuery, {where:this.state.filter}).then(res=>res.json())
//     console.log(resp)
//     const participant = resp.data?.allUserdata?.Userdata || []
//     console.log(participant)
//     let usersBusinessdata =[];
//     for(let i =0; i < participant.length; i++){
//       let users = await fetchMethod(guardianbusinessQuery, {where:{participantId:participant[i].id}}).then(res=>res.json())
//       console.log(users)
//       const business = users.data?.allParticipantConnectedBusinesses?.ParticipantConnectedBusinesses || []
//       business.map(item=>{
//         let usersBusiness = item.fkParticipantConnectedBusinessStoreIdrel.Businesses[0];
//         if(usersBusiness){
//           usersBusiness.id = item.id;
//           if(!usersBusinessdata.filter(business => business.storeName === usersBusiness.storeName).length){
//             usersBusinessdata.push(usersBusiness);
//           }
//         }
//       })
//     }
//     this.setState({
//       listData : usersBusinessdata
//     })
//   }
//   catch(error){
//     swal({ title: error.message, icon: "warning" });
//     this.setState({ listData: [] });
//   };
// }
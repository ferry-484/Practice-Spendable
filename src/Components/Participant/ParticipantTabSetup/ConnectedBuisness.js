import React, { Component } from "react";
import ReactTableComponent from "../../../ReactTable/ReactTable";
import {
  adminBuisnessList,
  guardianBuisnessList
} from "./ParticipantTabSetupConfig";
import {
  connectedBuisnessQuery,
  OnlyParticipantConnectedBusinesses,
  UserdataCheckBalance,
  UserdataCardBlock,
  getCardDetailsQuery,
  updateCardStatus,
  UserdataCardtransfer,
  updateCardLimit,
  updateSuperledger,
  destroybusinessconnection,
  participantQuery,
  GetUserdataNotification
} from "./ParticipantTabQuery";
import { fetchMethod } from "../../../FetchMethod";
import swal from "sweetalert";
import { DotLoader } from "react-spinners";
import "./participantTabSetup.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withRouter } from "react-router-dom";
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
class ConnectedBuisness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0,
      filter: {
        participantId: this.props.id,
        order: "id desc"
      },
      totalData: undefined,
      cardData: [],
      openModal: false,
      flagged: undefined,
      businessId: undefined
    };
  }

  componentWillMount() {
    this.connectedBuisnessData();
  }

  connectedBuisnessData = flag => {
    if (localStorage.getItem("role") === "ADMIN") {
      fetchMethod(connectedBuisnessQuery, {
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
            this.setState({
              totalData: res.data.id1.ParticipantConnectedBusinesses
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
                this.props.disablerefetchConnect();
                this.props.listModalData(this.state.totalData, flag);
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
                // console.log(" not availalable", res);
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
  removeconnect = data => {
    // console.log("props ;/././././///...........", this.props.hasRefetch);
    fetchMethod(destroybusinessconnection(data.id))
      .then(response => response.json())
      .then(res => {
        swal({ title: "Removed Successfully.", icon: "success" });
        this.connectedBuisnessData(1);
        // this.connectedBuisness(1)
        // this.props.hasRefetch : true;
        // this.props.push("/participants");
      });
  };
  getCardDetails(businessid) {
    fetchMethod(getCardDetailsQuery, {
      where: { businessId: businessid }
    })
      .then(resp => resp.json())
      .then(resp => {
        resp.data.allCardDetails.CardDetails.length > 0
          ? this.setState({
              cardData: resp.data.allCardDetails.CardDetails.map(item => {
                return {
                  id: item.id,
                  businessid: businessid,
                  cardNumber: item.cardNumber,
                  cardStatus:
                    item.cardstatus === "0" ||
                    item.cardStatus === null ||
                    item.cardstatus === ""
                      ? "UNBLOCK"
                      : "BLOCK"
                  // url: item.itemImageUrl
                };
              })
            })
          : this.setState({ loading: true });

        // var resultArr = [];
        // if (
        //   resp &&
        //   resp.data &&
        //   resp.data.allCardDetails &&
        //   resp.data.allCardDetails.CardDetails &&
        //   resp.data.allCardDetails.CardDetails.length > 0
        // ) {
        //   console.log(
        //     "res card card card",
        //     resp.data.allCardDetails.CardDetails
        //   );

        //   item[0].cardStatus =
        //     resp.data.allCardDetails.CardDetails[0].cardstatus === "0" ||
        //     resp.data.allCardDetails.CardDetails[0].cardstatus === null
        //       ? "UNBLOCK"
        //       : "BLOCK";

        //   console.log("REslkjksfjslfljksfkljasklj", item);
        //   return;
        //   // console.log("data data", data);

        //   // this.setState({
        //   //   cardDetails: resp.data.allCardDetails.CardDetails
        //   // });
        // } else {
        //   item[0].cardStatus = "";
        //   console.log("res e;se ", resp);
        //   return;
        //   // console.log("res e;se  data", data);
        // }
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  }
  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        this.connectedBuisnessData();
      }
    );
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
      .then(response => response.json())
      .then(res => {
        // console.log("GetUserdataNotification on payment status", res);
      })
      .catch(e => {
        swal({ title: e, icon: "warning" });
      });
  };
  blockfunction = (businessId, cardId) => {
    fetchMethod(UserdataCardBlock(businessId, 1))
      .then(response => response.json())
      .then(res => {
        //  if (res && res.data && res.data.allDisputes && res.data.allDisputes.Disputes != '') {

        //    saveDisputeData(res.data.allDisputes.Disputes[0])
        //   }
        if (res.data.UserdataCardBlock.resultCode === "0") {
          fetchMethod(updateCardStatus(cardId))
            .then(response => response.json())
            .then(res => {
              swal({ title: "CARD BLOCKED", icon: "success" });
            })
            .catch(e => {
              swal({ title: e, icon: "warning" });
            });
        } else {
          swal({
            title: res.data.UserdataCardBlock.resultDescription,
            icon: "warning"
          });
        }
      })
      .catch(e => {
        swal({ title: e, icon: "warning" });
      });
  };
  BlockUserCard = (businessId, cardId) => {
    if (businessId) {
      fetchMethod(UserdataCheckBalance(businessId, 1))
        .then(response => response.json())
        .then(res => {
          if (
            res &&
            res.data &&
            res.data.UserdataCheckBalance &&
            res.data.UserdataCheckBalance.data &&
            res.data.UserdataCheckBalance.data.balance &&
            res.data.UserdataCheckBalance.data.balance.availableAmount > 0
          ) {
            fetchMethod(
              UserdataCardtransfer(
                businessId,
                `${res.data.UserdataCheckBalance.data.balance.availableAmount}`,
                "test UserdataCardtransfer",
                1
              )
            )
              .then(response => response.json())
              .then(response => {
                if (
                  response &&
                  response.data &&
                  response.data.UserdataCardtransfer &&
                  response.data.UserdataCardtransfer.resultCode &&
                  response.data.UserdataCardtransfer.resultCode === "0"
                ) {
                  this.blockfunction(businessId, cardId);
                  fetchMethod(getCardDetailsQuery, {
                    where: { userId: this.props.id }
                  })
                    .then(resp => resp.json())
                    .then(resp => {
                      if (
                        resp &&
                        resp.data &&
                        resp.data.allCardDetails &&
                        resp.data.allCardDetails.CardDetails
                      ) {
                        // let cardlimit = resp.data.allCardDetails.CardDetails[0]
                        //   .cardLimit
                        //   ? resp.data.allCardDetails.CardDetails[0].cardLimit +
                        //     res.data.UserdataCheckBalance.data.balance
                        //       .availableAmount
                        //   : res.data.UserdataCheckBalance.data.balance
                        //       .availableAmount;
                        // let cardId = resp.data.allCardDetails.CardDetails[0].id;

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
                        const Obj = {
                          obj: {
                            id:
                              response.data.UserdataCardtransfer &&
                              response.data.UserdataCardtransfer.ledgerid
                                ? response.data.UserdataCardtransfer.ledgerid
                                : "",
                            createdBy: JSON.parse(
                              localStorage.getItem("userInfo")
                            ).id,
                            cardlimit: cardlimit,
                            userId: this.props.id, //participant id
                            cardDetailId: cardId,
                            amountAdded:
                              res.data.UserdataCheckBalance.data.balance
                                .availableAmount,
                            // txnId:
                            //   res.data.UserdataCardtransfer &&
                            //   res.data.UserdataCardtransfer.transNo
                            //     ? res.data.UserdataCardtransfer.transNo
                            //     : "",
                            txnType: "CREDIT"
                          }
                        };

                        fetchMethod(updateSuperledger, Obj)
                          .then(response => response.json())
                          .then(res => {
                            if (
                              res &&
                              res.data &&
                              res.data.saveSuperLedger &&
                              res.data.saveSuperLedger.id
                            ) {
                              fetchMethod(participantQuery, {
                                where: { id: this.props.id }
                              })
                                .then(res => res.json())
                                .then(res => {
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
                                    } in your card.`;
                                    this.CallsendNotificationApi(
                                      res.data.allUserdata.Userdata[0]
                                        .loginDevice,
                                      title,
                                      body,
                                      title
                                    );
                                  }
                                })
                                .catch(e => console.log(e));

                              fetchMethod(
                                updateCardLimit(
                                  this.props.id,
                                  cardId,
                                  cardlimit
                                )
                              )
                                .then(res => res.json())
                                .then(res => {
                                  // setLoading(false);
                                  if (
                                    res &&
                                    res.data &&
                                    res.data.saveCardDetail &&
                                    res.data.saveCardDetail.id
                                  ) {
                                    // swal({
                                    //   text: "Unload successfully.",
                                    //   icon: "success"
                                    // });
                                  } else {
                                    // console.log(
                                    //   "updateCardLimit not done error",
                                    //   res
                                    // );
                                  }
                                })
                                .catch(e => {
                                  // setLoading(false);
                                  swal({ title: e, icon: "warning" });
                                });

                              // swal({ title: "Unload successfully.", icon: "success." });
                            }
                          })
                          .catch(error => {
                            swal({ title: error.message, icon: "warning" });
                          });
                      }
                    });

                  // swal({
                  //   title: "Not able to unload so can not block the card.",
                  //   icon: "warning."
                  // });
                } else {
                  swal({
                    title: response.data.UserdataCardtransfer.resultDescription, //"Not able to unload so can not block the card.",
                    icon: "warning"
                  });
                }
              })
              .catch(e => {
                swal({ title: e, icon: "warning" });
              });
          } else if (
            res &&
            res.data &&
            res.data.UserdataCheckBalance &&
            res.data.UserdataCheckBalance.data &&
            res.data.UserdataCheckBalance.data.balance &&
            res.data.UserdataCheckBalance.data.balance.availableAmount <= 0
          ) {
            this.blockfunction(businessId, cardId);
          } else {
            swal({
              title: res.data.UserdataCheckBalance.resultDescription,
              icon: "warning"
            });
          }
        })
        .catch(e => {
          swal({ title: e, icon: "warning" });
        });
    }
  };
  openModalBox = data => {
    // <div>hello</div>;

    this.setState({
      openModal: true,
      flagged: data.flagged,
      businessId: data.storeId
    });
    this.getCardDetails(data.storeId);
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      cardData: [],
      flagged: undefined,
      businessId: undefined
    });
  };
  render() {
    const actionButton = [
      localStorage.getItem("role") === "ADMIN"
        ? {
            Header: "View Card",
            sortable: false,
            Cell: row => (
              <div
                onClick={() => {
                  this.openModalBox(row.original);
                }}
              >
                <span className="viewimageLink">
                  <u>View</u>
                </span>
              </div>
            )
          }
        : "",
      localStorage.getItem("role") === "ADMIN"
        ? {
            Header: "",
            sortable: false,
            Cell: row => (
              // <div
              //   onClick={() => {
              //     this.openModalBox(row.original);
              //   }}
              // >
              // {/* <span className="viewimageLink">
              //   <u>View</u>
              // </span> */}
              // </div>

              <div>
                <Button onClick={() => this.removeconnect(row.original)}>
                  Remove
                </Button>
              </div>
            )
          }
        : ""
    ];
    const nameColumn = [
      localStorage.getItem("role") === "ADMIN"
        ? {
            Header: "S No.",
            Cell: row => {
              return <div className="dot">{row.original.sNo}</div>;
            },
            width: 45
          }
        : ""
    ];
    const columns = nameColumn
      .concat(adminBuisnessList.columns)
      .concat(actionButton);
    return (
      <div>
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="shoppinglistMOdal "
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            View Card
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl>
                <ul
                  className={
                    this.state.cardData.length > 0 ? "showtable" : "hidetable"
                  }
                >
                  <li>
                    <b>PPAN</b>
                  </li>
                  <li>
                    <b>Card Status</b>
                  </li>
                  {/* <li>
                    <b> Dispute Status</b>
                  </li> */}
                </ul>
                <span
                  className={
                    this.state.flagged == "YES"
                      ? " blockbtn shoppingListData"
                      : "shoppingListData"
                  }
                >
                  {this.state.cardData.length > 0 ? (
                    this.state.cardData.map((item, index) => {
                      return (
                        <FormControl>
                          <MenuItem>
                            <span> {item.cardNumber}</span>
                          </MenuItem>{" "}
                          <MenuItem>
                            {" "}
                            <span>{item.cardStatus}</span>{" "}
                            {/* {item.cardStatus === "UNBLOCK" &&
                            this.state.flagged == "YES" ? (
                              <Button
                                className="blockbtn"
                                onClick={() => {
                                  this.BlockUserCard(item.businessid, item.id);
                                }}
                              >
                                {" "}
                                BLOCK{" "}
                              </Button>
                            ) : (
                              ""
                            )} */}
                          </MenuItem>
                        </FormControl>
                      );
                    })
                  ) : (
                    <p
                    // style={{
                    //   textAlign: "center"
                    // }}
                    >
                      There is no card
                    </p>
                  )}
                </span>
                {/* </ol> */}
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton></DialogButton>
        </Dialog>
        {this.props.hasRefetch ? this.connectedBuisnessData() : ""}
        {this.state.listData ? (
          <div className="connectedBuisness">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={
                localStorage.getItem("role") === "ADMIN"
                  ? adminBuisnessList
                  : guardianBuisnessList
              }
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
      </div>
    );
  }
}

export default ConnectedBuisness;

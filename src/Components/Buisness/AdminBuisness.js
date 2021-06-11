import React, { Component } from "react";
import SearchIcon from "../../assets/search.svg";
import {
  TextField,
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
import ReactTableComponent from "../../ReactTable/ReactTable";
import { adminBuisnessList } from "./BuisnessConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Activate from "../../assets/Activate_User.svg";
import Deactivate from "../../assets/Deactivate_User.svg";
import { fetchMethod } from "../../FetchMethod";
import {
  businessQuery,
  saveBusiness,
  getCardDetailsQuery
} from "./BuisnessQuery";
import { DotLoader } from "react-spinners";
import swal from "sweetalert";
import "./buisness.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withRouter } from "react-router-dom";
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
class AdminBuisness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      listData: undefined,
      filter: {
        // active: 1,
        order: "id desc"
      },
      search: "",
      count: 0,
      cardData: []
    };
  }

  componentWillMount() {
    this.getBuisnessData();
  }

  getBuisnessData = () => {
    fetchMethod(businessQuery, {
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
            count:
              res.data &&
              res.data.allBusinesses &&
              res.data.allBusinesses !== null
                ? res.data.allBusinesses.totalCount
                : "",
            listData:
              res.data &&
              res.data.allBusinesses &&
              res.data.allBusinesses !== null
                ? res.data.allBusinesses.Businesses
                : ""
          });
        }
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        this.getBuisnessData();
      }
    );
  };

  debounce = (debounceTimer, func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
    return debounceTimer;
  };
  debounceTimer = null;

  handleSearchChange = event => {
    let { filter } = this.state;
    // filter = { storeName: { like: `%${event.target.value}%` } };
    filter["and"] = [
      {
        or: [
          { storeName: { like: `%${event.target.value}%` } },
          { contactLocationCity: { like: `%${event.target.value}%` } }
        ]
      }
    ];

    this.setState({ listData: undefined });
    this.setState({
      search: event.target.value,
      filter,
      pageNo: this.state.rows
    });
    this.debounceTimer = this.debounce(
      this.debounceTimer,
      () => {
        this.getBuisnessData();
      },
      200
    );
  };

  handleDelete = row => {
    if (row.active === 1 || row.active === "1") {
      swal({
        title: "Are you sure you really want to deactivate this record",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const test = {
            id: row.id,
            active: 0
          };

          fetchMethod(saveBusiness, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveBusiness.id;
              swal({
                title: id
                  ? "Deactivated successfully"
                  : "Error in deactivating.",
                icon: "success"
              });
              if (id) {
                let pageNo = this.state.pageNo;
                let previousData = this.state.listData.length;
                this.setState({ listData: undefined });

                const { filter } = this.state;

                let search = this.state.search;

                if (this.state.search != "" && previousData === 1) {
                  pageNo = this.state.rows;
                  delete filter["and"];
                  search = "";
                } else if (
                  this.state.search == "" &&
                  previousData === 1 &&
                  pageNo != this.state.rows
                ) {
                  pageNo = this.state.pageNo - this.state.rows;
                } else {
                  pageNo = this.state.pageNo;
                }

                this.setState({ pageNo, filter, search }, () =>
                  this.getBuisnessData()
                );
              }
            })
            .catch(e => {
              swal({ title: e.message, icon: "warning" });
              this.setState({ listData: [] });
            });
        }
      });
    }

    if (row.active === 0 || row.active === "0") {
      swal({
        title: "Are you sure you really want to activate this record.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const test = {
            id: row.id,
            active: 1
          };

          fetchMethod(saveBusiness, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveBusiness.id;
              swal({
                title: id ? "Activated successfully" : "Error in activating.",
                icon: "success"
              });
              if (id) {
                let pageNo = this.state.pageNo;
                let previousData = this.state.listData.length;
                this.setState({ listData: undefined });

                const { filter } = this.state;

                let search = this.state.search;

                if (this.state.search != "" && previousData === 1) {
                  pageNo = this.state.rows;
                  delete filter["and"];
                  search = "";
                } else if (
                  this.state.search == "" &&
                  previousData === 1 &&
                  pageNo != this.state.rows
                ) {
                  pageNo = this.state.pageNo - this.state.rows;
                } else {
                  pageNo = this.state.pageNo;
                }

                this.setState({ pageNo, filter, search }, () =>
                  this.getBuisnessData()
                );
              }
            })
            .catch(e => {
              swal({ title: e.message, icon: "warning" });
              this.setState({ listData: [] });
            });
        }
      });
    }
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
                      : "BLOCK",
                  BSB: item.bsb,
                  cardType: item.fkcardtypeidrel.Cardtypes[0]
                    ? item.fkcardtypeidrel.Cardtypes[0].cardtype
                    : ""
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
    // console.log("id test..........................", item);
  }
  openModalBox = data => {
    // <div>hello</div>;
    this.setState({
      openModal: true
      // flagged: data.flagged,
      // supporterId: data.supporterId
    });
    this.getCardDetails(data.id);
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      cardData: []
      // flagged: undefined,
      // businessId: undefined
    });
  };
  addBuisness = () => {
    this.props.history.push("/addBuisness");
  };

  addBuisnessType = () => {
    this.props.history.push("/addBuisnesstype");
  };


  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editBuisness",
      state: { details: data.id }
    });
  };

  adminBuisnessInfo = data => {
    this.props.history.push({
      pathname: "/buisnessInfo",
      state: { details: data.id }
    });
  };

  viewMember = data => {
    this.props.history.push({
      pathname: "/buisnessMember",
      state: { details: data.id }
    });
  };

  render() {
    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      },
      {
        Header: "Store Name",
        Cell: row => {
          return (
            <div
              onClick={() => {
                this.adminBuisnessInfo(row.original);
              }}
            >
              {row.original.storeName}
            </div>
          );
        }
      }
    ];

    const actionButton = [
      {
        Header: "View Members",
        sortable: false,
        Cell: row => (
          <div
            onClick={() => {
              this.viewMember(row.original);
            }}
          >
            <span>View</span>
          </div>
        )
      },
      {
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
      },
      {
        Header: "",
        sortable: false,
        Cell: row => (
          <div className="action">
            {row.original.active == 1 ? (
              <IconButton
                aria-label="edit"
                onClick={() => this.handleEditModal(row.original)}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton
              className="statusLink"
              aria-label="delete"
              onClick={() => this.handleDelete(row.original)}
            >
              {row.original.active === 1 ? (
                <img src={Activate} alt="ACTIVATE" />
              ) : (
                <img src={Deactivate} alt="Delete" />
              )}
              {/* <img src={Delete} alt="Delete" /> */}
            </IconButton>
          </div>
        )
      }
    ];

    const columns = nameColumn
      .concat(adminBuisnessList.columns)
      .concat(actionButton);
    return (
      <div className="buisnessSection">
        <h3>Business</h3>
        <div className="formFlex">
          <div className="searchTextField">
            <TextField
              type="text"
              placeholder="By City, Store Name"
              value={this.state.search}
              onChange={this.handleSearchChange}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <img
                    src={SearchIcon}
                    alt=""
                    style={{ width: "15px", cursor: "pointer" }}
                  />
                )
              }}
            />
          </div>
          <div>
          <Button onClick={this.addBuisnessType}>Add Business Type</Button>
            <Button onClick={this.addBuisness}>Add Business</Button>
          </div>
        </div>

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
                    this.state.cardData && this.state.cardData.length > 0
                      ? "showtable"
                      : "hidetable"
                  }
                >
                  <li>
                    <b>PPAN</b>
                  </li>
                  <li>
                    <b>BSB</b>
                  </li>
                  <li>
                    <b>Card Type</b>
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
                  {this.state.cardData && this.state.cardData.length > 0 ? (
                    this.state.cardData.map((item, index) => {
                      return (
                        <FormControl>
                          <MenuItem>
                            <span> {item.cardNumber}</span>
                          </MenuItem>{" "}
                          <MenuItem>
                            {/* {" "}
                            <span>{item.cardStatus}</span>{" "}
                            {item.cardStatus === "UNBLOCK" &&
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
                            {item.BSB}
                          </MenuItem>
                          <MenuItem>{item.cardType}</MenuItem>
                          {/* {item.cardStatus === "UNBLOCK" &&
                            this.state.flagged == "YES" ? (
                              <Button
                                onClick={() => {
                                  this.BlockUserCard();
                                }}
                              >
                                {" "}
                                BLOCK{" "}
                              </Button>
                            ) : (
                              ""
                            )} */}
                          {/* <MenuItem>
                              {" "}
                              <span>{item.disputeStatus}</span>{" "}
                            </MenuItem> */}
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

        {this.state.listData ? (
          <div className="bussinessDataTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminBuisnessList}
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

export default withRouter(AdminBuisness);

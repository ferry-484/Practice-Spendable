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
  Input,
  TextField,
} from "@material-ui/core";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { adminBuisnessList } from "./BuisnessConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Activate from "../../assets/Activate_User.svg";
import Deactivate from "../../assets/Deactivate_User.svg";
import { withRouter } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { fetchMethod } from "../../FetchMethod";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  businessQuery,
  saveBusiness,
  businessParticipantQuery,
  saveParticipantBusinessQuery,
  dropdownQuery,
  guardiandropdownQuery,
  getCardDetailsQuery,
} from "./BuisnessQuery";
import { participantQuery } from "../Participant/ParticipantQuery";
// import {businessQuery} from "../Buisness/BuisnessQuery"
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import swal from "sweetalert";
import "./buisness.css";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";
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

class GuardianBuisness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      pagenewNo: parseInt(localStorage.getItem("rows")),
      rowsnewNo: parseInt(localStorage.getItem("rows")),
      listData: undefined,
      name: "",
      business: "",
      participantOptions: [],
      BusinessesOptions: [],
      temp: [],
      filter: {
        // adminId: JSON.parse(localStorage.getItem("userInfo")).id,
        active: 1,
        order: "id desc",
      },
      search: "",
      count: 0,
      openModal: false,
      participantId: undefined,
      storeId: undefined,
      participantxyz: null,
      openModalCard: false,
      cardData: [],
    };
  }

  componentWillMount() {
    this.getBuisnessData();

    var obj = { role: "PARTICIPANT", active: 1 };
    if (localStorage.getItem("role") === "GUARDIAN") {
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
    }
    fetchMethod(guardiandropdownQuery, { where: obj })
      .then((res) => res.json())
      .then((res) => {
        res.data.allUserdata != undefined &&
        res.data.allBusinesses !== undefined
          ? this.setState(
              {
                participantOptions: res.data.allUserdata.Userdata.map(
                  (item) => {
                    return {
                      id: item.id,
                      name:
                        item.firstname +
                        " " +
                        (item.lastname != null ? item.lastname : ""),
                    };
                  }
                ),
                BusinessesOptions: res.data.allBusinesses.Businesses.map(
                  (item) => {
                    return {
                      id: item.id,
                      business: item.storeName,
                    };
                  }
                ),
              },
              () => {
                // this.BusinessmodalDropdownData(this.state.temp);
              }
            )
          : this.setState({ loading: true });
      })
      .catch((e) => console.log(e));
  }
  resetFilters = () => {
    delete this.state.filter.participantId;

    // delete this.state.filter.txnType;
    this.setState(
      {
        participantxyz: null,
        ["participantId"]: undefined,
      },
      () => {
        this.getBuisnessData();
      }
    );
  };
  BusinessmodalDropdownData = (e) => {
    fetchMethod(dropdownQuery)
      .then((res) => res.json())
      .then((res) => {
        res.data.allBusinesses !== undefined
          ? this.setState(
              {
                BusinessesOptions: res.data.allBusinesses.Businesses.map(
                  (item) => {
                    return {
                      id: item.id,
                      business: item.storeName,
                    };
                  }
                ),
              },
              () => {
                // this.BusinessmodalDropdownData(this.state.temp);
              }
            )
          : this.setState({ loading: true });
      })
      .then(() => {
        if (
          this.state.BusinessesOptions !== null &&
          this.state.BusinessesOptions !== undefined
        ) {
          let final = [...this.state.BusinessesOptions];
          // e.map(i => {
          //   console.log("$$$$$$$$$$$$$$$$$$$", i);
          // });
          let businessId = e.map(
            (i) => i.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].id
          );

          for (let i = 0; i < businessId.length; i++) {
            for (let x = 0; x < final.length; x++) {
              if (final[x].id === businessId[i]) final.splice(x, 1);
            }
          }

          this.setState({ BusinessesOptions: final });
        } else {
        }
      })
      .catch((e) => console.log(e));
  };
  getBuisnessData = () => {
    fetchMethod(businessQuery, {
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
                : "",
          });
        }
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  getBuisnessParticipantData = () => {
    this.setState({ listData: [], count: 0 });
    fetchMethod(businessParticipantQuery, {
      where: this.state.filter,
      last: this.state.rowsnewNo,
      first: this.state.pagenewNo,
    })
      .then((res) => res.json())
      .then(
        (res) => {
          if (res && res.error && res.error.statusCode === 401) {
            swal({ title: res.error.message, icon: "warning" }).then(() => {
              localStorage.clear();
              window.location = "/";
            });
          } else {
            this.BusinessmodalDropdownData(
              res.data.allParticipantConnectedBusinesses
                .ParticipantConnectedBusinesses
            );
            res.data.allParticipantConnectedBusinesses.ParticipantConnectedBusinesses.map(
              (item) => {
                return (
                  (item.storeName =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].storeName
                      : ""),
                  (item.abnNumber =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].abnNumber
                      : ""),
                  (item.mobileNo =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].mobileNo
                      : ""),
                  (item.contactLocationAdress =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].contactLocationAdress
                      : ""),
                  (item.contactLocationCity =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].contactLocationCity
                      : ""),
                  (item.email =
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses &&
                    item.fkParticipantConnectedBusinessStoreIdrel.Businesses
                      .length > 0
                      ? item.fkParticipantConnectedBusinessStoreIdrel
                          .Businesses[0].email
                      : "")
                );
              }
            );
            this.setState({
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
                  : "",
              temp:
                res.data &&
                res.data.allParticipantConnectedBusinesses &&
                res.data.allParticipantConnectedBusinesses !== null
                  ? res.data.allParticipantConnectedBusinesses
                      .ParticipantConnectedBusinesses
                  : "",
            });
          }
        },
        () => {
          // this.BusinessmodalDropdownData();
        }
      )
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  handleEditModal = (data) => {
    this.props.history.push({
      pathname: "/editBuisness",
      state: { details: data.id },
    });
  };

  adminBuisnessInfo = (data) => {
    let id =
      data.fkParticipantConnectedBusinessStoreIdrel &&
      data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0]
        ? data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].id
        : data.id;
    this.props.history.push({
      pathname: "/buisnessInfo",
      state: { details: id },
      // state: { details: data.id }
    });
  };

  handleClose = () => {
    this.setState({ storeId: undefined, openModal: false });
  };

  openModalBox = () => {
    this.setState({ openModal: true });
  };

  handleFilter = (e, v) => {
    const {
      target: { name, value },
    } = e;

    const { filter } = this.state;
    filter[name] = value;
    this.setState(
      {
        [name]: value,
        filter,
        storeId: undefined,
      },
      () => this.getBuisnessParticipantData()
    );
  };

  handleBuisnessFilter = (e) => {
    const {
      target: { name, value },
    } = e;

    const { filter } = this.state;
    filter[name] = value;
    this.setState({
      [name]: value,
      filter,
    });
  };

  handleParticipantfilter = (e, v) => {
    if (v !== null && v !== undefined) {
      const { filter } = this.state;
      filter.participantId = v.id;
      this.setState(
        {
          filter,
          participantxyz: v,
          ["participantId"]: v.id,
        },
        () => {
          this.getBuisnessParticipantData();
        }
      );
    }
  };
  filterData = () => {
    const { filter } = this.state;
    // filter["storeId"] = this.state.storeId;
    delete filter["storeId"];
    filter["participantId"] = this.state.participantId;
    this.setState(
      {
        filter,
      },
      () => this.getBuisnessParticipantData()
    );
  };

  submitButton = () => {
    if (this.state.storeId !== undefined) {
      const test = {
        storeId: this.state.storeId,
        participantId: this.state.participantId,
        createdBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
        updatedBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
      };
      fetchMethod(saveParticipantBusinessQuery, { obj: test })
        .then((res) => res.json())
        .then((response) => {
          const id = response.data.saveParticipantConnectedBusiness;
          if (id && id !== null) {
            this.filterData();
            swal({
              text: "Participant connected successfully",
              icon: "success",
            });
            this.handleClose();
          } else {
            swal("Please try again", { icon: "error" });
          }
        });

      this.setState({
        storeId: undefined,
      });
    } else {
      swal({ title: "Please select business", icon: "warning" });
    }
  };

  viewMember = (data) => {
    let id =
      data.fkParticipantConnectedBusinessStoreIdrel &&
      data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0]
        ? data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].id
        : data.id;
    this.props.history.push({
      pathname: "/buisnessMember",
      state: { details: id },
    });
  };

  handleDelete = (row) => {
    if (row.active === 1 || row.active === "1") {
      swal({
        title: "Are you sure you really want to delete this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const test = {
            id: row.id,
            active: 0,
          };

          fetchMethod(saveBusiness, { obj: test })
            .then((res) => res.json())
            .then((res) => {
              const id = res.data.saveBusiness.id;
              swal({
                title: id ? "Deleted successfully" : "Error deleting",
                icon: "success",
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
            .catch((e) => {
              swal({ title: e.message, icon: "warning" });
              this.setState({ listData: [] });
            });
        }
      });
    }
  };
  handleBusiness = (e, v) => {
    if (v !== null && v !== undefined) {
      this.setState({
        storeId: v.id,
      });
    }
  };
  // updatePagination = (pageNumber, size) => {
  //   this.setState(
  //     {
  //       pageNo: pageNumber,
  //       rows: size
  //     },
  //     () => {
  //       if (this.state.participantId) {
  //         this.getBuisnessParticipantData();
  //       } else {
  //         this.getBuisnessData();
  //       }
  //     }
  //   );
  // };

  updatePagination = (pageNumber, size) => {
    if (this.state.participantId) {
      this.setState(
        {
          pagenewNo: pageNumber,
          rowsnewNo: size,
        },
        () => {
          this.getBuisnessParticipantData();
        }
      );
    } else {
      this.setState(
        {
          pageNo: pageNumber,
          rows: size,
        },
        () => {
          this.getBuisnessData();
        }
      );
    }
  };
  getCardDetails(businessid) {
    fetchMethod(getCardDetailsQuery, {
      where: { businessId: businessid },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resp.data.allCardDetails.CardDetails.length > 0
          ? this.setState({
              cardData: resp.data.allCardDetails.CardDetails.map((item) => {
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
                    : "",
                  // url: item.itemImageUrl
                };
              }),
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
      .catch((error) => {
        swal({ title: error.message, icon: "warning" });
      });
    // console.log("id test..........................", item);
  }
  openModalCard = (data) => {
    // <div>hello</div>;
    let id =
      data.fkParticipantConnectedBusinessStoreIdrel &&
      data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0]
        ? data.fkParticipantConnectedBusinessStoreIdrel.Businesses[0].id
        : data.id;
    this.setState({
      openModalCard: true,
      // flagged: data.flagged,
      // supporterId: data.supporterId
    });
    this.getCardDetails(id);
  };
  handleCloseCard = () => {
    this.setState({
      openModalCard: false,
      cardData: [],
      // flagged: undefined,
      // businessId: undefined
    });
  };
  render() {
    const nameColumn = [
      {
        Header: "S No.",
        Cell: (row) => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45,
      },
      {
        Header: "Store Name",
        Cell: (row) => {
          return (
            <div
              onClick={() => {
                this.adminBuisnessInfo(row.original);
              }}
            >
              {row.original.storeName}
            </div>
          );
        },
      },
    ];

    const actionButton = [
      {
        Header: "View Members",
        sortable: false,
        Cell: (row) => (
          <div
            onClick={() => {
              this.viewMember(row.original);
            }}
          >
            <span>View</span>
          </div>
        ),
      },
      {
        Header: "View Card",
        sortable: false,
        Cell: (row) => (
          <div
            onClick={() => {
              this.openModalCard(row.original);
            }}
          >
            <span className="viewimageLink">
              <u>View</u>
            </span>
          </div>
        ),
      },
      // {
      //   Header: "",
      //   sortable: false,
      //   Cell: row => (
      //     <div>
      //       {!this.state.participantId ? (
      //         <IconButton
      //           aria-label="edit"
      //           onClick={() => this.handleEditModal(row.original)}
      //         >
      //           <img src={Edit} alt="Edit" />
      //         </IconButton>
      //       ) : (
      //         ""
      //       )}
      //       {!this.state.participantId ? (
      //         <IconButton
      //           className="statusLink"
      //           aria-label="delete"
      //           onClick={() => this.handleDelete(row.original)}
      //         >
      //           {/* {row.original.active === 1 ? (
      //           <img src={Activate} alt="ACTIVATE" />
      //         ) : (
      //           <img src={Deactivate} alt="Delete" />
      //         )} */}

      //           <img src={Delete} alt="Delete" />
      //         </IconButton>
      //       ) : (
      //         ""
      //       )}
      //     </div>
      //   )
      // }
    ];

    const columns = nameColumn
      .concat(adminBuisnessList.columns)
      .concat(actionButton);
    return (
      <div className="buisnessSection">
        <h3>Business</h3>
        <div className="formFlex">
          <div className="searchTextField">
            <div>
              <Dialog
                open={this.state.openModalCard}
                onClose={this.handleCloseCard}
                aria-labelledby="simple-modal-title"
                ariadescribedby="simple-modal-description"
                className="shoppinglistMOdal "
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={this.handleCloseCard}
                >
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
                        {this.state.cardData &&
                        this.state.cardData.length > 0 ? (
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
            </div>
            <FormControl>
              {/* <InputLabel id="demo-simple">Participants</InputLabel>
              <Select
                labelid="demo-simple"
                value={this.state.participantId}
                name="participantId"
                onChange={this.handleFilter}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {this.state.participantOptions !== undefined
                  ? this.state.participantOptions.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select> */}

              <Autocomplete
                id="combo-box-demo"
                size="small"
                value={this.state.participantxyz}
                options={this.state.participantOptions}
                onChange={(e, v) => this.handleParticipantfilter(e, v)}
                getOptionLabel={(option) =>
                  option && option.name ? option.name : ""
                }
                // style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Participants"
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </div>
    
          <div>
            <Button className="resetBtn" onClick={this.resetFilters}>
              Reset
            </Button>
            <Button
              onClick={() =>
                this.state.participantId !== undefined
                  ? this.openModalBox()
                  : ""
              }
            >
              Connect Business
            </Button>
          </div>
        </div>

        {this.state.listData ? (
          <div className="bussinessDataTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminBuisnessList}
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              initialPage={
                this.state.participantId
                  ? this.state.pagenewNo / this.state.rowsnewNo
                  : this.state.pageNo / this.state.rows
              }
              // this.state.pageNo / this.state.rows}
              forSerialNo={
                this.state.participantId
                  ? {
                      pageNo: this.state.pagenewNo,
                      pageSize: this.state.rowsnewNo,
                    }
                  : { pageNo: this.state.pageNo, pageSize: this.state.rows }
              }
              // forSerialNo={{
              //   pageNo: this.state.pageNo,
              //   pageSize: this.state.rows
              // }}
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
          className="chooseBuisness"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Select Business
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
                </Select> */}

              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.storeId}
                  options={this.state.BusinessesOptions}
                  onChange={(e, v) => this.handleBusiness(e, v)}
                  getOptionLabel={(option) =>
                    option && option.business ? option.business : ""
                  }
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Business"
                      variant="outlined"
                    />
                  )}
                />{" "}
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
      </div>
    );
  }
}

export default withRouter(GuardianBuisness);

import React, { Component } from "react";
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
  Input,
} from "@material-ui/core";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { adminSupporterList } from "./SupporterConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Activate from "../../assets/Activate_User.svg";
import Deactivate from "../../assets/Deactivate_User.svg";
import { withRouter } from "react-router-dom";
import { fetchMethod } from "../../FetchMethod";
import { DotLoader } from "react-spinners";
import Autocomplete from "@material-ui/lab/Autocomplete";
import swal from "sweetalert";
import {
  supporterQuery,
  getGuardianParticipant,
  getGuardianParticipantConnectedSupporter,
  saveUserdata,
  supporterParticipantQuery,
  saveParticipantSupporterQuery,
  dropdownQuery,
  guardiandropdownQuery,
} from "./SupporterQuery";
import "./supporter.css";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { RemoveShoppingCartSharp } from "@material-ui/icons";
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

class GuardianSupporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      name: "",
      participantOptions: [],
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      pagenewNo: parseInt(localStorage.getItem("rows")),
      rowsnewNo: parseInt(localStorage.getItem("rows")),
      filter: {
        active: 1,
        role: "SUPPORTER",
        order: "id desc",
      },
      count: 0,
      openModal: false,
      supporterOptions: [],
      supporterId: undefined,
      participantId: undefined,
      optionFilter: [],
      exgOption: [],
      arrData: [],
      totalData: undefined,
      participantxyz: null,
    };
  }

  formatDate = (date) => {
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
    this.getSupporterData();
    var obj = { role: "PARTICIPANT", active: 1 };
    if (localStorage.getItem("role") === "GUARDIAN") {
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
    }
    fetchMethod(guardiandropdownQuery, {
      where: obj,
    })
      .then((res) => res.json())
      .then((res) => {
        res.data.allUserdata != undefined && res.data.id1 != undefined
          ? this.setState({
              participantOptions: res.data.allUserdata.Userdata.map((item) => {
                return {
                  id: item.id,
                  name:
                    item.firstname +
                    " " +
                    (item.lastname != null ? item.lastname : ""),
                };
              }),
              supporterOptions: res.data.id1.Userdata.map((item) => {
                console.log(item);
                return {
                  id: item.id,
                  supporter: item.firstname,
                  supporterlast: item.lastname,
                  supporterPhone: item.phonenumber,

                  //  +
                  // " " +
                  // (item.lastname != null ? item.lastname : "")
                };
              }),
              // optionFilter: res.data.allUserdata.Userdata.map(item => {
              //   return {
              //     id: item.id,
              //     supporter:
              //       item.firstname +
              //       " " +
              //       (item.lastname != null ? item.lastname : "")
              //   };
              // })
            })
          : this.setState({ loading: true });
      })
      .catch((e) => console.log(e));

    // this.getSupportDropDownData(this.state.totalData)
  }

  // getSupportDropDownData = (e) => {
  //   console.log("e", e)
  // }

  // getSupporterData = (data) => {
  //   fetchMethod(supporterQuery, {
  //     where: this.state.filter,
  //     last: this.state.rows,
  //     first: this.state.pageNo,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res && res.error && res.error.statusCode === 401) {
  //         swal({ title: res.error.message, icon: "warning" }).then(() => {
  //           localStorage.clear();
  //           window.location = "/";
  //         });
  //       } else {
  //         res.data.allUserdata.Userdata.map((item) => {
  //           return (
  //             (item["fullAddress"] =
  //               item.address && item.address !== null && item.address !== ""
  //                 ? item.address.concat(
  //                     item.city && item.city !== null ? " " + item.city : ""
  //                   )
  //                 : ""),
  //             (item.dob = this.formatDate(item.dob))
  //           );
  //         });
  //         this.setState({
  //           count:
  //             res.data && res.data.allUserdata && res.data.allUserdata !== null
  //               ? res.data.allUserdata.totalCount
  //               : "",
  //           listData:
  //             res.data && res.data.allUserdata && res.data.allUserdata !== null
  //               ? res.data.allUserdata.Userdata
  //               : // .map(item => ({
  //                 //   firstname: item.firstname,
  //                 //   lastname: item.lastname,
  //                 //   phonenumber: item.phonenumber,

  //                 // }) )
  //                 "",
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       swal({ title: e.message, icon: "warning" });
  //       this.setState({ listData: [] });
  //     });
  // };
  getSupporterData = async (data) => {
    try {
      const response = await fetchMethod(getGuardianParticipant, { where: this.state.filter }).then(res => res.json());
      console.log(response);
      const participants = response?.data?.allUserdata?.Userdata || [];
      console.log(participants);
      let usersData = [];
      for(let index = 0; index < participants.length; index++) {
        let users = await fetchMethod(getGuardianParticipantConnectedSupporter, { where: { participantId: participants[index].id }}).then(_res => _res.json());
        const supporters = users?.data?.allParticipantConnectedSupporters?.ParticipantConnectedSupporters || [];
        console.log(supporters);
        supporters.map(_supporter => {
          let usersDetail = _supporter?.fkParticipantConnectedSupporterIdrel?.Userdata[0];
          if(usersDetail) {
            usersDetail.dob = this.formatDate(usersDetail.dob);
            usersDetail.id = _supporter.supporterId;
            usersDetail['fullAddress'] = ((usersDetail.address || '') + ' ' + (usersDetail.city || '')).trim();
            if(!usersData.filter(user => user.firstname === usersDetail.firstname).length) {
              usersData.push(usersDetail);
            }
            // usersData.push(usersDetail);
          }
        });
      }
      this.setState({
        count: usersData.length,
        listData: usersData
      });
    } catch (error) {
      if (error?.error?.statusCode === 401) {
        swal({ title: error.error.message || 'Something went wrong', icon: "warning" }).then(() => {
          localStorage.clear();
          window.location = "/";
        });
      }
    }
  };


  updatePagination = (pageNumber, size) => {
    console.log("eddfsk;oskk;ofd;kfk;s", pageNumber, size);
    if (this.state.participantId) {
      this.setState(
        {
          pagenewNo: pageNumber,
          rowsnewNo: size,
        },
        () => {
          this.getParticipantSupporterData();
        }
      );
    } else {
      this.setState(
        {
          pageNo: pageNumber,
          rows: size,
        },
        () => {
          this.getSupporterData();
        }
      );
    }
  };
  supportermodalDropdownData = (e) => {
    fetchMethod(dropdownQuery)
      .then((res) => res.json())
      .then((res) => {
        res.data.allUserdata !== undefined
          ? this.setState(
              {
                supporterOptions: res.data.allUserdata.Userdata.map((item) => {
                  return {
                    id: item.id,
                    supporter: item.firstname,
                    supporterlast: item.lastname,
                    supporterPhone: item.phonenumber,
                    //  +
                    // " " +
                    // (item.lastname != null ? item.lastname : "")
                  };
                }),
              },
              () => {
                // this.BusinessmodalDropdownData(this.state.temp);
              }
            )
          : this.setState({ loading: true });
      })
      .then(() => {
        if (
          this.state.supporterOptions !== null &&
          this.state.supporterOptions !== undefined
        ) {
          console.log("supporter ....................", e);
          console.log(
            "supporter optuions  ....................",
            this.state.supporterOptions
          );

          let final = [...this.state.supporterOptions];
          const arrFiltered = final.filter((el) => {
            return el != null && el != "";
          });
          console.log(arrFiltered);
          console.log("array filteres ....................", arrFiltered);
          let supporterId = e.map(
            (i) => i.fkParticipantConnectedSupporterIdrel.Userdata[0].id
          );
          console.log("iudiidiidid ", supporterId);
          for (let i = 0; i < supporterId.length; i++) {
            for (let x = 0; x < arrFiltered.length; x++) {
              if (arrFiltered[x].id === supporterId[i])
                arrFiltered.splice(x, 1);
            }
          }
          console.log("fianll................", arrFiltered);
          this.setState({ supporterOptions: arrFiltered });
        } else {
        }
      })
      .catch((e) => console.log(e));

    console.log("business optiomns", this.state.BusinessesOptions);
    console.log("temp", e);
  };
  getParticipantSupporterData = () => {
    this.setState({
      listData: [],
      count: 0,
      // exgOption: this.state.optionFilter
    });
    fetchMethod(supporterParticipantQuery, {
      where: this.state.filter,
      last: this.state.rowsnewNo,
      first: this.state.pagenewNo,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
          this.supportermodalDropdownData(
            res.data.allParticipantConnectedSupporters
              .ParticipantConnectedSupporters
          );
          this.setState({
            totalData: res.data.id1.ParticipantConnectedSupporters,
          });
          Promise.all(
            res.data.allParticipantConnectedSupporters.ParticipantConnectedSupporters.map(
              (item) => {
                this.state.supporterOptions.map((response, index) => {
                  if (response.id === item.supporterId) {
                    delete this.state.supporterOptions[index];
                  }
                });
                return (
                  (item.supporterId = item.supporterId),
                  (item.participantId = item.participantId),
                  (item.firstname =
                    item.fkParticipantConnectedSupporterIdrel.Userdata &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .firstname
                      : ""),
                  (item.lastname =
                    item.fkParticipantConnectedSupporterIdrel.Userdata &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .lastname
                      : ""),
                  (item.email =
                    item.fkParticipantConnectedSupporterIdrel.Userdata &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .email
                      : ""),
                  (item.phonenumber =
                    item.fkParticipantConnectedSupporterIdrel.Userdata &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .phonenumber
                      : ""),
                  (item["fullAddress"] =
                    item.fkParticipantConnectedSupporterIdrel.Userdata &&
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                      0
                      ? item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                          .address != null
                        ? item.fkParticipantConnectedSupporterIdrel.Userdata[0].address.concat(
                            item.fkParticipantConnectedSupporterIdrel
                              .Userdata &&
                              item.fkParticipantConnectedSupporterIdrel.Userdata
                                .length > 0
                              ? " " +
                                  item.fkParticipantConnectedSupporterIdrel
                                    .Userdata[0].city !=
                                null
                                ? " " +
                                  item.fkParticipantConnectedSupporterIdrel
                                    .Userdata[0].city
                                : ""
                              : ""
                          )
                        : ""
                      : ""),
                  (item.dob =
                    item.fkParticipantConnectedSupporterIdrel.Userdata.length >
                    0
                      ? this.formatDate(
                          item.fkParticipantConnectedSupporterIdrel.Userdata[0]
                            .dob
                        )
                      : "")
                );
              }
            )
          );

          this.setState({
            // optionFilter:false,
            count:
              res.data &&
              res.data.allParticipantConnectedSupporters &&
              res.data.allParticipantConnectedSupporters !== null
                ? res.data.allParticipantConnectedSupporters.totalCount
                : "",
            listData:
              res.data &&
              res.data.allParticipantConnectedSupporters &&
              res.data.allParticipantConnectedSupporters !== null
                ? res.data.allParticipantConnectedSupporters
                    .ParticipantConnectedSupporters
                : "",
          });
        }
      })
      .catch((e) => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
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

          fetchMethod(saveUserdata, { obj: test })
            .then((res) => res.json())
            .then((res) => {
              const id = res.data.saveUserdata.id;
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
                  this.getSupporterData()
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

  handleEditModal = (data) => {
    this.props.history.push({
      pathname: "/editSupporter",
      state: { details: data.id },
    });
  };
  //
  onFirstNameClick = (data) => {
    let userid =
      data.fkParticipantConnectedSupporterIdrel &&
      data.fkParticipantConnectedSupporterIdrel.Userdata[0]
        ? data.fkParticipantConnectedSupporterIdrel.Userdata[0].id
        : data.id;
    this.props.history.push({
      pathname: "/supporterInfo",
      state: { details: userid },
      // state: { details: data.id }
    });
  };
  handleClose = () => {
    this.setState({ supporterId: undefined, openModal: false });
  };

  openModalBox = () => {
    this.setState({ openModal: true });
  };

  handleFilter = (e) => {
    const {
      target: { name, value },
    } = e;

    const { filter } = this.state;

    filter[name] = value;
    console.log(
      "value value value value ...................",
      value,
      "name name name name",
      [name]
    );
    this.setState(
      {
        [name]: value,
        filter,
        optionFilter: true,
      },
      () => {
        this.getParticipantSupporterData();
        // this.filterSupporterRecords()
      }
    );
  };

  resetFilters = () => {
    console.log("this ,,,,ste filter", this.state.filter);

    delete this.state.filter.participantId;

    // delete this.state.filter.txnType;
    this.setState(
      {
        participantxyz: null,
        ["participantId"]: undefined,
      },
      () => {
        this.getSupporterData();
      }
    );
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
          console.log(":ts.....................", this.state.filter);
          this.getParticipantSupporterData();
        }
      );
    }
  };

  handleSupporterFilter = (e) => {
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

  filterData = () => {
    const { filter } = this.state;
    // filter["supporterId"] = this.state.supporterId;
    delete filter["supporterId"];
    filter["participantId"] = this.state.participantId;
    this.setState(
      {
        filter,
        optionFilter: true,
      },
      () => this.getParticipantSupporterData()
    );
  };

  submitButton = () => {
    if (this.state.supporterId !== undefined) {
      const test = {
        supporterId: this.state.supporterId,
        participantId: this.state.participantId,
        createdBy: JSON.parse(localStorage.getItem("userInfo")).id,
        updatedBy: JSON.parse(localStorage.getItem("userInfo")).id,
      };
      fetchMethod(saveParticipantSupporterQuery, { obj: test })
        .then((res) => res.json())
        .then((response) => {
          const id = response.data.saveParticipantConnectedSupporter;
          if (id && id !== null) {
            this.filterData();
            swal({
              text: "Participant connected supporter successfully",
              icon: "success",
            });
            this.handleClose();
          } else {
            swal("Please try again", { icon: "error" });
          }
        });
      this.setState({
        supporterId: undefined,
      });
    } else {
      swal({ title: "Please select supporter", icon: "warning" });
    }
  };
  handleSupporter = (e, v) => {
    if (v !== null && v !== undefined) {
      this.setState({
        supporterId: v.id,
      });
    }
  };
  render() {
    console.log("partop", this.state.participantOptions);
    const nameColumn = [
      {
        Header: "S No.",
        Cell: (row) => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45,
      },
      {
        Header: "First Name",
        Cell: (row) => {
          return (
            <div
              className="dot"
              onClick={() => this.onFirstNameClick(row.original)}
            >
              {row.original.firstname}
            </div>
          );
        },
      },
    ];

    const actionButton = [
      {
        Header: "",
        sortable: false,
        Cell: (row) => (
          <div>
            {!this.state.participantId ? (
              <IconButton
                aria-label="edit"
                onClick={() => this.handleEditModal(row.original)}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            ) : (
              ""
            )}

            {!this.state.participantId ? (
              <IconButton
                className="statusLink"
                aria-label="delete"
                onClick={() => this.handleDelete(row.original)}
              >
                <img src={Delete} alt="Delete" />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        ),
      },
    ];

    const columns = nameColumn.concat(adminSupporterList.columns);
    // .concat(actionButton);
    return (
      <div className="supporterSection">
        <h3>Supporter</h3>
        <div className="formFlex">
          <div className="searchTextField">
            <FormControl>
              {/* <InputLabel id="demo-simple">Participants</InputLabel> */}
              {/* <Select
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
              Connect Supporter
            </Button>
          </div>
        </div>

        {this.state.listData ? (
          <div className="adminSupporterTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminSupporterList}
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              initialPage={
                this.state.participantId
                  ? this.state.pagenewNo / this.state.rowsnewNo
                  : this.state.pageNo / this.state.rows
              }
              onRowClick={() => {}}
              onCellClick={this.adminSupporterInfo}
              cellClickColName={"firstName"}
              rowAndCellBothClick={true}
              forSerialNo={
                this.state.participantId
                  ? {
                      pageNo: this.state.pagenewNo,
                      pageSize: this.state.rowsnewNo,
                    }
                  : { pageNo: this.state.pageNo, pageSize: this.state.rows }
              }
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
                  getOptionLabel={(option) =>
                    option && option.supporter ? option.supporter : ""
                  }
                  // style={{ width: 300 }}
                  onChange={(e, v) => this.handleSupporter(e, v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="FirstName"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
          </DialogContent>
          <h4 style={{ textAlign: "center" }}>or</h4>
          <DialogContent>
            <div>
              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.supporterOptions}
                  getOptionLabel={(option) =>
                    option && option.supporterlast ? option.supporterlast : ""
                  }
                  // style={{ width: 300 }}
                  onChange={(e, v) => this.handleSupporter(e, v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="LastName"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
          </DialogContent>
          <h4 style={{ textAlign: "center" }}>or</h4>
          <DialogContent>
            <div>
              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.supporterOptions}
                  getOptionLabel={(option) =>
                    option && option.supporterPhone ? option.supporterPhone : ""
                  }
                  // style={{ width: 300 }}
                  onChange={(e, v) => this.handleSupporter(e, v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="PhoneNumber"
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
      </div>
    );
  }
}

export default withRouter(GuardianSupporter);

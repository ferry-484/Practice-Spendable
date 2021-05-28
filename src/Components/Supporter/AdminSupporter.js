import React, { Component } from "react";
import SearchIcon from "../../assets/search.svg";
import { TextField, Button, IconButton } from "@material-ui/core";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { adminSupporterList } from "./SupporterConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Activate from "../../assets/Activate_User.svg";
import Deactivate from "../../assets/Deactivate_User.svg";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { supporterQuery, saveUserdata } from "./SupporterQuery";
import { withRouter } from "react-router-dom";
import { DotLoader } from "react-spinners";
import "./supporter.css";
class AdminSupporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      filter: {
        // active: 1,
        role: "SUPPORTER",
        order: "id desc"
      },
      count: 0
    };
  }

  componentWillMount() {
    this.getSupporterData();
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

  getSupporterData = () => {
    fetchMethod(supporterQuery, {
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
          res.data.allUserdata.Userdata.map(item => {
            return (
              (item["fullAddress"] =
                item.address && item.address !== null && item.address !== ""
                  ? item.address.concat(
                      item.city && item.city !== null ? " " + item.city : ""
                    )
                  : ""),
              (item.dob = this.formatDate(item.dob))
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
        this.getSupporterData();
      }
    );
  };

  handleDelete = row => {
    if (row.active === 1 || row.active === "1") {
      swal({
        title: "Are you sure you really want to deactive this record.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const test = {
            id: row.id,
            active: 0
          };
          fetchMethod(saveUserdata, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveUserdata.id;
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
                  this.getSupporterData()
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

          fetchMethod(saveUserdata, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveUserdata.id;
              swal({
                title: id ? "Activated successfully" : "Error in activating",
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
                  this.getSupporterData()
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

  debounce = (debounceTimer, func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
    return debounceTimer;
  };
  debounceTimer = null;

  handleSearchChange = event => {
    const { filter } = this.state;
    filter["and"] = [
      {
        or: [
          { firstname: { like: `%${event.target.value}%` } },
          { lastname: { like: `%${event.target.value}%` } }
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
        this.getSupporterData();
      },
      200
    );
  };

  addSupporter = () => {
    this.props.history.push("/addSupporter");
  };

  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editSupporter",
      state: { details: data.id }
    });
  };

  onFirstNameClick = data => {
    this.props.history.push({
      pathname: "/supporterInfo",
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
        Header: "First Name",
        Cell: row => {
          return (
            <div
              className="dot"
              onClick={() => this.onFirstNameClick(row.original)}
            >
              {row.original.firstname}
            </div>
          );
        }
      }
    ];

    const actionButton = [
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
              {/* <img src={Delete} alt="Delete" /> */}
              {row.original.active === 1 ? (
                <img src={Activate} alt="ACTIVATE" />
              ) : (
                <img src={Deactivate} alt="Delete" />
              )}
            </IconButton>
          </div>
        )
      }
    ];

    const columns = nameColumn
      .concat(adminSupporterList.columns)
      .concat(actionButton);
    return (
      <div className="supporterSection">
        <h3>Supporter</h3>
        <div className="formFlex">
          <div className="searchTextField">
            <TextField
              type="text"
              placeholder="By First, Last Name"
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
            <Button onClick={this.addSupporter}>Add Supporter</Button>
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
              initialPage={this.state.pageNo / this.state.rows}
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

export default withRouter(AdminSupporter);

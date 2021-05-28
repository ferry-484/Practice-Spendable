import React, { Component } from "react";
import SearchIcon from "../../assets/search.svg";
import { TextField, Button, IconButton } from "@material-ui/core";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { guardianParticipantList } from "./ParticipantConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { withRouter } from "react-router-dom";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { participantQuery, saveUserdata } from "./ParticipantQuery";
import { DotLoader } from "react-spinners";
import "./participant.css";
class GuardianParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      filter: {
        active: 1,
        role: "PARTICIPANT",
        order: "id desc",
        guardianId: JSON.parse(localStorage.getItem("userInfo")).id
      },
      count: 0
    };
  }

  componentWillMount() {
    this.getParticipantData();
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

  getParticipantData = () => {
    fetchMethod(participantQuery, {
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
        this.getParticipantData();
      }
    );
  };

  handleDelete = row => {
    if (row.active === 1 || row.active === "1") {
      swal({
        title: "Are you sure you really want to delete this record",
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
                title: id ? "Deleted successfully" : "Error deleting",
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
                  this.getParticipantData()
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
        this.getParticipantData();
      },
      200
    );
  };

  addParticipant = () => {
    this.props.history.push("/addParticipants");
  };

  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editParticipants",
      state: { details: data.id }
    });
  };

  onFirstNameClick = data => {
    this.props.history.push({
      pathname: "/participantInfo",
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
          <div>
            <IconButton
              aria-label="edit"
              onClick={() => this.handleEditModal(row.original)}
            >
              <img src={Edit} alt="Edit" />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={() => this.handleDelete(row.original)}
            >
              <img src={Delete} alt="Delete" />
            </IconButton>
          </div>
        )
      }
    ];

    const columns = nameColumn
      .concat(guardianParticipantList.columns)
      .concat(actionButton);
    return (
      <div className="participantSection">
        <h2>Participant</h2>
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
            <Button onClick={this.addParticipant}>Add Participant</Button>
          </div>
        </div>

        {this.state.listData ? (
          <div className="adminParticipantTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={guardianParticipantList}
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

export default withRouter(GuardianParticipant);

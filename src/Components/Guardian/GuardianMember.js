import React, { Component } from "react";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { IconButton, Button } from "@material-ui/core";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { withRouter } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { adminGuardianList } from "./GuardianConfig";
import { allGuardianParticipantInfo, saveUserdata } from "./GuardianQuery";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import "./guardian.css";
class GuardianMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.guardianParticipantData(this.props.location.state.details);
    }
  }

  guardianParticipantData = id => {
    fetchMethod(
      allGuardianParticipantInfo(id, this.state.rows, this.state.pageNo)
    )
      .then(res => res.json())
      .then(res => {
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
          res.data.allUserdata.Userdata.map(item => {
            return (item["fullAddress"] =
              item.address && item.address !== null && item.address !== ""
                ? item.address.concat(
                    item.city && item.city !== null ? " " + item.city : ""
                  )
                : "");
          });
          this.setState({
            listData:
              res.data && res.data.allUserdata && res.data.allUserdata !== null
                ? res.data.allUserdata.Userdata
                : "",
            count:
              res.data && res.data.allUserdata && res.data.allUserdata !== null
                ? res.data.allUserdata.totalCount
                : 0
          });
        }
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/guardians");
      });
  };

  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        this.props.history.push("/guardians");
      }
    );
  };

  addGuardian = id => {
    this.props.history.push({
      pathname: "/addGuardianParticipant",
      state: { id: id }
    });
  };

  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editGuardianParticipant",
      state: { details: data.id }
    });
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
                  this.props.history.push("/guardians")
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
            // onClick={() => {
            //   this.adminGuardianInfo(row.original);
            // }}
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
      .concat(adminGuardianList.columns)
      .concat(actionButton);

    return (
      <div>
        {this.props.location.state !== undefined ? (
          <div className="guardianSection guardianMemberSection">
            <h3>Participant</h3>

            <div className="addMember">
              <Button
                onClick={() =>
                  this.addGuardian(this.props.location.state.details)
                }
              >
                Add Participant
              </Button>
            </div>
            {this.state.listData ? (
              <div>
                <ReactTableComponent
                  listData={this.state.listData}
                  listConfig={adminGuardianList}
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
        ) : (
          this.props.history.push("/guardians")
        )}
      </div>
    );
  }
}

export default withRouter(GuardianMember);

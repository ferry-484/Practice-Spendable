import React, { Component } from "react";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { IconButton, Button } from "@material-ui/core";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { adminBuisnessMemberList } from "./BuisnessConfig";
import { withRouter } from "react-router-dom";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { allBusinessesMemberInfo, saveUserdata } from "./BuisnessQuery";
import { DotLoader } from "react-spinners";
import "./buisness.css";
class BuisnessMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      listData: undefined,
      search: "",
      count: 0,
      record: false
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.buisnessMemberData(this.props.location.state.details);
    }
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

  buisnessMemberData = id => {
    fetchMethod(allBusinessesMemberInfo(id, this.state.rows, this.state.pageNo))
      .then(res => res.json())
      .then(res => {
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
          if (res.data.allUserdata.Userdata.length > 0)
            this.setState({ record: true });
          else {
            this.setState({ record: false });
          }
          res.data.allUserdata.Userdata.map(item => {
            return (
              (item["buisnessName"] =
                item.fkUserdataBusinessIdrel.Businesses &&
                item.fkUserdataBusinessIdrel.Businesses.length > 0
                  ? item.fkUserdataBusinessIdrel.Businesses[0].storeName
                  : ""),
              (item.dob = this.formatDate(item.dob))
            );
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
        this.props.history.push("/buisness");
      });
  };

  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        this.props.history.push("/buisness");
      }
    );
  };

  buisnessMemberInfo = data => {
    this.props.history.push({
      pathname: "/buisnessMemberInfo",
      state: { details: data.id, storeId: this.props.location.state.details }
    });
  };

  addMember = id => {
    this.props.history.push({
      pathname: "/addBuisnessMember",
      state: { id: id }
    });
  };

  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editBuisnessMember",
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
                  this.props.history.push("/buisness")
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
    // console.log(
    //   "props inside the business member/...................",
    //   this.props.location && this.props.location.state
    //     ? this.props.location.state.details
    //     : ""
    // );
    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      },
      {
        Header: "Business Name",
        accessor: "buisnessName",
        sortable: false
      },
      {
        Header: "First Name",
        Cell: row => {
          return (
            <div
              onClick={() => {
                this.buisnessMemberInfo(row.original);
              }}
            >
              {row.original.firstname}
            </div>
          );
        }
      }
    ];

    const actionButton = [
      localStorage.getItem("role") === "ADMIN"
        ? {
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
        : ""
    ];

    const columns = nameColumn
      .concat(adminBuisnessMemberList.columns)
      .concat(actionButton);

    return (
      <div>
        {this.props.location.state !== undefined ? (
          <div className="buisnessMemberSection">
            <h3>Business Member</h3>

            <div className="addMember">
              {this.state.record === false ? (
                localStorage.getItem("role") === "ADMIN" ? (
                  <Button
                    // {this.state.listData?"":disabled={true}}
                    onClick={() =>
                      this.addMember(this.props.location.state.details)
                    }
                  >
                    Add Business Member
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {/* <Button
                // {this.state.listData?"":disabled={true}}
                onClick={() =>
                  this.addMember(this.props.location.state.details)
                }
              >
                Add Business Member
              </Button> */}
            </div>
            {this.state.listData !== undefined ? (
              <div>
                <ReactTableComponent
                  listData={this.state.listData}
                  listConfig={adminBuisnessMemberList}
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
          this.props.history.push("/buisness")
        )}
      </div>
    );
  }
}

export default withRouter(BuisnessMember);

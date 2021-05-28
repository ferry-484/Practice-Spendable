import React, { Component } from "react";
import ReactTableComponent from "../../../ReactTable/ReactTable";
import { adminParticipantList } from "./SupporterTabSetupConfig";
import swal from "sweetalert";
import { fetchMethod } from "../../../FetchMethod";
import { connectedParticipantQuery } from "./SupporterTabQuery";
import { DotLoader } from "react-spinners";
import "./supporterTabSetup.css";
class ConnectedParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0,
      filter: {
        order: "id desc",
        supporterId: this.props.id,
        active: 1
      }
    };
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

  componentWillMount() {
    this.connectedParticipant();
  }

  connectedParticipant = () => {
    fetchMethod(connectedParticipantQuery, {
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
          res.data.allParticipantConnectedSupporters.ParticipantConnectedSupporters.map(
            item => {
              return (
                (item.firstname =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].firstname
                    : ""),
                (item.lastname =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].lastname
                    : ""),
                (item.email =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].email
                    : ""),
                (item.address =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].address !== null &&
                      item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].address !== ""
                      ? item.fkParticipantConnectedSupporterParticipantIdrel.Userdata[0].address.concat(
                          item.fkParticipantConnectedSupporterParticipantIdrel
                            .Userdata[0].city &&
                            item.fkParticipantConnectedSupporterParticipantIdrel
                              .Userdata[0].city !== null
                            ? " " +
                                item
                                  .fkParticipantConnectedSupporterParticipantIdrel
                                  .Userdata[0].city
                            : ""
                        )
                      : ""
                    : ""),
                (item.ndisNumber =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].ndisNumber
                    : ""),
                (item.phonenumber =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedSupporterParticipantIdrel
                        .Userdata[0].phonenumber
                    : ""),
                (item.dob =
                  item.fkParticipantConnectedSupporterParticipantIdrel &&
                  item.fkParticipantConnectedSupporterParticipantIdrel.Userdata
                    .length > 0
                    ? this.formatDate(
                        item.fkParticipantConnectedSupporterParticipantIdrel
                          .Userdata[0].dob
                      )
                    : "")
              );
            }
          );
          this.setState({
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
        this.connectedParticipant();
      }
    );
  };

  render() {
    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];
    const columns = nameColumn.concat(adminParticipantList.columns);
    return (
      <div>
        {this.state.listData ? (
          <div className="connectedParticipant">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminParticipantList}
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

export default ConnectedParticipant;

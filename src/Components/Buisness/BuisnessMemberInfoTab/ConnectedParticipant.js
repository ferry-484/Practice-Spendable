import React, { Component } from "react";
import ReactTableComponent from "../../../ReactTable/ReactTable";
import { adminParticipantList } from "./BuisnessMemberInfoTabConfig";
import { fetchMethod } from "../../../FetchMethod";
import swal from "sweetalert";
import { connectedParticipantQuery } from "./BuisnessMemberQuery";
import { DotLoader } from "react-spinners";
import "./buisnessMemberTab.css";
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
        storeId: this.props.id
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
    this.connectedParticipantBuisness();
  }

  connectedParticipantBuisness = () => {
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
          // return res.data &&
          //   res.data.allParticipantConnectedBusinesses &&
          //   res.data.allParticipantConnectedBusinesses !== null
          //   ? this.setState({
          //       count:
          //         res.data &&
          //         res.data.allParticipantConnectedBusinesses &&
          //         res.data.allParticipantConnectedBusinesses !== null
          //           ? res.data.allParticipantConnectedBusinesses.totalCount
          //           : "",
          //       listData:
          //         res.data &&
          //         res.data.allParticipantConnectedBusinesses &&
          //         res.data.allParticipantConnectedBusinesses !== null
          //           ? res.data.allParticipantConnectedBusinesses.ParticipantConnectedBusinesses.map(
          //               item => {
          //                 return (
          //                   (item.firstname =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].firstname
          //                       : ""),
          //                   (item.lastname =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].lastname
          //                       : ""),
          //                   (item.email =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].email
          //                       : ""),
          //                   (item.address =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].address !== null &&
          //                         item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].address !== ""
          //                         ? item.fkParticipantConnectedBusinessParticipantIdrel.Userdata[0].address.concat(
          //                             item
          //                               .fkParticipantConnectedBusinessParticipantIdrel
          //                               .Userdata[0].city &&
          //                               item
          //                                 .fkParticipantConnectedBusinessParticipantIdrel
          //                                 .Userdata[0].city !== null
          //                               ? " " +
          //                                   item
          //                                     .fkParticipantConnectedBusinessParticipantIdrel
          //                                     .Userdata[0].city
          //                               : ""
          //                           )
          //                         : ""
          //                       : ""),
          //                   (item.phonenumber =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].phonenumber
          //                       : ""),
          //                   (item.dob =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? this.formatDate(
          //                           item
          //                             .fkParticipantConnectedBusinessParticipantIdrel
          //                             .Userdata[0].dob
          //                         )
          //                       : ""),
          //                   (item.ndisNumber =
          //                     item.fkParticipantConnectedBusinessParticipantIdrel &&
          //                     item
          //                       .fkParticipantConnectedBusinessParticipantIdrel
          //                       .Userdata.length > 0
          //                       ? item
          //                           .fkParticipantConnectedBusinessParticipantIdrel
          //                           .Userdata[0].ndisNumber
          //                       : "")
          //                 );
          //               }
          //             )
          //           : ""
          //     })
          //   : "";

          // res.data.allParticipantConnectedBusinesses &&
          // res.data.allParticipantConnectedBusinesses !== null
          //   ?
          res.data.allParticipantConnectedBusinesses.ParticipantConnectedBusinesses.map(
            item => {
              return (
                (item.firstname =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].firstname
                    : ""),
                (item.lastname =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].lastname
                    : ""),
                (item.email =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].email
                    : ""),
                (item.address =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].address !== null &&
                      item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].address !== ""
                      ? item.fkParticipantConnectedBusinessParticipantIdrel.Userdata[0].address.concat(
                          item.fkParticipantConnectedBusinessParticipantIdrel
                            .Userdata[0].city &&
                            item.fkParticipantConnectedBusinessParticipantIdrel
                              .Userdata[0].city !== null
                            ? " " +
                                item
                                  .fkParticipantConnectedBusinessParticipantIdrel
                                  .Userdata[0].city
                            : ""
                        )
                      : ""
                    : ""),
                (item.phonenumber =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].phonenumber
                    : ""),
                (item.dob =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? this.formatDate(
                        item.fkParticipantConnectedBusinessParticipantIdrel
                          .Userdata[0].dob
                      )
                    : ""),
                (item.ndisNumber =
                  item.fkParticipantConnectedBusinessParticipantIdrel &&
                  item.fkParticipantConnectedBusinessParticipantIdrel.Userdata
                    .length > 0
                    ? item.fkParticipantConnectedBusinessParticipantIdrel
                        .Userdata[0].ndisNumber
                    : "")
              );
            }
          );
          // : "";

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
        this.connectedParticipantBuisness();
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

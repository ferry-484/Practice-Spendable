import React, { Component } from "react";
import ReactTableComponent from "../../../ReactTable/ReactTable";
import { adminPaymentRequestList } from "./SupporterTabSetupConfig";
import { fetchMethod } from "../../../FetchMethod";
import swal from "sweetalert";
import { connectedPaymentRequestQuery } from "./SupporterTabQuery";

import { paymentQuery } from "../../PaymentRequests/PaymentRquestQuery";
import { DotLoader } from "react-spinners";
import "./supporterTabSetup.css";
class PaymentRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0,
      filter: {
        supporterId: this.props.id,
        order: "id desc"
      }
    };
  }

  componentWillMount() {
    this.connectedPaymentRequest();
  }

  connectedPaymentRequest = () => {
    fetchMethod(paymentQuery, {
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
          res.data.allPaymentRequests.PaymentRequests.map(item => {
            return (
              // (item.participant =
              //   item.fkPaymentRequestParticipantIdrel.Userdata &&
              //   item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestParticipantIdrel.Userdata[0]
              //         .firstname +
              //       " " +
              //       item.fkPaymentRequestParticipantIdrel.Userdata[0].lastname
              //     : ""),
              // (item.supporter =
              //   item.fkPaymentRequestSupporterIdrel.Userdata &&
              //   item.fkPaymentRequestSupporterIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestSupporterIdrel.Userdata[0].firstname
              //     : "" + " " + item.fkPaymentRequestSupporterIdrel.Userdata &&
              //       item.fkPaymentRequestSupporterIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestSupporterIdrel.Userdata[0].lastname
              //     : ""),
              // (item.buisnessMember =
              //   item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
              //   item.fkPaymentRequestBusinessMemberIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestBusinessMemberIdrel.Userdata[0]
              //         .firstname
              //     : "" +
              //         " " +
              //         item.fkPaymentRequestBusinessMemberIdrel.Userdata &&
              //       item.fkPaymentRequestBusinessMemberIdrel.Userdata.length > 0
              //     ? item.fkPaymentRequestBusinessMemberIdrel.Userdata[0]
              //         .lastname
              //     : ""),

              (item.madefor =
                item.createdBy === item.participantId
                  ? "SELF"
                  : item.fkPaymentRequestParticipantIdrel.Userdata &&
                    item.fkPaymentRequestParticipantIdrel.Userdata.length > 0
                  ? item.fkPaymentRequestParticipantIdrel.Userdata[0].firstname.concat(
                      item.fkPaymentRequestParticipantIdrel.Userdata &&
                        item.fkPaymentRequestParticipantIdrel.Userdata.length >
                          0
                        ? " " +
                            (item.fkPaymentRequestParticipantIdrel.Userdata[0]
                              .lastname != null
                              ? item.fkPaymentRequestParticipantIdrel
                                  .Userdata[0].lastname
                              : "")
                        : ""
                    )
                  : ""),
              (item.madeby =
                item.fkpaymentrequestcreatebymaprel.Userdata &&
                item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
                  ? item.fkpaymentrequestcreatebymaprel.Userdata[0].firstname.concat(
                      item.fkpaymentrequestcreatebymaprel.Userdata &&
                        item.fkpaymentrequestcreatebymaprel.Userdata.length > 0
                        ? " " +
                            (item.fkpaymentrequestcreatebymaprel.Userdata[0]
                              .lastname != null
                              ? item.fkpaymentrequestcreatebymaprel.Userdata[0]
                                  .lastname
                              : "")
                        : ""
                    )
                  : ""),
              (item.categoryName =
                item.fkPaymentRequestItemCategoryIdrel !== null &&
                item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories &&
                item.fkPaymentRequestItemCategoryIdrel.MasterItemCategories
                  .length > 0
                  ? item.fkPaymentRequestItemCategoryIdrel
                      .MasterItemCategories[0].categoryName
                  : ""),
              (item.requestedAmount =
                item.requestedAmount !== undefined &&
                item.requestedAmount !== null
                  ? `$${item.requestedAmount}`
                  : "")
            );
          });
          this.setState({
            count:
              res.data &&
              res.data.allPaymentRequests &&
              res.data.allPaymentRequests !== null
                ? res.data.allPaymentRequests.totalCount
                : "",
            listData:
              res.data &&
              res.data.allPaymentRequests &&
              res.data.allPaymentRequests !== null
                ? res.data.allPaymentRequests.PaymentRequests
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
        this.connectedPaymentRequest();
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
    const columns = nameColumn.concat(adminPaymentRequestList.columns);
    return (
      <div>
        {this.state.listData ? (
          <div className="paymentRequestSupporter">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={adminPaymentRequestList}
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

export default PaymentRequest;

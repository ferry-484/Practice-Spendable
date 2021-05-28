import React, { Component } from "react";
import {cardDetailsConfig} from "./CardConfig"
import { DotLoader } from "react-spinners";
import ReactTableComponent from "../../../ReactTable/ReactTable";
export default class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listData:undefined
        //   search: "",
        //   pageNo: parseInt(localStorage.getItem("rows")),
        //   rows: parseInt(localStorage.getItem("rows")),
        //   filter: {
        //     active: 1,
        //     role: "PARTICIPANT",
        //     order: "id desc"
        //   },
        //   count: 0
        };
      }
  render() {
    return (
      <div>
        <div className="participantSection">
          <h2>Participant</h2>
          {this.state.listData ? (
            <div className="adminParticipantTable">
              <ReactTableComponent
                listData={this.state.listData}
                listConfig={cardDetailsConfig}
                // columns={columns}
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
      </div>
    );
  }
}


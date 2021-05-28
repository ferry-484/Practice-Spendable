import ReactTable, { ReactTableDefaults } from "react-table";
import React, { Component } from "react";

import "react-table/react-table.css";

import "./reactTable.css";

import Pagination from "./Pagination";
import propTypes from "prop-types";

export default class ReactTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  paginate = (pageNumber, size) => {
    this.props.updatePagination(pageNumber, size);
  };

  noDataComponent = () => {
    return <h5 style={{ textAlign: "center" }}>No records found.</h5>;
  };

  render() {
    if (this.props.listConfig.showSerialNo === true) {
      this.props.listData.map((item, index) => {
        return (item.sNo =
          this.props.forSerialNo !== undefined
            ? this.props.forSerialNo.pageNo -
              this.props.forSerialNo.pageSize +
              index +
              1
            : index + 1);
      });
    }

    let dataRange = {
      first:
        this.props.forSerialNo.pageNo - this.props.forSerialNo.pageSize + 1,
      last:
        this.props.forSerialNo.pageNo -
        this.props.forSerialNo.pageSize +
        this.props.listData.length
    };

    return (
      <div>
        <div>
          <ReactTable
            className="-striped"
            manual
            getTdProps={(state, rowInfo, column, instance) => ({
              onClick: () => {
                if (this.props.rowAndCellBothClick) {
                  if (column.id === this.props.cellClickColName) {
                    return this.props.onCellClick
                      ? this.props.onCellClick()
                      : "";
                  } else if (column.id !== this.props.cellClickColName) {
                    return this.props.onRowClick
                      ? this.props.onRowClick(rowInfo)
                      : "";
                  }
                } else {
                  return this.props.onRowClick
                    ? this.props.onRowClick(rowInfo)
                    : "";
                }
              }
            })}
            getTheadThProps={(state, rowInfo, column, instance) => ({
              ...ReactTableDefaults.getTheadThProps,
              onClick: () => {
                return this.props.onHeaderClick
                  ? this.props.onHeaderClick(column.id)
                  : "";
              }
            })}
            minRows={0}
            pageSize={1}
            data={this.props.listData}
            columns={this.props.columns}
            pages={0}
            showPagination={false}
            SubComponent={this.props.subComponent}
            NoDataComponent={this.noDataComponent}
          />

          {this.props.listConfig.showPagination &&
          this.props.listData.length != 0 ? (
            <Pagination
              dataPerPage={10}
              totalData={this.props.dataCount ? this.props.dataCount : ""}
              paginate={this.paginate}
              initialPage={this.props.initialPage}
              dataRange={dataRange}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

ReactTableComponent.protoType = {
  listData: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  paginate: propTypes.func,
  onRowClick: propTypes.func
};

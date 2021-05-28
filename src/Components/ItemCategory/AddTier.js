import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { TextField, Button, IconButton } from "@material-ui/core";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { addTierConfig, tierList } from "./ItemConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  saveMasterItemCategory,
  itemCategoryQuery,
  saveTier,
  tierQuery
} from "./ItemQuery";
import ReactTableComponent from "../../ReactTable/ReactTable";
// import "./addParticipant.css";
import { DotLoader } from "react-spinners";
import "./addTier.css";
export default class AddTier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      filter: { order: "id desc" },
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      count: 0
    };
  }

  componentWillMount() {
    this.getTierData();
  }

  getTierData = () => {
    fetchMethod(tierQuery, {
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
          res.data.allTiertypes.Tiertypes.map(item => {
            return (
              (item["active"] = item.active === 1 ? "ACTIVE" : "INACTIVE"),
              (item["tierType"] = item.tierType ? item.tierType : "")
            );
          });
          this.setState({
            count:
              res.data &&
              res.data.allTiertypes &&
              res.data.allTiertypes !== null
                ? res.data.allTiertypes.totalCount
                : "",
            listData:
              res.data &&
              res.data.allTiertypes &&
              res.data.allTiertypes !== null
                ? res.data.allTiertypes.Tiertypes
                : ""
          });
        }
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };

  closeForm = () => {
    this.props.history.push("/itemCategory");
  };

  preSubmitChanges = e => {
    e["tierType"] = e.tierType ? e.tierType : "";
    // e["createdby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;

    fetchMethod(saveTier, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id =
          response.data && response.data.saveTiertype
            ? response.data.saveTiertype
            : null;
        if (id && id !== null) {
          swal({ title: "Tier added successfully", icon: "success" });
          this.getTierData();
          // this.props.history.push("/itemCategory");
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/itemCategory");
        }
      });
    return false;
  };

  handleDelete = row => {
    if (row.active === "ACTIVE") {
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

          fetchMethod(saveTier, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveTiertype.id;
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
                  this.getTierData()
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
    // const actionButton = [
    //   {
    //     Header: "",
    //     sortable: false,
    //     Cell: row => (
    //       <div>
    //         {row.original.active == "ACTIVE" ? (
    //           <IconButton
    //             aria-label="delete"
    //             onClick={() => this.handleDelete(row.original)}
    //           >
    //             <img src={Delete} alt="Delete" />
    //           </IconButton>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //     )
    //   }
    // ];

    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];

    const columns = nameColumn.concat(tierList.columns);
    // .concat(actionButton);
    return (
      <div>
        <div className="addTierSection">
          <h3>Add Tier</h3>
          <FormComponent
            formConfig={addTierConfig}
            preSubmitChanges={this.preSubmitChanges}
            buttonTitleCSS="adminParticipant"
            modalCloseCallback={() => {}}
            closeButton={this.closeForm}
          />
        </div>
        {this.state.listData ? (
          <div className="adminParticipantTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={tierList}
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

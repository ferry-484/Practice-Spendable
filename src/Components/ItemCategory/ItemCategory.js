import React, { Component } from "react";
import SearchIcon from "../../assets/search.svg";
import { TextField, Button, IconButton } from "@material-ui/core";
import ReactTableComponent from "../../ReactTable/ReactTable";
import { itemCategoryList } from "./ItemConfig";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { withRouter } from "react-router-dom";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { itemCategoryQuery, saveMasterItemCategory } from "./ItemQuery";
import { DotLoader } from "react-spinners";
import "./itemCategory.css";
class ItemCategory extends Component {
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
    this.getItemCategoryData();
  }

  getItemCategoryData = () => {
    fetchMethod(itemCategoryQuery, {
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
          res.data.allMasterItemCategories.MasterItemCategories.map(item => {
            return (
              (item["isActive"] = item.isActive ? "ACTIVE" : "INACTIVE"),
              (item["tierType"] =
                item &&
                item.fktiertypemaprel &&
                item.fktiertypemaprel.Tiertypes &&
                item.fktiertypemaprel.Tiertypes[0] &&
                item.fktiertypemaprel.Tiertypes[0].tierType
                  ? item.fktiertypemaprel.Tiertypes[0].tierType
                  : "")
            );
          });
          this.setState({
            count:
              res.data &&
              res.data.allMasterItemCategories &&
              res.data.allMasterItemCategories !== null
                ? res.data.allMasterItemCategories.totalCount
                : "",
            listData:
              res.data &&
              res.data.allMasterItemCategories &&
              res.data.allMasterItemCategories !== null
                ? res.data.allMasterItemCategories.MasterItemCategories
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
        this.getItemCategoryData();
      }
    );
  };

  // handleDelete = row => {
  //   console.log("##active check ", row.isActive);
  //   if (row.isActive === "ACTIVE") {
  //     swal({
  //       title: "Are you sure you really want to delete this record",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true
  //     }).then(willDelete => {
  //       if (willDelete) {
  //         const test = {
  //           id: row.id,
  //           isActive: 0
  //         };

  //         fetchMethod(saveMasterItemCategory, { obj: test })
  //           .then(res => res.json())
  //           .then(res => {
  //             const id = res.data.saveMasterItemCategory.id;
  //             swal({
  //               title: id ? "Deleted successfully" : "Error deleting",
  //               icon: "success"
  //             });
  //             if (id) {
  //               let pageNo = this.state.pageNo;
  //               let previousData = this.state.listData.length;
  //               this.setState({ listData: undefined });

  //               const { filter } = this.state;

  //               let search = this.state.search;

  //               if (this.state.search != "" && previousData === 1) {
  //                 pageNo = this.state.rows;
  //                 delete filter["and"];
  //                 search = "";
  //               } else if (
  //                 this.state.search == "" &&
  //                 previousData === 1 &&
  //                 pageNo != this.state.rows
  //               ) {
  //                 pageNo = this.state.pageNo - this.state.rows;
  //               } else {
  //                 pageNo = this.state.pageNo;
  //               }

  //               this.setState({ pageNo, filter, search }, () =>
  //                 this.getItemCategoryData()
  //               );
  //             }
  //           })
  //           .catch(e => {
  //             swal({ title: e.message, icon: "warning" });
  //             this.setState({ listData: [] });
  //           });
  //       }
  //     });
  //   } else {
  //   }
  // };

  debounce = (debounceTimer, func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
    return debounceTimer;
  };
  debounceTimer = null;

  handleSearchChange = event => {
    var { filter } = this.state;
    filter = {
      // or: [
      // { firstname: { like: `%${event.target.value}%` } },
      categoryName: { like: `%${event.target.value}%` }
      // ]
    };

    this.setState({ listData: undefined });
    this.setState({
      search: event.target.value,
      filter,
      pageNo: this.state.rows
    });
    this.debounceTimer = this.debounce(
      this.debounceTimer,
      () => {
        this.getItemCategoryData();
      },
      200
    );
  };

  addItemCategory = () => {
    this.props.history.push("/addItemCategory");
  };

  addTier = () => {
    this.props.history.push("/addTier");
  };

  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editItemCategory",
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

            {/* <IconButton
              aria-label="delete"
              onClick={() => this.handleDelete(row.original)}
            >
              <img src={Delete} alt="Delete" />
            </IconButton> */}
          </div>
        )
      }
    ];

    const columns = nameColumn
      .concat(itemCategoryList.columns)
      .concat(actionButton);
    return (
      <div className="categorySection">
        <h2>Item Category</h2>
        <div className="formFlex">
          <div className="searchTextField">
            <TextField
              type="text"
              placeholder="By Item Category "
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
            <Button onClick={this.addTier}>Add Tier</Button>
            <Button onClick={this.addItemCategory}>Add Item Category</Button>
          </div>
        </div>

        {this.state.listData ? (
          <div className="adminParticipantTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={itemCategoryList}
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

export default withRouter(ItemCategory);

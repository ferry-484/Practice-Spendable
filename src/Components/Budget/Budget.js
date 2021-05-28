import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./budget.css";
import Edit from "../../assets/edit.svg";
import { fetchMethod } from "../../FetchMethod";
import Autocomplete from "@material-ui/lab/Autocomplete";
import swal from "sweetalert";
import { TextField } from "@material-ui/core";
import {
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Input,
  Button
} from "@material-ui/core";

import ReactTableComponent from "../../ReactTable/ReactTable";
import { budgetList } from "./BudgetConfig";
import {
  budgetQuery,
  saveBudget,
  participantQueryData,
  getAllTier,
  categoryQueryData
} from "./BudgetQuery";
import { DotLoader } from "react-spinners";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      temp: undefined,
      AllData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      filter: {
        active: 1,
        order: "id desc"
      },
      count: 0,
      role: "PARTICIPANT",
      id: "",
      userData: [],
      businessData: [],
      selecetedRole: "PARTICIPANT",
      Role: [
        {
          role: "PARTICIPANT",
          id: "PARTICIPANT"
        }
        // {
        //   role: 'SUPPORTER',
        //   id: 'SUPPORTER',
        // },
        // {
        //   role: 'BUSINESS',
        //   id: 'BUSINESS',
        // },
      ],
      allTierList: [],
      selectedTier: "",
      allParticipantList: [],
      selectedParticipant: "",
      allCategoryList: [],
      selectedCategory: "",
      budgetxyz: null,
      tierxyz: null,
      categoryxyz: null
    };
  }

  updatePagination = (pageNumber, size) => {
    this.setState(
      {
        pageNo: pageNumber,
        rows: size
      },
      () => {
        if (this.state.selectedTier) {
        } else {
          this.getBudgetData();
        }
      }
    );
  };
  componentWillMount() {
    this.getBudgetData();
    this.getAllParticipant();
    this.getAllTier();
  }

  getAllParticipant = () => {
    var obj = { role: "PARTICIPANT", active: 1 };
    if (localStorage.getItem("role") === "GUARDIAN") {
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;
    }
    fetchMethod(participantQueryData, {
      where: obj
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp &&
          resp.data &&
          resp.data.allUserdata &&
          resp.data.allUserdata.Userdata
        ) {
          this.setState({
            // allParticipantList: resp.data.allUserdata.Userdata.map(item => {
            //   return {
            //     id: item.id,
            //     name:
            //       item.firstname +
            //       " " +
            //       (item.lastname != null ? item.lastname : "")
            //   };
            // })
            allParticipantList: resp.data.allUserdata.Userdata
          });
        }
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  };

  getAllTier = () => {
    fetchMethod(getAllTier)
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp &&
          resp.data &&
          resp.data.allTiertypes &&
          resp.data.allTiertypes.Tiertypes
        ) {
          this.setState({
            allTierList: resp.data.allTiertypes.Tiertypes
          });
        }
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  };

  getBudgetData = () => {
    if (
      localStorage.getItem("role") === "GUARDIAN" &&
      !this.state.filter.participantId
    ) {
      var filterdata = this.state.filter;
      var obj = { role: "PARTICIPANT", active: 1 };
      obj.guardianId = JSON.parse(localStorage.getItem("userInfo")).id;

      fetchMethod(participantQueryData, {
        where: obj
      })
        .then(resp => resp.json())
        .then(resp => {
          if (
            resp &&
            resp.data &&
            resp.data.allUserdata &&
            resp.data.allUserdata.Userdata
          ) {
            var ids = [];
            resp.data.allUserdata.Userdata.map(i => {
              ids.push(i.id);
            });
            filterdata.participantId = { inq: [ids] };
            this.setState({
              filter: filterdata
            });
          }
        })
        .then(() => {
          // this.state.filter.participantId?  this.state.filter.participantId,
          fetchMethod(budgetQuery, {
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
                res.data.allBudgets.Budgets.map(item => {
                  return (
                    (item["budgetAvailable"] =
                      item.budgetAvailable &&
                      item.budgetAvailable !== null &&
                      item.budgetAvailable !== ""
                        ? "$" + item.budgetAvailable
                        : ""),
                    (item["userName"] =
                      item &&
                      item.fkBudgetParticipantIdrel &&
                      item.fkBudgetParticipantIdrel.Userdata &&
                      item.fkBudgetParticipantIdrel.Userdata[0]
                        ? item.fkBudgetParticipantIdrel.Userdata[0].firstname +
                          " " +
                          (item.fkBudgetParticipantIdrel.Userdata[0]
                            .lastname !== null
                            ? item.fkBudgetParticipantIdrel.Userdata[0].lastname
                            : "")
                        : item &&
                          item.fkSupporterIdBudgetMaprel &&
                          item.fkSupporterIdBudgetMaprel.Userdata &&
                          item.fkSupporterIdBudgetMaprel.Userdata[0]
                        ? item.fkSupporterIdBudgetMaprel.Userdata[0].firstname +
                          " " +
                          (item.fkSupporterIdBudgetMaprel.Userdata[0]
                            .lastname !== null
                            ? item.fkSupporterIdBudgetMaprel.Userdata[0]
                                .lastname
                            : "")
                        : item &&
                          item.fkBusinessIdBudgetMaprel &&
                          item.fkBusinessIdBudgetMaprel.Businesses &&
                          item.fkBusinessIdBudgetMaprel.Businesses[0] &&
                          item.fkBusinessIdBudgetMaprel.Businesses[0].storeName
                        ? item.fkBusinessIdBudgetMaprel.Businesses[0].storeName
                        : ""),
                    (item["userType"] =
                      item &&
                      item.fkBudgetParticipantIdrel &&
                      item.fkBudgetParticipantIdrel.Userdata &&
                      item.fkBudgetParticipantIdrel.Userdata[0] &&
                      item.fkBudgetParticipantIdrel.Userdata[0].role
                        ? item.fkBudgetParticipantIdrel.Userdata[0].role
                        : item &&
                          item.fkSupporterIdBudgetMaprel &&
                          item.fkSupporterIdBudgetMaprel.Userdata &&
                          item.fkSupporterIdBudgetMaprel.Userdata[0] &&
                          item.fkSupporterIdBudgetMaprel.Userdata[0].role
                        ? item.fkSupporterIdBudgetMaprel.Userdata[0].role
                        : "BUSINESS"),
                    (item["itemCategory"] =
                      item !== null &&
                      item.fkBudgetItemCategoryIdrel != null &&
                      item.fkBudgetItemCategoryIdrel &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .categoryName
                        ? item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                            .categoryName
                        : ""),
                    (item["status"] =
                      item !== null &&
                      item.fkBudgetItemCategoryIdrel != null &&
                      item.fkBudgetItemCategoryIdrel &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .isActive
                        ? "ACTIVE"
                        : "INACTIVE"),
                    (item["createdAt"] =
                      item != null && item.createdAt
                        ? this.formatDate(item.createdAt)
                        : ""),
                    (item["tier"] =
                      item !== null &&
                      item.fkBudgetItemCategoryIdrel != null &&
                      item.fkBudgetItemCategoryIdrel &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .fktiertypemaprel &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .fktiertypemaprel.Tiertypes &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .fktiertypemaprel.Tiertypes[0] &&
                      item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .fktiertypemaprel.Tiertypes[0].tierType
                        ? item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                            .fktiertypemaprel.Tiertypes[0].tierType
                        : "")
                  );
                });
                this.setState({
                  count:
                    res.data &&
                    res.data.allBudgets &&
                    res.data.allBudgets !== null
                      ? res.data.allBudgets.totalCount
                      : "",
                  listData:
                    res.data &&
                    res.data.allBudgets &&
                    res.data.allBudgets !== null
                      ? res.data.allBudgets.Budgets
                      : "",
                  temp:
                    res.data &&
                    res.data.allBudgets &&
                    res.data.allBudgets !== null
                      ? res.data.allBudgets.Budgets
                      : ""
                  // selectedTier: ""
                });
              }
            })
            .catch(e => {
              swal({ title: e.message, icon: "warning" });
              this.setState({ listData: [] });
            });
        })
        .catch(error => {
          swal({ title: error.message, icon: "warning" });
        });

      // filterdata.participantId =  //JSON.parse(localStorage.getItem("userInfo")).id;
      // this.setState({
      //   filter: filterdata
      // });
    } else {
      fetchMethod(budgetQuery, {
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
            res.data.allBudgets.Budgets.map(item => {
              return (
                (item["budgetAvailable"] =
                  item.budgetAvailable &&
                  item.budgetAvailable !== null &&
                  item.budgetAvailable !== ""
                    ? "$" + item.budgetAvailable
                    : ""),
                (item["userName"] =
                  item &&
                  item.fkBudgetParticipantIdrel &&
                  item.fkBudgetParticipantIdrel.Userdata &&
                  item.fkBudgetParticipantIdrel.Userdata[0]
                    ? item.fkBudgetParticipantIdrel.Userdata[0].firstname +
                      " " +
                      (item.fkBudgetParticipantIdrel.Userdata[0].lastname !==
                      null
                        ? item.fkBudgetParticipantIdrel.Userdata[0].lastname
                        : "")
                    : item &&
                      item.fkSupporterIdBudgetMaprel &&
                      item.fkSupporterIdBudgetMaprel.Userdata &&
                      item.fkSupporterIdBudgetMaprel.Userdata[0]
                    ? item.fkSupporterIdBudgetMaprel.Userdata[0].firstname +
                      " " +
                      (item.fkSupporterIdBudgetMaprel.Userdata[0].lastname !==
                      null
                        ? item.fkSupporterIdBudgetMaprel.Userdata[0].lastname
                        : "")
                    : item &&
                      item.fkBusinessIdBudgetMaprel &&
                      item.fkBusinessIdBudgetMaprel.Businesses &&
                      item.fkBusinessIdBudgetMaprel.Businesses[0] &&
                      item.fkBusinessIdBudgetMaprel.Businesses[0].storeName
                    ? item.fkBusinessIdBudgetMaprel.Businesses[0].storeName
                    : ""),
                (item["userType"] =
                  item &&
                  item.fkBudgetParticipantIdrel &&
                  item.fkBudgetParticipantIdrel.Userdata &&
                  item.fkBudgetParticipantIdrel.Userdata[0] &&
                  item.fkBudgetParticipantIdrel.Userdata[0].role
                    ? item.fkBudgetParticipantIdrel.Userdata[0].role
                    : item &&
                      item.fkSupporterIdBudgetMaprel &&
                      item.fkSupporterIdBudgetMaprel.Userdata &&
                      item.fkSupporterIdBudgetMaprel.Userdata[0] &&
                      item.fkSupporterIdBudgetMaprel.Userdata[0].role
                    ? item.fkSupporterIdBudgetMaprel.Userdata[0].role
                    : "BUSINESS"),
                (item["itemCategory"] =
                  item !== null &&
                  item.fkBudgetItemCategoryIdrel != null &&
                  item.fkBudgetItemCategoryIdrel &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .categoryName
                    ? item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .categoryName
                    : ""),
                (item["status"] =
                  item !== null &&
                  item.fkBudgetItemCategoryIdrel != null &&
                  item.fkBudgetItemCategoryIdrel &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .isActive
                    ? "ACTIVE"
                    : "INACTIVE"),
                (item["createdAt"] =
                  item != null && item.createdAt
                    ? this.formatDate(item.createdAt)
                    : ""),
                (item["tier"] =
                  item !== null &&
                  item.fkBudgetItemCategoryIdrel != null &&
                  item.fkBudgetItemCategoryIdrel &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .fktiertypemaprel &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .fktiertypemaprel.Tiertypes &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .fktiertypemaprel.Tiertypes[0] &&
                  item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                    .fktiertypemaprel.Tiertypes[0].tierType
                    ? item.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
                        .fktiertypemaprel.Tiertypes[0].tierType
                    : "")
              );
            });
            this.setState({
              count:
                res.data && res.data.allBudgets && res.data.allBudgets !== null
                  ? res.data.allBudgets.totalCount
                  : "",
              listData:
                res.data && res.data.allBudgets && res.data.allBudgets !== null
                  ? res.data.allBudgets.Budgets
                  : "",
              temp:
                res.data && res.data.allBudgets && res.data.allBudgets !== null
                  ? res.data.allBudgets.Budgets
                  : ""
              // selectedTier: ""
            });
          }
        })
        .catch(e => {
          swal({ title: e.message, icon: "warning" });
          this.setState({ listData: [] });
        });
    }
  };

  addBudget = () => {
    this.props.history.push("/addBudget");
  };
  handleEditModal = data => {
    this.props.history.push({
      pathname: "/editBudget",
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

          fetchMethod(saveBudget, { obj: test })
            .then(res => res.json())
            .then(res => {
              const id = res.data.saveBudget.id;
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
                  this.getSupporterData()
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
        // this.getBudgetData()
        // this();
      },
      200
    );
  };

  handleParticipantFilter = e => {
    delete this.state.filter.participantId;
    this.setState({ selectedParticipant: e.target.value });
    const {
      target: { name, value }
    } = e;
    const { filter } = this.state;
    filter[name] = value;

    this.getBudgetData();
  };

  handleParticipantAutocomplete = (e, v) => {
    if (v !== null && v !== undefined) {
      delete this.state.filter.participantId;
      const { filter } = this.state;
      filter.participantId = v.id;
      this.setState(
        { selectedParticipant: v.id, filter, budgetxyz: v },
        () => {}
      );
      this.getBudgetData();
    }
  };
  handleTierFilter = e => {
    this.setState({
      selectedTier: e.target.value
    });
    fetchMethod(categoryQueryData, {
      where: { tierId: e.target.value, isActive: 1 }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (
          resp &&
          resp.data &&
          resp.data.allMasterItemCategories &&
          resp.data.allMasterItemCategories.MasterItemCategories
        ) {
          this.setState({
            allCategoryList:
              resp.data.allMasterItemCategories.MasterItemCategories
          });
        }
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
    const { filter } = this.state;
    filter.tierid = e.target.value;
    this.getBudgetData();
  };

  handleTierFilterAutocomplete = (e, v) => {
    if (v !== null && v !== undefined) {
      this.setState({
        selectedTier: v.id,
        tierxyz: v
      });
      fetchMethod(categoryQueryData, {
        where: { tierId: v.id, isActive: 1 }
      })
        .then(resp => resp.json())
        .then(resp => {
          if (
            resp &&
            resp.data &&
            resp.data.allMasterItemCategories &&
            resp.data.allMasterItemCategories.MasterItemCategories
          ) {
            this.setState({
              allCategoryList:
                resp.data.allMasterItemCategories.MasterItemCategories
            });
          }
        })
        .catch(error => {
          swal({ title: error.message, icon: "warning" });
        });
      const { filter } = this.state;
      filter.tierid = v.id;
      this.getBudgetData();
    }
  };

  handleCategoryFilter = e => {
    this.setState({ selectedCategory: e.target.value });
    const {
      target: { name, value }
    } = e;
    const { filter } = this.state;
    filter[name] = value;
    this.getBudgetData();
  };

  handleCategoryFilterAutocomplete = (e, v) => {
    if (v !== null && v !== undefined) {
      const { filter } = this.state;
      this.setState({ selectedCategory: v.id, filter, categoryxyz: v });
      filter.item_category_id = v.id;
      this.getBudgetData();
    }
  };

  resetFilters = () => {
    delete this.state.filter.participantId;
    delete this.state.filter.item_category_id;
    delete this.state.filter.tierid;
    this.setState({
      selectedParticipant: "",
      selectedTier: "",
      selectedCategory: "",
      budgetxyz: null,
      tierxyz: null,
      categoryxyz: null
    });
    this.getBudgetData();
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
            {row.original.fkBudgetItemCategoryIdrel &&
            row.original.fkBudgetItemCategoryIdrel.MasterItemCategories[0] &&
            row.original.fkBudgetItemCategoryIdrel.MasterItemCategories[0]
              .isActive == 1 ? (
              <IconButton
                aria-label="edit"
                onClick={() => this.handleEditModal(row.original)}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="edit"
                disabled
                // onClick={() => this.handleEditModal(row.original)}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            )}
          </div>
        )
      }
    ];

    const columns = nameColumn.concat(budgetList.columns).concat(actionButton);
    return (
      <div className="participantSection budgetSection">
        <h2>Budget</h2>
        <div className="inputfield">
          <FormControl>
            {/* <InputLabel id="demo-simple">Participant</InputLabel>
            <Select
              labelid="demo-simple"
              value={this.state.selectedParticipant}
              onChange={this.handleParticipantFilter}
              input={<Input />}
              name="participantId"
              MenuProps={MenuProps}
            >
              {this.state.allParticipantList
                ? this.state.allParticipantList.map((item, index) => {
                    return (
                      <MenuItem
                        className="EmployeeType"
                        key={index}
                        value={item.id}
                      >
                        {item.firstname +
                          " " +
                          (item.lastname !== null ? item.lastname : "")}{" "}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select> */}

            <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.budgetxyz}
              options={this.state.allParticipantList}
              onChange={(e, v) => this.handleParticipantAutocomplete(e, v)}
              getOptionLabel={option =>
                option
                  ? option.firstname +
                    (option.lastname ? " " + option.lastname : "")
                  : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Participants"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <FormControl>
            {/* <InputLabel id="demo-simple">Tier</InputLabel>
            <Select
              labelid="demo-simple"
              value={this.state.selectedTier}
              onChange={this.handleTierFilter}
              input={<Input />}
              name="tierType"
              MenuProps={MenuProps}
            >
              {this.state.allTierList
                ? this.state.allTierList.map((item, index) => {
                    return (
                      <MenuItem
                        className="EmployeeType"
                        key={index}
                        value={item.id}
                      >
                        {item.tierType}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select> */}

            <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.tierxyz}
              options={this.state.allTierList}
              onChange={(e, v) => this.handleTierFilterAutocomplete(e, v)}
              getOptionLabel={option =>
                option && option.tierType ? option.tierType : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Tier" variant="outlined" />
              )}
            />
          </FormControl>

          <FormControl>
            {/* <InputLabel id="demo-simple">Category</InputLabel>
            <Select
              labelid="demo-simple"
              value={this.state.selectedCategory}
              onChange={this.handleCategoryFilter}
              input={<Input />}
              name="item_category_id"
              MenuProps={MenuProps}
            >
              {this.state.allCategoryList
                ? this.state.allCategoryList.map((item, index) => {
                    return (
                      <MenuItem
                        className="EmployeeType"
                        key={index}
                        value={item.id}
                      >
                        {item.categoryName}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select> */}

            <Autocomplete
              id="combo-box-demo"
              size="small"
              value={this.state.categoryxyz}
              options={this.state.allCategoryList}
              onChange={(e, v) => this.handleCategoryFilterAutocomplete(e, v)}
              getOptionLabel={option =>
                option && option.categoryName ? option.categoryName : ""
              }
              // style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Category" variant="outlined" />
              )}
            />
          </FormControl>
          <div className="addbdgetBtn">
            <Button onClick={this.resetFilters}>Reset</Button>
          </div>
          <div className="addbdgetBtn add">
            <Button onClick={this.addBudget}>Add Budget</Button>
          </div>
        </div>

        {this.state.listData ? (
          <div className="adminBudgetTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={budgetList}
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

export default withRouter(Budget);

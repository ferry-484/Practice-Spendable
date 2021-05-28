import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormComponent from "../../Form/FormComponent";
import { addBudgetConfig } from "./BudgetConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { DotLoader } from "react-spinners";
import "./addBudget.css";
import {
  saveBudget,
  participantQuery,
  getAllItemCategory,
  budgetTotalData,
  getAllTier,
  participantQueryData
} from "./BudgetQuery";
class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: parseInt(localStorage.getItem("rows")),
      rows: parseInt(localStorage.getItem("rows")),
      filter: {
        active: 1,
        role: "PARTICIPANT",
        order: "id desc"
      },
      count: 0,
      itemDataOptions: undefined,
      roleOptions: undefined,
      Role: [
        {
          role: "PARTICIPANT",
          id: "PARTICIPANT"
        },
        {
          role: "SUPPORTER",
          id: "SUPPORTER"
        },
        {
          role: "BUSINESS",
          id: "BUSINESS"
        }
      ],
      allParticipantList: undefined,
      allTierList: []
    };
  }

  componentDidMount() {
    // this.getModalData();
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
      .then(res => res.json())
      .then(res => {
        this.setState({
          allParticipantList: res.data.allUserdata.Userdata.map(item => {
            return {
              id: item.id,
              name:
                item.firstname + " " + (item.lastname != null ? item.lastname : "")
            };
          })
        });
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  };
  getAllTier = () => {
    fetchMethod(getAllTier)
      .then(resp => resp.json())
      .then(resp => {
        resp.data.allTiertypes !== undefined
          ? this.setState({
              allTierList: resp.data.allTiertypes.Tiertypes.map(item => {
                return { id: item.id, name: item.tierType };
              })
            })
          : this.setState({ loader: false });
      })
      .catch(error => {
        swal({ title: error.message, icon: "warning" });
      });
  };

  getRole = () => {
    this.setState({
      roleOptions: this.state.Role.map(item => {
        return { id: item.id, name: item.role };
      })
    });
  };

  getItemData = async () => {
    await fetchMethod(getAllItemCategory)
      .then(res => res.json())
      .then(res => {
        this.setState({
          itemDataOptions: res.data.allMasterItemCategories.MasterItemCategories.map(
            i => {
              return {
                id: i.id !== null ? i.id : "",
                name: i.categoryName !== null ? i.categoryName : ""
              };
            }
          )
        });
      });
  };

  getModalData = () => {
    fetchMethod(budgetTotalData, {
      where: this.state.filter
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.error && res.error.statusCode === 401) {
          swal({ title: res.error.message, icon: "warning" }).then(() => {
            localStorage.clear();
            window.location = "/";
          });
        } else {
    

          if (
            this.state.itemDataOptions !== undefined &&
            this.state.itemDataOptions !== null
          ) {
            let userId = res.data.allBudgets.Budgets.map(
              i => i.fkBudgetItemCategoryIdrel.MasterItemCategories[0].id
            );
            let temp = [this.state.itemDataOptions];

            for (let i = 0; i < userId.length; i++) {
              for (let x = 0; x < temp.length; x++) {
                if (temp[x].id === userId[i]) temp.splice(x, 1);
              }
            }

            this.setState({ itemDataOptions: temp });
          }

          // });
        }
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.setState({ listData: [] });
      });
  };
  getBudgetDetails = (participantId, itemCategoryId) => {
    fetchMethod(budgetTotalData, {
      where: {
        participantId: participantId,
        itemCategoryId: itemCategoryId
        // createdBy: JSON.parse(localStorage.getItem("userInfo")).id
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.allBudgets.Budgets.length > 0) {
          swal("Budget already exists", { icon: "error" });
        }
      });
  };
  preSubmitChanges = e => {
    //  this.getBudgetDetails(e.participantId,e.itemCategoryId);
    fetchMethod(budgetTotalData, {
      where: {
        participantId: e.participantId.id,
        itemCategoryId: e.itemCategoryId.id

        // createdBy: JSON.parse(localStorage.getItem("userInfo")).id
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.allBudgets && res.data.allBudgets.Budgets.length > 0) {
          swal("Budget already exists for this category", { icon: "error" });
          // this.props.history.push("/budget");
          return false;
        } else {
          let variables = {
            obj: {
              participantId: e.participantId.id,
              itemCategoryId: e.itemCategoryId.id,
              tierid: e.tierId.id,
              budgetAvailable: parseFloat(e.budgetAvailable),
              //guardian id.................. ya admin id just user match..
              createdBy: JSON.parse(localStorage.getItem("userInfo")).id,
              createdAt: Date.now()
            }
          };
          fetchMethod(saveBudget, variables)
            .then(res => res.json())
            .then(response => {
              const id =
                response.data && response.data.saveBudget
                  ? response.data.saveBudget
                  : "";
   
              if (id && id !== null) {
                swal({ text: "Budget added successfully", icon: "success" });
                this.props.history.push("/budget");
              } else if (id === null) {
                swal("Budget can't added", { icon: "error" });
              } else {
                swal("Please try again", { icon: "error" });
                this.props.history.push("/budget");
              }
            });
          return false;
        }
      });
    return false;
    // if (e.role === 'PARTICIPANT') {
    //   e['participantId'] = e.roleId;
    //   e['supporterId'] = null;
    //   e['businessId'] = null;
    // } else if (e.role === 'SUPPORTER') {
    //   console.log('suporterRole', e.participantId);
    //   e['participantId'] = null;
    //   e['supporterId'] = e.roleId;
    //   e['businessId'] = null;
    // } else {
    //   e['participantId'] = null;
    //   e['supporterId'] = null;
    //   e['businessId'] = e.roleId;
    // }
    // e['budgetAvailable'] = parseFloat(e.budgetAvailable);
    // e['itemCategoryId'] = e.itemCategoryId.id;
    // delete e.role;
    // delete e.roleId;

    // e['createdAt'] = Date.now();
    // console.log('after e', e);
    // e["active"] = 1
  };

  closeForm = () => {
    this.props.history.push("/budget");
  };

  render() {

    return (
      <div className="addbudgetSection">
        <h2> Add Budget</h2>
        {this.state.allParticipantList != undefined &&
        this.state.allParticipantList &&
        this.state.allParticipantList != "" &&
        this.state.allTierList !== undefined &&
        this.state.allTierList &&
        this.state.allTierList != "" ? (
          <FormComponent
            //   formConfig={
            //     localStorage.getItem("role") === "ADMIN"
            //       ? addAdminParticipantConfig
            //       : addGuardianParticipantConfig
            //   }
            formConfig={addBudgetConfig}
            preSubmitChanges={this.preSubmitChanges}
            buttonTitleCSS="adminParticipant"
            modalCloseCallback={() => {}}
            closeButton={this.closeForm}
            params={{
              participantOptions: this.state.allParticipantList,
              tierOptions: this.state.allTierList
            }}
          />
        ) : (
          <div className="spinner">
            <DotLoader size={70} color={"#020f1f"} />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(AddBudget);

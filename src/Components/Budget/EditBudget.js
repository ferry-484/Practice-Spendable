import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormComponent from "../../Form/FormComponent";
import { addBudgetConfig, editBudgetConfig } from "./BudgetConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import { DotLoader } from "react-spinners";
import "./addBudget.css";
import {
  saveBudget,
  participantQuery,
  getAllItemCategory,
  editBudgetQuery
} from "./BudgetQuery";
class EditBudget extends Component {
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
      participantOptions: undefined,
      itemDataOptions: undefined,
      id:
        this.props.location.state && this.props.location.state.details
          ? this.props.location.state.details
          : "",
      editableData: undefined
    };
  }

  componentWillMount() {
    // this.getPaticipantData();
    // this.getItemData();
    this.getBudgetById(this.state.id);
  }

  getBudgetById = id => {
    fetchMethod(editBudgetQuery(id))
      .then(res => res.json())
      .then(res => {
        if (
          res.data.allBudgets &&
          res.data.allBudgets !== undefined &&
          res.data.allBudgets.Budgets &&
          res.data.allBudgets.Budgets[0]
        ) {
          let data = res.data.allBudgets.Budgets[0];
          let obj = {
            id: data.id,
            budgetAvailable: data.budgetAvailable
          };

          this.setState({ editableData: obj });
        }

        // let participantId = optionParticipant.find(
        //   x => x.id === data.participantId
        // );
        // let itemCategoryId = optionBudget.find(
        //   x => x.id === data.itemCategoryId
        // );
      })
      .catch(e => {
        console.log("eeeee", e);
      });
  };

  getPaticipantData = () => {
    fetchMethod(participantQuery)
      .then(res => res.json())
      .then(res => {
        // this.setState({ participantOptions: res.data.allUserdata.Userdata })
        this.setState({
          participantOptions: res.data.allUserdata.Userdata.map(
            item => {
              return {
                id: item.id,
                name:
                  item.firstname + (item.lastname != null ? item.lastname : "")
              };
            },
            () => {
              // console.log("ppppppp", this.state.participantOptions);
            }
          )
        });
      });
  };

  getItemData = () => {
    fetchMethod(getAllItemCategory)
      .then(res => res.json())
      .then(res => {
        // this.setState({ participantOptions: res.data.allUserdata.Userdata })
        this.setState({
          itemDataOptions: res.data.allMasterItemCategories.MasterItemCategories.map(
            i => {
              return { id: i.id, name: i.categoryName };
            }
          )
        });
      });
  };

  preSubmitChanges = e => {
    e["budgetAvailable"] = parseFloat(e.budgetAvailable);
    e["id"] = e.id;
    e["updatedAt"] = Date.now();
    fetchMethod(saveBudget, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id =
          response.data && response.data.saveBudget
            ? response.data.saveBudget
            : "";

        if (id && id !== null) {
          swal({ text: "Budget updated successfully", icon: "success" });
          this.props.history.push("/budget");
        } else if (id === null) {
          swal("Budget can't update", { icon: "error" });
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/budget");
        }
      });
    return false;
  };

  closeForm = () => {
    this.props.history.push("/budget");
  };

  render() {
    return (
      <div className="addbudgetSection">
        {this.props.location.state !== undefined && this.state.editableData ? (
          <FormComponent
            //   formConfig={
            //     localStorage.getItem("role") === "ADMIN"
            //       ? addAdminParticipantConfig
            //       : addGuardianParticipantConfig
            //   }
            formConfig={editBudgetConfig}
            editableData={this.state.editableData}
            preSubmitChanges={this.preSubmitChanges}
            buttonTitleCSS="adminParticipant"
            modalCloseCallback={() => {}}
            closeButton={this.closeForm}
            params={{
              participantOptions: this.state.participantOptions,
              itemDataOptions: this.state.itemDataOptions
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
export default withRouter(EditBudget);

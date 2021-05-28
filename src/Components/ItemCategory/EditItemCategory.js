import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addItemCategoryConfig } from "./ItemConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  saveMasterItemCategory,
  itemCategoryId,
  tierDropdownData
} from "./ItemQuery";
// import "./addSupporter.css";
export default class EditSupporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableData: undefined,
      tierOptions: undefined,
      statusOptions: ["ACTIVE", "INACTIVE"]
    };
  }

  componentWillMount() {
    this.getTierData();

    // if (this.props.location.state !== undefined) {
    //   this.itemCategoryId(this.props.location.state.details);
    // }
  }

  getTierData = () => {
    fetchMethod(tierDropdownData)
      .then(res => res.json())
      .then(res => {
        // this.setState({ participantOptions: res.data.allUserdata.Userdata })
        this.setState(
          {
            tierOptions: res.data.allTiertypes.Tiertypes.map(item => {
              return { id: item.id, name: item.tierType };
            })
          },
          () => {
            if (this.props.location.state !== undefined) {
              this.itemCategoryId(
                this.props.location.state.details,
                this.state.tierOptions
              );
            }
          }
        );
      });
  };

  itemCategoryId = (id, tierOptions) => {
    // filter: {
    //     active: 1,
    //     role: "GUARDIAN",
    //     order: "id desc"
    //   },
    fetchMethod(itemCategoryId(id))
      .then(res => res.json())
      .then(res => {
        let optionsTier = tierOptions;
        let data = res.data.allMasterItemCategories.MasterItemCategories[0];

        let tierId = optionsTier.find(x => x.id === data.tierId);

        let obj = {
          id: data.id,
          tierId: tierId,
          categoryName: data.categoryName,
          status: data.isActive === 0 ? "INACTIVE" : "ACTIVE"
        };
        this.setState({
          editableData: obj
        });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/itemCategory");
      });
  };

  closeForm = () => {
    this.props.history.push("/itemCategory");
  };

  preSubmitChanges = e => {
    // e["updatedby"] = JSON.parse(localStorage.getItem("userInfo")).id;
    e["tierId"] = e.tierId.id;
    e["categoryName"] = e.categoryName;
    e["isActive"] = e["status"] === "ACTIVE" ? 1 : 0;
    delete e.status;
    fetchMethod(saveMasterItemCategory, { obj: e })
      .then(res => res.json())
      .then(response => {
        const id =
          response.data && response.data.saveMasterItemCategory
            ? response.data.saveMasterItemCategory
            : null;
        if (id && id !== null) {
          swal({
            title: "Item category updated successfully",
            icon: "success"
          });
          this.props.history.push("/itemCategory");
        } else {
          swal("Please try again", { icon: "error" });
          this.props.history.push("/itemCategory");
        }
      });
    return false;
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.editableData !== undefined && this.state.tierOptions ? (
            <div className="addParticipantSection">
              <h3>Edit Item Category</h3>
              <div className="editItemHead">
                <FormComponent
                  editableData={this.state.editableData}
                  formConfig={addItemCategoryConfig}
                  preSubmitChanges={this.preSubmitChanges}
                  buttonTitleCSS="adminParticipant"
                  modalCloseCallback={() => {}}
                  closeButton={this.closeForm}
                  params={{
                    tierOptions: this.state.tierOptions,
                    statusOptions: this.state.statusOptions
                  }}
                />
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/itemCategory")
        )}
      </div>
    );
  }
}

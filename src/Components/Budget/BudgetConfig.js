import { categoryQueryData } from "./BudgetQuery";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
export const budgetList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Participant",
      accessor: "userName",
      sortable: false
    },
    {
      Header: "Tier",
      accessor: "tier",
      sortable: false
    },
    {
      Header: "Category",
      accessor: "itemCategory",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "status",
      sortable: false
    },
    {
      Header: "Budget Allocated",
      accessor: "budgetAvailable",
      sortable: false
    },

    {
      Header: "Added On",
      accessor: "createdAt",
      sortable: false
    }
  ]
};

export const addBudgetConfig = {
  className: "addAdminParticipantForm",
  fields: [
    {
      label: "Participant",
      type: "searchSelect",
      name: "participantId",
      data: "participantOptions",
      value: ""
    },
    {
      label: "Tier",
      type: "searchSelect",
      name: "tierId",
      data: "tierOptions",
      value: ""
    },
    {
      label: "Category Name",
      type: "searchSelect",
      name: "itemCategoryId",
      data: "categoryOptions",
      value: ""
    },
    {
      label: "Budget Allocated",
      type: "input",
      name: "budgetAvailable",
      value: ""
    }
  ],
  dependency: [
    {
      parent: "tierId",
      child: "itemCategoryId",
      childOptions: "categoryOptions",
      listingFunction: value => {
        console.log("value...........................", value);
        if (value === null) {
          return [];
        }
        return fetchMethod(categoryQueryData, {
          where: { tierId: value.id, isActive: 1 }
        })
          .then(res => res.json())
          .then(res => {
            return res.data.allMasterItemCategories.MasterItemCategories !==
              null
              ? res.data.allMasterItemCategories.MasterItemCategories.map(
                  item => {
                    return {
                      id: item.id,
                      name: item.categoryName
                    };
                  }
                )
              : "";
          })
          .catch(error => {
            swal({ title: error.message, icon: "warning" });
          });
      }
    }
  ],

  validations: {
    participantId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter participant"
        };
      }
      return {
        valid: true
      };
    },
    tierId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter tier"
        };
      }
      return {
        valid: true
      };
    },
    itemCategoryId: e => {
      if (e === "") {
        return {
          valid: false,
          errMsg: "Please enter category"
        };
      }
      return {
        valid: true
      };
    },
    budgetAvailable: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "" || e <= 0) {
        return {
          valid: false,
          errMsg: "Please enter valid Budget amount."
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Budget Allocated should be contain only numeric value."
        };
      }
      if (e.length > 3) {
        return {
          valid: false,
          errMsg: "Budget Allocated should be contain only 3 digit."
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const editBudgetConfig = {
  className: "addAdminParticipantForm",
  fields: [
    {
      label: "Budget Allocated",
      type: "input",
      name: "budgetAvailable",
      value: ""
    }
  ],
  validations: {
    budgetAvailable: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "" || e <= 0) {
        return {
          valid: false,
          errMsg: "Please enter valid Budget amount."
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Budget Allocated should be contain only numeric value."
        };
      }
      if (e.length > 3) {
        return {
          valid: false,
          errMsg: "Budget Allocated should be contain only 3 digit."
        };
      }
      return {
        valid: true
      };
    }
  }
};

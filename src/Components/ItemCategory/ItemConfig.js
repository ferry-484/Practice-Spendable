export const itemCategoryList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "TierType",
      accessor: "tierType",
      sortable: false
    },
    {
      Header: "Item Category",
      accessor: "categoryName",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "isActive",
      sortable: false
    }
  ]
};

export const addItemCategoryConfig = {
  className: "addAdminParticipantForm",
  fields: [
    {
      label: "Tier",
      type: "searchSelect",
      name: "tierId",
      data: "tierOptions",
      value: ""
    },
    {
      label: "Item Category",
      type: "input",
      name: "categoryName",
      value: ""
    },
    {
      label: "Status",
      type: "searchSelect",
      name: "status",
      data: "statusOptions",
      value: ""
    }
  ],
  validations: {
    tierId: e => {
      if (e == "" || e == null) {
        return {
          valid: false,
          errMsg: "Please select tier."
        };
      }
      return {
        valid: true
      };
    },

    categoryName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter Item Category."
        };
      }
      return {
        valid: true
      };
    },
    status: e => {
      if (e === undefined || e === "" || e === null) {
        return {
          valid: false,
          errMsg: "Please enter status"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const addTierConfig = {
  className: "addAdminParticipantForm",
  fields: [
    {
      label: "Tier Name",
      type: "input",
      name: "tierType",
      value: ""
    }
  ],
  validations: {
    tierType: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter Tier Name"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const tierList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    // {
    //   Header: "Item Category",
    //   accessor: "categoryName",
    //   sortable: false
    // },
    {
      Header: "TierName",
      accessor: "tierType",
      sortable: false
    },
    {
      Header: "Status",
      accessor: "active",
      sortable: false
    }
  ]
};

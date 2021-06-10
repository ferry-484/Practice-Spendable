// export const superLedgerList = {
//   showPagination: true,
//   showSerialNo: true,
//   columns: [
//     {
//       Header: "Participant Name",
//       accessor: "participantname",
//       sortable: false
//     },
//     // {
//     //   Header: "Amount",
//     //   accessor: newFunction(),
//     //   sortable: false
//     // },
//     // {
//     //   Header: "Transaction ID",
//     //   accessor: "txnId",
//     //   sortable: false
//     // },
//     // {
//     //   Header: "Transaction Type",
//     //   accessor: "txnType",
//     //   sortable: false
//     // },
//     // {
//     //   Header: "Transaction By",
//     //   accessor: "name",
//     //   sortable: false
//     // },
//     {
//       Header: "Last Transaction",
//       accessor: "createdAt",
//       sortable: false
//     },
//     // {
//     //   Header: "PPAN",
//     //   accessor: "cardNumber",
//     //   sortable: false
//     // },
//     {
//       Header: "Card Limit",
//       accessor: "cardLimit",
//       sortable: false
//     },
  
//     //  {
//     //    Header: "Remaining Budget",
//     //    accessor: "budgetAvailable",
//     //    sortable: false
//     //  },
//     // {
//     //   Header: "Store Name",
//     //   accessor: "storeName",
//     //   sortable: false
//     // },
//     // {
//     //   Header: "Store City",
//     //   accessor: "storeCity",
//     //   sortable: false
//     // },
//     // {
//     //   Header: "Store Country",
//     //   accessor: "storeCountry",
//     //   sortable: false
//     // },
//     // {
//     //   Header: "MCC",
//     //   accessor: "mcc",
//     //   sortable: false
//     // }
//   ]
// };

// export const addFunds = {
//   className: "addAdminFundForm",
//   fields: [
//     {
//       label: "Amount",
//       type: "input",
//       name: "amountAdded",
//       value: ""
//     },
//     {
//       label: "Participant",
//       type: "searchSelect",
//       name: "User",
//       value: ""
//     }
//   ],
//   validations: {
//     amountAdded: e => {
//       let digit = new RegExp("^[0-9]{10}$");
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter Amount"
//         };
//       }
//       if (isNaN(e) !== false) {
//         return {
//           valid: false,
//           errMsg: "Fund contain only numeric value."
//         };
//       }
//       // if (digit.test(e) === false) {
//       //   return {
//       //     valid: false,
//       //     errMsg: ""
//       //   };
//       // }
//       return {
//         valid: true
//       };
//     },
//     User: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please Select User"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     dc: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please Add transition type"
//         };
//       }
//       return {
//         valid: true
//       };
//     }
//   }
// };

// function newFunction() {
//   return "amountAdded";
// }


export const superLedgerList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Participant Name",
      accessor: "participantname",
      sortable: false
    },
    {
      Header: "Transaction Date",
      accessor: "createdAt",
      sortable: false
    },
    {
      Header: "Card Limit",
      accessor: "cardLimit",
      sortable: false
    },
    {
      Header: "Available Budget",
      accessor: "budgetAvail",
      sortable: false
    },
  ]
};

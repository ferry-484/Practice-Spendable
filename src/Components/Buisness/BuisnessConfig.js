import { tr } from "date-fns/esm/locale";

export const adminBuisnessList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "ABN Number",
      accessor: "abnNumber",
      sortable: false
    },
    {
      Header: "Contact Number",
      accessor: "mobileNo",
      sortable: false
    },
    {
      Header: "Address",
      accessor: "contactLocationAdress",
      sortable: false
    },
    {
      Header: "City",
      accessor: "contactLocationCity",
      sortable: false
    },
    {
      Header: "Email",
      accessor: "email",
      sortable: false
    }
  ]
};

export const addBuisnessConfig = {
  className: "addBuisnessForm",
  fields: [
    {
      label: "Store Name",
      type: "input",
      name: "storeName",
      value: ""
    },
    {
      label: "ABN Number",
      type: "input",
      name: "abnNumber",
      value: ""
    },
    {
      label: "Mobile Number",
      type: "input",
      name: "mobileNo",
      value: ""
    },
    {
      label: "Store Telephone No",
      type: "input",
      name: "storeTelephoneNo",
      value: ""
    },
    {
      label: "Website Url",
      type: "input",
      name: "websiteUrl",
      value: ""
    },
    {
      label: "Email Address",
      type: "input",
      name: "email",
      value: ""
    },
    {
      label: "Transaction Address",
      type: "input",
      name: "txnLocationAddress",
      value: ""
    },
    {
      label: "Transaction City",
      type: "input",
      name: "txnLocationCity",
      value: ""
    },
    {
      label: "Transaction State",
      type: "input",
      name: "txnLocationState",
      value: ""
    },
    {
      label: "Transaction Country",
      type: "input",
      name: "txnLocationCountry",
      value: ""
    },
    {
      label: "Transaction Zip Code",
      type: "input",
      name: "txnLocationZipCode",
      value: ""
    },
    {
      label: "Contact Address",
      type: "input",
      name: "contactLocationAdress",
      value: ""
    },
    {
      label: "Contact City",
      type: "input",
      name: "contactLocationCity",
      value: ""
    },
    {
      label: "Contact State",
      type: "input",
      name: "contactLocationState",
      value: ""
    },
    {
      label: "Contact Country",
      type: "input",
      name: "contactLocationCountry",
      value: ""
    },
    {
      label: "Contact Zip Code",
      type: "input",
      name: "contactLocationZipCode",
      value: ""
    },
    {
      label: "Store Manager Name",
      type: "input",
      name: "storeManagerName",
      value: ""
    },
    {
      label: "CARD DETAILS",
      type: "heading",
      name: "storeManagerName",
      value: ""
    },
    {
      label: "PPAN",
      type: "input",
      name: "cardNumber",
      value: ""
    },
    {
      label: "BSB",
      type: "input",
      name: "BSB",
      value: ""
    },
    {
      label: "Card Type",
      type: "searchSelect",
      name: "cardtypeid",
      value: "",
      data: "cardtypeOptions"
    }

    // {
    //   label: "Expiry Date",
    //   type: "monthyear",
    //   name: "expirydate",
    //   value: ""
    // },
    // {
    //   label: "cvv",
    //   type: "input",
    //   name: "cvv",
    //   value: ""
    // }
  ],
  validations: {
    storeName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter store name"
        };
      }
      return {
        valid: true
      };
    },
    abnNumber: e => {
      if (
        e == "" ||
        e.length != 11 ||
        isNaN(e) ||
        e.indexOf("+") === 0 ||
        e.indexOf("-") === 0
      ) {
        return {
          valid: false,
          errMsg: "Please enter abn of 11 digits"
        };
      }
      return {
        valid: true
      };
    },
    email: e => {
      let re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter email"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Please enter valid email "
        };
      }
      return {
        valid: true
      };
    },
    mobileNo: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain only numeric value."
        };
      }
      if (digit.test(e) === false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain 10 digit."
        };
      }
      return {
        valid: true
      };
    },
    storeTelephoneNo: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter telephone number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Telephone Number should be contain only numeric value."
        };
      }
      // if (digit.test(e) === false) {
      //   return {
      //     valid: false,
      //     errMsg: "telephoneNo Number should be contain 10 digit."
      //   };
      // }
      return {
        valid: true
      };
    },
    websiteUrl: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter website url"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction address"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationCity: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction city"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationState: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction state"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationCountry: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction country"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationZipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction zip code"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationAdress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact address"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationCity: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact city"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationState: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact state"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationCountry: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact country"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationZipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact zip code"
        };
      }
      return {
        valid: true
      };
    },
    storeManagerName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter store manager name"
        };
      }
      return {
        valid: true
      };
    },

    cardNumber: e => {
      var format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
      // console.log("match,llllllllllllll", e.match(format));
      if (e && e.match(format)) {
        console.log("EEEEEEEEEEEEEE");
        return {
          valid: false,
          errMsg: "Special character not allowed"
        };
      }
      if (e && e.length != 16) {
        return {
          valid: false,
          errMsg: "Please enter valid ppan"
        };
      }

      return {
        valid: true
      };
    }
  }
  // BSB: e => {
  //   if (e && e.length != 16) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter 16 digit number"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // }
  // BSB: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter BSB"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },

  // holdername: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter Account holder name"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // accNo: e => {
  //   if (e.trim == "" || e.length < 9 || e.length > 20) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter valid Account Number of 9 to 20 digit"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // cardNumber: e => {
  //   if (e.trim() == "" || e.cardNumber < 10) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter 10 digit Card Number"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // expirydate: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter Expiry Date"
  //     };
  //   }
  //   // else if(){

  //   // }
  //   return {
  //     valid: true
  //   };
  // },
  // cvv: e => {
  //   // let cvv=
  //   console.log(
  //     "RESSSSSSSSSSSSSSSSSSSSSSS",
  //     e.length,
  //     e.trim(),
  //     isNaN(parseInt(e))
  //   );
  //   if (e.trim() == "" || (parseInt(e) && e && e.length === 3)) {
  //     return {
  //       valid: true
  //       // errMsg: "Please enter three digit CVV"
  //     };
  //   }
  //   return {
  //     valid: false,
  //     errMsg: "Please enter three digit CVV"
  //   };
  // }
};

export const editBuisnessConfig = {
  className: "addBuisnessForm",
  fields: [
    {
      label: "Store Name",
      type: "input",
      name: "storeName",
      value: ""
    },
    {
      label: "ABN Number",
      type: "input",
      name: "abnNumber",
      value: ""
    },
    {
      label: "Mobile Number",
      type: "input",
      name: "mobileNo",
      value: ""
    },
    {
      label: "Store Telephone No",
      type: "input",
      name: "storeTelephoneNo",
      value: ""
    },
    {
      label: "Website Url",
      type: "input",
      name: "websiteUrl",
      value: ""
    },
    {
      label: "Email Address",
      type: "input",
      name: "email",
      value: "",
      disabled: true
    },
    {
      label: "Transaction Address",
      type: "input",
      name: "txnLocationAddress",
      value: ""
    },
    {
      label: "Transaction City",
      type: "input",
      name: "txnLocationCity",
      value: ""
    },
    {
      label: "Transaction State",
      type: "input",
      name: "txnLocationState",
      value: ""
    },
    {
      label: "Transaction Country",
      type: "input",
      name: "txnLocationCountry",
      value: ""
    },
    {
      label: "Transaction Zip Code",
      type: "input",
      name: "txnLocationZipCode",
      value: ""
    },
    {
      label: "Contact Address",
      type: "input",
      name: "contactLocationAdress",
      value: ""
    },
    {
      label: "Contact City",
      type: "input",
      name: "contactLocationCity",
      value: ""
    },
    {
      label: "Contact State",
      type: "input",
      name: "contactLocationState",
      value: ""
    },
    {
      label: "Contact Country",
      type: "input",
      name: "contactLocationCountry",
      value: ""
    },
    {
      label: "Contact Zip Code",
      type: "input",
      name: "contactLocationZipCode",
      value: ""
    },
    {
      label: "Store Manager Name",
      type: "input",
      name: "storeManagerName",
      value: ""
    },
    {
      label: "CARD DETAILS",
      type: "heading",
      name: "storeManagerName",
      value: ""
    },
    {
      label: "PPAN",
      type: "input",
      name: "cardNumber",
      value: ""
    },
    {
      label: "BSB",
      type: "input",
      name: "BSB",
      value: ""
    },
    {
      label: "Card Type",
      type: "searchSelect",
      name: "cardtypeid",
      value: "",
      data: "cardtypeOptions"
    }

    // {
    //   label: "Expiry Date",
    //   type: "monthyear",
    //   name: "expirydate",
    //   value: ""
    // },
    // {
    //   label: "cvv",
    //   type: "input",
    //   name: "cvv",
    //   value: ""
    // }
  ],
  validations: {
    storeName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter store name"
        };
      }
      return {
        valid: true
      };
    },
    abnNumber: e => {
      if (
        e == "" ||
        e.length != 11 ||
        isNaN(e) ||
        e.indexOf("+") === 0 ||
        e.indexOf("-") === 0
      ) {
        return {
          valid: false,
          errMsg: "Please enter abn of 11 digits"
        };
      }
      return {
        valid: true
      };
    },
    email: e => {
      let re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter email"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Please enter valid email "
        };
      }
      return {
        valid: true
      };
    },
    mobileNo: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain only numeric value."
        };
      }
      if (digit.test(e) === false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain 10 digit."
        };
      }
      return {
        valid: true
      };
    },
    storeTelephoneNo: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter telephone number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Telephone Number should be contain only numeric value."
        };
      }
      // if (digit.test(e) === false) {
      //   return {
      //     valid: false,
      //     errMsg: "telephoneNo Number should be contain 10 digit."
      //   };
      // }
      return {
        valid: true
      };
    },
    websiteUrl: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter website url"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationAddress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction address"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationCity: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction city"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationState: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction state"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationCountry: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction country"
        };
      }
      return {
        valid: true
      };
    },
    txnLocationZipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter transaction zip code"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationAdress: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact address"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationCity: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact city"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationState: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact state"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationCountry: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact country"
        };
      }
      return {
        valid: true
      };
    },
    contactLocationZipCode: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter contact zip code"
        };
      }
      return {
        valid: true
      };
    },
    storeManagerName: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter store manager name"
        };
      }
      return {
        valid: true
      };
    },

    cardNumber: e => {
      var format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
      if (e && e.match(format)) {
        console.log("EEEEEEEEEEEEEE");
        return {
          valid: false,
          errMsg: "Special character not allowed"
        };
      }
      if (e && e.length != 16) {
        return {
          valid: false,
          errMsg: "Please enter valid ppan "
        };
      }

      return {
        valid: true
      };
    }
  }
  // BSB: e => {
  //   if (e && e.length != 16) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter 16 digit number"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // }
  // BSB: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter BSB"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },

  // holdername: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter Account holder name"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // accNo: e => {
  //   if (e.trim == "" || e.length < 9 || e.length > 20) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter valid Account Number of 9 to 20 digit"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // cardNumber: e => {
  //   if (e.trim() == "" || e.cardNumber < 10) {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter 10 digit Card Number"
  //     };
  //   }
  //   return {
  //     valid: true
  //   };
  // },
  // expirydate: e => {
  //   if (e.trim() == "") {
  //     return {
  //       valid: false,
  //       errMsg: "Please enter Expiry Date"
  //     };
  //   }
  //   // else if(){

  //   // }
  //   return {
  //     valid: true
  //   };
  // },
  // cvv: e => {
  //   // let cvv=
  //   console.log(
  //     "RESSSSSSSSSSSSSSSSSSSSSSS",
  //     e.length,
  //     e.trim(),
  //     isNaN(parseInt(e))
  //   );
  //   if (e.trim() == "" || (parseInt(e) && e && e.length === 3)) {
  //     return {
  //       valid: true
  //       // errMsg: "Please enter three digit CVV"
  //     };
  //   }
  //   return {
  //     valid: false,
  //     errMsg: "Please enter three digit CVV"
  //   };
  // }
};

// export const editBuisnessConfig = {
//   className: "addBuisnessForm",
//   fields: [
//     {
//       label: "Store Name",
//       type: "input",
//       name: "storeName",
//       value: ""
//     },
//     {
//       label: "ABN Number",
//       type: "input",
//       name: "abnNumber",
//       value: ""
//     },
//     {
//       label: "Mobile Number",
//       type: "input",
//       name: "mobileNo",
//       value: ""
//     },
//     {
//       label: "Store Telephone No",
//       type: "input",
//       name: "storeTelephoneNo",
//       value: ""
//     },
//     {
//       label: "Website Url",
//       type: "input",
//       name: "websiteUrl",
//       value: ""
//     },
//     {
//       label: "Email Address",
//       type: "input",
//       name: "email",
//       value: "",
//       disabled: true
//     },
//     {
//       label: "Transaction Address",
//       type: "input",
//       name: "txnLocationAddress",
//       value: ""
//     },
//     {
//       label: "Transaction City",
//       type: "input",
//       name: "txnLocationCity",
//       value: ""
//     },
//     {
//       label: "Transaction State",
//       type: "input",
//       name: "txnLocationState",
//       value: ""
//     },
//     {
//       label: "Transaction Country",
//       type: "input",
//       name: "txnLocationCountry",
//       value: ""
//     },
//     {
//       label: "Transaction Zip Code",
//       type: "input",
//       name: "txnLocationZipCode",
//       value: ""
//     },
//     {
//       label: "Contact Address",
//       type: "input",
//       name: "contactLocationAdress",
//       value: ""
//     },
//     {
//       label: "Contact City",
//       type: "input",
//       name: "contactLocationCity",
//       value: ""
//     },
//     {
//       label: "Contact State",
//       type: "input",
//       name: "contactLocationState",
//       value: ""
//     },
//     {
//       label: "Contact Country",
//       type: "input",
//       name: "contactLocationCountry",
//       value: ""
//     },
//     {
//       label: "Contact Zip Code",
//       type: "input",
//       name: "contactLocationZipCode",
//       value: ""
//     },
//     {
//       label: "Store Manager Name",
//       type: "input",
//       name: "storeManagerName",
//       value: ""
//     }
//   ],
//   validations: {
//     storeName: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter store name"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     abnNumber: e => {
//       if (
//         e == "" ||
//         e.length != 11 ||
//         isNaN(e) ||
//         e.indexOf("+") === 0 ||
//         e.indexOf("-") === 0
//       ) {
//         return {
//           valid: false,
//           errMsg: "Please enter abn of 11 digits"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     email: e => {
//       let re = new RegExp(
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter email"
//         };
//       }
//       if (re.test(e) === false) {
//         return {
//           valid: false,
//           errMsg: "Please enter valid email "
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     mobileNo: e => {
//       let digit = new RegExp("^[0-9]{10}$");
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter mobile number"
//         };
//       }
//       if (isNaN(e) !== false) {
//         return {
//           valid: false,
//           errMsg: "Mobile Number should be contain only numeric value."
//         };
//       }
//       if (digit.test(e) === false) {
//         return {
//           valid: false,
//           errMsg: "Mobile Number should be contain 10 digit."
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     storeTelephoneNo: e => {
//       let digit = new RegExp("^[0-9]{10}$");
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter telephone number"
//         };
//       }
//       if (isNaN(e) !== false) {
//         return {
//           valid: false,
//           errMsg: "Telephone Number should be contain only numeric value."
//         };
//       }
//       // if (digit.test(e) === false) {
//       //   return {
//       //     valid: false,
//       //     errMsg: "telephoneNo Number should be contain 10 digit."
//       //   };
//       // }
//       return {
//         valid: true
//       };
//     },
//     websiteUrl: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter website url"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     txnLocationAddress: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter transaction address"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     txnLocationCity: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter transaction city"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     txnLocationState: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter transaction state"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     txnLocationCountry: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter transaction country"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     txnLocationZipCode: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter transaction zip code"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     contactLocationAdress: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter contact address"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     contactLocationCity: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter contact city"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     contactLocationState: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter contact state"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     contactLocationCountry: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter contact country"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     contactLocationZipCode: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter contact zip code"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     storeManagerName: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter store manager name"
//         };
//       }
//       return {
//         valid: true
//       };
//     }
//   }
// };
export const adminBuisnessMemberList = {
  showPagination: true,
  showSerialNo: true,
  columns: [
    {
      Header: "Last Name",
      accessor: "lastname",
      sortable: false
    },
    {
      Header: "Email",
      accessor: "email",
      sortable: false
    },
    {
      Header: "Mobile Number",
      accessor: "phonenumber",
      sortable: false
    },
    {
      Header: "Date Of Birth",
      accessor: "dob",
      sortable: false
    }
  ]
};

export const editBuisnessMemberConfig = {
  className: "addBuisnessMemberForm",
  fields: [
    {
      label: "First Name",
      type: "input",
      name: "firstname",
      value: ""
    },
    {
      label: "Last Name",
      type: "input",
      name: "lastname",
      value: ""
    },
    {
      label: "Date Of Birth",
      type: "datePicker",
      name: "dob",
      value: new Date(),
      max: Date.now()
    },
    {
      label: "Email Address",
      type: "input",
      name: "email",
      value: "",
      disabled: true
    },
    {
      label: "Mobile Number",
      type: "input",
      name: "phonenumber",
      value: ""
    },
    {
      label: "Address",
      type: "input",
      name: "address",
      value: ""
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: ""
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: ""
    },
    {
      label: "Country",
      type: "input",
      name: "country",
      value: ""
    },
    {
      label: "Zip Code",
      type: "input",
      name: "zipcode",
      value: ""
    }
  ],
  validations: {
    firstname: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter first name"
        };
      }
      return {
        valid: true
      };
    },
    lastname: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter last name"
        };
      }
      return {
        valid: true
      };
    },
    email: e => {
      let re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter email"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Please enter valid email "
        };
      }
      return {
        valid: true
      };
    },
    phonenumber: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain only numeric value."
        };
      }
      if (digit.test(e) === false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain 10 digit."
        };
      }
      return {
        valid: true
      };
    },
    address: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    }
  }
};

export const addBuisnessMemberConfig = {
  className: "addBuisnessMemberForm",
  fields: [
    {
      label: "First Name",
      type: "input",
      name: "firstname",
      value: ""
    },
    {
      label: "Last Name",
      type: "input",
      name: "lastname",
      value: ""
    },
    {
      label: "Date Of Birth",
      type: "datePicker",
      name: "dob",
      value: new Date(),
      max: Date.now()
    },
    {
      label: "Email Address",
      type: "input",
      name: "email",
      value: ""
    },
    {
      label: "Mobile Number",
      type: "input",
      name: "phonenumber",
      value: ""
    },
    {
      label: "Address",
      type: "input",
      name: "address",
      value: ""
    },
    {
      label: "City",
      type: "input",
      name: "city",
      value: ""
    },
    {
      label: "State",
      type: "input",
      name: "state",
      value: ""
    },
    {
      label: "Country",
      type: "input",
      name: "country",
      value: ""
    },
    {
      label: "Zip Code",
      type: "input",
      name: "zipcode",
      value: ""
    }
  ],
  validations: {
    firstname: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter first name"
        };
      }
      return {
        valid: true
      };
    },
    lastname: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter last name"
        };
      }
      return {
        valid: true
      };
    },
    email: e => {
      let re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter email"
        };
      }
      if (re.test(e) === false) {
        return {
          valid: false,
          errMsg: "Please enter valid email "
        };
      }
      return {
        valid: true
      };
    },
    phonenumber: e => {
      let digit = new RegExp("^[0-9]{10}$");
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter mobile number"
        };
      }
      if (isNaN(e) !== false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain only numeric value."
        };
      }
      if (digit.test(e) === false) {
        return {
          valid: false,
          errMsg: "Mobile Number should be contain 10 digit."
        };
      }
      return {
        valid: true
      };
    },
    address: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter address"
        };
      }
      return {
        valid: true
      };
    }
  }
};

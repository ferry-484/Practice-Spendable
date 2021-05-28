export const adminSupporterList = {
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
      Header: "Mobile No.",
      accessor: "phonenumber",
      sortable: false
    },
    {
      Header: "Date Of Birth",
      accessor: "dob",
      sortable: false
    },
    {
      Header: "Address",
      accessor: "fullAddress",
      sortable: false
    }
  ]
};

export const addSupporterConfig = {
  className: "addSupporterForm",
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
      value: null,
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
    },
    {
      label: "Card Details",
      type: "heading",
      name: "storeManagerName",
      value: ""
    },

    // {
    //   label: "Account Holder Name",
    //   type: "input",
    //   name: "holdername",
    //   value: ""
    // },
    // {
    //   label: "Account Number",
    //   type: "input",
    //   name: "accNo",
    //   value: ""
    // },
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
    },
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

    cardNumber: e => {
      var format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
      // console.log("match,llllllllllllll", e.match(format));
      if (e && e.match(format)) {
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
  // ,
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
};

export const editSupporterConfig = {
  className: "addSupporterForm",
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
      value: null,
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
    },
    {
      label: "Card Details",
      type: "heading",
      name: "storeManagerName",
      value: ""
    },

    // {
    //   label: "Account Holder Name",
    //   type: "input",
    //   name: "holdername",
    //   value: ""
    // },
    // {
    //   label: "Account Number",
    //   type: "input",
    //   name: "accNo",
    //   value: ""
    // },
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
    },
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
          errMsg: "Please enter valid ppan."
        };
      }

      return {
        valid: true
      };
    }
  }
};
//   BSB: e => {
//     if (e && e.length != 16) {
//       return {
//         valid: false,
//         errMsg: "Please enter 16 digit number"
//       };
//     }
//     return {
//       valid: true
//     };
//   }
// };

// export const editSupporterConfig = {
//   className: "addSupporterForm",
//   fields: [
//     {
//       label: "First Name",
//       type: "input",
//       name: "firstname",
//       value: ""
//     },
//     {
//       label: "Last Name",
//       type: "input",
//       name: "lastname",
//       value: ""
//     },
//     {
//       label: "Date Of Birth",
//       type: "datePicker",
//       name: "dob",
//       value: null,
//       max: Date.now()
//     },
//     {
//       label: "Email Address",
//       type: "input",
//       name: "email",
//       value: "",
//       disabled: true
//     },
//     {
//       label: "Mobile Number",
//       type: "input",
//       name: "phonenumber",
//       value: ""
//     },
//     {
//       label: "Address",
//       type: "input",
//       name: "address",
//       value: ""
//     },
//     {
//       label: "City",
//       type: "input",
//       name: "city",
//       value: ""
//     },
//     {
//       label: "State",
//       type: "input",
//       name: "state",
//       value: ""
//     },
//     {
//       label: "Country",
//       type: "input",
//       name: "country",
//       value: ""
//     },
//     {
//       label: "Zip Code",
//       type: "input",
//       name: "zipcode",
//       value: ""
//     }
//   ],
//   validations: {
//     firstname: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter first name"
//         };
//       }
//       return {
//         valid: true
//       };
//     },
//     lastname: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter last name"
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
//     phonenumber: e => {
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
//     address: e => {
//       if (e == "") {
//         return {
//           valid: false,
//           errMsg: "Please enter address"
//         };
//       }
//       return {
//         valid: true
//       };
//     }
//   }
// };

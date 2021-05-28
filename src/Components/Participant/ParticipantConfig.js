import moment from "moment";
export const guardianParticipantList = {
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
    // {
    //   Header: "NDIS Number",
    //   accessor: "ndisNumber",
    //   sortable: false
    // }
  ]
};

export const adminParticipantList = {
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
    // {
    //   Header: "NDIS Number",
    //   accessor: "ndisNumber",
    //   sortable: false
    // }
  ]
};

export const addGuardianParticipantConfig = {
  className: "addAdminParticipantForm",
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
    // {
    //   label: "Guardian",
    //   type: "searchSelect",
    //   name: "guardianId",
    //   value: {},
    //   data: "guardiansOptions"
    // },
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
    // {
    //   label: "NDIS Number",
    //   type: "input",
    //   name: "ndisNumber",
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
    }
  }
};

export const editGuardianParticipantConfig = {
  className: "addAdminParticipantForm",
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
    // {
    //   label: "Guardian",
    //   type: "searchSelect",
    //   name: "guardianId",
    //   value: {},
    //   data: "guardiansOptions"
    // },
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
    // {
    //   label: "NDIS Number",
    //   type: "input",
    //   name: "ndisNumber",
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
    }
  }
};
export const addAdminParticipantConfig = {
  className: "addAdminParticipantForm",
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
      label: "Guardian",
      type: "searchSelect",
      name: "guardianId",
      value: "",
      data: "guardiansOptions"
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
    // {
    //   label: "NDIS Number",
    //   type: "input",
    //   name: "ndisNumber",
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
  },
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
  // },
  // expirydate: e => {
  //   console.log("console ................value of e ", e);
  //   let expDateM = null;
  //   if (e) {
  //     expDateM = `01/${e}`;
  //   }
  //   console.log("expDateM", expDateM);

  //   let GettedMonth = 0;
  //   let CurrMonth = moment(new Date()).month() + 1;
  //   if (expDateM) {
  //     GettedMonth = moment(expDateM, "DD/MM/YYYY").month() + 1;
  //   }
  //   console.log("GettedMonth", GettedMonth, " CurrMonth", CurrMonth);

  //   let Gettedyear = 0;
  //   let Curryear = moment(new Date()).year();
  //   if (expDateM) {
  //     Gettedyear = moment(expDateM, "DD/MM/YYYY").year();
  //   }
  //   console.log("Gettedyear", Gettedyear, " Curryear", Curryear);

  //   let yearOkay = true;
  //   let monthOkay = true;

  //   if (Gettedyear && Gettedyear < Curryear) {
  //     yearOkay = false;
  //   }
  //   if (Gettedyear == Curryear && GettedMonth <= CurrMonth) {
  //     monthOkay = false;
  //   } else if (e && (String(e).length < 7 || !String(e).includes("/"))) {
  //     return {
  //       // valid: false,
  //       errMsg: "please fill valid exp date."
  //     };
  //     // alert("please fill valid exp date.");
  //     // return;
  //   } else if (!yearOkay || (yearOkay && !monthOkay)) {
  //     if (!yearOkay) {
  //       return {
  //         // valid: false,
  //         errMsg: "Enter valid year"
  //       };
  //       // alert("Enter valid year");
  //       return;
  //     }

  //     if (yearOkay && !monthOkay) {
  //       return {
  //         // valid: false,
  //         errMsg: "Enter valid month"
  //       };
  //       // alert("Enter valid month");
  //       return;
  //     }
  //   } else if (isNaN(GettedMonth) || GettedMonth == 0) {
  //     return {
  //       // valid: false,
  //       errMsg: "Enter valid month"
  //     };
  //     // alert("Enter valid month");
  //     // return;
  //   } else if (isNaN(Gettedyear) || Gettedyear == 0) {
  //     return {
  //       // valid: false,
  //       errMsg: "Enter valid year"
  //     };
  //     // alert("Enter valid year");
  //     return;
  //   }
  // },
  // cvv: e => {
  //   // let cvv=
  //   // console.log(
  //   //   "RESSSSSSSSSSSSSSSSSSSSSSS",
  //   // e.length,
  //   // e.trim(),
  //   // isNaN(parseInt(e))
  //   // );
  //   if (e.trim() == "" || (parseInt(e) && e && e.length === 3)) {
  //     return {
  //       valid: true
  //       // errMsg: "Please enter three digit CVV"
  //     };
  //   }

  //   // if(e.length===2){
  //   //   return
  //   // }
  //   return {
  //     valid: false,
  //     errMsg: "Please enter three digit CVV"
  //   };
  // },
  guardianId: e => {
    // console.log("######################", e.length);
    if (!e) {
      return {
        valid: false,
        errMsg: "Please select guardian dropdown."
      };
    }
    return {
      valid: true
    };
  }
};

export const editAdminParticipantConfig = {
  className: "addAdminParticipantForm",
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
      label: "Guardian",
      type: "searchSelect",
      name: "guardianId",
      value: "",
      data: "guardiansOptions"
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
    // {
    //   label: "NDIS Number",
    //   type: "input",
    //   name: "ndisNumber",
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
    cardNumber: e => {
      var format = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
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
  },
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
  // },
  // expirydate: e => {
  //   console.log("console ................value of e ", e);
  //   let expDateM = null;
  //   if (e) {
  //     expDateM = `01/${e}`;
  //   }
  //   console.log("expDateM", expDateM);

  //   let GettedMonth = 0;
  //   let CurrMonth = moment(new Date()).month() + 1;
  //   if (expDateM) {
  //     GettedMonth = moment(expDateM, "DD/MM/YYYY").month() + 1;
  //   }
  //   console.log("GettedMonth", GettedMonth, " CurrMonth", CurrMonth);

  //   let Gettedyear = 0;
  //   let Curryear = moment(new Date()).year();
  //   if (expDateM) {
  //     Gettedyear = moment(expDateM, "DD/MM/YYYY").year();
  //   }
  //   console.log("Gettedyear", Gettedyear, " Curryear", Curryear);

  //   let yearOkay = true;
  //   let monthOkay = true;

  //   if (Gettedyear && Gettedyear < Curryear) {
  //     yearOkay = false;
  //   }
  //   if (Gettedyear == Curryear && GettedMonth <= CurrMonth) {
  //     monthOkay = false;
  //   } else if (e && (String(e).length < 7 || !String(e).includes("/"))) {
  //     return {
  //       // valid: false,
  //       errMsg: "please fill valid exp date."
  //     };
  //     // alert("please fill valid exp date.");
  //     // return;
  //   } else if (!yearOkay || (yearOkay && !monthOkay)) {
  //     if (!yearOkay) {
  //       return {
  //         // valid: false,
  //         errMsg: "Enter valid year"
  //       };
  //       // alert("Enter valid year");
  //       return;
  //     }

  //     if (yearOkay && !monthOkay) {
  //       return {
  //         // valid: false,
  //         errMsg: "Enter valid month"
  //       };
  //       // alert("Enter valid month");
  //       return;
  //     }
  //   } else if (isNaN(GettedMonth) || GettedMonth == 0) {
  //     return {
  //       // valid: false,
  //       errMsg: "Enter valid month"
  //     };
  //     // alert("Enter valid month");
  //     // return;
  //   } else if (isNaN(Gettedyear) || Gettedyear == 0) {
  //     return {
  //       // valid: false,
  //       errMsg: "Enter valid year"
  //     };
  //     // alert("Enter valid year");
  //     return;
  //   }
  // },
  // cvv: e => {
  //   // let cvv=
  //   // console.log(
  //   //   "RESSSSSSSSSSSSSSSSSSSSSSS",
  //   // e.length,
  //   // e.trim(),
  //   // isNaN(parseInt(e))
  //   // );
  //   if (e.trim() == "" || (parseInt(e) && e && e.length === 3)) {
  //     return {
  //       valid: true
  //       // errMsg: "Please enter three digit CVV"
  //     };
  //   }

  //   // if(e.length===2){
  //   //   return
  //   // }
  //   return {
  //     valid: false,
  //     errMsg: "Please enter three digit CVV"
  //   };
  // },
  guardianId: e => {
    // console.log("######################", e.length);
    if (!e) {
      return {
        valid: false,
        errMsg: "Please select guardian dropdown."
      };
    }
    return {
      valid: true
    };
  }
};
// export const editAdminParticipantConfig = {
//   className: "addAdminParticipantForm",
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
//       label: "Guardian",
//       type: "searchSelect",
//       name: "guardianId",
//       value: "",
//       data: "guardiansOptions"
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
//     // {
//     //   label: "NDIS Number",
//     //   type: "input",
//     //   name: "ndisNumber",
//     //   value: ""
//     // }
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
//     },
//     guardianId: e => {
//       // console.log("######################", e.length);
//       if (!e) {
//         return {
//           valid: false,
//           errMsg: "Please select guardian dropdown."
//         };
//       }
//       return {
//         valid: true
//       };
//     }
//   }
// };

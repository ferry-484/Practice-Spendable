export const adminGuardianList = {
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
      Header: "Address",
      accessor: "fullAddress",
      sortable: false
    }
  ]
};

export const addGuardianConfig = {
  className: "addGuardianForm",
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

export const editGuardianConfig = {
  className: "addGuardianForm",
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

export const addGuardianParticipantConfig = {
  className: "addGuardianParticipantForm",
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

export const editGuardianParticipantConfig = {
  className: "addGuardianParticipantForm",
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

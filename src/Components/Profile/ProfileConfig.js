export const profileConfig = {
  className: "ProfileConfig",
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
      label: "PPAN",
      type: "input",
      name: "cardNumber",
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
          errMsg: "Please enter valid ppan "
        };
      }

      return {
        valid: true
      };
    }
  }
};

export const changePasswordConfig = {
  className: "ChangePassword",
  fields: [
    {
      label: "Old Password",
      type: "password",
      name: "oldPassword",
      value: ""
    },
    {
      label: "New Password",
      type: "password",
      name: "newPassword",
      value: ""
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: ""
    }
  ],
  validations: {
    oldPassword: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter current password"
        };
      }
      if (e.length < 6) {
        return {
          valid: false,
          errMsg: "Old Password should be atleast 6 characters long"
        };
      }
      return {
        valid: true
      };
    },
    newPassword: e => {
      if (e == "") {
        return {
          valid: false,
          errMsg: "Please enter new password"
        };
      }
      if (e.length < 6) {
        return {
          valid: false,
          errMsg: "Old Password should be atleast 6 characters long"
        };
      }
      return {
        valid: true
      };
    }
  },
  dependentValidations: {
    confirmPassword: (val, data) => {
      if (val !== data.newPassword) {
        return {
          valid: false,
          errMsg: "Password not match."
        };
      }
      return {
        valid: true
      };
    }
  }
};

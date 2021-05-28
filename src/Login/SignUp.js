import React, { Component } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { DotLoader } from "react-spinners";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
// import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { fetchMethod } from "../FetchMethod";
import "./login.css";
import { userdataSignup } from "./SignUpQuery";
import { Link } from "react-router-dom";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: "",
      showPassword: false,
      showcPassword: false,
      email: "",
      password: "",
      cPassword: "",
      errors: { email: "", password: "" }
    };
  }

  componentWillMount() {
    // if (this.props && this.props.location && this.props.location.email) {
    //   this.setState({ email: this.props.location.email });
    // }
  }
  // onSignIn = () => {
  //   this.props.history.push("/");
  // };
  onSubmit() {
    const { accessCode, password, cPassword, email } = this.state;
    if (
      email.length != 0 &&
      accessCode != 0 &&
      password.length != 0 &&
      cPassword.length != 0 &&
      password === cPassword
    ) {
      if (this.validateForm(email, password)) {
        fetchMethod(userdataSignup(email, accessCode, password))
          .then(res => res.json())
          .then(res => {
            if (res && res.data && res.data.UserdataSignup) {
              this.setState({
                email: "",
                accessCode: "",
                password: ""
              });
              swal({
                title: "Sign up successfully.",
                icon: "success"
              });
              this.props.history.push("/");
            } else {
              swal({
                title: "Invalid details for the guardian.",
                icon: "error"
              });
            }
          });
      } else {
        swal({
          title:
            this.state.errors.email != ""
              ? this.state.errors.email
              : this.state.errors.password,
          icon: "error"
        });
      }
    } else if (password != cPassword) {
      swal({
        title: "Password, confirm password must be same",
        icon: "error"
      });
    } else {
      swal({
        title: "Enter data",
        icon: "error"
      });
    }
  }
  validateForm = (email, password) => {
    const { errors } = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    errors.email = validEmailRegex.test(email.trim())
      ? ""
      : "Email is not valid!";
    errors.password =
      password.trim().length > 6
        ? ""
        : "Password should be greater than 6 characters";
    this.setState({ errors });
    return this.state.errors.email === "Email is not valid!" ||
      this.state.errors.password ===
        "Password should be greater than 6 characters"
      ? false
      : true;
  };
  handleCode = e => {
    this.setState({ accessCode: e.target.value });
  };
  handleEmail = e => {
    this.setState({ email: e.target.value });
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowcPassword = () => {
    this.setState({ showcPassword: !this.state.showcPassword });
  };
  handlePassword = e => {
    this.setState({ password: e.target.value });
  };
  handleChange = e => {
    this.setState({
      cPassword: e.target.value
    });
  };

  render() {
    return (
      <div className="signMain">
        <div className="signForm forgotpasswordSection">
          <h2>Guardian Sign Up</h2>

          {/* <form > */}
          <TextField
            value={this.state.accessCode}
            //   variant="outlined"
            margin="normal"
            id="Access Code"
            name="Access Code"
            placeholder="Access Code"
            onChange={this.handleCode}
            InputProps={{
              endAdornment: <InputAdornment position="end"></InputAdornment>
            }}
          />

          <TextField
            value={this.state.email}
            //   variant="outlined"
            margin="normal"
            id="email"
            name="email"
            placeholder="Email"
            onChange={this.handleEmail}
            InputProps={{
              endAdornment: <InputAdornment position="end"></InputAdornment>
            }}
          />
          <TextField
            value={this.state.Password}
            //   variant="outlined"
            margin="normal"
            id="Password"
            name="Password"
            placeholder="Password"
            type={this.state.showPassword ? "text" : "password"}
            // type="password"
            onChange={this.handlePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            value={this.state.cPassword}
            //   variant="outlined"
            margin="normal"
            id="Confirm password"
            name="Confirm password"
            placeholder="Confirm password"
            type={this.state.showcPassword ? "text" : "password"}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowcPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showcPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="signBtn"
            onClick={() => this.onSubmit()}
          >
            Sign Up
          </Button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
export default withRouter(SignUp);

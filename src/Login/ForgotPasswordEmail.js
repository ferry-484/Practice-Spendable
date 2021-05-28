import React, { Component } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { DotLoader } from "react-spinners";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
// import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { fetchMethod } from "../FetchMethod";
import "./login.css";
import {
  UserdataPasswordforgot,
  UserdataOtp,
  UserdataResendotp,
} from "./ForgotQuery";
import { Link } from "react-router-dom";
class ForgotPasswordEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: 0,
      showPassword: false,
      showcPassword: false,
      email: "",
      password: "",
      cPassword: "",
      errors: { email: "", password: "" },
    };
  }

  componentWillMount() {
    if (this.props && this.props.location && this.props.location.email) {
      this.setState({ email: this.props.location.email });
    }
  }
  // onSignIn = () => {
  //   this.props.history.push("/");
  // };
  nextEmail() {
    const { otp, password, cPassword, email } = this.state;
    if (
      email.length != 0 &&
      otp != 0 &&
      password.length != 0 &&
      cPassword.length != 0 &&
      password === cPassword
    ) {
      if (this.validateForm(email, password)) {
        fetchMethod(UserdataPasswordforgot(email, otp, password))
          .then((res) => res.json())
          .then((res) => {
            if (res && res.data && res.data.UserdataPasswordforgot) {
              this.setState({
                email: "",
                otp: 0,
                password: "",
              });
              swal({
                title: "Password reset",
                icon: "success",
              });
              this.props.history.push("/");
            } else {
              swal({
                title: "Invalid details",
                icon: "error",
              });
            }
          });
      } else {
        swal({
          title:
            this.state.errors.email != ""
              ? this.state.errors.email
              : this.state.errors.password,
          icon: "error",
        });
      }
    } else if (password != cPassword) {
      swal({
        title: "Password, confirm password must be same",
        icon: "error",
      });
    } else {
      swal({
        title: "Enter data",
        icon: "error",
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
  handleOtp = (e) => {
    this.setState({ otp: e.target.value });
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowcPassword = () => {
    this.setState({ showcPassword: !this.state.showcPassword });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleChange = (e) => {
    this.setState({
      cPassword: e.target.value,
    });
  };
  resend() {
    const { email } = this.state;
    let Data = JSON.stringify({ email: email });
    // fetchMethod(UserdataResendotp(email))
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res && res.data && res.data.UserdataResendotp) {
    //       swal({
    //         title: "Otp sent",
    //         icon: "success"
    //       });
    //       // this.props.history.push("/");
    //     } else {
    //       swal({
    //         title: "Error Occured",
    //         icon: "error"
    //       });
    //     }
    //   });

    fetchMethod(UserdataOtp, Data)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data && res.data.UserdataOtp) {
          swal({
            title: "OTP sent",
            icon: "success",
          });
          // this.setState({ email: "" });
        } else {
          swal({
            title: "Error Occured",
            icon: "error",
          });
        }
      })
      .catch((e) => {
        console.log("error_________________", e);
      });
  }
  render() {
    return (
      <div className="signMain">
        <div className="signForm forgotpasswordSection">
          <h2>Forgot Password</h2>

          {/* <form > */}
          <TextField
            value={this.state.Otp}
            //   variant="outlined"
            margin="normal"
            id="Otp"
            name="Otp"
            placeholder="Temporary Password"
            onChange={this.handleOtp}
            InputProps={{
              endAdornment: <InputAdornment position="end"></InputAdornment>,
            }}
          />
          <TextField
            value={this.state.Password}
            //   variant="outlined"
            margin="normal"
            id="Password"
            name="Password"
            placeholder="New Password"
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
              ),
            }}
          />

          <TextField
            value={this.state.cPassword}
            //   variant="outlined"
            margin="normal"
            id="Confirm password"
            name="Confirm password"
            placeholder="Confirm New Password"
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
              ),
            }}
          />
          <span className="resendOtp">
            <Link variant="body2" href="" onClick={() => this.resend()}>
              Resend Otp
            </Link>
          </span>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="signBtn"
            onClick={() => this.nextEmail()}
          >
            CONTINUE
          </Button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
export default withRouter(ForgotPasswordEmail);

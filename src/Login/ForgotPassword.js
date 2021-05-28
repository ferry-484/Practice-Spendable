import React, { Component } from "react";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import { DotLoader } from "react-spinners";
import { withRouter } from "react-router-dom";
import "./login.css";
import swal from "sweetalert";
import { fetchMethod } from "../FetchMethod";
import { UserdataOtp, UserdataPasswordforgot } from "./ForgotQuery";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  componentWillMount() {
    this.setState({ email: "" });
  }
  onSignIn = () => {
    swal({
      title: "sign in",
      icon: "error"
    });
    // this.props.history.push("/");
  };
  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  nextEmail(e) {
    // debugger;
    let { email } = this.state;
    if (email.length === 0) {
      swal({ title: "enter email" });
      return;
    }
    let Data = JSON.stringify({ email: email });
    fetchMethod(UserdataOtp, Data)
      .then(res => res.json())
      .then(res => {
        if (res && res.data && res.data.UserdataOtp) {
          this.props.history.push({
            pathname: "/ForgotPasswordEmail",
            email
          });
          this.setState({ email: "" });
        } else {
          swal({
            title: "Invalid email, please create account from this email.",
            icon: "error"
          });
        }
      })
      .catch(e => {
        console.log("error_________________", e);
      });
  }

  render() {
    return (
      <div className="signMain">
        <div className="signForm forgotpasswordSection">
          <h2>Forgot Password</h2>
          {/* <form onSubmit={this.onSubmit}> */}
          <TextField
            value={this.state.email}
            //   variant="outlined"
            margin="normal"
            id="email"
            name="email"
            placeholder="Email Address"
            onChange={val => this.handleChange(val)}
            InputProps={{
              endAdornment: <InputAdornment position="end">@</InputAdornment>
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="signBtn"
            onClick={() => {
              this.nextEmail();
            }}
          >
            CONTINUE WITH OTP
          </Button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);

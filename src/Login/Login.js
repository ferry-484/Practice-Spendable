import React, { Component } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import "./login.css";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import BackdropLoader from "../services/loader";
import { API_URL } from "../Config";
import swal from "sweetalert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      show: false,
      loader: false,
      errors: { email: "", password: "" },
    };
  }

  handleChange = (e) => {
    if (e.target.id === "email") {
      this.setState({ email: e.target.value });
    }

    if (e.target.id === "password") {
      this.setState({ password: e.target.value });
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  validateForm = (email, password) => {
    const { errors } = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    errors.email = validEmailRegex.test(email.trim())
      ? ""
      : "Email does not exist!";
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

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      swal({
        icon: "warning",
        title: "Please enter Email-ID and Password",
      });
      return;
    } else if (this.validateForm(this.state.email, this.state.password)) {
      fetch(
        `${API_URL}/login?email=${this.state.email}&password=${this.state.password}&flag=1`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (
            response.email &&
            response.email !== null &&
            response.email !== ""
          ) {
            localStorage.setItem("token", response.token);
            let firstName =
              response.firstname !== undefined && response.firstname !== null
                ? response.firstname
                : "";
            let lastName =
              response.lastname !== undefined && response.lastname !== null
                ? response.lastname
                : "";
            let fullName = firstName + " " + lastName;
            let userInitials =
              firstName.substring(0, 1) + lastName.substring(0, 1);
            let data = {
              email: response.email,
              id: response.id,
              fullName: fullName,
              userInitials: userInitials,
            };
            localStorage.setItem("role", response.role);
            localStorage.setItem("rows", 10);
            localStorage.setItem("userInfo", JSON.stringify(data));
            this.props.history.push("dashboard");
            this.setState({
              email: "",
              password: "",
            });
          } else if (response.error.status) {
            swal({
              icon: "warning",
              title: "Unable to reach server",
            });
          } else {
            swal({
              icon: "warning",
              title: response.displayMessage,
            });
          }
        })
        .catch((e) => {
          swal({
            icon: "warning",
            title: "Incorrect username or password.", //now
            // title: e.toString().substring(11, e.length) //before
          });
        });
    }
  };

  render() {
    return (
      <div className="signMain">
        <BackdropLoader open={this.state.loader} />
        <div className="subsignSection">
          <div className="logoPart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="462"
              height="365.533"
              viewBox="0 0 462 365.533"
            >
              <g
                id="Group_422"
                data-name="Group 422"
                transform="translate(-60.67 -284.1)"
              >
                <g
                  id="Group_1676"
                  data-name="Group 1676"
                  transform="translate(60.566 284.1)"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(134.104)"
                  >
                    <path
                      id="Path_1317"
                      data-name="Path 1317"
                      d="M571.784-458.485c-1.8.232-4.231.8-6.02.247-2.991-.9-5.248-4.259-7.1-6.625-3.814-5.1-7.235-10.411-10.988-15.573-7.226-9.97-12-21.578-17.3-32.614-1.528-3.147-5.56-9.18-3.786-12.658,3.492-6.824,12.748-6.114,19.293-6.824,14.58-1.817,28.52-.658,43.062,0,8.191.341,16.827.7,19.875,9.464h.473c8.191-13.25,6.757-31.539,3.587-45.9a49.114,49.114,0,0,0-6.216-15.662,46.669,46.669,0,0,0-9.475-12.389C588.2-606.072,578-612.659,564.818-612.5c-8.7.1-17.39,6.422-24.607,10.695-12.625,7.481-25.2,15.332-37.937,22.458-10.477,5.91-24.408,10.775-29.57,22.685-3.554,8.191-2.054,18.748-2.054,27.446v51.106c0,11.423-.79,22.018,7.235,31.231,4.566,5.243,11.22,8.518,17.712,10.746,18.957,6.762,41.883,4.519,58.81-6.45C560.431-446.493,568.3-453.1,571.784-458.485Z"
                      transform="translate(-470.336 612.506)"
                      fill="#0053a3"
                    />
                    <path
                      id="Path_1333"
                      data-name="Path 1333"
                      d="M729.437-588.363c1.978,4.732,7.639,6.8,10.336,10.98,8.858,13.8,10.289,18.071,11.92,42.433,1.427,14.576-6.374,23.788-10.637,34.065-1.68,4.027-5.29,9.185-3.875,13.723,1.514,4.969,8.139,7.756,12.4,10.046,11.035,6.043,21.767,12.464,32.651,18.824,4.907,2.882,10.647,5.395,15.535.819,3.175-2.953,2.92-7.685,2.92-11.707v-56.785c0-6.123.6-12.232-1.921-17.982-3.89-8.872-11.911-12.923-19.846-17.447-12.138-6.923-23.987-14.589-36.437-20.883C738.429-584.406,733.8-587.081,729.437-588.363Z"
                      transform="translate(-606.829 599.787)"
                      fill="#fb8278"
                    />
                    <path
                      id="Path_1414"
                      data-name="Path 1414"
                      d="M529.3-286.682c1.42,2.631,5.34,5.143,7.9,6.61l17.509,10.136c15.559,8.873,33.314,24.427,52.526,19.1,11.83-3.312,22.8-12.852,33.6-18.588,9.237-4.9,18.578-10.146,27.446-15.658,4.529-2.839,8.044-5.12,8.044-10.884-.057-4.107-2.839-6.431-6.152-8.485-7-4.292-14.4-8.551-21.767-12.337-5.821-2.958-11.357-6.781-17.035-9.937-2.466-1.372-5.205-3.549-8.044-3.757-5.873-.431-8.229,3.284-11.419,7.543-3.079,4.111-5.879,8.5-8.928,12.838a69.879,69.879,0,0,1-33.126,23.281C550.355-280.6,531.746-286.661,529.3-286.682Z"
                      transform="translate(-501.4 463.953)"
                      fill="#fb8278"
                    />
                  </g>
                  <g
                    id="Group_440"
                    data-name="Group 440"
                    transform="translate(0 220.343)"
                  >
                    <text
                      id="SpendAble"
                      transform="translate(52.104 79)"
                      fontSize="73"
                      fontFamily="SegoeUI-Bold, Segoe UI"
                      letterSpacing="-0.026em"
                      fontWeight="700"
                    >
                      <tspan x="0" y="0">
                        SpendAble
                      </tspan>
                    </text>
                    <text
                      id="Enabling_Choices_Empowering_Change"
                      data-name="Enabling Choices, Empowering Change"
                      transform="translate(0.104 138.19)"
                      fontSize="28"
                      fontFamily="SegoeUI, Segoe UI"
                      letterSpacing="-0.02em"
                    >
                      <tspan x="0" y="0">
                        Enabling Choices, Empowering Change
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <div className="signForm">
            <h2>Sign In</h2>
            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                value={this.state.email}
                //   variant="outlined"
                margin="normal"
                id="email"
                name="email"
                placeholder="Email Address"
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@</InputAdornment>
                  ),
                }}
                helperText={
                  this.state.errors.email ? this.state.errors.email : ""
                }
              />
              <TextField
                className="loginPassword"
                //   variant="outlined"
                margin="normal"
                id="password"
                name="password"
                placeholder="Password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange}
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
                helperText={
                  this.state.errors.password ? this.state.errors.password : ""
                }
              />
              <span className="forgotpassLink">
                <Link to="/forgotPassword" variant="body2">
                  Forgot Password?
                </Link>
              </span>
              <span className="signupLink">
                <Link to="/signup" variant="body2">
                  Guardian Sign Up
                </Link>
              </span>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="signBtn"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

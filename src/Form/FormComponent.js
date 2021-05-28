import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  InputAdornment,
  Typography,
  Input,
  Tab,
  Tabs,
  AppBar,
  Box,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Fab,
  Radio,
  FormLabel,
  RadioGroup,
  Switch,
  FormHelperText
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
  DatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  LocalConvenienceStoreOutlined
} from "@material-ui/icons";

import swal from "sweetalert";

import DialogActions from "@material-ui/core/DialogActions";

import "./Modal.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      open: false,
      formData: { ...this.props.mutationParams },
      filterData: {},
      selectedData: {},
      newInputs: {},
      params: {},
      selectAllFields: {},
      emptyDataMessage: {},
      errors: {},
      errorMessages: {},
      showPassword: {}
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  componentWillMount() {
    this.initializeForm();
  }

  initializeForm = () => {
    if (this.props.editableData !== undefined) {
      const { params } = this.state;
      if (this.props.params !== undefined) {
        Object.keys(this.props.params).map(item => {
          return (params[item] = this.props.params[item]);
        });
      }
      if (this.props.formConfig.dependency !== undefined) {
        this.props.formConfig.dependency.map(async item => {
          if (this.props.editableData[item.parent] && !item.multiple) {
            const data = await item.listingFunction(
              this.props.editableData[item.parent]
            );
            params[item.childOptions] = data;
            this.setState({ params });
          }
          /////
          if (this.props.editableData[item.parent] && item.multiple) {
            const data = await item.listingFunction(
              this.props.editableData[item.parent]
            );

            item.children.map((item, index) => {
              params[item.options] = data[index];
            });

            this.setState({ params });
          }
          /////
        });
      }

      if (this.props.selectedData != undefined) {
        this.setState({
          selectedData: this.props.selectedData
        });
      }

      return this.setState({
        formData: this.props.editableData
      });
    } else {
      const params = this.state;

      if (this.props.params !== undefined) {
        Object.keys(this.props.params).map(item => {
          return (params[item] = this.props.params[item]);
        });
      }

      return this.props.formConfig.fields.map(fields => {
        if (fields.type !== "heading" && fields.type !== "content") {
          if (
            fields.type === "multipleChecks" &&
            this.props.params[fields.data] !== undefined
          ) {
            let { selectedData } = this.state;
            selectedData = {};
            this.props.params[fields.data].map(item => {
              selectedData[item.id] = false;
            });
            this.setState({ selectedData, selectall: false });
          }

          const { name, value } = fields;
          const { formData } = this.state;
          // formData[name] = value;
          if (formData[name] == undefined) {
            formData[name] = value;
          }

          this.setState({ formData, params, errors: {}, errorMessages: {} });
        }
      });
    }
  };

  resetForm = () => {
    if (this.props.editableData !== undefined) {
      const { params } = this.state;
      if (this.props.params !== undefined) {
        Object.keys(this.props.params).map(item => {
          return (params[item] = this.props.params[item]);
        });
      }
      if (this.props.formConfig.dependency !== undefined) {
        this.props.formConfig.dependency.map(async item => {
          if (this.props.editableData[item.parent] && !item.multiple) {
            const data = await item.listingFunction(
              this.props.editableData[item.parent]
            );
            params[item.childOptions] = data;
            this.setState({ params });
          }
          /////
          if (this.props.editableData[item.parent] && item.multiple) {
            const data = await item.listingFunction(
              this.props.editableData[item.parent]
            );

            item.children.map((item, index) => {
              params[item.options] = data[index];
            });

            this.setState({ params });
          }
          /////
        });
      }

      if (this.props.selectedData != undefined) {
        this.setState({
          selectedData: this.props.selectedData
        });
      }

      return this.setState({
        formData: this.props.editableData
      });
    } else {
      const params = this.state;

      if (this.props.params !== undefined) {
        Object.keys(this.props.params).map(item => {
          return (params[item] = this.props.params[item]);
        });
      }

      return this.props.formConfig.fields.map(fields => {
        if (fields.type !== "heading" && fields.type !== "content") {
          if (
            fields.type === "multipleChecks" &&
            this.props.params[fields.data] !== undefined
          ) {
            let { selectedData } = this.state;
            selectedData = {};
            this.props.params[fields.data].map(item => {
              selectedData[item.id] = false;
            });
            this.setState({ selectedData, selectall: false });
          }

          const { name, value } = fields;
          const { formData } = this.state;
          formData[name] = value;
          // if (formData[name] == undefined) {
          //   formData[name] = value;
          // }

          this.setState({ formData, params, errors: {}, errorMessages: {} });
        }
      });
    }
  };

  handleMonthYear = e => {
    const {
      target: { name, value }
    } = e;

    const { formData, errors, errorMessages } = this.state;

    let textTemp = value;
    if (textTemp[0] == "1" || textTemp[0] == "0") {
      if (textTemp.length === 2) {
        if (
          parseInt(textTemp.substring(0, 2)) > 12 ||
          parseInt(textTemp.substring(0, 2)) == 0
        ) {
          textTemp = textTemp[0];
        } else if (textTemp.length === 2) {
          if (
            textTemp.includes("/") ||
            textTemp.length < formData[name].length
          ) {
          } else {
            textTemp += "/";
          }

          // setExpDate(textTemp);
        } else {
          textTemp = textTemp[0];
          // setExpDate(textTemp);
        }
      }
      // setExpDate(textTemp);
    } else {
      // null;
    }
    formData[name] = textTemp;

    if (this.props.formConfig.validations != undefined) {
      if (this.props.formConfig.validations[name] != undefined) {
        errors[name] = !this.props.formConfig.validations[name](textTemp).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.validations[name](
            textTemp
          ).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }

    //////// for dependent validations

    if (this.props.formConfig.dependentValidations != undefined) {
      if (this.props.formConfig.dependentValidations[name] != undefined) {
        errors[name] = !this.props.formConfig.dependentValidations[name](
          textTemp,
          this.state.formData
        ).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.dependentValidations[
            name
          ](textTemp, this.state.formData).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }
    ///////

    this.setState({ formData, errors, errorMessages });
  };

  //text
  handleTextField = e => {
    const {
      target: { name, value }
    } = e;

    const { formData, errors, errorMessages } = this.state;

    formData[name] = value;

    if (this.props.formConfig.validations != undefined) {
      if (this.props.formConfig.validations[name] != undefined) {
        errors[name] = !this.props.formConfig.validations[name](value).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.validations[name](
            value
          ).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }

    //////// for dependent validations

    if (this.props.formConfig.dependentValidations != undefined) {
      if (this.props.formConfig.dependentValidations[name] != undefined) {
        errors[name] = !this.props.formConfig.dependentValidations[name](
          value,
          this.state.formData
        ).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.dependentValidations[
            name
          ](value, this.state.formData).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }
    ///////

    this.setState({ formData, errors, errorMessages });
  };

  populateChild = e => {
    const {
      target: { name, value }
    } = e;
    const { params, formData } = this.state;
    if (this.props.formConfig.dependency !== undefined) {
      this.props.formConfig.dependency.map(async item => {
        if (item.parent === name) {
          formData[item.child] =
            typeof formData[item.child] == "string" ? "" : [];
          const data = await item.listingFunction(this.state.formData[name]);
          params[item.childOptions] = data;

          this.setState({ params, formData });
        }
      });
    }
  };

  populateSearchSelectChild = (name, value) => {
    const { params, formData } = this.state;
    if (this.props.formConfig.dependency !== undefined) {
      this.props.formConfig.dependency.map(async item => {
        if (item.parent === name && !item.multiple) {
          formData[item.child] = "";
          const data = await item.listingFunction(this.state.formData[name]);
          params[item.childOptions] = data;

          this.setState({ params, formData });
        }

        if (item.parent === name && item.multiple) {
          const data = await item.listingFunction(this.state.formData[name]);

          item.children.map((item, index) => {
            formData[item.name] = null;

            params[item.options] = data[index];
          });

          this.setState({ params, formData });
        }
      });
    }
  };

  getFilterData = e => {
    const {
      target: { name, value }
    } = e;
    const { params, formData, emptyDataMessage } = this.state;
    if (this.props.formConfig.filters !== undefined) {
      this.props.formConfig.filters.map(async item => {
        if (item.filterArg === name) {
          const data = await item.filterResponse(this.state.filterData);

          params[item.response] = [];

          this.setState({ params });

          if (item.responseType === "checkbox") {
            let { selectedData } = this.state;
            selectedData = {};
            data.fields.map(item => {
              selectedData[item.id] = false;
            });

            this.setState({ selectedData, selectall: false });
          }

          if (item.responseType === "textfield") {
            this.setState({ newInputs: {} });
            const { formData, newInputs } = this.state;
            data.fields.map(item => {
              const { name, value } = item;
              newInputs[name] = value;
            });
            this.setState({ newInputs });
          }

          if (data.formData !== undefined) {
            data.formData.map(item => {
              formData[item.name] = item.value;
            });
          }

          // to remove select all in case of no checkbox.
          // params[item.response] = data.fields;
          if (data.fields != undefined) {
            if (data.fields.length == 0) {
              params[item.response] = undefined;
              emptyDataMessage[item.response] = item.emptyDataMessage;
              // in case all assigned already
            } else {
              params[item.response] = data.fields;
              delete emptyDataMessage[item.response];
            }
          }
          //

          this.setState({ params, formData, emptyDataMessage });
        }
      });
    }
  };

  onChange = e => {
    const {
      target: { name, value }
    } = e;

    const { formData, selectAllFields, errors, errorMessages } = this.state;

    if (typeof value != "number") {
      if (value.includes("all")) {
        if (this.state.selectAllFields[name]) {
          formData[name] = [];
          delete selectAllFields[name];
        } else {
          let field = this.props.formConfig.fields.filter(i => {
            return i["name"] == name;
          });

          formData[name] = this.state.params[field[0].data].map(item => {
            return item.id;
          });

          selectAllFields[name] = true;
        }
      } else {
        formData[name] = value;
      }
    } else {
      formData[name] = value;
    }

    if (this.props.formConfig.validations != undefined) {
      if (this.props.formConfig.validations[name] != undefined) {
        errors[name] = !this.props.formConfig.validations[name](value).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.validations[name](
            value
          ).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }

    //////// for dependent validations

    if (this.props.formConfig.dependentValidations != undefined) {
      if (this.props.formConfig.dependentValidations[name] != undefined) {
        errors[name] = !this.props.formConfig.dependentValidations[name](
          value,
          this.state.formData
        ).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.dependentValidations[
            name
          ](value, this.state.formData).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }
    ///////

    this.setState({
      formData,
      selectAllFields,
      errors,
      errorMessages
    });

    this.populateChild(e);
  };

  handleFilter = e => {
    const {
      target: { name, value }
    } = e;

    const {
      formData,
      filterData,
      selectAllFields,
      errors,
      errorMessages
    } = this.state;

    if (typeof value != "number") {
      if (value.includes("all")) {
        if (this.state.selectAllFields[name]) {
          formData[name] = [];
          filterData[name] = [];
          delete selectAllFields[name];
        } else {
          let field = this.props.formConfig.fields.filter(i => {
            return i["name"] == name;
          });

          formData[name] = this.state.params[field[0].data].map(item => {
            return item.id;
          });

          filterData[name] = this.state.params[field[0].data].map(item => {
            return item.id;
          });

          selectAllFields[name] = true;
        }
      } else {
        formData[name] = value;
        filterData[name] = value;
      }
    } else {
      formData[name] = value;
      filterData[name] = value;
    }

    if (this.props.formConfig.validations != undefined) {
      if (this.props.formConfig.validations[name] != undefined) {
        errors[name] = !this.props.formConfig.validations[name](value).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.validations[name](
            value
          ).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }

    this.setState({
      formData,
      filterData,
      selectAllFields,
      // alarm schedule issue
      selectall: false,
      //
      errors,
      errorMessages
    });

    this.populateChild(e);
    this.getFilterData(e);
  };

  handleSearchSelect = (name, value) => {
    const { formData, selectAllFields, errors, errorMessages } = this.state;

    formData[name] = value;

    if (this.props.formConfig.validations != undefined) {
      if (this.props.formConfig.validations[name] != undefined) {
        errors[name] = !this.props.formConfig.validations[name](value).valid;

        if (errors[name]) {
          errorMessages[name] = this.props.formConfig.validations[name](
            value
          ).errMsg;
        } else {
          delete errorMessages[name];
        }
      }
    }

    this.setState({
      formData,
      selectAllFields,
      errors,
      errorMessages
    });

    this.populateSearchSelectChild(name, value);
  };

  handleCheck = e => {
    const name = e.name;
    const { formData } = this.state;
    formData[name] = !formData[name];

    if (this.props.formConfig.callBack != undefined) {
      if (this.props.formConfig.callBack[name] != undefined) {
        let val1 = formData[name];
        let val2 = formData[this.props.formConfig.callBack[name]["child"]];

        let data = this.props.formConfig.callBack[name]["fun"](val1, val2);

        const keys = Object.keys(data);

        formData[keys[0]] = data[keys[0]];
        formData[keys[1]] = data[keys[1]];
      }
    }

    this.setState({ formData });
  };

  handleMultipleCheck = e => {
    const id = e.target.value;
    const { selectedData } = this.state;
    selectedData[id] = !selectedData[id];
    this.setState({ selectedData });
  };

  changeAllChecked = e => {
    const { selectedData } = this.state;

    if (this.state.selectall) {
      Object.keys(selectedData).forEach(item => {
        selectedData[item] = false;
      });
    } else {
      Object.keys(selectedData).forEach(item => {
        selectedData[item] = true;
      });
    }

    let selectall = !this.state.selectall;

    this.setState({ selectall: selectall });
  };

  handleClickShowPassword = name => {
    const { showPassword } = this.state;

    if (showPassword[name]) {
      delete showPassword[name];
    } else {
      showPassword[name] = true;
    }

    this.setState({ showPassword });
  };

  handleDateChange = (name, date) => {
    const { formData } = this.state;

    formData[name] = date;

    this.setState({ formData });
  };

  handleTimeChange = (name, time) => {
    const { formData } = this.state;

    formData[name] = time.target.value;

    this.setState({ formData });
  };

  renderFields = formConfig => {
    return formConfig.fields.map((item, index) => {
      switch (item.type) {
        case "input":
          return (
            <div key={index}>
              <TextField
                autoComplete="new-name"
                style={{ width: "100%" }}
                label={item.label}
                InputLabelProps={{
                  style: item.labelStyle ? item.labelStyle : {}
                }}
                inputProps={{
                  readOnly:
                    this.props.editableData !== undefined
                      ? item.readOnly
                      : item.disabled
                }}
                disabled={item.disabled !== undefined ? item.disabled : false}
                name={item.name}
                required={item.required}
                onChange={this.handleTextField}
                margin="normal"
                value={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : ""
                }
                // defaultValue={
                //   this.state.formData[item.name] !== undefined
                //     ? this.state.formData[item.name]
                //     : ""
                // }
                helperText={
                  this.state.errorMessages[item.name]
                    ? this.state.errorMessages[item.name]
                    : ""
                }
              />
            </div>
          );

        case "monthyear":
          return (
            <div key={index}>
              <TextField
                autoComplete="new-name"
                style={{ width: "100%" }}
                label={item.label}
                InputLabelProps={{
                  style: item.labelStyle ? item.labelStyle : {}
                }}
                inputProps={{
                  readOnly:
                    this.props.editableData !== undefined
                      ? item.readOnly
                      : item.disabled
                }}
                disabled={item.disabled !== undefined ? item.disabled : false}
                name={item.name}
                required={item.required}
                onChange={this.handleMonthYear}
                margin="normal"
                value={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : ""
                }
                // defaultValue={
                //   this.state.formData[item.name] !== undefined
                //     ? this.state.formData[item.name]
                //     : ""
                // }
                helperText={
                  this.state.errorMessages[item.name]
                    ? this.state.errorMessages[item.name]
                    : ""
                }
              />
            </div>
          );

        case "textarea":
          return (
            <div key={index}>
              <TextField
                style={{ width: "100%" }}
                label={item.label}
                InputLabelProps={{
                  style: item.labelStyle ? item.labelStyle : {}
                }}
                inputProps={{
                  readOnly:
                    this.props.editableData !== undefined
                      ? item.readOnly
                      : item.disabled
                }}
                name={item.name}
                required={item.required}
                onChange={this.handleTextField}
                multiline
                margin="normal"
                value={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : ""
                }
                // defaultValue={
                //   this.state.formData[item.name] !== undefined
                //     ? this.state.formData[item.name]
                //     : ""
                // }
                helperText={
                  this.state.errorMessages[item.name]
                    ? this.state.errorMessages[item.name]
                    : ""
                }
              />
            </div>
          );
        case "staticSelect":
          const staticOptions = item.data.map(i => (
            <MenuItem key={i.id} value={i.id}>
              {i.name}
            </MenuItem>
          ));

          return (
            <div key={index}>
              <FormControl required={item.required}>
                <InputLabel style={item.labelStyle ? item.labelStyle : {}}>
                  {item.label}
                </InputLabel>
                <Select
                  style={{ width: "100%" }}
                  name={item.name}
                  value={
                    this.state.formData[item.name] !== undefined
                      ? this.state.formData[item.name]
                      : null
                  }
                  onChange={this.onChange}
                >
                  {staticOptions}
                </Select>

                {this.state.errorMessages[item.name] ? (
                  <FormHelperText>
                    {this.state.errorMessages[item.name]}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </div>
          );

        case "dynamicSelect":
          const dynamicOptions = this.state.params[item.data] ? (
            this.state.params[item.data].map(i => (
              <MenuItem key={i.id} value={i.id}>
                {i.name || i.type}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="0" value="0">
              {item.emptyMessage}
            </MenuItem>
          );

          return (
            <div key={index}>
              <FormControl required={item.required}>
                <InputLabel style={item.labelStyle ? item.labelStyle : {}}>
                  {item.label}
                </InputLabel>
                <Select
                  style={{ width: "100%" }}
                  name={item.name}
                  value={
                    this.state.formData[item.name] !== undefined
                      ? this.state.formData[item.name]
                      : ""
                  }
                  multiple={item.multiple}
                  disabled={
                    this.props.editableData !== undefined
                      ? item.nonEditable
                      : item.disabled
                  }
                  onChange={this.onChange}
                >
                  {this.state.params[item.data] && item.selectAll ? (
                    <MenuItem key="0" value="all">
                      {this.state.selectAllFields[item.name]
                        ? "Unselect All"
                        : "Select All"}
                    </MenuItem>
                  ) : null}

                  {dynamicOptions}
                </Select>
                {this.state.errorMessages[item.name] ? (
                  <FormHelperText>
                    {this.state.errorMessages[item.name]}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </div>
          );

        case "searchSelect":
          // const searchSelectOptions = this.state.params[item.data] ? (
          //   this.state.params[item.data].map((i) => (
          //     <MenuItem key={i.id} value={i.id}>
          //       {i.name || i.type}
          //     </MenuItem>
          //   ))
          // ) : (
          //   <MenuItem key="0" value="0">
          //     {item.emptyMessage}
          //   </MenuItem>
          // );

          return (
            <div key={index}>
              <FormControl>
                <Autocomplete
                  style={{ width: "100%" }}
                  name={item.name}
                  value={
                    this.state.formData[item.name] !== undefined
                      ? this.state.formData[item.name]
                      : ""
                  }
                  multiple={item.multiple}
                  // options={searchSelectOptions}
                  options={
                    this.state.params[item.data]
                      ? this.state.params[item.data]
                      : []
                  }
                  disabled={
                    this.props.editableData !== undefined
                      ? item.nonEditable
                      : item.disabled
                  }
                  getOptionLabel={option =>
                    typeof option === "string" ? option : option.name
                  }
                  // getOptionLabel={(option) => option.name}
                  onChange={(name, value) =>
                    this.handleSearchSelect(item.name, value)
                  }
                  renderInput={params => (
                    <TextField
                      // autoComplete={`new-${item.name}`}
                      required={item.required}
                      {...params}
                      label={item.label}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "samlpetexttodisable" // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                {this.state.errorMessages[item.name] ? (
                  <FormHelperText>
                    {this.state.errorMessages[item.name]}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </div>
          );

        case "filter":
          const filterOptions = this.state.params[item.data] ? (
            this.state.params[item.data].map(i => (
              <MenuItem key={i.id} value={i.id}>
                {i.name || i.type}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="0" value="0">
              {item.emptyMessage}
            </MenuItem>
          );

          return (
            <div key={index}>
              <FormControl>
                <InputLabel style={item.labelStyle ? item.labelStyle : {}}>
                  {item.label}
                </InputLabel>
                <Select
                  style={{ width: "100%" }}
                  name={item.name}
                  value={
                    this.state.formData[item.name] !== undefined
                      ? this.state.formData[item.name]
                      : ""
                  }
                  multiple={item.multiple}
                  disabled={
                    this.props.editableData !== undefined
                      ? item.nonEditable
                      : item.disabled
                  }
                  onChange={this.handleFilter}
                >
                  {this.state.params[item.data] && item.selectAll ? (
                    <MenuItem key="0" value="all">
                      {this.state.selectAllFields[item.name]
                        ? "Unselect All"
                        : "Select All"}
                    </MenuItem>
                  ) : null}

                  {filterOptions}
                </Select>
              </FormControl>
            </div>
          );

        case "checkbox":
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={item.name}
                    checked={this.state.formData[item.name]}
                    onChange={() => {
                      this.handleCheck(item);
                    }}
                    color="primary"
                  />
                }
                label={item.label}
              />
            </div>
          );
        case "multipleChecks":
          return this.state.params[item.data] !== undefined ? (
            <div key={index}>
              <h5>{item.label}</h5>
              <FormControlLabel
                control={
                  <Checkbox
                    name="selectall"
                    value="selectall"
                    checked={this.state.selectall}
                    onChange={this.changeAllChecked}
                    color="primary"
                  />
                }
                label="Select All"
              />
              {this.state.params[item.data].map(item => {
                return (
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={item.name}
                          value={item.id}
                          checked={this.state.selectedData[item.id]}
                          onChange={this.handleMultipleCheck}
                          color="primary"
                        />
                      }
                      label={item.name}
                    />
                  </div>
                );
              })}
            </div>
          ) : this.state.emptyDataMessage[item.data] ? (
            <div key={index}>{this.state.emptyDataMessage[item.data]}</div>
          ) : (
            ""
          );

        case "multipleinputs":
          return this.state.params[item.data] !== undefined ? (
            <div key={index}>
              <h5>{item.label}</h5>
              {this.state.params[item.data].map((item, index) => {
                return (
                  <div key={index}>
                    <TextField
                      style={{ width: "100%" }}
                      label={item.label}
                      name={item.name}
                      onChange={this.handleTextField}
                      multiline
                      margin="normal"
                      value={
                        this.state.formData[item.name] !== undefined
                          ? this.state.formData[item.name]
                          : ""
                      }
                      defaultValue={
                        this.state.formData[item.name] !== undefined
                          ? this.state.formData[item.name]
                          : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          );

        case "password":
          return (
            <div key={index}>
              <TextField
                style={{ width: "100%" }}
                label={item.label}
                InputLabelProps={{
                  style: item.labelStyle ? item.labelStyle : {}
                }}
                name={item.name}
                type={this.state.showPassword[item.name] ? "text" : "password"}
                onChange={this.handleTextField}
                margin="normal"
                disabled={
                  this.props.editableData !== undefined
                    ? item.nonEditable
                    : item.disabled
                }
                value={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : ""
                }
                // defaultValue={
                //   this.state.formData[item.name] !== undefined
                //     ? this.state.formData[item.name]
                //     : ""
                // }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => this.handleClickShowPassword(item.name)}
                      >
                        {this.state.showPassword[item.name] ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                helperText={
                  this.state.errorMessages[item.name]
                    ? this.state.errorMessages[item.name]
                    : ""
                }
              />
            </div>
          );

        case "heading":
          return (
            <div key={index}>
              {item.component != undefined ? item.component() : ""}
              <h5>
                {" "}
                <b>{item.label}</b>
              </h5>
            </div>
          );

        case "icon":
          return (
            <div key={index}>
              {item.component != undefined ? item.component() : ""}
            </div>
          );

        case "datePicker":
          return (
            <div key={index}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    //  disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    maxDate={item.max}
                    placeholder={item.placeholder}
                    id="date-picker-inline"
                    label={item.label}
                    value={
                      this.state.formData[item.name] !== undefined
                        ? this.state.formData[item.name]
                        : ""
                    }
                    onChange={this.handleDateChange.bind(this, item.name)}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    keyboardIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.5"
                        height="20"
                        viewBox="0 0 31.5 36"
                      >
                        <path
                          id="Icon_awesome-calendar-alt"
                          data-name="Icon awesome-calendar-alt"
                          d="M0,32.625A3.376,3.376,0,0,0,3.375,36h24.75A3.376,3.376,0,0,0,31.5,32.625V13.5H0ZM22.5,18.844A.846.846,0,0,1,23.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,23.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H23.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,14.344,18h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,14.344,27h2.813a.846.846,0,0,1,.844.844v2.813a.846.846,0,0,1-.844.844H14.344a.846.846,0,0,1-.844-.844Zm-9-9A.846.846,0,0,1,5.344,18H8.156A.846.846,0,0,1,9,18.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844Zm0,9A.846.846,0,0,1,5.344,27H8.156A.846.846,0,0,1,9,27.844v2.813a.846.846,0,0,1-.844.844H5.344a.846.846,0,0,1-.844-.844ZM28.125,4.5H24.75V1.125A1.128,1.128,0,0,0,23.625,0h-2.25A1.128,1.128,0,0,0,20.25,1.125V4.5h-9V1.125A1.128,1.128,0,0,0,10.125,0H7.875A1.128,1.128,0,0,0,6.75,1.125V4.5H3.375A3.376,3.376,0,0,0,0,7.875V11.25H31.5V7.875A3.376,3.376,0,0,0,28.125,4.5Z"
                        />
                      </svg>
                    }
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          );

        case "timePicker":
          return (
            <div key={index}>
              <TextField
                id="time"
                label={item.label}
                type="time"
                value={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : ""
                }
                onChange={this.handleTimeChange.bind(this, item.name)}
                InputLabelProps={{
                  shrink:
                    this.state.formData[item.name] == undefined ? false : true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </div>
          );

        case "date":
          return (
            <div key={index}>
              <TextField
                className="dateField"
                id="date-picker-inline"
                label={item.label}
                type="date"
                defaultValue={
                  this.state.formData[item.name] !== undefined
                    ? this.state.formData[item.name]
                    : new Date()
                }
                // onChange={this.handleDateTimeChange.bind(this, item.name)}
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                max={item.max}
                // inputProps={{
                //   maxDate: new Date(),

                // }}
              />
            </div>
          );
        case "fabicon":
          return (
            <div key={index}>
              <Fab
                style={
                  this.state.formData[item.name]
                    ? item.styletrue
                    : item.stylefalse
                }
                aria-label="add"
                name={item.name}
                onClick={() => {
                  this.handleCheck(item);
                }}
              >
                {item.label}
              </Fab>
            </div>
          );
        case "toggle":
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Switch
                    name={item.name}
                    checked={this.state.formData[item.name]}
                    onChange={() => {
                      this.handleCheck(item);
                    }}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label={item.label}
              />
            </div>
          );

        case "content":
          return (
            <div key={index}>{this.props.showContentOnForm[item.name]()}</div>
          );
        default:
      }
    });
  };

  submitHandler = () => {
    const { selectedData } = this.state;
    const { errors, errorMessages } = this.state;

    const formData = {
      ...this.state.formData,
      ...this.state.newInputs
    };

    let noErrors = true;

    if (this.props.formConfig.validations != undefined) {
      const toValidate = Object.keys(this.props.formConfig.validations);

      toValidate.map(item => {
        errors[item] = !this.props.formConfig.validations[item](
          this.state.formData[item]
        ).valid;
        if (errors[item]) {
          errorMessages[item] = this.props.formConfig.validations[item](
            this.state.formData[item]
          ).errMsg;

          noErrors = false;
        } else {
          delete errorMessages[item];
        }
      });
    }

    //////// for dependent validations
    if (this.props.formConfig.dependentValidations != undefined) {
      const toValidate = Object.keys(
        this.props.formConfig.dependentValidations
      );

      toValidate.map(item => {
        errors[item] = !this.props.formConfig.dependentValidations[item](
          this.state.formData[item],
          this.state.formData
        ).valid;
        if (errors[item]) {
          errorMessages[item] = this.props.formConfig.dependentValidations[
            item
          ](this.state.formData[item], this.state.formData).errMsg;

          noErrors = false;
        } else {
          delete errorMessages[item];
        }
      });
    }
    ///////

    this.setState({
      errors,
      errorMessages
    });

    if (noErrors) {
      const finalData = this.props.preSubmitChanges
        ? this.props.preSubmitChanges(formData, selectedData)
        : formData;
      if (finalData === false) {
        this.props.modalCloseCallback();
      } else if (finalData && finalData["error"]) {
        swal({ title: finalData.error, icon: "warning" });
      }
    }
  };

  render() {
    return (
      <form noValidate>
        <div className="formComponent">
          <div className={this.props.formConfig.className}>
            {this.renderFields(this.props.formConfig)}
          </div>

          <DialogActions
            className={
              this.props.buttonTitleCSS ? this.props.buttonTitleCSS : ""
            }
          >
            {this.props.continueButton ? (
              <Button onClick={this.submitHandler}>
                {this.props.continueButton}
              </Button>
            ) : (
              <div>
                <Button
                  onClick={
                    this.props.closeButton
                      ? this.props.closeButton
                      : this.props.modalCloseCallback
                  }
                  className={
                    this.props.buttonTitleCSS === "salesbottomAction"
                      ? "cancelBtn"
                      : ""
                  }
                >
                  CANCEL
                </Button>
                <Button
                  onClick={this.submitHandler}
                  className={
                    this.props.buttonTitleCSS === "salesbottomAction"
                      ? "previewBtn"
                      : ""
                  }
                >
                  {this.props.saveButtonTitle
                    ? this.props.saveButtonTitle
                    : "SAVE"}
                </Button>
              </div>
            )}
          </DialogActions>
        </div>
      </form>
    );
  }
}

export default FormComponent;

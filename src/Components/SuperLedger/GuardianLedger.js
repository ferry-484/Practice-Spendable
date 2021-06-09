import React, { Component } from "react";
import "./superLedger.css";
import { superLedgerList } from "./SuperLedgerConfig";
import ReactTableComponent from "../../ReactTable/ReactTable";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  Typography,
  Input,
  TextField
} from "@material-ui/core";
import { DotLoader } from "react-spinners";
import { dropdownQuery } from "./LedgerQuery";
import { fetchMethod } from "../../FetchMethod";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import swal from "sweetalert";
import Autocomplete from "@material-ui/lab/Autocomplete";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogButton = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default class CardLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: undefined,
      search: "",
      pageNo: 2,
      rows: 2,
      count: 2,
      participantOptions: [],
      openModal: false,
      participantId: undefined
    };
  }

  componentWillMount() {
    fetchMethod(dropdownQuery)
      .then(res => res.json())
      .then(res => {
        res.data.allUserdata != undefined
          ? this.setState({
              participantOptions: res.data.allUserdata.Userdata.map(item => {
                return {
                  id: item.id,
                  name:
                    item.firstname +
                    " " +
                    (item.lastname != null ? item.lastname : "")
                };
              })
            })
          : this.setState({ loading: true });
      })
      .catch(e => console.log(e));
    this.setState({
      listData: [
        {
          amount: "$1000",
          usertype: "Guardian",
          dc: "Debit",
          name: "Manali Gupta",
          rs: "$1000",
          datetime: "07/10/2020 05:14"
        },
        {
          amount: "$2000",
          usertype: "Guardian",
          dc: "Credit",
          name: "Manali Gupta",
          rs: "$10000",
          datetime: "07/10/2020 06:14"
        }
      ]
    });
  }
  addFunds = () => {
    this.props.history.push("/addFunds");
  };
  handleClose = () => {
    this.setState({ openModal: false });
  };
  
  handleParticipant = (e, v) => {
    if (v !== null && v !== undefined) {
      this.setState({
        participantId: v.id
      });
    }
  };
  openModalBox = () => {
    this.setState({ openModal: true });
  };
  render() {
    const nameColumn = [
      {
        Header: "S No.",
        Cell: row => {
          return <div className="dot">{row.original.sNo}</div>;
        },
        width: 45
      }
    ];
    const columns = nameColumn.concat(superLedgerList.columns);
    return (
      <div className="ledgerSection">
        <h2>Super Ledger</h2>

        <div>
          <FormControl>
            <InputLabel id="demo-simple">Participants</InputLabel>
            <Select
              labelid="demo-simple"
              value={this.state.participantId}
              name="participantId"
              onChange={this.handleFilter}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {this.state.participantOptions !== undefined
                ? this.state.participantOptions.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select>
          </FormControl>
          
        </div>

        <div>
          <Button onClick={() => this.openModalBox()} className="addfundBtn">
            Add Funds
          </Button>
        </div>
        {this.state.listData ? (
          <div className="superledgerTable">
            <ReactTableComponent
              listData={this.state.listData}
              listConfig={superLedgerList}
              columns={columns}
              dataCount={this.state.count}
              updatePagination={this.updatePagination}
              initialPage={this.state.pageNo / this.state.rows}
              onRowClick={() => {}}
              forSerialNo={{
                pageNo: this.state.pageNo,
                pageSize: this.state.rows
              }}
            />
          </div>
        ) : (
          <div className="spinner">
            <DotLoader size={70} color={"#020f1f"} />
          </div>
        )}

        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          ariadescribedby="simple-modal-description"
          className="chooseBuisness"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Select Participant
          </DialogTitle>
          <DialogContent>
            <div>
              {/* <FormControl>
                <InputLabel id="demo-simple" margin="dense" variant="outlined">
                  Business
                </InputLabel>
                <Select
                  labelid="demo-simple"
                  value={this.state.storeId}
                  name="storeId"
                  onChange={this.handleBuisnessFilter}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {this.state.BusinessesOptions !== undefined
                    ? this.state.BusinessesOptions.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.business}
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select> */}

              <FormControl>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.storeId}
                  options={this.state.participantOptions}
                  onChange={(e, v) => this.handleParticipant(e, v)}
                  getOptionLabel={option =>
                    option && option.name ? option.name : ""
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Participants"
                      variant="outlined"
                    />
                  )}
                />
                <TextField id="standard-basic" label="Amount" />
              </FormControl>
            </div>
          </DialogContent>
          <DialogButton>
            <Button onClick={() => this.handleClose()}>Cancel</Button>
            <Button
              onClick={() => {
                // this.submitButton();
              }}
            >
              Save
            </Button>
          </DialogButton>
        </Dialog>
      </div>
    );
  }
}

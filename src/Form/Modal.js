import React from "react";
import FormComponent from "./FormComponent";
import { Dialog, Slide } from "@material-ui/core";
import { withStyles, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import "./Modal.css";
import propTypes from "prop-types";
import UpdateVendorOrderDetails from "../Components/Vendors/UpdateVendorOrderDetails";
import CompanyAddEdit from "../Components/Companies/CompanyAddEdit";
import UpdateOrderDetails from "../Components/Order/UpdateOrderDetails";
import AddVendorProductsTab from "../Components/Vendors/AddVendorProductsTab";
import QuestionSelection from "../Components/Trainings/QuestionSelection";
import BOQProductDetails from "../Components/MyBOQ/BOQProductDetails";

import { productURL } from "../Config";
import { isMoment } from "moment";
import MapContainer from "../Components/Map/MapContainer";

// modal props must have a button title and a dialog title

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle className={classes.root} disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    // padding: theme.spacing(2),
  }
}))(MuiDialogContent);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(
    props.showButton === false ? true : false
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    //to reset show to false upon close with transition
    setTimeout(() => {
      return props.resetModal ? props.resetModal() : null;
    }, 300);
  };

  const renderModalContent = props => {
    switch (props.modalData) {
      case "addEditCompany":
        return (
          <CompanyAddEdit
            params={props.params}
            formConfig={props.formConfig}
            formValidation={props.formValidation}
            showContentOnForm={props.showContentOnForm}
            editableData={props.editableData}
            query={props.query}
            modalCloseCallback={handleClose}
            updateData={props.updateData}
            callBack={props.callBack}
            preSubmitChanges={props.preSubmitChanges}
            mutationParams={props.mutationParams}
            saveButtonTitle={props.saveButtonTitle}
            addMore={props.addMore}
            addMoreButtonTitle={props.addMoreButtonTitle}
          />
        );
      case "vendorOrderUpdate":
        return (
          <UpdateVendorOrderDetails
            id={props.id}
            editableData={props.editableData}
            query={props.query}
            modalCloseCallback={handleClose}
            updateData={props.updateData}
            history={props.history}
            onBackbtn={props.backbutton}
          />
        );
      case "OrderUpdate":
        return (
          <UpdateOrderDetails
            id={props.id}
            editableData={props.editableData}
            query={props.query}
            modalCloseCallback={handleClose}
            updateData={props.updateData}
          />
        );

      case "trainingQuestion":
        return (
          <QuestionSelection
            formConfig={props.formConfig}
            onSubmit={props.onSubmit}
            modalCloseCallback={handleClose}
          />
        );

      case "boqproduct":
        return (
          <BOQProductDetails
            productId={props.productId}
            companyId={props.companyId}
            productCart={props.productCart}
            refreshCart={props.refreshCart}
            modalCloseCallback={handleClose}
          />
        );

      default:
        return (
          <FormComponent
            params={props.params}
            formConfig={props.formConfig}
            formValidation={props.formValidation}
            showContentOnForm={props.showContentOnForm}
            editableData={props.editableData}
            selectedData={props.selectedData}
            query={props.query}
            modalCloseCallback={handleClose}
            updateData={props.updateData}
            callBack={props.callBack}
            preSubmitChanges={props.preSubmitChanges}
            mutationParams={props.mutationParams}
            saveButtonTitle={props.saveButtonTitle}
            addMore={props.addMore}
            addMoreButtonTitle={props.addMoreButtonTitle}
          />
        );
    }
  };

  return (
    <div className={props.className}>
      {props.showButton ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          endIcon={props.icon}
        >
          {props.buttonTitle}
        </Button>
      ) : null}

      <div>
        <Dialog
          className={
            props.dialogClass
              ? `${props.dialogClass} modalDialog`
              : "modalDialog"
          }
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
        >
          <div className="Modal">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <div className="ModalTitle">{props.modalTitle}</div>
            </DialogTitle>
            <DialogContent dividers>{renderModalContent(props)}</DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

CustomizedDialogs.propTypes = {
  modalTitle: propTypes.string.isRequired,
  updateData: propTypes.func,
  preSubmitChanges: propTypes.func
};

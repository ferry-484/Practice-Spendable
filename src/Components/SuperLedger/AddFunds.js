import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addFunds } from "./SuperLedgerConfig";
export default class AddFunds extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
      closeForm = () => {
        this.props.history.push("/superLedger");
      };
    
    render() {
        return (
            <div>
                <div className="addParticipantSection">
            <h3>Add Funds</h3>
            <FormComponent
              formConfig={addFunds}
            //    preSubmitChanges={this.preSubmitChanges}
              buttonTitleCSS="adminParticipant"
              modalCloseCallback={() => {}}
              closeButton={this.closeForm}
            />
          </div>
            </div>
        );
    }
}
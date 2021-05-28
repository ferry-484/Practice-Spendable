import React, { Component } from "react";
import AdminPaymentRequests from "./AdminPaymentRequests";
import GuardianPaymentRequests from "./GuardianPaymentRequests";
import "./paymentRequests.css";

export default class PaymentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {localStorage.getItem("role") === "ADMIN" ? (
          <AdminPaymentRequests />
        ) : (
          <GuardianPaymentRequests />
        )}
      </div>
    );
  }
}

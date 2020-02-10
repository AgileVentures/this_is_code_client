import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  Elements
} from "react-stripe-elements";
import {
  injectStripe
} from "react-stripe-elements";

const StripeElements = () => {
  const payWithStripe = async ev => {
    ev.preventDefault();
    this.setState({ loading: true });
    if (this.state.selected === "addCard") {
      await this.props.stripe.createToken().then(({ token }) => {
        if (token) {
          this.book(token.id, null);
        } else {
          this.props.broadcastError("Something went wrong, please try again");
          this.setState({ error: true, loading: false });
        }
      });
    } else {
      this.book(null, this.state.selected);
    }
  };
  return (
    <>
      <label>Card number </label>
      <CardNumberElement id="card_number" />
      <label> Expiration date</label>
      <CardExpiryElement />
      <label>CVC</label>
      <CardCVCElement />
    </>
  );
};

const PaymentForm = () => {
  debugger
  return (
    <>
    <Elements>
      <StripeElements />
    </Elements>
    </>
  );
};

export default injectStripe(PaymentForm);
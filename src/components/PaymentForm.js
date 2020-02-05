import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  Elements
} from "react-stripe-elements";

const StripeElements = () => {
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
  return (
    <>
    <Elements>
      <StripeElements />
    </Elements>
    </>
  );
};

export default PaymentForm;

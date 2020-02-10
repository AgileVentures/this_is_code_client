import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { injectStripe } from "react-stripe-elements";
import { Modal } from "carbon-components-react";

import axios from "../helpers/axios-service";

export const StripeElements = ({ paymentInfo, processPayment }) => {
  return (
    <>
      <label>Card number </label>
      {/* <CardNumberElement id="card_number" />
      <label> Expiration date</label>
      <CardExpiryElement />
      <label>CVC</label>
      <CardCVCElement /> */}
      <button onClick={() => processPayment}> Buy </button>
    </>
  );
};

const PaymentForm = ({ paymentInfo, setDisplayPaymentModal }) => {
  const processPayment = () => {
    setDisplayPaymentModal();
  };
  return (
    <>
      <Modal
        aria-label="Modal"
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        modalHeading={`Purchase Subscription for ${paymentInfo.course.title}`}
        open
        primaryButtonText={`Buy ${paymentInfo.course.title} for $${paymentInfo.price}`}
        secondaryButtonText={"Cancel"}
        onRequestClose={() => setDisplayPaymentModal()}
        onRequestSubmit={() => {
          processPayment();
        }}
        onSecondarySubmit={() => {
          setDisplayPaymentModal();
        }}
      >
        <StripeElements paymentInfo={paymentInfo} onSubmit={processPayment} />
      </Modal>
    </>
  );
};

export default injectStripe(PaymentForm);

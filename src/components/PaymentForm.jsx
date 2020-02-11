import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { injectStripe } from "react-stripe-elements";
import { Modal } from "carbon-components-react";

import axios from "../helpers/axios-service";

const PaymentForm = ({ paymentInfo, setDisplayPaymentModal, stripe }) => {
  const getStripeToken = async () => {
    const response = await stripe.createToken();
    return response.token.id;
  };
  const processPayment = async () => {
    const token = await getStripeToken();
    const solo = paymentInfo.type === "solo" ? "solo: true" : "";
    const payload = {
      course_id: paymentInfo.course.id,
      stripe_token: token
    };
    const response = await axios.buyCourse(payload);
    debugger;
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
        
        <label>Card number </label>
        <CardNumberElement id="card_number" />
        <label> Expiration date</label>
        <CardExpiryElement />
        <label>CVC</label>
        <CardCVCElement />
        
      </Modal>
    </>
  );
};

export default injectStripe(PaymentForm);

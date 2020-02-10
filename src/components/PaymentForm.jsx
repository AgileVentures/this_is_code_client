import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import { injectStripe } from "react-stripe-elements";
import { Modal } from "carbon-components-react";

import axios from "../helpers/axios-service"

export const StripeElements = ({paymentInfo, processPayment}) => {
 
  return (
    <>
    <h2>Payment Amount: {paymentInfo.price}, Purchase type: {paymentInfo.type}</h2>
      <label>Card number </label>
      {/* <CardNumberElement id="card_number" />
      <label> Expiration date</label>
      <CardExpiryElement />
      <label>CVC</label>
      <CardCVCElement /> */}
      <button onClick={()=>processPayment}> Buy </button>
    </>
  );
};

const PaymentForm = ({paymentInfo,setDisplayPaymentModal}) => {
  const processPayment = ()=> {
    setDisplayPaymentModal()
  }
  return (
    <>
    <Modal
        aria-label="Modal"
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        // modalHeading={course.title}
        open
        // // transactionalModal={true}
        // modalAriaLabel={course.title}
        // primaryButtonText={
        //   course.displayPrice > 0
        //     ? `Buy for $${course.displayPrice}`
        //     : "This course is FREE to attend!"
        // }
        // secondaryButtonText={
        //   course.soloPrice
        //     ? `Buy Solo for $${course.soloPrice} `
        //     : "Solo purchase not Available for this course"
        // }
        // primaryButtonDisabled={false}
        // secondaryButtonDisabled={!course.soloPrice}
        onRequestClose={() => setDisplayPaymentModal()}
        // size="lg"
        // selectorPrimaryFocus="img"
        // onRequestSubmit={() => {
        //   handlePayment(course.displayPrice, "group");
        // }}
        // onSecondarySubmit={() => {
        //   handlePayment(course.soloPrice, "solo");
        // }}
      >

      <StripeElements paymentInfo={paymentInfo} onSubmit={processPayment}/>
      </Modal>
    </>
  );
};

export default injectStripe(PaymentForm);

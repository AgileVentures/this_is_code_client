import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements-universal";
import { injectStripe } from "react-stripe-elements-universal";
import { Modal } from "carbon-components-react";
import { useDispatch } from "react-redux";

import axios from "../helpers/axios-service";

const PaymentForm = ({ paymentInfo, setDisplayPaymentModal, stripe }) => {
  const dispatch = useDispatch();
  const getStripeToken = async () => {
    const response = await stripe.createToken();
    return response.token.id;
  };
  const processPayment = async () => {
    dispatch({type:'TOGGLE_LOADER',payload: true})
    const token = await getStripeToken();
    let payload = {
      course_id: paymentInfo.course.id,
      stripe_token: token
    };
    payload =
      paymentInfo.type === "solo" ? { ...payload, solo: true } : { ...payload };

    try {
      const response = await axios.buyCourse(payload);
      dispatch({type:'TOGGLE_LOADER',payload: false})
      dispatch({ type: "COURSE_PURCHASED", payload: paymentInfo.course });
    } catch (error) {
      dispatch({type:'TOGGLE_LOADER',payload: false})
      dispatch({
        type: "NOTIFY",
        payload: {
          title: "Payment failed",
          caption: "Something went wrong while processing your payment"
        }
      });
    }
    setDisplayPaymentModal();
    dispatch({ type: "DISPLAY_PAYMENT_MODAL", payload: false });
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
        <div
          style={{ padding: 10, marginBottom: 5 }}
          className="bx--text-input bx--text__input"
        >
          <CardNumberElement id="card_number" />
        </div>
        <label> Expiration date</label>
        <div
          style={{ padding: 10, marginBottom: 5 }}
          className="bx--text-input bx--text__input"
        >
          <CardExpiryElement />
        </div>
        <label>CVC</label>
        <div
          style={{ padding: 10, marginBottom: 5 }}
          className="bx--text-input bx--text__input"
        >
          <CardCVCElement />
        </div>
      </Modal>
    </>
  );
};

export default injectStripe(PaymentForm);

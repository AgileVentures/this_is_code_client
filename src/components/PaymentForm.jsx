import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements-universal";
import { injectStripe } from "react-stripe-elements-universal";
import { Modal, InlineNotification } from "carbon-components-react";
import { useDispatch } from "react-redux";

import axios from "../helpers/axios-service";

const PaymentForm = ({ paymentInfo, setDisplayPaymentModal, stripe }) => {
  const [notification, setNotification] = useState();
  const dispatch = useDispatch();
  const handlePayment = error => {
    if (error) {
      setNotification({
        iconDescription: "describes the close button",
        kind: "error",
        notificationType: "inline",
        role: "alert",
        title: "Something went wrong!",
        subtitle: `Please try again after some time`
      });
    } else {
      setNotification({
        iconDescription: "describes the close button",
        kind: "success",
        notificationType: "inline",
        role: "alert",
        title: <h5>Payment successful!</h5>,
        subtitle: <p>Redirecting you to list of courses...</p>
      });
    }
    setTimeout(function() {
      dispatch({ type: "DISPLAY_PAYMENT_MODAL", payload: false });
      dispatch({ type: "DISPLAY_COURSE", payload: "" });
    }, 3000);
  };

  const getStripeToken = async () => {
    const response = await stripe.createToken();
    return response.token.id;
  };
  const processPayment = async () => {
    const token = await getStripeToken();
    let payload = {
      course_id: paymentInfo.course.id,
      stripe_token: token
    };
    payload =
      paymentInfo.type === "solo" ? { ...payload, solo: true } : { ...payload };

    try {
      const response = await axios.buyCourse(payload);
      handlePayment();
      dispatch({ type: "COURSE_PURCHASED", payload: paymentInfo.course });
    } catch (error) {
      handlePayment(error);
      // dispatch({
      //   type: "NOTIFY",
      //   payload: {
      //     title: "Payment failed",
      //     caption: "Something went wrong while processing your payment"
      //   }
      // });
    }
    // setDisplayPaymentModal();
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
        {notification && <InlineNotification {...notification} />}
      </Modal>
    </>
  );
};

export default injectStripe(PaymentForm);

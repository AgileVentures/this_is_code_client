import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { HIDE_COURSE_DETAILS } from "../state/actions/actionTypes";

import { Modal, Accordion, AccordionItem } from "carbon-components-react";
import PaymentForm from "./PaymentForm";

const CourseDetails = props => {
  let { course } = props;
  const handlePayment = price => {
    debugger;
  };
  return (
    <div style={{ position: "fixed", top: "0px", zIndex: "999" }}>
      <Modal
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        modalHeading={props.course.title}
        open
        transactionalModal={true}
        modalAriaLabel={props.course.title}
        primaryButtonText={
          props.course.displayPrice > 0
            ? `Buy for $${props.course.displayPrice}`
            : "This course is FREE to attend!"
        }
        secondaryButtonText={
          props.course.soloPrice
            ? `Buy Solo for $${props.course.soloPrice} `
            : "Solo purchase not Available for this course"
        }
        primaryButtonDisabled={props.course.free}
        secondaryButtonDisabled={!props.course.soloPrice}
        // onRequestClose={() => props.hideCourseDetails()}
        onRequestClose
        size="lg"
        selectorPrimaryFocus="img"
        onRequestSubmit={() => {
          handlePayment(props.course.displayPrice);
        }}
        onSecondarySubmit={() => {
          handlePayment(props.course.soloPrice);
        }}
      >
        <img
          alt="Card cover"
          style={{ width: "auto", minHeight: "50%", objectFit: "cover" }}
          src={props.course.coverImage}
        />

        <p className="bx--modal-content__text">
          <strong>Note:</strong> Enrollment opens up in January 2020. Stay
          tuned.
        </p>

        <p className="bx--modal-content__text">{props.course.description}</p>
        <p className="bx--modal-content__text">
          {`Host: ${course.owner.firstName} ${course.owner.lastName}`}
        </p>

        <p className="bx--modal-content__text">
          {`${course.events.length} instructor led session${
            course.events.length !== 1 ? "s" : ""
          }`}
        </p>
        <Accordion>
          {props.course.events.length > 0 ? (
            props.course.events.map(event => {
              return (
                <div>
                  <AccordionItem title={event.title}>
                    <p>
                      Date: {moment(event.startDate).format("Do MMM HH:mm")} to{" "}
                      {moment(event.endDate).format("Do MMM HH:mm")}
                    </p>
                    About: {event.description}
                  </AccordionItem>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </Accordion>
        <PaymentForm />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hideCourseDetails: () => dispatch({ type: HIDE_COURSE_DETAILS })
  };
};

export default connect(null, mapDispatchToProps)(CourseDetails);

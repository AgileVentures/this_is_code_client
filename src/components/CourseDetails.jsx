import React from "react";
import moment from "moment";
import { Modal, Accordion, AccordionItem } from "carbon-components-react";

import { HIDE_COURSE_DETAILS } from "../state/actions/actionTypes";
import axios from "../helpers/axios-service";

const CourseDetails = ({
  course,
  closeCourseModal,
  setDisplayPaymentModal
}) => {
  const handlePayment = (price, type) => {
    setDisplayPaymentModal({ price: price, type: type, course: course });
  };
  return (
      <Modal
        aria-label="Modal"
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        modalHeading={course.title}
        open
        // transactionalModal={true}
        modalAriaLabel={course.title}
        primaryButtonText={
          course.displayPrice > 0
            ? `Buy for $${course.displayPrice}`
            : "This course is FREE to attend!"
        }
        secondaryButtonText={
          course.soloPrice
            ? `Buy Solo for $${course.soloPrice} `
            : "Solo purchase not Available for this course"
        }
        primaryButtonDisabled={false}
        secondaryButtonDisabled={!course.soloPrice}
        onRequestClose={() => closeCourseModal()}
        size="lg"
        selectorPrimaryFocus="img"
        onRequestSubmit={() => {
          handlePayment(course.displayPrice, "group");
        }}
        onSecondarySubmit={() => {
          handlePayment(course.soloPrice, "solo");
        }}
      >
        {/* <img
          alt="Card cover"
          style={{ width: "auto", minHeight: "50%", objectFit: "cover" }}
          src={course.coverImage}
        /> */}

        <p className="bx--modal-content__text">
          <strong>Note:</strong> Enrollment opens up in January 2020. Stay
          tuned.
        </p>

        <p className="bx--modal-content__text">{course.description}</p>
        <p className="bx--modal-content__text">
          {`Host: ${course.owner.firstName} ${course.owner.lastName}`}
        </p>

        <p className="bx--modal-content__text">
          {`${course.events.length} instructor led session${
            course.events.length !== 1 ? "s" : ""
          }`}
        </p>
        <Accordion>
          {course.events.length > 0 ? (
            course.events.map(event => {
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
      </Modal>
  );
};

export default CourseDetails;

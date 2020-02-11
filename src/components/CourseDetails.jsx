import React from "react";
import moment from "moment";
import { Modal, Accordion, AccordionItem } from "carbon-components-react";

const CourseDetails = ({
  course,
  closeCourseModal,
  setDisplayPaymentModal
}) => {
  const handlePayment = (price, type) => {
    setDisplayPaymentModal({ price: price, type: type, course: course });
  };
  const modalProps = {
    "aria-label": "Modal",
    hasScrollingContent: true,
    modalHeading: course.title,
    iconDescription: "Close",
    modalAriaLabel: course.title,
    secondaryButtonText:
      course.displayPrice > 0
        ? `Buy a group membership for $${course.displayPrice}`
        : "This course is FREE to attend!",
    primaryButtonText: course.soloPrice
      ? `Get solo access for $${course.soloPrice} `
      : "Solo access not available for this course",
    primaryButtonDisabled: !course.soloPrice,
    size: "lg",
    selectorPrimaryFocus: "title",
    onRequestSubmit: () => {
      course.soloPrice && handlePayment(course.soloPrice, "solo");
    },
    open: true,
    onRequestClose: () => closeCourseModal(),
    onSecondarySubmit: () => {
      handlePayment(course.displayPrice, "group");
    }
  };
  return (
    <Modal {...modalProps}>
      {/* <img
          alt="Card cover"
          style={{ width: "auto", minHeight: "50%", objectFit: "cover" }}
          src={course.coverImage}
        /> */}

      <p className="bx--modal-content__text">
        <strong>Note:</strong> Enrollment opens up in January 2020. Stay tuned.
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

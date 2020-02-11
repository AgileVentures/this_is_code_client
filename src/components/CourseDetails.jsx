import React from "react";
import { useSelector } from "react-redux";
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
  const currentUser = useSelector(state => state.user);
  const isCoursePurchased =
    currentUser?.boughtCourses?.filter(myCourse => myCourse.id === course.id)
      .length > 0;
  const primaryButtonText = course.soloPrice
    ? `Get solo access for $${course.soloPrice} `
    : "Solo access not available for this course";
  const secondaryButtonText =
    course.displayPrice > 0
      ? `Buy a group membership for $${course.displayPrice}`
      : "This course is FREE to attend!";
  const onRequestSubmit =
    currentUser.loggedIn &&
    (() => {
      course.soloPrice && handlePayment(course.soloPrice, "solo");
    });
  const onSecondarySubmit =
    currentUser.loggedIn &&
    (() => {
      handlePayment(course.displayPrice, "group");
    });
  const modalProps = {
    "aria-label": "Modal",
    hasScrollingContent: true,
    modalHeading: course.title,
    iconDescription: "Close",
    modalAriaLabel: course.title,
    secondaryButtonText: currentUser.loggedIn
      ? isCoursePurchased
        ? "You have already purchased this course"
        : secondaryButtonText
      : "You need to be logged in to purchase a course",

    primaryButtonText: currentUser.loggedIn
      ? isCoursePurchased
        ? "You have already purchased this course"
        : primaryButtonText
      : "You need to be logged in to purchase a course",
    primaryButtonDisabled: !course.soloPrice,
    size: "lg",
    selectorPrimaryFocus: "title",
    onRequestSubmit: onRequestSubmit,
    open: true,
    onRequestClose: () => closeCourseModal(),
    onSecondarySubmit: onSecondarySubmit
  };
  return (
    <Modal {...modalProps}>
      <img
        alt="Card cover"
        style={{ width: "auto", minHeight: "50%", objectFit: "cover" }}
        src={course.coverImage}
      />

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
      {!currentUser.loggedIn && (
        <p>You need to be logged in to purchase a course</p>
      )}
    </Modal>
  );
};

export default CourseDetails;

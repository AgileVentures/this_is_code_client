import React, { Component, useState, useEffect } from "react";
import { Modal, ModalWrapper } from "carbon-components-react";
import ArticleCard from "gatsby-theme-carbon/src/components/ArticleCard";
import { Row, Column } from "gatsby-theme-carbon/src/components/Grid";
import moment from "moment";
import { connect } from "react-redux";
import { HIDE_COURSE_DETAILS } from "../state/actions/actionTypes";

import { Accordion, AccordionItem } from "carbon-components-react";
import PaymentForm from "./PaymentForm";

import axios from "../helpers/axios-service";
// class Courses extends Component {
//   state = {
//     loading: true,
//     courses: []
//   }
//   async componentDidMount() {
//     let response = await axios.getAllCourses()
//     this.setState({ courses: response.data.courses, loading: false })
//   }

//   displayCourse(id) {
//     const course = this.state.courses.find(course => course.id === id)
//     this.props.displayCourseDetails(course)
//   }

//   closeCourseModal() {
//     this.props.hideCourseDetails()
//   }

//   render() {
//     const calendarStrings = {
//       lastDay: '[Yesterday at] LT',
//       sameDay: '[Today at] LT',
//       nextDay: '[Tomorrow at] LT',
//       lastWeek: '[last] dddd [at] LT',
//       nextWeek: 'dddd [at] LT',
//       sameElse: 'LLLL'
//     };
//     let courseListContent = this.state.courses.map(course => {
//       return (
//         <Column colMd={6} colLg={6} key={course.id} >
//           <div onClick={this.displayCourse.bind(this, course.id)}>
//             <ArticleCard
//               subTitle='Micro Session'
//               title={course.title}
//               author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
//               date={<Moment date={course.startDate} calendar={calendarStrings} />}
//               readTime={`${course.events.length} instructor led session${course.events.length !== 1 ? 's' : ''}`}
//             >
//               <img
//                 alt='Card cover'
//                 style={{ width: 'auto', minHeight: '50%', objectFit: 'cover' }}
//                 src={course.coverImage}
//               />
//             </ArticleCard>
//           </div>

//         </Column>
//       )
//     })
//     return (
//       <>
//         {this.state.loading ?
//           <h2>Loading</h2> :
//           <Row>
//             {courseListContent}
//           </Row>
//         }
//       </>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     displayCourseDetails: (course) => dispatch({ type: 'DISPLAY_COURSE_DETAILS', payload: course })
//   }
// }

// export default connect(null, mapDispatchToProps)(Courses);

const Courses = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    const response = await axios.getAllCourses();
    setCourses(response.data.courses);
    setLoading(false);
  };
  const calendarStrings = {
          lastDay: '[Yesterday at] LT',
          sameDay: '[Today at] LT',
          nextDay: '[Tomorrow at] LT',
          lastWeek: '[last] dddd [at] LT',
          nextWeek: 'dddd [at] LT',
          sameElse: 'LLLL'
        };

  const renderCourses =
    courses &&
    courses.map(course => {
      return (
        <div key={course.id}>
          <Column colMd={6} colLg={6} key={course.id} >
         <div >
             <ArticleCard
              subTitle='Micro Session'
              title={course.title}
              author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
              // date={<Moment date={course.startDate} calendar={calendarStrings} />}
              readTime={`${course.events.length} instructor led session${course.events.length !== 1 ? 's' : ''}`}
            >
              <img
                alt='Card cover'
                style={{ width: 'auto', minHeight: '50%', objectFit: 'cover' }}
                src={course.coverImage}
              />
              <ModalWrapper
              // buttonTriggerText="Launch Modal"
              className="bx--article-card_title"
              disabled={false}
              handleSubmit={function noRefCheck() {}}
              hasScrollingContent
              id="transactional-passive-modal"
              modalHeading="Modal"
              modalLabel="Label"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyDown={function noRefCheck() {}}
              onMouseDown={function noRefCheck() {}}
              onMouseEnter={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseUp={function noRefCheck() {}}
              primaryButtonText="Save"
              renderTriggerButtonIcon={undefined}
              secondaryButtonText="Cancel"
              selectorPrimaryFocus="[data-modal-primary-focus]"
              shouldCloseAfterSubmit
              triggerButtonIconDescription="Provide icon description if icon is used"
              triggerButtonKind="primary"
            >
              <Modal
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        modalHeading={course.title}
        open
        transactionalModal={true}
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
        primaryButtonDisabled={course.free}
        secondaryButtonDisabled={!course.soloPrice}
        // onRequestClose={() => hideCourseDetails()}
        onRequestClose
        size="lg"
        selectorPrimaryFocus="img"
        onRequestSubmit={() => {
          // handlePayment(course.displayPrice);
        }}
        onSecondarySubmit={() => {
          // handlePayment(course.soloPrice);
        }}
      >
        <img
          alt="Card cover"
          style={{ width: "auto", minHeight: "50%", objectFit: "cover" }}
          src={course.coverImage}
        />

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
        {/* <PaymentForm /> */}
      </Modal>
            </ModalWrapper>
            </ArticleCard>
          </div>

        </Column>
          
        </div>
      );
    });

  useEffect(() => {
    fetchCourses();
  });
  return <div>{loading ? <h2>Loading</h2> : renderCourses}</div>;
};

export default Courses;

import React, { Component, useState, useEffect } from "react";
import { Modal, ModalWrapper } from "carbon-components-react";
import { Elements } from "react-stripe-elements";
import ArticleCard from "gatsby-theme-carbon/src/components/ArticleCard";
import { Row, Column } from "gatsby-theme-carbon/src/components/Grid";
import moment from "moment";
import PaymentForm from "./PaymentForm";

import axios from "../helpers/axios-service";
import CourseDetails from "./CourseDetails";

const Courses = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [displayCourseModal, setDisplayCourseModal] = useState();
  const [displayPaymentModal, setDisplayPaymentModal] = useState(false);

  const handleCourseClick = course => {
    setDisplayCourseModal(course);
  };

  const fetchCourses = async () => {
    const response = await axios.getAllCourses();
    setCourses(response.data.courses);
    setLoading(false);
  };
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "LLLL"
  };

  const renderCourses =
    courses &&
    courses.map(course => {
      return (
        <div key={course.id}>
          <Column colMd={6} colLg={6} key={course.id}>
            <div onClick={() => handleCourseClick(course)}>
              <ArticleCard
                subTitle="Micro Session"
                title={course.title}
                author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
                // date={<Moment date={course.startDate} calendar={calendarStrings} />}
                readTime={`${course.events.length} instructor led session${
                  course.events.length !== 1 ? "s" : ""
                }`}
              >
                {/* <img
                  alt="Card cover"
                  style={{
                    width: "auto",
                    minHeight: "50%",
                    objectFit: "cover"
                  }}
                  src={course.coverImage}
                /> */}
              </ArticleCard>
            </div>
          </Column>
          {displayCourseModal && (
            <CourseDetails
              course={displayCourseModal}
              closeCourseModal={setDisplayCourseModal}
              setDisplayPaymentModal={setDisplayPaymentModal}
            />
          )}
          {displayPaymentModal && (
            <Elements>
              <PaymentForm paymentInfo={displayPaymentModal} setDisplayPaymentModal={setDisplayPaymentModal} />
            </Elements>
          )}
        </div>
      );
    });

  useEffect(() => {
    fetchCourses();
  },[]);
  return <div>{loading ? <h2>Loading</h2> : renderCourses}</div>;
};

export default Courses;

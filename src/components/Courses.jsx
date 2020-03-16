import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticleCard from "gatsby-theme-carbon/src/components/ArticleCard";
import { Column } from "gatsby-theme-carbon/src/components/Grid";

import axios from "../helpers/axios-service";

const Courses = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleCourseClick = course => {
    dispatch({ type: "DISPLAY_COURSE", payload: course });
  };

  const fetchCourses = async () => {
    dispatch({ type: "TOGGLE_LOADER", payload: true });
    const response = await axios.getAllCourses();
    setCourses(response.data.courses);
    dispatch({ type: "TOGGLE_LOADER", payload: false });
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
                // date={
                //   <Moment date={course.startDate} calendar={calendarStrings} />
                // }
                readTime={`${course.events.length} instructor led session${
                  course.events.length !== 1 ? "s" : ""
                }`}
              >
                <img
                  alt="Card cover"
                  style={{
                    width: "auto",
                    minHeight: "50%",
                    objectFit: "cover"
                  }}
                  src={course.coverImage}
                />
                {currentUser.loggedIn &&
                  currentUser.boughtCourses.filter(
                    myCourse => myCourse.id === course.id
                  ).length > 0 && <h4>You have purchased this course</h4>}
              </ArticleCard>
            </div>
          </Column>
        </div>
      );
    });

  useEffect(() => {
    fetchCourses();
  }, []);
  return <div>{loading ? <h2>Loading</h2> : renderCourses}</div>;
};

export default Courses;

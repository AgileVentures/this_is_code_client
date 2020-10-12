import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Location } from '@reach/router'
import { parse } from 'query-string'
import ArticleCard from 'gatsby-theme-carbon/src/components/ArticleCard'
import { Column } from 'gatsby-theme-carbon/src/components/Grid'

import axios from '../helpers/axios-service'

const Courses = () => {
  const [courses, setCourses] = useState()
  const [loading, setLoading] = useState(true)
  const [redirectCourseId, setRedirectCourseId] = useState()
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleRedirect = (location) => {
    const courseId = parse(location?.search).id
    if (courseId) {
      setRedirectCourseId(courseId)
    }
  }
  useEffect(() => {
    const course =courses && courses?.find((c) => c.id == redirectCourseId)
    course &&  handleCourseClick(course)
    
    handleCourseClick(course)
  }, [courses])

  const handleCourseClick = (course) => {
    dispatch({ type: 'DISPLAY_COURSE', payload: course })
  }

  const fetchCourses = async () => {
    dispatch({ type: 'TOGGLE_LOADER', payload: true })
    const response = await axios.getAllCourses()
    setCourses(response.data.courses)
    dispatch({ type: 'TOGGLE_LOADER', payload: false })
    setLoading(false)
  }
  const calendarStrings = {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'LLLL',
  }
  const renderCourses =
    courses &&
    courses.map((course) => {
      if (currentUser.loggedIn) {
        const purchasedCourse = currentUser.boughtCourses.find(
          (boughtCourse) => boughtCourse.id === course.id
        )
        if (purchasedCourse) {
          course.events.map((event) => {
            const purchasedEvent = purchasedCourse.events.find(
              (updatedEvent) => Number(updatedEvent.id) === event.id
            )
            if (purchasedEvent) {
              event.room = purchasedEvent.room
              event.password = purchasedEvent.password
            }
          })
        }
      }
      return (
        <div key={course.id}>
          <Column colMd={6} colLg={6} key={course.id}>
            <div onClick={() => handleCourseClick(course)}>
              <ArticleCard
                subTitle='Micro Session'
                title={course.title}
                author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
                // date={
                //   <Moment date={course.startDate} calendar={calendarStrings} />
                // }
                readTime={`${course.events.length} instructor led session${
                  course.events.length !== 1 ? 's' : ''
                }`}
              >
                <img
                  alt='Card cover'
                  style={{
                    width: 'auto',
                    minHeight: '50%',
                    objectFit: 'cover',
                  }}
                  src={course.coverImage}
                />
                {currentUser.loggedIn &&
                  currentUser.boughtCourses.filter(
                    (myCourse) => myCourse.id === course.id
                  ).length > 0 && <h4>You have purchased this course</h4>}
              </ArticleCard>
            </div>
          </Column>
        </div>
      )
    })

  useEffect(() => {
    fetchCourses()
  }, [])
  return (
    <div>
      {loading ? <h2>Loading</h2> : renderCourses}
      <Location>{({ location }) => handleRedirect(location)}</Location>
    </div>
  )
}

export default Courses

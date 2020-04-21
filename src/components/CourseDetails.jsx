import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Modal, Accordion, AccordionItem } from 'carbon-components-react'

import axios from '../helpers/axios-service'

const CourseDetails = ({ course, closeCourseModal }) => {
  const currentUser = useSelector(state => state.user)

  const [modalProps] = useCourseDetails(currentUser, course, closeCourseModal)

  return (
    <div style={{ position: 'fixed', top: '0px', zIndex: '999' }}>
      <Modal {...modalProps}>
        <img
          alt="Card cover"
          style={{ width: 'auto', minHeight: '50%', objectFit: 'cover' }}
          src={course.coverImage}
        />
        <p className="bx--modal-content__text">{course.description}</p>
        <p className="bx--modal-content__text">
          {`Host: ${course.owner.firstName} ${course.owner.lastName}`}
        </p>

        <p className="bx--modal-content__text">
          {`${course.events.length} instructor led session${
            course.events.length !== 1 ? 's' : ''
          }`}
        </p>
        <Accordion>
          {course.events.length > 0 ? (
            course.events.map(event => {
              return (
                <div>
                  <AccordionItem title={event.title}>
                    <p>
                      Date: {moment(event.startDate).format('Do MMM HH:mm')} to{' '}
                      {moment(event.endDate).format('Do MMM HH:mm')}
                    </p>
                    About: {event.description}
                    {event.conference_link && (
                      <p>
                        <a
                          style={{ textDecoration: 'none', color: 'black' }}
                          href={event.conference_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join hangout Here
                        </a>
                      </p>
                    )}
                  </AccordionItem>
                </div>
              )
            })
          ) : (
            <></>
          )}
        </Accordion>
        {!currentUser.loggedIn && (
          <p>You need to be logged in to purchase a course</p>
        )}
      </Modal>
    </div>
  )
}

export default CourseDetails

const useCourseDetails = (currentUser, course, closeCourseModal) => {
  const dispatch = useDispatch()

  let onRequestSubmit, onSecondarySubmit, primaryButtonText, secondaryButtonText
  let primaryButtonDisabled = false
  const isCoursePurchased =
    currentUser?.boughtCourses?.filter(myCourse => myCourse.id === course.id)
      .length > 0 || false

  const handlePayment = async (price, type) => {
    //if course is free, don't display payment modal
    // handle payment here itself
    if (course.free) {
      let payload = {
        course_id: course.id,
        free: true
      }
      const response = await axios.buyCourse(payload)
      dispatch({ type: 'COURSE_PURCHASED', payload: course })
      setTimeout(function() {
        dispatch({ type: 'DISPLAY_COURSE', payload: '' })
      }, 3000)
    } else {
      dispatch({
        type: 'DISPLAY_PAYMENT_MODAL',
        payload: { price: price, type: type, course: course }
      })
    }
  }

  if (currentUser.loggedIn) {
    if (!isCoursePurchased) {
      if (course.displayPrice > 0) {
        secondaryButtonText = `Buy a group membership for $${course.displayPrice}`

        onSecondarySubmit = () => handlePayment(course.displayPrice, 'free')
      } else {
        secondaryButtonText = 'This course is FREE to attend!'
        onSecondarySubmit = () => handlePayment(course.displayPrice, 'group')
      }
      if (course.soloPrice) {
        primaryButtonText = `Get solo access for $${course.soloPrice}`
        onRequestSubmit = () => handlePayment(course.soloPrice, 'solo')
      } else {
        primaryButtonText = course.free
          ? 'Register for FREE!'
          : 'Solo access not available for this course'
        primaryButtonDisabled = !course.free && true
       course.free && (onRequestSubmit = () => handlePayment(course.displayPrice, 'free'))
      }
    } else {
      primaryButtonText = 'You have already purchased this course'
      primaryButtonDisabled = true
    }
  } else {
    primaryButtonText = 'You need to be logged in to purchase a course'
    secondaryButtonText = 'Cancel'
    primaryButtonDisabled = true
  }

  const modalProps = {
    'aria-label': 'Modal',
    // hasScrollingContent: true,
    modalHeading: course.title,
    iconDescription: 'Close',
    modalAriaLabel: course.title,
    primaryButtonText: primaryButtonText,
    secondaryButtonText: secondaryButtonText,
    primaryButtonDisabled: primaryButtonDisabled,
    size: 'lg',
    onRequestSubmit: onRequestSubmit,
    open: true,
    onRequestClose: () => closeCourseModal(),
    onSecondarySubmit: onSecondarySubmit
  }

  return [modalProps]
}

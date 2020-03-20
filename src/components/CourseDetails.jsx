import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Modal, Accordion, AccordionItem } from 'carbon-components-react'

const CourseDetails = ({ course, closeCourseModal }) => {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handlePayment = (price, type) => {
    dispatch({
      type: 'DISPLAY_PAYMENT_MODAL',
      payload: { price: price, type: type, course: course }
    })
  }
  const isCoursePurchased =
    currentUser?.boughtCourses?.filter(myCourse => myCourse.id === course.id)
      .length > 0 || false
  const primaryButtonText = course.soloPrice
    ? `Get solo access for $${course.soloPrice}`
    : 'Solo access not available for this course'
  const secondaryButtonText =
    course.displayPrice > 0
      ? `Buy a group membership for $${course.displayPrice}`
      : 'This course is FREE to attend!'
  const onRequestSubmit =
    currentUser.loggedIn &&
    (() => {
      course.soloPrice && handlePayment(course.soloPrice, 'solo')
    })
  const onSecondarySubmit =
    currentUser.loggedIn &&
    !isCoursePurchased &&
    (() => {
      handlePayment(course.displayPrice, 'group')
    })
  const modalProps = {
    'aria-label': 'Modal',
    // hasScrollingContent: true,
    modalHeading: course.title,
    iconDescription: 'Close',
    modalAriaLabel: course.title,
    secondaryButtonText: currentUser.loggedIn
      ? isCoursePurchased
        ? 'Cancel'
        : secondaryButtonText
      : 'Cancel',

    primaryButtonText: currentUser.loggedIn
      ? isCoursePurchased
        ? 'You have already purchased this course'
        : primaryButtonText
      : 'You need to be logged in to purchase a course',
    primaryButtonDisabled: !course.soloPrice || isCoursePurchased,
    size: 'lg',
    onRequestSubmit: onRequestSubmit,
    open: true,
    onRequestClose: () => closeCourseModal(),
    onSecondarySubmit: onSecondarySubmit
  }
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

import React from 'react'
import { connect } from 'react-redux'
import { HIDE_COURSE_DETAILS } from '../state/actions/actionTypes'

import {
  Modal,
} from 'carbon-components-react'

const CourseDetails = (props) => {
  let { course } = props
  return (
    <div style={{ position: 'fixed', top: '0px', zIndex: '999' }}>
      <Modal
        hasScrollingContent
        focusTrap={true}
        iconDescription="Close"
        modalHeading={props.course.title}
        open
        passiveModal={true}
        modalAriaLabel={props.course.title}
        // primaryButtonText={props.course.title}
        secondaryButtonText="Cancel"
        primaryButtonDisabled={false}
        onRequestClose={() => props.hideCourseDetails()}
        size='lg'
        selectorPrimaryFocus="img"
      >
        <img
          alt='Card cover'
          style={{ width: 'auto', minHeight: '50%', objectFit: 'cover' }}
          src={props.course.coverImage}
        />

        <p className="bx--modal-content__text">
          <strong>Note:</strong> Enrollment opens up in January 2020. Stay tuned.
        </p>

        <p className="bx--modal-content__text">
          {props.course.description}
        </p>
        <p className="bx--modal-content__text">
          {`Host: ${course.owner.firstName} ${course.owner.lastName}`}
        </p>

        <p className="bx--modal-content__text">
          {`${course.events.length} instructor led session${course.events.length !== 1 ? 's' : ''}`}
        </p>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    hideCourseDetails: () => dispatch({ type: HIDE_COURSE_DETAILS })
  }
}

export default connect(null, mapDispatchToProps)(CourseDetails)
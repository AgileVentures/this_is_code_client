import React, { useContext, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Elements } from 'react-stripe-elements-universal'

import { Link } from 'gatsby'
import {
  Header as ShellHeader,
  HeaderMenuButton,
  SkipToContent,
  HeaderGlobalBar,
} from 'carbon-components-react/lib/components/UIShell'
import cx from 'classnames'

import GlobalSearch from 'gatsby-theme-carbon/src/components/GlobalSearch'
import NavContext from 'gatsby-theme-carbon/src/util/context/NavContext'
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata'

import {
  header,
  skipToContent,
  headerName,
  collapsed,
  headerButton,
} from 'gatsby-theme-carbon/src/components/Header/Header.module.scss'
import Notification from '../../components/Notification'
import CourseDetails from '../../components/CourseDetails'
import PaymentForm from '../../components/PaymentForm'
import { getCurrentCredentials } from '../../helpers/localstorageHelper'
import { auth } from '../../modules/authUtils'

import TICLogo from '../../images/svg/tic_logo.svg'
import Loader from '../../components/Loader'
import WebsocketHandler from '../../components/WebsocketHandler'

const Header = (props) => {
  const { leftNavIsOpen, toggleNavState, searchIsOpen } = useContext(NavContext)
  const { isSearchEnabled } = useMetadata()
  const currentUser = useSelector((state) => state.user)
  const displayCourseModal = useSelector((state) => state.displayCourseModal)
  const displayPaymentModal = useSelector((state) => state.displayPaymentModal)
  const displayLoader = useSelector((state) => state.displayLoader)
  const dispatch = useDispatch()
  const verifyUserCredentials = async () => {
    if (
      !currentUser.loggedIn &&
      Object.entries(getCurrentCredentials()).length !== 0
    ) {
      try {
        const response = await auth.validateToken(getCurrentCredentials())
        dispatch({ type: 'AUTHENTICATE', payload: response.user })
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    verifyUserCredentials()
  }, [])
  useEffect(() => {
    console.log('header hit', currentUser.loggedIn)
  }, [currentUser.loggedIn])
  return (
    <>
      <ShellHeader aria-label="Header" className={header}>
        {props.notification && (
          <Notification
            caption={props.notification.caption}
            title={props.notification.title}
          />
        )}

        {displayLoader && <Loader />}
        {currentUser.loggedIn && (
          <WebsocketHandler login={currentUser.loggedIn} />
        )}
        {displayCourseModal && (
          <CourseDetails
            course={displayCourseModal}
            closeCourseModal={() =>
              dispatch({ type: 'DISPLAY_COURSE', payload: '' })
            }
            // setDisplayPaymentModal={setDisplayPaymentModal}
          />
        )}
        {displayPaymentModal && (
          <Elements>
            <PaymentForm
              paymentInfo={displayPaymentModal}
              setDisplayPaymentModal={() =>
                dispatch({ type: 'DISPLAY_PAYMENT_MODAL', payload: false })
              }
            />
          </Elements>
        )}

        <SkipToContent className={skipToContent} />

        <HeaderMenuButton
          className={cx('bx--header__action--menu', headerButton)}
          aria-label="Open menu"
          onClick={() => {
            toggleNavState('leftNavIsOpen')
          }}
          isActive={leftNavIsOpen}
        />

        <Link
          className={cx(headerName, {
            [collapsed]: searchIsOpen,
          })}
          to="/"
        >
          {props.children}
        </Link>

        <HeaderGlobalBar>{isSearchEnabled && <GlobalSearch />}</HeaderGlobalBar>
      </ShellHeader>
    </>
  )
}

const DefaultHeaderText = () => <TICLogo />

Header.defaultProps = {
  children: <DefaultHeaderText />,
}

const mapStateToProps = (state) => ({
  notification: state.notification,
  displayCourse: state.displayCourse,
})

export default connect(mapStateToProps)(Header)

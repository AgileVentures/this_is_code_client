import React from 'react'
import { connect } from 'react-redux'


import { ToastNotification } from "carbon-components-react"

const Notification = (props) => {

  setTimeout(()=> {
    props.clearNotification()
  }, 5000)
  return (
    <>
      <ToastNotification
        title={props.title}
        subtitle={props.subtitle}
        caption={props.caption}
        hideCloseButton={false}
        iconDescription="Close"
        kind={props.kind || 'info'}
        notificationType="toast"
        onCloseButtonClick={function noRefCheck() { }}
        role="alert"
        style={{
          position: 'fixed',
          bottom: '0px',
          minWidth: '30rem',
          maxWidth: '100%'
        }}
        timeout={5000}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    clearNotification: () => dispatch({ type: 'NOTIFY', payload: null })
  }
}


export default connect(null, mapDispatchToProps)(Notification)

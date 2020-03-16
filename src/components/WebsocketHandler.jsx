import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const WebsocketHandler = () => {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [events, setEvents] = useState()

  return null
}

export default WebsocketHandler

// Also need to handle auth with node JS api - get the headers and authenticate with node

// handle the cors settings in gatsby

// Actions needed

/* 

- Handle auth with nodejs
  - set up headers properly

- launch websockets client only if user has signed in - done

- hold events in state
- match incoming message with state, dispatch update_event action only if there is change

- Update redux reducer with update event action - loop through incoming events, update connection link 

- Update display events/course component - render link and event information

- Maybe show a popup saying link is available for a specific event

- close websocket on logout

*/

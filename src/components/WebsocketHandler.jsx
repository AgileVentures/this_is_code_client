import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getCurrentCredentials } from '../helpers/localstorageHelper'

const WebsocketHandler = () => {
  // const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [wss, setWss] = useState()
  const websocketUrl = process.env.GATSBY_WEBSOCKET_API
  const nodeAxios = axios.create()
  const [nodeAuth, setNodeAuth] = useState(false)
  let events = []
  nodeAxios.defaults.withCredentials = true // Adds credentials to headers to manage node session
  const nodeAuthentication = async () => {
    const url = `${process.env.GATSBY_NODE_API}auth/login`
    try {
      const response = await nodeAxios.post(
        url,
        { data: getCurrentCredentials() },
        { withCredentials: true }
      )
      if (response.status === 200) {
        setNodeAuth(true)
        !connectionStatus && handleWebsocket()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleWebsocket = () => {
    const wss = new WebSocket(websocketUrl)
    wss.onopen = () => {
      console.log('Connection open')
      wss.send('connection open with client')
      setConnectionStatus(true)
      // setReload(false)
    }
    wss.onclose = () => {
      setConnectionStatus(false)
      // setReload(true)
      console.log('connection closed')
      // history.push('/')
    }
    wss.onerror = error => {
      console.log('connection error', error)
      wss.close()
    }
    wss.onmessage = message => {
      let updatedEvents = JSON.parse(message.data).message.events
      if (JSON.stringify(updatedEvents) !== JSON.stringify(events)) {
        events = JSON.parse(message.data).message.events
        dispatch({ type: 'UPDATE_EVENTS', payload: events })
      } else {
        // console.log('no new events')
      }
    }
  }

  useEffect(() => {
    !nodeAuth && nodeAuthentication()
  }, [])
  // useEffect(() => {}, [nodeAuth])
  return null
}

export default WebsocketHandler

// Also need to handle auth with node JS api - get the headers and authenticate with node

// handle the cors settings in gatsby

// Actions needed

/* 

- Handle auth with nodejs
  - set up headers properly
  - set special auth status in redux

- launch websockets client only if user has signed in - done

- hold events in state
- match incoming message with state, dispatch update_event action only if there is change

- Update redux reducer with update event action - loop through incoming events, update connection link 

- Update display events/course component - render link and event information

- Maybe show a popup saying link is available for a specific event

- close websocket on logout

*/

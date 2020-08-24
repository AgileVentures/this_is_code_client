import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import axios from '../helpers/axios-service'
import { getCurrentCredentials } from '../helpers/localstorageHelper'

const WebsocketHandler = () => {
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [connectionStatus, setConnectionStatus] = useState(false)

  const websocketUrl = process.env.GATSBY_WEBSOCKET_API
  // Adds credentials to headers to manage node session

  const [nodeAuth, setNodeAuth] = useState(false)
  let notifications = {}
  // const nodeURL = process.env.GATSBY_NODE_API
  const nodeAuthentication = async () => {
    try {
      const response = await axios.loginToNode({
        data: getCurrentCredentials(),
      })
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
    wss.onerror = (error) => {
      console.log('connection error', error)
      wss.close()
    }
    wss.onmessage = (message) => {
      let receivedNotification = JSON.parse(message.data).message
      if (
        JSON.stringify(receivedNotification) !== JSON.stringify(notifications)
      ) {
        notifications.events = receivedNotification.events
        notifications.jitsi = receivedNotification.jitsi
        currentUser.loggedIn &&
          dispatch({ type: 'UPDATE_EVENTS', payload: notifications })
      } else {
        console.log('no new notification')
      }
    }
  }

  useEffect(() => {
    !nodeAuth && nodeAuthentication()
  }, [])
  return null
}

export default WebsocketHandler

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getCurrentCredentials } from '../helpers/localstorageHelper'

const WebsocketHandler = () => {
  
  const dispatch = useDispatch()
  const [connectionStatus, setConnectionStatus] = useState(false)
  
  const websocketUrl =
    process.env.GATSBY_WEBSOCKET_API ||
    'wss://tic-node-staging.herokuapp.com/connection'
  // Adds credentials to headers to manage node session
  const nodeAxios = axios.create({ withCredentials: true })
  const [nodeAuth, setNodeAuth] = useState(false)
  let notifications = {}
  const nodeURL =
    process.env.GATSBY_NODE_API || 'https://tic-node-staging.herokuapp.com'
  const nodeAuthentication = async () => {
    const url = `${nodeURL}/auth/login`
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

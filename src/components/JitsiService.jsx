import React from 'react'

const JitsiService = ({ event, displayJitsi, setDisplayJitsi, user }) => {
  // const room = randomWords({ exactly: 5, join: '' })
  // const password = randomWords({ exactly: 5, join: '' })
  const jitsiContainerId = 'jitsi-container-id'
  const [jitsi, setJitsi] = React.useState({})

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve
    })

    const script = document.createElement('script')
    script.src = 'https://meet.jit.si/external_api.js'
    script.async = true
    script.onload = () => resolveLoadJitsiScriptPromise(true)
    document.body.appendChild(script)

    return loadJitsiScriptPromise
  }

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript()
    }
    const domain = 'meet.jit.si'
    const options = {
      roomName: event.room, //need to create a pretty unique name
      startAudioMuted: 1,
      // width: 800,
      // height: 450,
      parentNode: document.getElementById(jitsiContainerId),
      userInfo: {
        email: user.email,
        displayName: user.firstName + ' ' + user.lastName,
      },
      enableWelcomePage: false,
      onload: async () => {
      //   try {
      //     // await axios.startJitsi({event: event, room: room ,password: password})
      //   } catch (error) {
      //     console.error(error)
      //   }
        console.log('stuff loaded')
      }, // use onLoad trigger to notify nodejs API and send url info to gatsby
    }
    const _jitsi = new window.JitsiMeetExternalAPI(domain, options)
    _jitsi.on('passwordRequired', function () {
      _jitsi.executeCommand('password', event.password)
    })
    _jitsi.on('readyToClose', async () => {
      // await axios.endJitsi({event: event})
      console.log('I am hit')
      setDisplayJitsi(false)
    }) // navigates back to event card display
    _jitsi.on('participantRoleChanged', function (event) {
      if (event.role === 'moderator') {
        _jitsi.executeCommand('password', event.password) //set up unique password for each call
      }
    })

    setJitsi(_jitsi)
  }

  React.useEffect(() => {
    displayJitsi && initialiseJitsi()

    return () => jitsi?.dispose?.() // remove iframe from node
  }, [displayJitsi])

  return <div id={jitsiContainerId} style={{ height: 720, width: '100%' }} />
}

export default JitsiService

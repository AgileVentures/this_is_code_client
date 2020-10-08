import React from 'react'
import { Match } from '@reach/router'
import { navigate } from 'gatsby'
import { FourOhFour } from 'gatsby-theme-carbon'

const links = [
  { href: '/navigation/enroll-in-a-session', text: 'Enroll in a session' },
]

const Custom404 = () => {
  return (
    <Match path='/course/:id'>
      {(props) =>
        props.match ? (
          navigate(`/?id=${props.match.id}`)
        ) : (
          <FourOhFour links={links} />
        )
      }
    </Match>
  )
}

export default Custom404

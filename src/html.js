import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta property="og:title" content="This Is Code - Micro Learning Sessions" />
        <meta
          property="og:description"
          content="Join Micro Learning Sessions and level up your coding skills. Tell your friends about the This Is Code Sessions and reduce the cost for everyone!"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/CraftAcademy/craft-assets/gh-pages/images/banners/tic_poster.png"
        />
        <link rel="shortcut icon" href="%PUBLIC_URL%/logo for website 2.png" />
        <meta name="viewport" content="width=device-width,user-scalable=no" />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

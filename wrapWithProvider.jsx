import React from "react"
import { Provider } from "react-redux"

import createStore from "./src/state/store/createStore"

// eslint-disable-next-line react/display-name,react/prop-types
const wrapWithProvider = ({ element }) => {
  const store = createStore()

  return (
    <Provider store={store}>
      {element}
    </Provider>)
}

export default wrapWithProvider
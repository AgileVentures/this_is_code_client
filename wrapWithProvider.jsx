import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements-universal'
import createStore from './src/state/store/createStore'

// eslint-disable-next-line react/display-name,react/prop-types
const wrapWithProvider = ({ element }) => {
  const store = createStore()

  return (
    <StripeProvider apiKey={process.env.GATSBY_STRIPE_KEY}>
      <Provider store={store}><InsertCypressStore store={store}/>{element}</Provider>
    </StripeProvider>
  )
}

export default wrapWithProvider


const InsertCypressStore =({store}) => {
  useEffect(() => {
    if (window.Cypress) {
      window.store = store
    }
  }, [])
  return (
    <div>
      
    </div>
  )
}

// export default InsertCypressStore

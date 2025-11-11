import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import store from './store'
import './bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()

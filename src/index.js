import React from 'react'
import ReactDOM from 'react-dom'

import {googleSignIn, googleSignOut} from 'app/api/googleAuth'
import apiUser from 'app/api/user'

import Main from 'app/containers/Main/Main'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

googleSignIn((googleUser) => {
  window.googleUser = googleUser
  const token = googleUser.getAuthResponse().id_token
  const props = {
    user: apiUser(token),
    userName: googleUser.getBasicProfile().getName(),
    userImageUrl: googleUser.getBasicProfile().getImageUrl(),
    userSignOut: googleSignOut,
  }
  ReactDOM.render(React.createElement(Main, props), document.getElementById('root'))
})

const props = {}
ReactDOM.render(React.createElement(Main, props), document.getElementById('root'))

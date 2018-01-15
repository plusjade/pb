import React from 'react'
import ReactDOM from 'react-dom'

import { serverAuth, googleBootstrapSession } from 'app/api/auth'
import apiUser from 'app/api/user'
import apiNewUser from 'app/api/newUser'
import * as cookies from 'app/api/cookies'
import * as Storage from 'app/api/storage'
import QueryParams from 'lib/QueryParams'
import Main from 'app/containers/Main/Main'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

function renderUI(props) {
  ReactDOM.render(
    React.createElement(Main, {...{userAvatarUrl}, ...props}),
    document.getElementById('root')
  )
}

// Once we get a client token, send it to the server for verification.
// Return server access token on success.
function initializeWithGoogleToken(token) {
  serverAuth({provider: "google", token}).then((rsp) => {
    if (rsp) {
      const THIRTY_DAYS =  30 * 24 * 60
      console.log("auth Success")
      cookies.setCookie("access_token", rsp.access_token, THIRTY_DAYS)
      renderUI({...rsp.user, user: apiUser(rsp.access_token)})
    } else {
      console.log("fail auth")
    }
  })
}

// The client does not have a server token,
// so bootstrap client session workflow, in this case Google Signin.
// The workflow generates a client token that the server can verify
// and send back a server token.
function bootstrapClientSession() {
  googleBootstrapSession().then((token) => {
    // previous Google permissions have been found
    if (token) {
      initializeWithGoogleToken(token)
    } else {
      // user has not granted Google permissions
      renderUI({
        newUser: apiNewUser(),
        initializeWithGoogleToken: initializeWithGoogleToken
      })
    }
  })
}

// Start the App
// #############################################################################

const SERVER_TOKEN = cookies.getCookie("access_token")
const userAvatarUrl = Storage.get("userAvatarUrl")
const Params = QueryParams()
const scat = Params.get("scat")
if (scat) {
  Storage.set("scat", scat)
}

renderUI()

if (SERVER_TOKEN) {
  // verify the stored server token is good
  serverAuth({provider: "pb", token: SERVER_TOKEN}).then((rsp) => {
    if (rsp) {
      renderUI({...rsp.user, user: apiUser(rsp.access_token)})
    } else {
      // the token is no good so remove it
      cookies.destroyCookie("access_token")
      bootstrapClientSession()
    }
  })
} else {
  bootstrapClientSession()
}

import React from 'react'
import ReactDOM from 'react-dom'

import {serverAuth, googleSignIn} from 'app/api/auth'
import apiUser from 'app/api/user'
import * as cookies from 'app/api/cookies'

import Main from 'app/containers/Main/Main'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const STORED_TOKEN = cookies.getCookie("access_token")
const userAvatarUrl = window.localStorage && window.localStorage.getItem("userAvatarUrl")

function renderUI(props) {
  ReactDOM.render(React.createElement(Main, {...{userAvatarUrl}, ...props}), document.getElementById('root'))
}

function runGoogle() {
  googleSignIn((token) => {
    serverAuth({provider: "google", token}).then((rsp) => {
      if (rsp) {
        const THIRTY_DAYS =  30 * 24 * 60
        console.log("auth Success", rsp)
        cookies.setCookie("access_token", rsp.access_token, THIRTY_DAYS)
        renderUI({...rsp.user, user: apiUser(rsp.access_token)})
      } else {
        console.log("fail auth")
      }
    })
  })
}

renderUI()

if (STORED_TOKEN) {
  // verify the stored token is good
  serverAuth({provider: "pb", token: STORED_TOKEN}).then((rsp) => {
    if (rsp) {
      renderUI({...rsp.user, user: apiUser(rsp.access_token)})
    } else {
      // the token is no good so remove it
      cookies.destroyCookie("access_token")
      runGoogle()
    }
  })
} else {
  runGoogle()
}

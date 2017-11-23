import React            from 'react'
import ReactDOM         from 'react-dom'

import Trends             from 'app/Trends'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com/videos"
    : "http://localhost:4000/videos"
)

const app = Trends
const props = {}
const body = document.querySelector("body")
if (body) {
  body.style.backgroundColor = "transparent"
  body.style.overflow = "auto"
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))

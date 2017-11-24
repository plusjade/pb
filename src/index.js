import React from 'react'
import ReactDOM from 'react-dom'

import  *  as actions from 'app/actions'
import Trends from 'app/Trends'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const props = {...actions}
const body = document.querySelector("body")
if (body) {
  body.style.backgroundColor = "transparent"
  body.style.overflow = "auto"
}

ReactDOM.render(React.createElement(Trends, props), document.getElementById('root'))

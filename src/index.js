import React from 'react'
import ReactDOM from 'react-dom'

import  *  as actions from 'app/actions'
import Main from 'app/containers/Main/Main'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const props = {...actions}
ReactDOM.render(React.createElement(Main, props), document.getElementById('root'))

import React, {PureComponent} from 'react'
import Radium from 'radium'

const style = {
  default: {
    display: "inline-block",
    height: "8px",
    width: "8px",
    borderRadius: "8px",
    backgroundColor: "#CCC",
    margin: "0 2px",
    WebkitAnimation: "sk-flow 800ms infinite ease-in-out both",
    animation: "sk-flow 1000ms infinite ease-in-out both",
  },
  one: {
    WebkitAnimationDelay: "-0.32s",
    animationDelay: "-0.32s",
  },
  two: {
    WebkitAnimationDelay: "-0.16s",
    animationDelay: "-0.16s",
  },
}

class TypingCircles extends PureComponent {
  render() {
    return (
      <div>
        <div
          style={[
            style.default,
            style.one
          ]}
        />
        <div
          style={[
            style.default,
            style.two
          ]}
        />
        <div style={style.default} />
      </div>
    )
  }
}

export default Radium(TypingCircles)

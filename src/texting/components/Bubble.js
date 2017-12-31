import React    from 'react'
import Radium from 'radium'

const bubble = {
  default: {
    fontWeight: 300,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    borderRadius: 20,
    display: "inline-block",
    boxSixing: "border-box",
    textAlign: "left",
    border: "1px solid #F5F5F5",
  },
  mine: {
    color: "#FFF",
    float: "right",
  },
  theirs: {
    color: "#000",
    float: "left",
  },

  enter: {
    transition: "all 350ms ease-in-out",
    transform: "scale(0)",
    opacity: 0,
  },
  end: {
    transition: "all 350ms ease-in-out",
    transform: "scale(1)",
    opacity: 1,
  }
}

const mine = Object.assign({}, bubble.default, bubble.mine)
const yours = Object.assign({}, bubble.default, bubble.theirs)
const enter = Object.assign({}, yours, bubble.enter)
const end = Object.assign({}, yours, bubble.end)

function Bubble(props) {
  let style
  if (props.animate) {
    if (props.status === "loading") {
      style = end
    } else {
      style = enter
    }
  } else if (props.type === "theirs") {
    style = yours
  } else {
    style = mine
  }

  return (
    <div style={[style]}>
      <div style={{padding: "6px 10px"}}>
        {React.Children.only(props.children)}
      </div>
    </div>
  )
}

export default Radium(Bubble)

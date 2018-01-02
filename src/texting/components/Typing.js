import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Bubble from './Bubble'
import TypingCircles from './TypingCircles'

const style = {
  default: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    overflow: "auto",
    display: "flex",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    paddingLeft: 15,
  },
  enter: {
    transition: "all 300ms ease-out",
    maxHeight: 0,
    opacity: 0,
    transform: "scaleY(0.9)"
  },
  end: {
    transition: "all 300ms ease-out",
    maxHeight: "1000px",
    opacity: 1,
    transform: "scaleY(1)"
  }
}

class Typing extends PureComponent {
  static propTypes = {
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }

  render() {
    return (
      <div
        style={[
          style.default,
          (this.props.status === "loading") ? style.end : style.enter,
        ]}
      >
        <div style={style.inner}>
          <Bubble
            type="theirs"
            status={this.props.status}
            animate={true}
          >
            <TypingCircles />
          </Bubble>
        </div>
      </div>
    )
  }
}

export default Radium(Typing)

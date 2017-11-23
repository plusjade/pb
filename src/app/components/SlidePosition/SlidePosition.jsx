import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import style from './style'

class SlidePosition extends PureComponent {
  static propTypes = {
    elements: PropTypes.number.isRequired,
    activeIndex: PropTypes.number.isRequired,
  }

  static defaultProps = {
    elements: 2
  }

  render() {
    const elements = Array(this.props.elements).fill(this.props.elements)
    return (
      <div style={style.slide}>
        <div style={style.slideInner}>
          {elements.map((a, index) => (
            <div
              key={index}
              style={[
                style.slideCircle,
                this.props.activeIndex === index && style.slideCircleActive
              ]}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Radium(SlidePosition)

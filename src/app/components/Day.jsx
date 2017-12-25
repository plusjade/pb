import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

const style = {
  default: {
    textAlign: "center",
  },
  heading: {
    fontSize: 14,
    color: "inherit",
    padding: 5,
  },
}

class Day extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    ordinal: PropTypes.string.isRequired,
    style:PropTypes.object,
  }

  handleAdd = () => {
    this.props.onTap(this.props.ordinal)
  }

  render() {
    return(
      <div style={style.default}>
        <Hammer onTap={this.handleAdd}>
          <h2
            style={[
              style.heading,
              this.props.style
            ]}
          >
            {`${this.props.value}`}
          </h2>
        </Hammer>
      </div>
    )
  }
}

export default Radium(Day)

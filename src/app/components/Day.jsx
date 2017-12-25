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
  }

  handleAdd = () => {
    if (this.props.showAddEntry) {
      this.props.closeAddEntry()
    } else {
      this.props.persist({
        ordinal: this.props.ordinal,
      })
    }
  }

  render() {
    return(
      <div style={style.default}>
        <Hammer onTap={this.handleAdd}>
          <h2
            style={[
              style.heading,
              {color: this.props.color}
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

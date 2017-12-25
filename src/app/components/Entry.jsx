import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  default: {
    display: "flex",
    alignItems: "end",
    margin: "20px 0",
  },
  major: {
    flex: 9,
    marginRight: 15,
    padding: "12px 20px",
    boxSizing: "border-box",
    borderRadius: 10,
    backgroundColor: "#FFF",
    color: "#616161",
  },
  minor: {
    flex: 1
  },
  icon: {
    padding: "5px 10px",
    margin: "0 15px",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#EEE",
  }
}

class Entry extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    showDetail: PropTypes.func.isRequired,
  }

  handleSelect = () => {
    this.props.showDetail(this.props.category)
  }

  render() {
    return(
      <div style={[
          style.default,
      ]}>
        <div style={style.minor}>
          <Hammer onTap={this.handleSelect}>
            <div style={style.icon}>
              {`#${this.props.category.substring(0, 3).toUpperCase()}`}
            </div>
          </Hammer>
        </div>
        <div style={style.major}>
          <span>{this.props.value}</span>
        </div>
      </div>
    )
  }
}

export default Radium(Entry)

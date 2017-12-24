import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'
import colors from 'app/colors'

const style = {
  default: {
    margin: "10px 10px 30px 60px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    color: "#616161",
    padding: "15px 20px",
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#FFF",
  },
  hashtag: {
    color: "#424242",
    position: "absolute",
    bottom: -18,
    right: 15,
    fontSize: 12,
  },
}

class Entry extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    entryEdit: PropTypes.func.isRequired,
  }

  handleEdit = (e) => {
    e.preventDefault()
    this.props.entryEdit(this.props.entry)
  }

  handleSelect = () => {
    this.props.showDetail(this.props.category)
  }


  render() {
    return(
      <div style={[
          style.default,
      ]}>
        <div style={{flex: 1}}>
          <span>{this.props.value || "-"}</span>
        </div>
        <Hammer onTap={this.handleSelect}>
          <div style={style.hashtag}>
            {`${this.props.category.toUpperCase()}`}
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Radium(Entry)

import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'

const style = {
  categoryButton: {
    display: "inline-block",
    width: 60,
    height: 60,
    borderRadius: 60,
    lineHeight: "60px",
    textAlign: "center",
    border: 0,
    backgroundColor: "#FFF",
    margin: 5,
    color: "#BDBDBD",
  },
}

class Category extends Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    persist: PropTypes.func.isRequired,
    categoryOptions: PropTypes.object.isRequired,
  }

  handleClick = (e) => {
    if (typeof this.props.onClick !== "function") { return }
    this.props.onClick({
      name: this.props.name,
      id: this.props.id
    })
  }

  render() {
    return(
      <button
        style={[
          style.categoryButton,
          this.props.style,
          {backgroundColor: this.props.isActive ? this.props.color : "#fefefe"},
        ]}
        onClick={this.handleClick}
      >
        {this.props.name}
      </button>
    )
  }
}

export default Radium(Category)

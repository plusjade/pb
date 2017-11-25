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
    backgroundColor: "#fefefe",
    margin: 5,
    color: "#9E9E9E",
    border: "1px solid rgba(48, 48, 48, 0.8)"
  },
  active: {
    backgroundColor: "rgba(48, 48, 48, 0.5)",
  }
}

class Category extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
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
          this.props.isActive && style.active,
        ]}
        onClick={this.handleClick}
      >
        {this.props.name}
      </button>
    )
  }
}

export default Radium(Category)

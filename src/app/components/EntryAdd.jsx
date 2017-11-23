import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Layer                from 'components/Layer/Layer'
import Category                from './Category'

const style = {
  layer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  categoryButton: {
    display: "inline-block",
    width: 100,
    height: 100,
    borderRadius: 100,
    lineHeight: "100px",
    textAlign: "center",
    border: 0,
    backgroundColor: "#FFF",
    margin: 5,
  },
  button: {
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 20,
    backgroundColor: "#FFF",
    border: "1px solid #333",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    margin: "5px 0",
  },
  select: {
    fontSize: 20,
    border: "1px solid #333",
  },
  textarea: {
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 20,
    backgroundColor: "#FFF",
    border: "1px solid #333",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    margin: "5px 0",
    minHeight: 100,
  }
}

class EntryAdd extends Component {
  static propTypes = {
    days: PropTypes.array.isRequired,
    persist: PropTypes.func.isRequired,
    categoryOptions: PropTypes.object.isRequired,
  }

  state = {
    value: "",
    category: "",
  }

  componentWillMount() {
    this.setDefaults()
    document.getElementById("root").style.position = "fixed"
  }

  componentWillUnmount() {
    document.getElementById("root").style.position = "static"
  }

  componentWillReceiveProps() {
    this.setDefaults()
  }

  setDefaults() {
   this.setState({
      value: "",
      category: "",
    })
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleChangeCategory = (e) => {
    this.setState({category: e.target.value})
  }

  handleChangeOrdinal = (e) => {
    this.setState({ordinal: e.target.value})
  }

  handleCategory = (category) => {
    this.props.persist({
      ordinal: this.props.ordinal,
      value: "",
      category: category.name,
    })
  }

  render() {
    return(
      <Layer style={style.layer}>
        <div>
          {Object.keys(this.props.categoryOptions).map((key) => (
            <Category
              key={key}
              name={key}
              color={this.props.categoryOptions[key] && this.props.categoryOptions[key].color}
              isActive={true}
              onClick={this.handleCategory}
            />
          ))}
        </div>
      </Layer>
    )
  }
}

export default Radium(EntryAdd)

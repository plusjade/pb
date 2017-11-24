import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Category                from 'app/components/Category'

import style from './style'

class EntryAdd extends Component {
  static propTypes = {
    categoryOptions: PropTypes.object.isRequired,
    ordinal: PropTypes.string.isRequired,
    persist: PropTypes.func.isRequired,
  }

  state = {
    value: "",
    category: "",
  }

  componentWillMount() {
    this.setDefaults()
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
      <div style={style.layer}>
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
      </div>
    )
  }
}

export default Radium(EntryAdd)

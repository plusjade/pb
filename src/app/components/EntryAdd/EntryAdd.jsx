import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import style from './style'

const MAX_HEIGHT = 200 // Maximum height: 200px

class EntryAdd extends PureComponent {
  static propTypes = {
    persistReally: PropTypes.func,
    entry: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }

  state = {
    value: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.value) { return }
    this.props.persistReally(
      Object.assign(
        {},
        this.props.entry,
        {value: this.state.value}
      )
    )
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    this.handleResize()
  }

  handleResize = () => {
    this.inputRef.style.height = "" // Reset the height
    this.inputRef.style.height = Math.min(this.inputRef.scrollHeight, MAX_HEIGHT) + "px"
  }

  refInput = (node) => {
    if (node) { this.inputRef = node}
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={[
          style.dateSelector,
          style.dateSelectorIsActive,
        ]}
      >
        <div style={style.level1}>
          <textarea
            style={style.input}
            rows={1}
            value={this.state.value}
            placeholder={`What did you do ${this.props.entry ? this.props.entry.ordinal : "today"}?`}
            onChange={this.handleChange}
            ref={this.refInput}
          />

          <button
            style={[
              style.button,
              this.state.value && style.buttonActive
            ]}
            type="submit"
          >
            {"Send"}
          </button>
        </div>
      </form>
    )
  }
}

export default Radium(EntryAdd)

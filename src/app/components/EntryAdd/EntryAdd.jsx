import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import style from './style'

class EntryAdd extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.persistReally(
      Object.assign(
        {},
        this.props.showAddEntry,
        {value: this.inputRef && this.inputRef.value}
      )
    )
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
          this.props.showAddEntry && style.dateSelectorIsActive,
        ]}
      >
        <input
          style={style.input}
          ref={this.refInput}
          defaultValue=""
        />

        <button
          style={style.button}
          type="submit"
        >
          {"+"}
        </button>
      </form>
    )
  }
}

export default Radium(EntryAdd)

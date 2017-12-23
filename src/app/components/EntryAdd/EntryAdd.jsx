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
        {value: this.textAreaRef && this.textAreaRef.value}
      )
    )
  }

  refTextarea = (node) => {
    if (node) { this.textAreaRef = node}
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
        <textarea
          style={style.textarea}
          ref={this.refTextarea}
          defaultValue=""
        />

        <button
          style={style.button}
          type="submit"
        >
          Add entry
        </button>
      </form>
    )
  }
}

export default Radium(EntryAdd)

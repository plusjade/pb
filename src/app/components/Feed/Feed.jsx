import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Banner from 'app/components/Banner'
import Day from 'app/components/Day'
import Entry from 'app/components/Entry'

import style from './style'

class Feed extends PureComponent {
  render() {
    return (
      <div
        style={[
          style.default,
          this.props.isActive && style.isActive,
        ]}
      >
        <button style={style.addIcon}>
          {this.props.showAddEntry && (
            "✕"
          )}
        </button>

        {this.props.feed.map((unit) => {
          switch (unit.type) {
            case "banner": {
              return (
                <Banner
                  key={unit.value}
                  color={unit.color}
                  value={unit.value}
                />
              )
            }
            case "day": {
              return (
                <Day
                  key={unit.ordinal}
                  value={unit.value}
                  color={unit.color}
                  entries={unit.entries}
                  ordinal={unit.ordinal}

                  remove={this.props.remove}
                  entryEdit={this.props.entryEdit}
                  persist={this.props.persist}
                  showAddEntry={this.props.showAddEntry}
                  showDetail={this.props.showDetail}
                  closeAddEntry={this.props.closeAddEntry}
                />
              )
            }
            case "entry": {
              return (
                <Entry
                  {...unit}
                  key={unit.id}
                  showDetail={this.props.showDetail}
                />
              )
            }
            default: {
              return (null)
            }
          }
        })}
      </div>
    )
  }
}

export default Radium(Feed)

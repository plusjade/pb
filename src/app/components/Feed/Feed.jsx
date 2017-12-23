import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Banner from 'app/components/Banner'
import Day from 'app/components/Day'
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

        {this.props.days.map((day) => {
          switch (day.type) {
            case "banner": {
              return (
                <Banner
                  key={day.value}
                  color={day.color}
                  value={day.value}
                />
              )
            }
            default: {
              return (
                <Day
                  key={day.ordinal}
                  name={day.occurred_at}
                  color={day.color}
                  entries={day.entries}
                  ordinal={day.ordinal}
                  isToday={day.isToday}

                  remove={this.props.remove}
                  entryEdit={this.props.entryEdit}
                  persist={this.props.persist}
                  showAddEntry={this.props.showAddEntry}
                  showDetail={this.props.showDetail}
                  closeAddEntry={this.props.closeAddEntry}
                />
              )
            }
          }
        })}
      </div>
    )
  }
}

export default Radium(Feed)

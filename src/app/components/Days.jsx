import React, { PureComponent }   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Layer                from 'components/Layer/Layer'
import Day                from 'app/components/Day'

const style = {

}
class Days extends PureComponent {
  render() {
    return (
      <Layer isActive={this.props.isActive}>
        <Hammer
          onSwipe={this.props.showVizIndex}
          direction={"DIRECTION_LEFT"}
        >
          <div>
            {this.props.days.map(day => (
              <Day
                key={day.ordinal}
                name={day.occurred_at}
                entries={day.entries}
                ordinal={day.ordinal}
                isToday={day.isToday}

                remove={this.props.remove}
                entryEdit={this.props.entryEdit}
                categoryOptions={this.props.categoryOptions}
                persist={this.props.persist}
                showAddEntry={this.props.showAddEntry}
              />
            ))}
          </div>
        </Hammer>
      </Layer>
    )
  }
}

export default Radium(Days)

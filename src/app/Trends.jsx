import React, {Component}   from 'react'
import PropTypes                from 'prop-types'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import Day                from 'app/components/Day'
import Visualization      from 'app/components/Visualization'
import EntryAdd           from 'app/components/EntryAdd'
import EntryEdit          from 'app/components/EntryEdit'
import SlidePosition      from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail     from 'app/components/CategoryDetail'

import style from './style'

class Trend extends Component {
  static propTypes = {
    getPayload: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    days: [],
    shouldShowTrends: true,
    showVizualization: true,
    categoryOptions: [],
    width: 0,
    height: 0,
    maxHealth: 0,
  }

  componentWillMount() {
    const dim = document.getElementById("root").getBoundingClientRect()
    this.refreshData()
    this.setState({
      width: window.parseInt(dim.width * 0.93),
      height: dim.height,
    })
  }

  refreshData() {
    this.props.getPayload().then((rsp) => { this.setState(rsp) })
  }

  entryEdit = (entry) => {
    this.setState({showEditEntry: entry})
  }

  persist = (body) => {
    if (!body.ordinal || body.ordinal.trim() === "") { return }

    this.props.persist(body).then(() => {
      this.refreshData()
      this.closeModals()
      this.showVizualization()
    })
  }

  remove = (id) => {
    this.props.remove(id).then(() => {
      this.refreshData()
      // this.closeModals()
    })
  }

  toggleChart = () => {
    window.scroll(0,0)
    this.setState({
      showVizualization: !this.state.showVizualization,
      shouldShowTrends: !this.state.shouldShowTrends,
    })
  }

  showVizualization = () => {
    window.scroll(0,0)
    this.setState({showVizualization: true})
  }

  handleAddEntry = (ordinal) => {
    this.setState({showAddEntry: ordinal})
  }

  closeModals = () => {
    this.setState({showAddEntry: false, showEditEntry: false})
  }

  shouldShowClose() {
    return this.state.showAddEntry || this.state.showEditEntry
  }

  shouldShowAdd() {
    return !this.shouldShowClose()
  }

  shouldShowChartToggle() {
    return !this.shouldShowClose()
  }

  render() {
    return(
      <Hammer onSwipe={this.toggleChart}>
        <div style={style.container}>
          {this.state.showAddEntry && (
            <EntryAdd
              persist={this.persist}
              ordinal={this.state.showAddEntry}
              categoryOptions={this.state.categoryOptions}
            />
          )}

          {this.state.showEditEntry && (
            <EntryEdit
              entry={this.state.showEditEntry}
              remove={this.remove}
            />
          )}

          {this.state.trends && (
            <CategoryDetail
              data={this.state.trends[0]}
            />
          )}

          <div style={[
            style.days,
            this.state.shouldShowTrends && ({height: this.state.height, overflow: "hidden"}),
          ]}
          >
            {this.state.days.map((day, i) => (
              <Day
                key={day.ordinal}
                name={day.occurred_at}
                entries={day.entries}
                ordinal={day.ordinal}
                isToday={day.isToday}
                remove={this.remove}
                entryEdit={this.entryEdit}
                categoryOptions={this.state.categoryOptions}
                persist={this.persist}
                handleAddEntry={this.handleAddEntry}
              />
            ))}
          </div>


          <div
            style={[
              style.trends,
              {transform: `translateX(${this.state.width}px)`},
              this.state.shouldShowTrends && style.shouldShowTrends,
              {display: "_none"}
            ]}
          >
            {this.state.trends && (
              <Visualization
                data={this.state.trends}
                categories={this.state.categories}
                maxHealth={this.state.maxHealth}
                categoryOptions={this.state.categoryOptions}
              />
            )}
          </div>

          {this.shouldShowClose() && (
            <Hammer onTap={this.closeModals}>
              <div style={style.closeIcon}>
                <span>{"❌"}</span>
              </div>
            </Hammer>
          )}

          {!this.shouldShowClose() && (
            <SlidePosition
              activeIndex={this.state.shouldShowTrends ? 1 : 0}
            />
          )}
        </div>
      </Hammer>
    )
  }
}

export default Radium(Trend)

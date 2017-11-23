import React, {Component}   from 'react'
import Radium from 'radium'
import Hammer             from 'react-hammerjs'

import DB                 from 'app/DB'
import Day                from 'app/components/Day'
import Visualization      from 'app/components/Visualization'
import EntryAdd           from 'app/components/EntryAdd'
import EntryEdit          from 'app/components/EntryEdit'
import SlidePosition      from 'app/components/SlidePosition/SlidePosition'
import CategoryDetail     from 'app/components/CategoryDetail'

import { max } from "d3-array"

const categoryOptions = () => (
  ["instacart", "gym", "project", "friends", "relationships", "family", "social"].reduce((memo, d, index) => {
    memo[d] = {
      name: d,
      color: "#616161",
    }
    return memo
  }, {})
)

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com"
    : "http://localhost:4000"
)
const TrendsDB = DB(API_ENDPOINT)

const style={
  chartToggle: {
    position: "fixed",
    lineHeight: "40px",
    height: 40,
    width: 60,
    bottom: 10,
    left: 0,
    fontSize: 20,
    display: "block",
    textAlign: "center",
    zIndex: 12,
    backgroundColor: "#212121",
    borderRadius: "0 20px 20px 0",
  },
  addIcon: {
    position: "fixed",
    bottom: 10,
    right: 10,
    margin: "auto",
    width: 50,
    height: 50,
    borderRadius: 50,
    lineHeight: "55px",
    fontSize: 30,
    display: "block",
    textAlign: "center",
    zIndex: 5,
  },
  closeIcon: {
    position: "fixed",
    bottom: 10,
    right: 10,
    fontSize: 30,
    display: "block",
    textAlign: "center",
    zIndex: 3,
  },
  container: {

  },
  days: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  trends: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: "all 200ms ease",
    transform: "translateX(350px)",
    boxShadow: "1px 1px 30px #424242",
  },
  shouldShowTrends: {
    position: "absolute",
    transform: "translateX(0)",
  },
}
class Trend extends Component {
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
    TrendsDB.days().then((rsp) => {
      const aggregrate = rsp.trends.reduce((memo, d) => (memo.concat(d.data)),[])
      this.setState({
        days: rsp.days,
        trends: rsp.trends,
        categories: rsp.categories,
        categoryOptions: categoryOptions(),
        maxHealth: max(aggregrate, d => (d.health))
      })
    })
  }

  entryEdit = (entry) => {
    this.setState({showEditEntry: entry})
  }

  persist = (body) => {
    if (!body.ordinal || body.ordinal.trim() === "") { return }

    TrendsDB.persist(body).then(() => {
      this.refreshData()
      this.closeModals()
      this.showVizualization()
    })
  }

  remove = (id) => {
    TrendsDB.remove(id).then(() => {
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

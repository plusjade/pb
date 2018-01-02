import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import CategoryDetail from 'app/components/CategoryDetail'
import CategoryList from 'app/components/CategoryList/CategoryList'
import EntryAdd from 'app/components/EntryAdd/EntryAdd'
import Feed from 'app/components/Feed/Feed'
import Heading from 'app/components/Heading'
import FeedItemRenderer from 'app/components/FeedItemRenderer'
import AddIcon from 'app/components/AddIcon/AddIcon'
import OpacityMask from 'app/components/OpacityMask/OpacityMask'

import Phone from 'texting/components/Phone'
import Typing from 'texting/components/Typing'

import style from './style'

class Main extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getChats: PropTypes.func.isRequired,
    getFeed: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }

  state = {
    categories: [],
    feed: [],
    shouldShowVizIndex: true,
    activeCategory: false,
    chatsIndex: [],
    chatsObjects: {},
    chatsCommands: undefined,
    // status: null, loading, loaded
    chatsIncomingObjectId: undefined,
    chatsIncomingObjectStatus: undefined,
  }

  componentWillMount() {
    this.getChats()
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.activeCategory && prevState.activeCategory !== this.state.activeCategory) {
    //   this.getFeed(this.state.activeCategory)
    // }

    if (!prevState.shouldShowCategoryList && this.state.shouldShowCategoryList) {
      this.getCategories()
    }

    if (!prevState.chatsCommands && this.state.chatsCommands) {
      this.chatsRunCommands(this.state.chatsCommands)
    }
  }

  chatsRunCommands = (commands) => (
    commands.reduce((memo, command) => (
      memo.then(() => (this.chatsRunCommand(command)))
    ), Promise.resolve())
  )

  chatsRunCommand = ({id, duration=800, delay=300}) => (
    new Promise((resolve, reject) => {
      const chatsIndex = this.state.chatsIndex.slice(0)
      chatsIndex.push(id)
      this.setState({
        chatsIndex: chatsIndex,
        chatsIncomingObjectId: id,
        chatsIncomingObjectStatus: undefined,
      }, () => {
        setTimeout(() => {
          this.chatsSetIncomingObject(id, "loading", () => {
            setTimeout(() => {
              this.chatsSetIncomingObject(id, "loaded", () => {
                resolve("Success!")
              })
            }, duration)
          })
        }, delay)
      })
    })
  )

  chatsSetIncomingObject = (id, status, callback) => {
    this.setState((prevState) => ({
      chatsIncomingObjectId: id,
      chatsIncomingObjectStatus: status,
    }), callback)
  }

  getFeed = (categoryName) => {
    this.props.getFeed(categoryName).then((rsp) => { this.setState(rsp) })
  }

  getChats() {
    this.props.getChats().then((rsp) => {
      this.setState((prevState) => {
        // accumulate chat objects in the app
        // TODO: manage memory footprint/cache-sclearing
        const mergedChatsObjects = {...prevState.chatsObjects, ...rsp.chatsObjects}
        return ({...rsp, chatsObjects: mergedChatsObjects})
      })
    })
  }

  getCategories() {
    this.props.getCategories().then((rsp) => { this.setState(rsp) })
  }

  persist = (body) => {
    this.setState({showAddEntry: body})
  }

  persistReally = (body, callback) => {
    if (!body.value || !body.value.trim() === "") { return }

    this.props.persist(body).then((rsp) => {
      this.closeAddEntry()
      this.activateCategory(rsp.category)
      this.setState({isEntryAddActive: false})
      if (typeof callback === "function") {
        callback()
      }
    })
  }

  closeAddEntry = () => {
    this.setState({showAddEntry: false})
  }

  remove = (id) => {
    this.props.remove(id).then(() => {
      this.getCategories()
    })
  }

  showVizIndex = () => {
    // window.scroll(0,0)
    console.log("showVizIndex")
    this.setState({
      shouldShowVizIndex: !this.state.shouldShowVizIndex,
    })
  }

  showAddEntry = (ordinal) => {
    this.setState({showAddEntry: ordinal})
  }

  toggleCategoryList = () => {
    this.setState({
      shouldShowCategoryList: !this.state.shouldShowCategoryList,
    })
  }

  activateCategory = (categoryName) => {
    if (categoryName == "Home") {
      categoryName = false
    } else {
      this.getFeed(categoryName)
    }
    this.setState({
      activeCategory: categoryName,
      shouldShowCategoryList: false,
    })
  }

  goHome = () => {
    this.activateCategory("Home")
  }

  getCategoryDetail = () => (
    this.state.categories.find(d => (this.state.activeCategory === d.name))
  )

  shouldShowSlidePosition =() => (
    !this.state.activeCategory
  )
  feed = () => (
    this.props.parseFeed(this.state.feed, this.state.activeCategory)
  )

  handleToggleEntryAdd = () => {
    this.setState({isEntryAddActive: !this.state.isEntryAddActive})
  }

  handleOpacityMaskTap = () => {
    if (this.state.isEntryAddActive) {
      this.handleToggleEntryAdd()
    } else if (this.state.shouldShowCategoryList) {
      this.toggleCategoryList()
    }
  }

  render() {
    const activeCategory = this.getCategoryDetail()
    return(
      <div id="Container" style={style.container}>
        <div
          id="SecondaryWrap"
          style={[
            style.secondaryWrap,
            this.state.shouldShowCategoryList && style.secondaryIsActive
          ]}
        >
          <div style={style.secondary}>
            <Heading
              value={"🤖 →"}
              onTap={this.goHome}
              style={{textAlign: "left", paddingLeft: 20}}
            />

            <CategoryList
              activeCategoryName={this.state.activeCategory}
              categories={this.state.categories || []}
              onTap={this.activateCategory}
              onSwipe={this.toggleCategoryList}
            />
          </div>
        </div>

        <div
          id="PrimaryWrap"
          style={[
            style.primaryWrap,
            this.state.shouldShowCategoryList && style.primaryWrapIsInactive
          ]}
        >
          <OpacityMask
            isActive={this.state.isEntryAddActive || this.state.shouldShowCategoryList}
            onTap={this.handleOpacityMaskTap}
          />

          <div style={style.primary}>
            <Heading
              value={
                this.getCategoryDetail()
                  ? this.getCategoryDetail().name.toUpperCase()
                  : "🤖"
              }
              onTap={this.toggleCategoryList}
            />

            <Feed
              activateCategory={this.activateCategory}
              activeCategory={this.state.activeCategory}
              onSwipeRight={this.toggleCategoryList}
            >
              {this.state.activeCategory ? (
                this.feed().map((unit, index) => (
                  <FeedItemRenderer
                    key={index}
                    unit={unit}
                  />
                ))
              ) : (
                <Phone
                  chatsIndex={this.state.chatsIndex}
                  chatsObjects={this.state.chatsObjects}
                  chatsIncomingObjectId={this.state.chatsIncomingObjectId}
                  chatsIncomingObjectStatus={this.state.chatsIncomingObjectStatus}
                />
              )}
              <Typing
                status={!this.state.activeCategory && this.state.chatsIncomingObjectStatus}
              />
            </Feed>

            <EntryAdd
              persistReally={this.persistReally}
              entry={this.state.showAddEntry}
              isActive={this.state.isEntryAddActive}
              activeCategory={this.state.activeCategory}
            >
              <AddIcon
                onTap={this.handleToggleEntryAdd}
                isActive={this.state.isEntryAddActive}
                isVisible={this.state.activeCategory}
              />
            </EntryAdd>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Main)

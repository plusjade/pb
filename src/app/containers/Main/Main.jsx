import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import CategoryList from 'app/components/CategoryList/CategoryList'
import EntryAdd from 'app/components/EntryAdd/EntryAdd'
import Feed from 'app/components/Feed/Feed'
import Heading from 'app/components/Heading'
import FeedItemRenderer from 'app/components/FeedItemRenderer'
import AddIcon from 'app/components/AddIcon/AddIcon'
import OpacityMask from 'app/components/OpacityMask/OpacityMask'
import Typing from 'texting/components/Typing'

import style from './style'

class Main extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getFeed: PropTypes.func.isRequired,
    persist: PropTypes.func.isRequired,
  }

  state = {
    activeCategoryName: false,
    categoriesIndex: [],
    categoriesObjects: {},
    chatsIndex: [],
    chatsObjects: {},
    chatsCommands: undefined,
    // status: null, loading, loaded
    chatsIncomingObjectId: undefined,
    chatsIncomingObjectStatus: undefined,
    shouldShowCategoryList: false,
    shouldShowEntryAdd: false,
  }

  componentWillMount() {
    this.getCategories()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.activeCategoryName && this.state.categoriesIndex.length > 0 && prevState.categoriesIndex.length === 0) {
      // load first category on initial bootstrap
      if (this.state.categoriesIndex[0]) {
        this.activateCategory(this.state.categoriesIndex[0])
      }
    }

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

  getCategories() {
    this.props.getCategories().then((rsp) => { this.setState(rsp) })
  }

  getCategory = (name) => (
    this.state.categoriesObjects[name]
  )

  persist = (body, callback) => {
    if (!body.value || !body.value.trim() === "") { return }
    if (!this.state.activeCategoryName) {
      throw new Error("no activeCategory")
    }

    const payload = {...body, category: this.state.activeCategoryName}

    this.props.persist(payload).then((rsp) => {
      this.activateCategory(rsp.category)
      if (typeof callback === "function") {
        callback()
      }
    })
  }

  toggleCategoryList = () => {
    this.setState({
      shouldShowCategoryList: !this.state.shouldShowCategoryList,
    })
  }

  activateCategory = (categoryName) => {
    // todo: this belongs in the componentDidUpdate
    this.getFeed(categoryName)
    this.setState({
      activeCategoryName: categoryName,
      shouldShowCategoryList: false,
      shouldShowEntryAdd: false,
    })
  }

  toggleEntryAdd = () => {
    this.setState({shouldShowEntryAdd: !this.state.shouldShowEntryAdd})
  }

  handleOpacityMaskTap = () => {
    if (this.state.shouldShowEntryAdd) {
      this.toggleEntryAdd()
    } else if (this.state.shouldShowCategoryList) {
      this.toggleCategoryList()
    }
  }

  render() {
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
              value={"CATEGORIES"}
            />

            <CategoryList
              activeCategoryName={this.state.activeCategoryName}
              categoriesIndex={this.state.categoriesIndex || []}
              getCategory={this.getCategory}
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
            isActive={this.state.shouldShowEntryAdd || this.state.shouldShowCategoryList}
            onTap={this.handleOpacityMaskTap}
          />

          <div style={style.primary}>
            <Heading
              value={this.state.activeCategoryName && this.state.activeCategoryName.toUpperCase()}
              onTap={this.toggleCategoryList}
            />

            <Feed
              activateCategory={this.activateCategory}
              activeCategoryName={this.state.activeCategoryName}
              onSwipeRight={this.toggleCategoryList}
            >
              {this.state.activeCategoryName && (
                this.state.chatsIndex.map((id) => (
                  <FeedItemRenderer
                    key={id}
                    unit={this.state.chatsObjects[id]}
                    chatsIncomingObjectId={this.state.chatsIncomingObjectId}
                    chatsIncomingObjectStatus={this.state.chatsIncomingObjectStatus}
                  />
                ))
              )}

              <Typing
                status={this.state.chatsIncomingObjectStatus}
              />
            </Feed>

            <EntryAdd
              persist={this.persist}
              isActive={this.state.shouldShowEntryAdd}
              activeCategory={this.state.activeCategoryName}
            >
              <AddIcon
                onTap={this.toggleEntryAdd}
                isActive={!!this.state.shouldShowEntryAdd}
                isVisible={!this.state.shouldShowCategoryList}
              />
            </EntryAdd>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(Main)

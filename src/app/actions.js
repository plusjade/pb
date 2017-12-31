import { max } from "d3-array"

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com"
    : "http://localhost:4000"
)
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
const parseJSON = response => (response.json())
const buildUrl = path => (`${API_ENDPOINT}${path}`)

export const getCategories = () => (
  window.fetch(buildUrl("/trends"), {
    method: 'GET'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((rsp) => ({
    categories: rsp.categories
  }))
  .catch((error) => {
    console.log('request failed', error)
  })
)

export const getChats = () => (
  window.fetch(buildUrl("/chats"), {
    method: 'GET'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(rsp => (rsp))
  .catch((error) => {
    console.log('request failed', error)
  })
)
export const getFeed = (categoryName) => {
  return (
    window.fetch(buildUrl(`/feeds/${categoryName}`), {
      method: 'GET',
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((rsp) => ({
      feed: rsp.feed
    }))
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}

export const remove = id => (
  window.fetch(buildUrl(`/entries/${id}`), {
    method: 'DELETE'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => {
    console.log('request succeeded with JSON response', data)
  }).catch((error) => {
    console.log('request failed', error)
  })
)

export const persist = (body) => {
  const fdata = new FormData()
  if (body.ordinal) {
    fdata.append("ordinal", body.ordinal)
  }
  fdata.append("value", body.value)
  fdata.append("category", body.category)

  return (
    window.fetch(buildUrl("/entries"), {
      method: 'POST',
      body: fdata
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      console.log('request succeeded with JSON response', data)
    }).catch((error) => {
      console.log('request failed', error)
    })
  )
}

export const parseFeed = (feed, categoryFilter) => {
  let emptyDaysBatch = 0
  let emptyDaysBatchTotal = 0
  feed
  .slice(0)
  .reverse()
  .map((unit, index) => {
    if (unit.type === "day") {
      let foundIndex = - 1
      if (categoryFilter) {
        feed.find((day, i) => {
          if (day.type === "day" && day.categories.hasOwnProperty(categoryFilter)) {
            foundIndex = i
            return true
          } else {
            return false
          }
        })
      }
      unit.hasEntries = categoryFilter
              ? unit.categories.hasOwnProperty(categoryFilter)
              : Object.keys(unit.categories).length > 0
      unit.isVisible = categoryFilter
              ? index >= foundIndex
              : true

      if (unit.hasEntries) {
        emptyDaysBatch = 0
      } else {
        emptyDaysBatch += 1
      }

      unit.emptyDaysBatch = emptyDaysBatch
    }

    return unit
  })
  .reverse()
  .map((unit) => {
    if (unit.type === "day") {
      if (unit.emptyDaysBatch > 0) {
        if (emptyDaysBatchTotal < unit.emptyDaysBatch) {
          emptyDaysBatchTotal = unit.emptyDaysBatch
        }
        unit.emptyDaysBatchTotal = emptyDaysBatchTotal
      } else {
        emptyDaysBatchTotal = 0
      }

      if (emptyDaysBatchTotal > 3) {
        unit.isVisible = false
      }
    } else if (unit.type === "botEntry") {
      unit.isVisible = !categoryFilter
    }

    return unit
  })

  return feed
}

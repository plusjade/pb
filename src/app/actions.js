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

export const getPayload = () => (
  window.fetch(buildUrl("/trends"), {
    method: 'GET'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((rsp) => {
    const aggregrate = rsp.categories.reduce((memo, d) => (memo.concat(d.data)),[])
    return ({
      today: rsp.today,
      feed: rsp.feed,
      categories: rsp.categories,
      maxHealth: max(aggregrate, d => (d.health))
    })
  })
  .catch((error) => {
    console.log('request failed', error)
  })
)

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
  fdata.append("ordinal", body.ordinal)
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

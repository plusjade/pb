import QueryParams from 'lib/QueryParams'

const QParams = QueryParams()
const userId = parseInt(QParams.get("userId"), 10) || parseInt((Math.random() + "").substring(2,10), 10)
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
const buildUrl = path => (`${API_ENDPOINT}/v1/users/${userId}${path}`)

export const getCategories = () => (
  window.fetch(buildUrl("/categories"), {
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
    .then((rsp) => (rsp))
    .catch((error) => {
      console.log('request failed', error)
      return ({})
    })
  )
}

export const remove = id => (
  window.fetch(buildUrl(`/entries/${id}`), {
    method: 'DELETE'
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((rsp) => {
    console.log('request succeeded with JSON response', rsp)
    return (rsp)
  }).catch((error) => {
    console.log('request failed', error)
    return ({})
  })
)

export const persist = (body) => {
  const fdata = new FormData()
  if (body.ordinal) {
    fdata.append("ordinal", body.ordinal)
  }
  if (body.value) {
    fdata.append("value", body.value)
  }
  if (body.category) {
    fdata.append("category", body.category)
  }

  return (
    window.fetch(buildUrl("/entries"), {
      method: 'POST',
      body: fdata
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((rsp) => {
      console.log('request succeeded with JSON response', rsp)
      return (rsp)
    }).catch((error) => {
      console.log('request failed', error)
      return ({})
    })
  )
}

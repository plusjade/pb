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

export const user = (TOKEN) => {
  const buildUrl = path => (`${API_ENDPOINT}/v1${path}`)
  const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
  }
  const getCategories = () => (
    window.fetch(buildUrl("/categories"), {
      method: 'GET',
      headers: HEADERS,
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(rsp => (rsp))
    .catch((error) => {
      console.log('request failed', error)
    })
  )

  const getFeed = (categoryName) => {
    return (
      window.fetch(buildUrl(`/feeds/${categoryName}`), {
        method: 'GET',
        headers: HEADERS,
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

  const remove = id => (
    window.fetch(buildUrl(`/entries/${id}`), {
      method: 'DELETE',
      headers: HEADERS,
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

  const persist = (body) => {
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
        body: fdata,
        headers: HEADERS,
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

  return ({
    getCategories,
    getFeed,
    remove,
    persist,
  })
}

export default user

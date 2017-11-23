const DB = (apiEndpoint) => {

  function days() {
    return (
      window.fetch(buildUrl("/trends"), {
        method: 'GET'
      })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('request failed', error)
      })
    )
  }

  function remove(id) {
    return (
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
  }

  function persist(body) {
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

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function parseJSON(response) {
    return response.json()
  }

  function buildUrl(path) {
    return `${apiEndpoint}${path}`
  }

  return ({
    days: days,
    remove: remove,
    persist: persist,
  })
}

export default DB

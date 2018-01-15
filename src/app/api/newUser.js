import * as util from 'app/api/util'
import * as Storage from 'app/api/storage'

export const newUser = () => {
  const getChats = () => (
    window.fetch(util.buildUrl("/chats", {scat: Storage.get("scat")}), {
      method: 'GET',
    })
    .then(util.checkStatus)
    .then(util.parseJSON)
    .catch((error) => {
      console.log('request failed', error)
    })
  )

  return ({
    getChats,
  })
}

export default newUser

import * as util from 'app/api/util'

const CLIENT_ID = (
  process.env.NODE_ENV === 'production'
    ? "704999951282-12gkcc3dbcrshpq3sjjoeas7a8mbgd6o.apps.googleusercontent.com"
    : "704999951282-l2e5eer1eu35idbhhp7arn6eik4fvr3i.apps.googleusercontent.com"
)

export const serverAuth = ({provider, token}) => {
  const HEADERS = {
    "Authorization": `Bearer ${token}`
  }
  const fdata = new FormData()
  fdata.append("provider", provider)
  return (
    window.fetch(util.buildUrl("/users/auth"), {
      method: 'POST',
      body: fdata,
      headers: HEADERS,
    })
    .then(util.checkStatus)
    .then(util.parseJSON)
    .then(rsp => {
      Object.keys(rsp.user).forEach((key) => {
        if (rsp.user[key]) {
          window.localStorage.setItem(key, rsp.user[key])
        }
      })
      return rsp
    })
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}


export const googleSignIn = (callback) => {
  const bodyNode = document.body || document.getElementsByTagName("body")[0]
  if (bodyNode) {
    const meta = document.createElement("meta")
    const z = document.createElement("script")

    meta.setAttribute("name", "google-signin-client_id")
    meta.setAttribute("content", CLIENT_ID)
    bodyNode.appendChild(meta)

    z.type = "text/javascript"
    z.async = true
    z.defer = true
    z.src = "https://apis.google.com/js/platform.js"
    z.onload = () => {
      window.gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: (googleUser) => {
          window.googleUser = googleUser
          const token = googleUser.getAuthResponse().id_token
          callback(token)
        },
        onfailure: (error) => {
          console.log(error)
        },
      })
    }
    bodyNode.appendChild(z)
  }
}

export const googleSignOut = () => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signOut().then(() => {
    window.location.href = "/"
  })
}

import * as util from 'app/api/util'
import * as Storage from 'app/api/storage'

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
  const scat = Storage.get("scat")
  fdata.append("provider", provider)
  if (scat) {
    fdata.append("scat", scat)
  }

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
          Storage.set(key, rsp.user[key])
        }
      })
      return rsp
    })
    .catch((error) => {
      console.log('request failed', error)
    })
  )
}

// returns a Promise with google token arg if signed in, null if not.
export const googleBootstrapSession = () => (
  new Promise((resolve, reject) => {
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
        window.gapi.load('auth2', () => {
          const auth2 = window.gapi.auth2.init({
            client_id: CLIENT_ID,
          }).then((authInstance) => {
            const isSignedIn = authInstance.isSignedIn.get()
            if (isSignedIn) {
              const token = authInstance.currentUser.get().getAuthResponse().id_token
              resolve(token)
            } else {
              resolve()
            }
          })
        })
      }
      bodyNode.appendChild(z)
    } else {
      reject()
    }
  })
)

export const renderGoogleSignIn = () => (
  new Promise((resolve, reject) => {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: (googleUser) => {
        const token = googleUser.getAuthResponse().id_token
        resolve(token)
      },
      onfailure: (error) => {
        console.log(error)
      },
    })
  })
)

export const googleSignOut = () => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signOut().then(() => {
    window.location.href = "/"
  })
}

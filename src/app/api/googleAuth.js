const CLIENT_ID = (
  process.env.NODE_ENV === 'production'
    ? "704999951282-12gkcc3dbcrshpq3sjjoeas7a8mbgd6o.apps.googleusercontent.com"
    : "704999951282-l2e5eer1eu35idbhhp7arn6eik4fvr3i.apps.googleusercontent.com"
)

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
        onsuccess: callback,
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

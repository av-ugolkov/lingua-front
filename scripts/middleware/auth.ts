import router from '@/router'
import getBrowserFingerprint from '@/scripts/tools/get-browser-fingerprint'
import require from '@/scripts/require'

function refreshToken(
  next: (token: string | null, finger: string | null) => void,
  moveToMain?: boolean
) {
  let token = localStorage.getItem('access_token')
  if (token == null) {
    if (moveToMain) {
      router.push('/').catch((error) => {
        console.error(error.message)
      })
    }
    next(null, null)
    return
  }
  const payload = JSON.parse(atob(token.split('.')[1]))
  const exp = payload['exp']
  const dateNow = Date.now()
  const finger = getBrowserFingerprint() || 'no-fingerprint'
  if (dateNow > exp * 1000) {
    require('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Fingerprint: finger
      }
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          token = data.access_token
          localStorage.setItem('access_token', token || '')
          next('Bearer ' + token, finger)
        } else {
          localStorage.removeItem('access_token')
          console.error(data)
          router.push('/').catch((error) => {
            console.error(error.message)
          })
          next(null, null)
        }
      })
      .catch((error) => {
        localStorage.removeItem('access_token')
        console.error(error)
        router.push('/').catch((error) => {
          console.error(error.message)
        })
        next(null, null)
      })
  } else {
    next('Bearer ' + token, finger)
  }
}

export default refreshToken

import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function setAccessToken(token) {
  cookies.set('accessToken', token, { max: '1d' })
}

export function setRefreshToken(refreshToken) {
  cookies.set('refreshToken', refreshToken, { max: '15d' })
}

export function getAccessToken() {
  const accessToken = cookies.get('accessToken')

  return accessToken ?? null
}

export function getRefreshToken() {
  const refreshToken = cookies.get('refreshToken')

  return refreshToken ?? null
}

export function removeAllTokenFromCookies() {
  cookies.remove('accessToken')
  cookies.remove('refreshToken')
}

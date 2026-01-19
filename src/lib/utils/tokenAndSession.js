import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function setAccessToken(token) {
  cookies.set('accessToken', token, { max: '1d' })
}

export function setRefreshToken(refreshToken) {
  cookies.set('refreshToken', refreshToken, { max: '15d' })
}

export async function getAccessToken() {
  const accessToken = await cookies.get('accessToken')

  return accessToken ?? null
}

export async function getRefreshToken() {
  const refreshToken = await cookies.get('refreshToken')

  return refreshToken ?? null
}

export function removeAllTokenFromCookies() {
  cookies.remove('accessToken')
  cookies.remove('refreshToken')
}

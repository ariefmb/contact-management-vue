import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from './tokenAndSession'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  timeout: 30000,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()

    if (token?.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return createNewToken()
          .then((newToken) => {
            if (newToken) {
              error.config.headers.Authorization = `Bearer ${newToken}`
              return axiosInstance.request(error.config)
            }
          })
          .catch((refreshToken) => {
            console.error('Failed to refresh token', refreshToken)
            throw refreshToken
          })
      } else if (error.response.status === 403) {
        console.error('Forbidden access')
      } else if (error.response.status === 500) {
        console.error('Internal server error')
        throw error
      } else {
        console.error('Error response:', error.response.data)
      }
    } else if (error.request) {
      console.error('No response received', error.request)
    } else {
      console.error('Error setting up request', error.message)
    }

    return Promise.reject(error)
  },
)

async function createNewToken() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PATH}/api/users/current/refresh`,
      {
        refreshToken: await getRefreshToken().then((refreshToken) => refreshToken?.value),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const newToken = response.data.accessToken
    setAccessToken(newToken)
    return newToken
  } catch (error) {
    console.error('Failed to refresh token', error)
    throw error
  }
}

export default axiosInstance

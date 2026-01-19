import axiosInstance from '../utils/axios'

export const userRegister = async ({ username, password, name }) => {
  try {
    const response = await axiosInstance.post('/api/users', {
      username,
      password,
      name,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const userLogin = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post('/api/users/login', {
      username,
      password,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const userRefreshToken = async ({ refreshToken }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  })
}

export const userGet = async (accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}

export const userUpdateName = async (accessToken, { name }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      name,
    }),
  })
}

export const userUpdatePassword = async (accessToken, { password }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/current/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      password,
    }),
  })
}

export const userLogout = async () => {
  try {
    const response = await axiosInstance.post('/api/users/logout')
    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

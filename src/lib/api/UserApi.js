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

export const userRetrieveData = async () => {
  try {
    const response = await axiosInstance.get('/api/users/current')

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const userUpdateName = async ({ name }) => {
  try {
    const response = await axiosInstance.patch('/api/users/current/update', {
      name,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const userUpdatePassword = async ({ password }) => {
  try {
    const response = await axiosInstance.patch('/api/users/current/update', {
      password,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
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

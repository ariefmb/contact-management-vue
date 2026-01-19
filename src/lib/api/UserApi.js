export const userRegister = async ({ username, password, name }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      name,
    }),
  })
}

export const userLogin = async ({ username, password }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
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

export const userLogout = async (accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}

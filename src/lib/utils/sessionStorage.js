export function setUserDataInSessionStorage(user) {
  sessionStorage.setItem('user_data', JSON.stringify(user))
}

export function getUserDataFromSessionStorate() {
  const user = sessionStorage.getItem('user_data')

  return user ? JSON.parse(user) : null
}

export function removeUserDataFromSessionStorage() {
  sessionStorage.removeItem('user_data')
}

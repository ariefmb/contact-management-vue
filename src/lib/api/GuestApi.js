export const guestContatsList = async ({ name, email, phone, page }) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/guest/contacts`)
  if (name) url.searchParams.append('name', name)
  if (email) url.searchParams.append('email', email)
  if (phone) url.searchParams.append('phone', phone)
  if (page) url.searchParams.append('page', page)
  url.searchParams.append('size', 6)

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
}

export const guestContact = async (contactId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/guest/contacts/${contactId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export const guestAddressesList = async (contactId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/guest/contacts/${contactId}/addresses`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
}

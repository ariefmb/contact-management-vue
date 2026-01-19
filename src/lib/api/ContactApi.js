const addPrefixCountryCode = (phone) => {
  return `(+62) ${phone}`
}

export const contactCreate = async (accessToken, { first_name, last_name, email, phone }) => {
  phone = addPrefixCountryCode(phone)

  return await fetch(`${import.meta.env.VITE_API_PATH}/api/contacts/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      phone,
    }),
  })
}

export const contactGet = async (accessToken, contactId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}

export const contactGetList = async (accessToken, { name, email, phone, page }) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/api/contacts`)
  if (name) url.searchParams.append('name', name)
  if (email) url.searchParams.append('email', email)
  if (phone) url.searchParams.append('phone', phone)
  if (page) url.searchParams.append('page', page)
  url.searchParams.append('size', 5)

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}

export const contactUpdate = async (
  accessToken,
  contactId,
  { first_name, last_name, email, phone },
) => {
  phone = addPrefixCountryCode(phone)

  return await fetch(`${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      phone,
    }),
  })
}

export const contactRemove = async (accessToken, contactsId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/contacts/${contactsId}/remove`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken,
    },
  })
}

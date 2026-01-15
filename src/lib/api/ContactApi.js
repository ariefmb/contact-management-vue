const addPrefixCountryCode = (phone) => {
  return `(+62) ${phone}`
}

export const contactCreate = async (token, { first_name, last_name, email, phone }) => {
  phone = addPrefixCountryCode(phone)

  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      phone,
    }),
  })
}

export const contactGet = async (token, contactId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
  })
}

export const contactGetList = async (token, { name, email, phone, page }) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`)
  if (name) url.searchParams.append('name', name)
  if (email) url.searchParams.append('email', email)
  if (phone) url.searchParams.append('phone', phone)
  if (page) url.searchParams.append('page', page)
  url.searchParams.append('size', 5)

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  })
}

export const contactUpdate = async (token, contactId, { first_name, last_name, email, phone }) => {
  phone = addPrefixCountryCode(phone)

  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      phone,
    }),
  })
}

export const contactRemove = async (token, contactsId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactsId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })
}

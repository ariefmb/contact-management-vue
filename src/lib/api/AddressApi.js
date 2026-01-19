export const addressAdd = async (
  accessToken,
  contactId,
  { title, street, city, province, country, postal_code },
) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/addresses/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        title,
        street,
        city,
        province,
        country,
        postal_code,
      }),
    },
  )
}

export const addressesList = async (accessToken, contactId) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/addresses`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}

export const addressDetail = async (accessToken, contactId, addressId) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/addresses/${addressId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken,
      },
    },
  )
}

export const addressEdit = async (
  accessToken,
  contactId,
  addressId,
  { title, street, city, province, country, postal_code },
) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/addresses/${addressId}/update`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        title,
        street,
        city,
        province,
        country,
        postal_code,
      }),
    },
  )
}

export const addressRemove = async (accessToken, contactId, addressId) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/api/contacts/${contactId}/addresses/${addressId}/remove`,
    {
      method: 'DELETE',
      headers: {
        Authorization: accessToken,
      },
    },
  )
}

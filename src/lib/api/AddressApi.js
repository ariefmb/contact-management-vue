import axiosInstance from '../utils/axios'

export const addressAdd = async (
  contactId,
  { title, street, city, province, country, postal_code },
) => {
  try {
    const response = await axiosInstance.post(`/api/contacts/${contactId}/addresses/create`, {
      title,
      street,
      city,
      province,
      country,
      postal_code,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const addressesRetrieveDatas = async (contactId) => {
  try {
    const response = await axiosInstance.get(`/api/contacts/${contactId}/addresses`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const addressDetail = async (contactId, addressId) => {
  try {
    const response = await axiosInstance.get(`/api/contacts/${contactId}/addresses/${addressId}`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const addressEdit = async (
  contactId,
  addressId,
  { title, street, city, province, country, postal_code },
) => {
  try {
    const response = await axiosInstance.put(
      `/api/contacts/${contactId}/addresses/${addressId}/update`,
      {
        title,
        street,
        city,
        province,
        country,
        postal_code,
      },
    )

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const addressRemove = async (contactId, addressId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/contacts/${contactId}/addresses/${addressId}/remove`,
    )

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

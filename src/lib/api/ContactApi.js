import axiosInstance from '../utils/axios'

const addPrefixCountryCode = (phone) => {
  return `(+62) ${phone}`
}

export const contactCreate = async ({ first_name, last_name, email, phone }) => {
  try {
    phone = addPrefixCountryCode(phone)

    const response = await axiosInstance.post('/api/contacts/create', {
      first_name,
      last_name,
      email,
      phone,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const contactRetrieveData = async (contactId) => {
  try {
    const response = await axiosInstance.get(`/api/contacts/${contactId}`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const contactRetrieveAllDatas = async ({ name, email, phone, page }) => {
  try {
    const params = {}
    if (name) params.name = name
    if (email) params.email = email
    if (phone) params.phone = phone
    if (page) params.page = page
    params.size = 5

    const response = await axiosInstance.get('/api/contacts', { params })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const contactUpdate = async (contactId, { first_name, last_name, email, phone }) => {
  try {
    phone = addPrefixCountryCode(phone)

    const response = await axiosInstance.put(`/api/contacts/${contactId}/update`, {
      first_name,
      last_name,
      email,
      phone,
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const contactRemove = async (contactsId) => {
  try {
    const response = await axiosInstance.delete(`/api/contacts/${contactsId}/remove`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

import axiosInstance from '../utils/axios'

export const guestRetrieveAllContactDatas = async ({ name, email, phone, page }) => {
  try {
    let params = {}
    if (name) params.name = name
    if (email) params.email = email
    if (phone) params.phone = phone
    if (page) params.page = page
    params.size = 6

    const response = await axiosInstance.get('/api/guest/contacts', { params })

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const guestRetrieveContactData = async (contactId) => {
  try {
    const response = await axiosInstance.get(`/api/guest/contacts/${contactId}`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

export const guestRetrieveAddressDatas = async (contactId) => {
  try {
    const response = await axiosInstance.get(`/api/guest/contacts/${contactId}/addresses`)

    return response.data
  } catch (error) {
    if (error.response && error.response.data) return error.response.data
    throw error
  }
}

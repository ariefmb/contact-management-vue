<script setup>
import { contactRetrieveData, contactUpdate } from '@/lib/api/ContactApi'
import { alertError, alertSuccess } from '@/lib/utils/alert'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isLoading = ref(false)
const isFetchingContactData = ref(false)
const route = useRoute()
const router = useRouter()
const contactId = route.params.contactId

const contact = reactive({
  id: contactId,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const fetchDetailContact = async () => {
  try {
    isFetchingContactData.value = true

    const response = await contactRetrieveData(contactId)

    if (!response.status) {
      await alertError(response.errors)
      return
    }

    Object.assign(contact, {
      id: response.data.id,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      phone: response.data.phone.replace('(+62) ', ''),
    })
  } catch (error) {
    console.error(error.message)
  } finally {
    isFetchingContactData.value = false
  }
}

onBeforeMount(async () => {
  await fetchDetailContact()
})

const handleEditContact = async () => {
  isLoading.value = true
  try {
    const response = await contactUpdate(contactId, contact)

    if (!response.status) {
      await alertError(response.errors)
      return
    }

    await alertSuccess('Successfully edit contact data')
    router.push({
      path: '/dashboard/contacts',
    })
  } catch (error) {
    console.error(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center mb-6">
    <button
      @click="router.back()"
      class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200 cursor-pointer"
    >
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </button>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-user-edit text-blue-400 mr-3"></i> Edit Contact
    </h1>
  </div>

  <div
    class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
  >
    <div class="p-8">
      <form @submit.prevent="handleEditContact">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label for="first_name" class="block text-gray-300 text-sm font-medium mb-2"
              >First Name</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input
                type="text"
                id="first_name"
                name="first_name"
                :class="[
                  isFetchingContactData ? 'opacity-50 cursor-not-allowed' : 'opacity-100',
                  'w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
                ]"
                placeholder="Enter first name"
                required
                :disabled="isFetchingContactData"
                v-model="contact.first_name"
              />
            </div>
          </div>
          <div>
            <label for="last_name" class="block text-gray-300 text-sm font-medium mb-2"
              >Last Name</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input
                type="text"
                id="last_name"
                name="last_name"
                :class="[
                  isFetchingContactData ? 'opacity-50 cursor-not-allowed' : 'opacity-100',
                  'w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
                ]"
                placeholder="Enter last name"
                required
                :disabled="isFetchingContactData"
                v-model="contact.last_name"
              />
            </div>
          </div>
        </div>

        <div class="mb-5">
          <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-500"></i>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              :class="[
                isFetchingContactData ? 'opacity-50 cursor-not-allowed' : 'opacity-100',
                'w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
              ]"
              placeholder="Enter email address"
              required
              :disabled="isFetchingContactData"
              v-model="contact.email"
            />
          </div>
        </div>

        <div class="mb-6">
          <label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex gap-2 items-center pointer-events-none">
              <i class="fas fa-phone text-gray-500"></i>
              <p class="text-gray-500 font-bold">| +62</p>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              :class="[
                isFetchingContactData ? 'opacity-50 cursor-not-allowed' : 'opacity-100',
                'w-full pl-20 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
              ]"
              placeholder="Enter phone number"
              required
              :disabled="isFetchingContactData"
              v-model="contact.phone"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="router.back()"
            class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md cursor-pointer"
          >
            <i class="fas fa-times mr-2"></i> Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center cursor-pointer"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="mr-3 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
            <span v-else> <i class="fas fa-save mr-2"></i> Save Changes </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

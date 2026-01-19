<script setup>
import { addressAdd } from '@/lib/api/AddressApi'
import { contactRetrieveData } from '@/lib/api/ContactApi'
import { alertError, alertSuccess } from '@/lib/utils/alert'
import { useLocalStorage } from '@vueuse/core'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const options = ref([
  {
    text: 'Select your address type',
    value: '',
    disabled: true,
  },
  {
    text: 'Home Address',
    value: 'Home Address',
    disabled: false,
  },
  {
    text: 'Work Address',
    value: 'Work Address',
    disabled: false,
  },
])

const icons = ref([
  { title: '', icon: '<i class="fas fa-road text-gray-500"></i>' },
  { title: 'Home Address', icon: '<i class="fas fa-home text-gray-500"></i>' },
  { title: 'Work Address', icon: '<i class="fas fa-building text-gray-500"></i>' },
])

const isLoading = ref(false)
const isFetchingContactData = ref(false)
const route = useRoute()
const router = useRouter()

const accessToken = useLocalStorage('accessToken', '')
const contactId = route.params.contactId

const contact = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const fetchContactData = async () => {
  try {
    isFetchingContactData.value = true

    const response = await contactRetrieveData(accessToken.value, contactId)
    const responseBody = await response.json()

    if (response.status !== 200) {
      await alertError(responseBody.errors)
      return
    }

    Object.assign(contact, {
      first_name: responseBody.data.first_name,
      last_name: responseBody.data.last_name,
      email: responseBody.data.email,
      phone: responseBody.data.phone,
    })
  } catch (error) {
    console.error(error.message)
  } finally {
    isFetchingContactData.value = false
  }
}

onBeforeMount(async () => {
  await fetchContactData()
})

const address = reactive({
  title: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postal_code: '',
})

const handleAddAddress = async () => {
  try {
    isLoading.value = true

    const response = await addressAdd(accessToken.value, contactId, address)
    const responseBody = await response.json()

    if (response.status !== 200) {
      await alertError(responseBody.errors)
      return
    }

    await alertSuccess('Successfully add new address')
    router.push({
      path: `/dashboard/contacts/${contactId}`,
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
    <RouterLink
      :to="`/dashboard/contacts/${contactId}`"
      class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
    >
      <i class="fas fa-arrow-left mr-2"></i> Back to Contact Details
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-plus-circle text-blue-400 mr-3"></i> Add New Address
    </h1>
  </div>

  <div
    class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
  >
    <div class="p-8">
      <!-- Contact Information -->
      <div class="mb-6 pb-6 border-b border-gray-700">
        <div class="flex items-center">
          <div
            class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md"
          >
            <i class="fas fa-user text-white"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white">
              {{ contact.first_name }} {{ contact.last_name }}
            </h2>
            <p class="text-gray-300 text-sm">{{ contact.email }} • {{ contact.phone }}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleAddAddress">
        <div class="mb-5">
          <label for="title" class="block text-gray-300 text-sm font-medium mb-2">Title</label>
          <div class="relative">
            <template v-for="(icon, index) in icons" :key="index">
              <div
                v-if="address.title === icon.title"
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span v-html="icon.icon"></span>
              </div>
            </template>
            <select
              id="title"
              name="title"
              class="w-full pl-10 pr-20 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your address type"
              required
              v-model="address.title"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :disabled="option.disabled"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-5">
          <label for="street" class="block text-gray-300 text-sm font-medium mb-2">Street</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-road text-gray-500"></i>
            </div>
            <input
              type="text"
              id="street"
              name="street"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter street address"
              required
              v-model="address.street"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label for="city" class="block text-gray-300 text-sm font-medium mb-2">City</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-city text-gray-500"></i>
              </div>
              <input
                type="text"
                id="city"
                name="city"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter city"
                required
                v-model="address.city"
              />
            </div>
          </div>
          <div>
            <label for="province" class="block text-gray-300 text-sm font-medium mb-2"
              >Province/State</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-map text-gray-500"></i>
              </div>
              <input
                type="text"
                id="province"
                name="province"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter province or state"
                required
                v-model="address.province"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label for="country" class="block text-gray-300 text-sm font-medium mb-2"
              >Country</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-flag text-gray-500"></i>
              </div>
              <input
                type="text"
                id="country"
                name="country"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter country"
                required
                v-model="address.country"
              />
            </div>
          </div>
          <div>
            <label for="postal_code" class="block text-gray-300 text-sm font-medium mb-2"
              >Postal Code</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-mail-bulk text-gray-500"></i>
              </div>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter postal code"
                required
                v-model="address.postal_code"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="router.back()"
            class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
          >
            <i class="fas fa-times mr-2"></i> Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
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
              Add new address...
            </span>
            <span v-else> <i class="fas fa-plus-circle mr-2"></i> Add Address </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

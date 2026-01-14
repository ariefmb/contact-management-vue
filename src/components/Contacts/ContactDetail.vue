<script setup>
import { alertError } from '@/lib/alert'
import { contactGet } from '@/lib/api/ContactApi'
import { useLocalStorage } from '@vueuse/core'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const token = useLocalStorage('token', '')
const contactId = route.params.contactId

const contact = ref({
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const fetchDetailContact = async () => {
  const response = await contactGet(token.value, contactId)
  const responseBody = await response.json()

  if (response.status === 200) {
    contact.value = responseBody.data
  } else {
    await alertError(responseBody.errors)
  }
}

onBeforeMount(async () => await fetchDetailContact())
</script>

<template>
  <div class="flex items-center mb-6">
    <RouterLink
      to="/dashboard/contacts"
      class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
    >
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-id-card text-blue-400 mr-3"></i> Contact Details
    </h1>
  </div>

  <div
    class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
  >
    <div class="p-8">
      <!-- Contact Header -->
      <div class="mb-8 text-center">
        <div
          class="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg"
        >
          <i class="fas fa-user text-3xl text-white"></i>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">
          {{ contact.first_name }} {{ contact.last_name }}
        </h2>
        <div class="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-5 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
          >
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-blue-400 mr-2"></i>
              <h3 class="text-gray-300 text-sm font-medium">First Name</h3>
            </div>
            <p class="text-white text-lg ml-6">{{ contact.first_name }}</p>
          </div>
          <div
            class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
          >
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-blue-400 mr-2"></i>
              <h3 class="text-gray-300 text-sm font-medium">Last Name</h3>
            </div>
            <p class="text-white text-lg ml-6">{{ contact.last_name }}</p>
          </div>
        </div>

        <div
          class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
        >
          <div class="flex items-center mb-2">
            <i class="fas fa-envelope text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">Email</h3>
          </div>
          <p class="text-white text-lg ml-6">{{ contact.email }}</p>
        </div>

        <div
          class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
        >
          <div class="flex items-center mb-2">
            <i class="fas fa-phone text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">Phone</h3>
          </div>
          <p class="text-white text-lg ml-6">{{ contact.phone }}</p>
        </div>
      </div>

      <!-- Addresses Section -->
      <RouterView />

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <RouterLink
          to="/dashboard/contacts"
          class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
        >
          <i class="fas fa-arrow-left mr-2"></i> Back
        </RouterLink>
        <RouterLink
          :to="`/dashboard/contacts/${contactId}/edit`"
          class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
        >
          <i class="fas fa-user-edit mr-2"></i> Edit Contact
        </RouterLink>
      </div>
    </div>
  </div>
</template>

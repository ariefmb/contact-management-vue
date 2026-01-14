<script setup>
import { alertConfirm, alertError, alertSuccess } from '@/lib/alert'
import { addressesList, addressRemove } from '@/lib/api/AddressApi'
import { useLocalStorage } from '@vueuse/core'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const icons = ref([
  {
    title: 'Home Address',
    icon: '<i class="fas fa-home text-white"></i>',
    backgrounColor: 'bg-blue-500',
  },
  {
    title: 'Work Address',
    icon: '<i class="fas fa-building text-white"></i>',
    backgrounColor: 'bg-purple-500',
  },
])

const isLoading = ref(false)

const route = useRoute()
const router = useRouter()

const token = useLocalStorage('token', '')
const contactId = route.params.contactId

const addresses = ref([])

const handleRemoveAddress = async (addressId) => {
  await alertConfirm('This address will be remove!', 'Yes, remove it').then(async (result) => {
    if (result.isConfirmed) {
      const response = await addressRemove(token.value, contactId, addressId)
      const responseBody = await response.json()

      if (response.status === 200) {
        await alertSuccess('Successfully remove address')
        router.go()
      } else {
        await alertError(responseBody.errors)
      }
    }
  })
}

const fetchAddressesList = async () => {
  try {
    if (!token.value) return

    isLoading.value = true
    const response = await addressesList(token.value, contactId)
    const responseBody = await response.json()

    if (response.status !== 200) {
      return await alertError(responseBody.errors)
    }

    addresses.value = responseBody.data

    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  } catch (error) {
    console.info(error.message)
  }
}

onBeforeMount(async () => {
  await fetchAddressesList()
})
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center mb-5">
      <i class="fas fa-map-marker-alt text-blue-400 mr-3"></i>
      <h3 class="text-xl font-semibold text-white">Addresses</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Add Address Card -->
      <div
        class="bg-gray-700 bg-opacity-50 p-20 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover"
      >
        <RouterLink :to="`/dashboard/contacts/${contactId}/addresses/add`" class="block h-full">
          <div class="flex flex-col items-center justify-center h-full text-center py-4">
            <div
              class="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
            >
              <i class="fas fa-plus text-2xl text-white"></i>
            </div>
            <h4 class="text-lg font-semibold text-white">Add Address</h4>
          </div>
        </RouterLink>
      </div>

      <!-- Address Card -->
      <template v-if="isLoading">
        <div
          class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
        >
          <div class="flex items-center mb-3">
            <div
              class="bg-gray-500 w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md"
            >
              <i class="fas fa-home text-white"></i>
            </div>
            <h4 class="text-lg font-semibold text-white"></h4>
          </div>
          <div class="space-y-3 text-gray-300 ml-2 mb-4">
            <p class="flex items-center">
              <i class="fas fa-road text-gray-500 w-6"></i>
              <span class="font-medium w-24">Street</span>
              <span class="mr-1">:</span>
              <span></span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-city text-gray-500 w-6"></i>
              <span class="font-medium w-24">City</span>
              <span class="mr-1">:</span>
              <span></span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-map text-gray-500 w-6"></i>
              <span class="font-medium w-24">Province</span>
              <span class="mr-1">:</span>
              <span></span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-flag text-gray-500 w-6"></i>
              <span class="font-medium w-24">Country</span>
              <span class="mr-1">:</span>
              <span></span>
            </p>
            <p class="flex items-center">
              <i class="fa-solid fa-envelope text-gray-500 w-6"></i>
              <span class="font-medium w-24">Postal Code</span>
              <span class="mr-1">:</span>
              <span></span>
            </p>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              disabled
              class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-pointer"
            >
              <i class="fas fa-edit mr-2"></i> Edit
            </button>
            <button
              disabled
              class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-pointer"
            >
              <i class="fas fa-trash-alt mr-2"></i> Delete
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <template v-if="addresses.length !== 0">
          <div
            v-for="address in addresses"
            :key="address.id"
            class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
          >
            <template v-for="(icon, index) in icons" :key="index">
              <div v-if="address.title === icon.title" class="flex items-center mb-3">
                <div
                  :class="`${icon.backgrounColor} w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md`"
                >
                  <span v-html="icon.icon"></span>
                </div>
                <h4 class="text-lg font-semibold text-white">{{ address.title }}</h4>
              </div>
            </template>
            <div class="space-y-3 text-gray-300 ml-2 mb-4">
              <p class="flex items-center">
                <i class="fas fa-road text-gray-500 w-6"></i>
                <span class="font-medium w-24">Street</span>
                <span class="mr-1">:</span>
                <span>{{ address.street }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-city text-gray-500 w-6"></i>
                <span class="font-medium w-24">City</span>
                <span class="mr-1">:</span>
                <span>{{ address.city }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-map text-gray-500 w-6"></i>
                <span class="font-medium w-24">Province</span>
                <span class="mr-1">:</span>
                <span>{{ address.province }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-flag text-gray-500 w-6"></i>
                <span class="font-medium w-24">Country</span>
                <span class="mr-1">:</span>
                <span>{{ address.country }}</span>
              </p>
              <p class="flex items-center">
                <i class="fa-solid fa-envelope text-gray-500 w-6"></i>
                <span class="font-medium w-24">Postal Code</span>
                <span class="mr-1">:</span>
                <span>{{ address.postal_code }}</span>
              </p>
            </div>
            <div class="flex justify-end space-x-3">
              <RouterLink
                :to="`/dashboard/contacts/${contactId}/addresses/${address.id}/edit`"
                class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-pointer"
              >
                <i class="fas fa-edit mr-2"></i> Edit
              </RouterLink>
              <button
                @click="handleRemoveAddress(address.id)"
                class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center cursor-pointer"
              >
                <i class="fas fa-trash-alt mr-2"></i> Delete
              </button>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

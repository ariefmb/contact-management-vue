<script setup>
import { guestRetrieveAddressDatas } from '@/lib/api/GuestApi'
import { alertError } from '@/lib/utils/alert'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

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
const contactId = route.params.contactId
const addresses = ref([])

const fetchAddressesList = async () => {
  try {
    isLoading.value = true
    const response = await guestRetrieveAddressDatas(contactId)

    if (!response.status) {
      await alertError(response.errors)
      return
    }

    addresses.value = response.data

    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  } catch (error) {
    console.error(error.message)
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
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

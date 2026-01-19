<script setup>
import { alertError } from '@/lib/utils/alert'
import { guestRetrieveAllContactDatas } from '@/lib/api/GuestApi'
import { useUrlSearchParams } from '@vueuse/core'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isSearching = ref(false)
const isLoading = ref(false)
const searchParams = useUrlSearchParams()
const router = useRouter()

const search = reactive({
  name: searchParams.name,
  email: searchParams.email,
  phone: searchParams.phone,
})

const page = ref(1)
const totalPage = ref(1)
const pages = ref([1])

const contacts = ref([])

watch(totalPage, (value) => {
  const data = []
  for (let i = 1; i <= value; i++) {
    data.push(i)
  }
  pages.value = data
})

const fetchContactsList = async () => {
  try {
    const response = await guestRetrieveAllContactDatas({
      name: search.name,
      email: search.email,
      phone: search.phone,
      page: page.value,
    })

    if (!response.status) {
      await alertError(response.errors)
      return
    }

    contacts.value = response.data
    totalPage.value = response.paging.total_page
  } catch (error) {
    console.error(error.message)
  }
}

const handleChangePage = async (value) => {
  page.value = value
  await fetchContactsList()
}

const handleSearch = async () => {
  try {
    isSearching.value = true
    isLoading.value = true

    page.value = 1
    await fetchContactsList()

    const query = {}
    if (search.name) query.name = search.name
    if (search.email) query.email = search.email
    if (search.phone) query.phone = search.phone

    router.push({
      query,
    })
  } catch (error) {
    console.error(error.message)
  } finally {
    isSearching.value = false
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  isLoading.value = true
  await fetchContactsList()
  isLoading.value = false
})

onMounted(() => {
  const toggleButton = document.getElementById('toggleSearchForm')
  const searchFormContent = document.getElementById('searchFormContent')
  const toggleIcon = document.getElementById('toggleSearchIcon')

  searchFormContent.style.transition =
    'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out'
  searchFormContent.style.overflow = 'hidden'
  searchFormContent.style.maxHeight = '0px'
  searchFormContent.style.opacity = '0'
  searchFormContent.style.marginTop = '0'

  toggleButton.addEventListener('click', function () {
    if (searchFormContent.style.maxHeight !== '0px') {
      searchFormContent.style.maxHeight = '0px'
      searchFormContent.style.opacity = '0'
      searchFormContent.style.marginTop = '0'
      toggleIcon.classList.remove('fa-chevron-up')
      toggleIcon.classList.add('fa-chevron-down')
    } else {
      searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px'
      searchFormContent.style.opacity = '1'
      searchFormContent.style.marginTop = '1rem'
      toggleIcon.classList.remove('fa-chevron-down')
      toggleIcon.classList.add('fa-chevron-up')
    }
  })
})
</script>

<template>
  <div class="flex items-center mb-6">
    <i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold text-white">My Contacts</h1>
  </div>

  <!-- Search form -->
  <div
    class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in"
  >
    <div id="toggleSearchForm" class="flex items-center justify-between mb-4 cursor-pointer">
      <div class="flex items-center">
        <i class="fas fa-search text-blue-400 mr-3"></i>
        <h2 class="text-xl font-semibold text-white">Search Contacts</h2>
      </div>
      <button
        type="button"
        class="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200 cursor-pointer"
      >
        <i class="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
      </button>
    </div>
    <div id="searchFormContent" class="mt-4">
      <form @submit.prevent="handleSearch">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label for="name" class="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-500"></i>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by name"
                v-model.lazy="search.name"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-500"></i>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by email"
                v-model.lazy="search.email"
              />
            </div>
          </div>
          <div>
            <label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-phone text-gray-500"></i>
              </div>
              <input
                type="text"
                id="phone"
                name="phone"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by phone"
                v-model.lazy="search.phone"
              />
            </div>
          </div>
        </div>
        <div class="mt-5 text-right">
          <button
            type="submit"
            class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
            :disabled="isSearching"
          >
            <span v-if="isSearching" class="flex items-center justify-center">
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
              Searching...
            </span>
            <span v-else> <i class="fas fa-search mr-2"></i> Search </span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Contact cards grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Contact Card -->
    <template v-if="contacts.length !== 0">
      <div
        class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
        v-for="contact in contacts"
        :key="contact.id"
      >
        <div class="p-6">
          <RouterLink
            :to="`/guest/contacts/${contact.id}`"
            class="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
              >
                <i class="fas fa-user text-white"></i>
              </div>
              <h2
                class="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200"
              >
                {{ contact.first_name }} {{ contact.last_name }}
              </h2>
            </div>
            <div class="space-y-3 text-gray-300 ml-2">
              <p class="flex items-center">
                <i class="fas fa-user-tag text-gray-500 w-6"></i>
                <span class="font-medium w-24">First Name:</span>
                <span>{{}}</span>
                <span>{{ contact.first_name }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-user-tag text-gray-500 w-6"></i>
                <span class="font-medium w-24">Last Name:</span>
                <span>{{ contact.last_name }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-envelope text-gray-500 w-6"></i>
                <span class="font-medium w-24">Email:</span>
                <span>{{ contact.email }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-phone text-gray-500 w-6"></i>
                <span class="font-medium w-24">Phone:</span>
                <span>{{ contact.phone }}</span>
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </template>
  </div>

  <!-- Pagination -->
  <div class="mt-10 flex justify-center">
    <nav
      class="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in"
    >
      <template v-if="isLoading">
        <div
          class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 cursor-not-allowed"
        >
          1
        </div>
        <div
          class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 cursor-not-allowed"
        >
          ...
        </div>
      </template>

      <template v-else>
        <button
          @click="handleChangePage(page - 1)"
          class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center cursor-pointer"
          v-if="page > 1"
        >
          <i class="fas fa-chevron-left mr-2"></i> Previous
        </button>
        <button
          v-for="(value, index) in pages"
          :key="index"
          @click="handleChangePage(value)"
          :class="[
            page === value
              ? 'px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md cursor-pointer'
              : 'px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 cursor-pointer',
          ]"
        >
          {{ value }}
        </button>
        <button
          @click="handleChangePage(page + 1)"
          class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center cursor-pointer"
          v-if="page < totalPage"
        >
          Next <i class="fas fa-chevron-right ml-2"></i>
        </button>
      </template>
    </nav>
  </div>
</template>

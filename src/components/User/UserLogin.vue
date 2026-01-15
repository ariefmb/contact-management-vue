<script setup>
import { alertError, alertSuccess } from '@/lib/alert'
import { userLogin } from '@/lib/api/UserApi'
import { useLocalStorage } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)

const router = useRouter()
const token = useLocalStorage('token', '')

const user = reactive({
  username: 'dubi',
  password: 'pw123',
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    const response = await userLogin(user)
    const responseBody = await response.json()

    if (response.status !== 200) {
      await alertError(responseBody.errors)
      return
    }

    token.value = responseBody.data.token
    await alertSuccess(`Welcome back, ${user.username}`)

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
  <div class="w-full mt-32 flex flex-col items-center justify-center">
    <div
      class="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md"
    >
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-gradient rounded-full mb-4">
          <i class="fas fa-address-book text-3xl text-white"></i>
        </div>
        <h1 class="text-3xl font-bold text-white">Contact Management</h1>
        <p class="text-gray-300 mt-2">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="username" class="block text-gray-300 text-sm font-medium mb-2"
            >Username</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-user text-gray-500"></i>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your username"
              required
              v-model="user.username"
            />
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-300 text-sm font-medium mb-2"
            >Password</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-500"></i>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
              required
              v-model="user.password"
            />
          </div>
        </div>

        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
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
              Processing...
            </span>
            <span v-else> <i class="fas fa-sign-in-alt mr-2"></i> Sign In </span>
          </button>
        </div>

        <div class="text-center text-sm text-gray-400">
          Don't have an account?
          <RouterLink
            to="/register"
            class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

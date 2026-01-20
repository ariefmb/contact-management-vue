<script setup>
import { userRetrieveData, userUpdateName, userUpdatePassword } from '@/lib/api/UserApi'
import { alertError, alertSuccess } from '@/lib/utils/alert'
import { ref, watchEffect } from 'vue'

const name = ref('')
const password = ref('')
const confirmPassword = ref('')

const isFetching = ref(false)
const isUpdatingName = ref(false)
const isUpdatingPass = ref(false)

watchEffect(async () => {
  isFetching.value = true
  try {
    const response = await userRetrieveData()

    if (!response.status) {
      await alertError(response.errors)
      return
    }

    name.value = response.data.name
  } catch (error) {
    console.error(error)
  } finally {
    isFetching.value = false
  }
})

const handleUpdateName = async () => {
  try {
    isUpdatingName.value = true

    const response = await userUpdateName({ name: name.value })

    if (!response.status) {
      await alertError(response.erros)
      return
    }

    await alertSuccess('Update Name Successfully')
  } catch (error) {
    console.error(error.message)
  } finally {
    isUpdatingName.value = false
  }
}

const handleUpdatePassword = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      await alertError('Password does not match')
      return
    }

    isUpdatingPass.value = true

    const response = await userUpdatePassword({ password: password.value })

    if (!response.status) {
      await alertError(response.erros)
      return
    }

    password.value = ''
    confirmPassword.value = ''

    await alertSuccess('Update Password Successfully')
  } catch (error) {
    console.error(error.message)
  } finally {
    isUpdatingPass.value = false
  }
}
</script>

<template>
  <div class="flex items-center mb-6">
    <i class="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold text-white">My Profile</h1>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Form 1: Edit Name -->
    <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
    >
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div
            class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
          >
            <i class="fas fa-user-edit text-white"></i>
          </div>
          <h2 class="text-xl font-semibold text-white">Edit Profile</h2>
        </div>
        <form @submit.prevent="handleUpdateName">
          <div class="mb-5">
            <label for="name" class="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-500"></i>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                :class="[isFetching ? 'opacity-50 cursor-not-allowed' : 'opacity-100', 'w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200']"
                placeholder="Enter your full name"
                required
                v-model="name"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer"
              :disabled="isUpdatingName"
            >
              <span v-if="isUpdatingName" class="flex items-center justify-center">
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
                Updating Profile...
              </span>
              <span v-else> <i class="fas fa-save mr-2"></i> Update Profile </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Form 2: Edit Password -->
    <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
    >
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div
            class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md"
          >
            <i class="fas fa-key text-white"></i>
          </div>
          <h2 class="text-xl font-semibold text-white">Change Password</h2>
        </div>
        <form @submit.prevent="handleUpdatePassword">
          <div class="mb-5">
            <label for="new_password" class="block text-gray-300 text-sm font-medium mb-2"
              >New Password</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-500"></i>
              </div>
              <input
                type="password"
                id="new_password"
                name="new_password"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your new password"
                required
                v-model="password"
              />
            </div>
          </div>

          <div class="mb-5">
            <label for="confirm_password" class="block text-gray-300 text-sm font-medium mb-2"
              >Confirm New Password</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-check-double text-gray-500"></i>
              </div>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Confirm your new password"
                required
                v-model="confirmPassword"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer"
              :disabled="isUpdatingPass"
            >
              <span v-if="isUpdatingPass" class="flex items-center justify-center">
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
                Updating Password...
              </span>
              <span v-else> <i class="fas fa-key mr-2"></i> Update Password </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

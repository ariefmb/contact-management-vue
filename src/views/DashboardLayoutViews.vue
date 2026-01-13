<script setup>
import { alertConfirm, alertError } from '@/lib/alert'
import { userLogout } from '@/lib/api/UserApi'
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

const token = useLocalStorage('token', '')
const router = useRouter()

const handleLogoutButton = async () => {
  await alertConfirm('You will be logout from the app!', 'Yes, Log me out').then(async (result) => {
    if (result.isConfirmed) {
      const response = await userLogout(token.value)
      const responseBody = await response.json()

      if (response.status === 200) {
        token.value = ''
        router.push({
          path: '/login',
        })
      } else {
        await alertError(responseBody.errors)
      }
    }
  })
}
</script>

<template>
  <div class="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
    <!-- Header with right-aligned menu -->
    <header class="bg-gradient shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink
          to="/dashboard/contacts"
          class="flex items-center hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fas fa-address-book text-white text-2xl mr-3"></i>
          <div class="text-white font-bold text-xl">Contact Management</div>
        </RouterLink>
        <nav>
          <ul class="flex space-x-6">
            <li>
              <RouterLink
                to="/dashboard/users/profile"
                class="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
              >
                <i class="fas fa-user-circle mr-2"></i>
                <span>Profile</span>
              </RouterLink>
            </li>
            <li>
              <button
                @click="handleLogoutButton"
                class="text-gray-100 hover:text-white flex items-center transition-colors duration-200 cursor-pointer"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8 grow">
      <RouterView />

      <!-- Footer -->
      <div class="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
        <p>© 2025 Contact Management. All rights reserved.</p>
      </div>
    </main>
  </div>
</template>

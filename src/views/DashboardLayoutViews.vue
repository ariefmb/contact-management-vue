<script setup>
import { userLogout } from '@/lib/api/UserApi'
import { alertConfirm, alertError, alertSuccess } from '@/lib/utils/alert'
import { removeUserDataFromSessionStorage } from '@/lib/utils/sessionStorage'
import { removeAllTokenFromCookies } from '@/lib/utils/tokenAndSession'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogoutButton = async () => {
  await alertConfirm('You will be logout from the app!', 'Yes, Log me out').then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await userLogout()

        removeUserDataFromSessionStorage()
        removeAllTokenFromCookies()

        if (!response.status) {
          await alertError(response.errors)
          return
        }

        await alertSuccess('You will be directed to the Login Page')
        await router.replace({
          path: '/login',
        })
      } catch (error) {
        console.error('Logout error:', error.message)

        removeUserDataFromSessionStorage()
        removeAllTokenFromCookies()

        await alertError('Failed to logout, clearing local session...')
        await router.replace({
          path: '/login',
        })
      }
    }
  })
}
</script>

<template>
  <div class="bg-linear-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
    <!-- Header with right-aligned menu -->
    <header class="bg-gradient shadow-lg">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center overflow-hidden">
        <RouterLink
          to="/dashboard/contacts"
          class="flex items-center hover:opacity-90 transition-opacity duration-200 gap-2"
        >
          <img
            src="../../public/img/contact-management-icon.png"
            alt="contact-management icon"
            class="max-h-6"
          />
          <h1
            class="bg-linear-to-tr from-blue-400 to-green-500 font-bold text-2xl text-transparent bg-clip-text"
          >
            Contact Management
          </h1>
        </RouterLink>
        <nav>
          <ul class="flex space-x-6">
            <li>
              <RouterLink
                to="/dashboard/users/profile"
                class="text-gray-300 hover:text-white flex items-center transition-colors duration-200 cursor-pointer hover:scale-105 ease-out"
              >
                <i class="fas fa-user-circle mr-2"></i>
                <span>Profile</span>
              </RouterLink>
            </li>
            <li>
              <button
                @click="handleLogoutButton"
                class="text-gray-300 hover:text-white flex items-center transition-colors duration-200 cursor-pointer hover:scale-105 ease-out"
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
        <p>© 2026 Contact Management - by ariefmb. All rights reserved.</p>
      </div>
    </main>
  </div>
</template>

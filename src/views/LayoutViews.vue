<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="bg-linear-to-br from-gray-900 to-gray-800 flex flex-col min-h-screen">
    <!-- Header with right-aligned menu -->
    <header class="bg-gradient shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <RouterLink
          to="/"
          class="flex items-center hover:opacity-90 transition-opacity duration-200"
        >
          <i class="fas fa-address-book text-white text-2xl mr-3"></i>
          <div class="text-white font-bold text-xl">Contact Management</div>
        </RouterLink>
        <nav>
          <ul class="flex space-x-14">
            <li>
              <button
                @click="router.push({ path: '/register' })"
                class="text-gray-100 hover:text-white flex items-center transition-colors duration-200 cursor-pointer"
              >
                <i class="fa-solid fa-user-plus mr-2"></i>
                <span>Register</span>
              </button>
            </li>
            <li>
              <button
                @click="router.push({ path: '/login' })"
                class="text-gray-100 hover:text-white flex items-center transition-colors duration-200 cursor-pointer"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>
                <span>Login</span>
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

<style></style>

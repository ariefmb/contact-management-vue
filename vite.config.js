import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          views: ['./src/views/DashboardLayoutViews.vue'],
          users: ['./src/components/User/UserProfile.vue'],
          'group-contacts': [
            './src/components/Contacts/ContactsList.vue',
            './src/components/Contacts/ContactCreate.vue',
            './src/components/Contacts/ContactDetail.vue',
            './src/components/Contacts/ContactEdit.vue',
          ],
          'group-addresses': [
            './src/components/Addresses/AddressesList.vue',
            './src/components/Addresses/AddressAdd.vue',
            './src/components/Addresses/AddressEdit.vue',
          ],
          'group-skeletons': [
            './src/components/Skeleton/Contacts/ContactListSkeleton.vue',
            './src/components/Skeleton/Addresses/AddressesListSkeleton.vue',
            './src/components/Skeleton/Guest/GuestContactListSkeleton.vue',
            './src/components/Skeleton/Guest/GuestAddressesListSkeleton.vue',
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

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
            './src/components/Contacts/ContactList.vue',
            './src/components/Contacts/ContactCreate.vue',
            './src/components/Contacts/ContactDetail.vue',
            './src/components/Contacts/ContactEdit.vue',
          ],
          'group-addresses': [
            './src/components/Addresses/AddressesList.vue',
            './src/components/Addresses/AddressesAdd.vue',
            './src/components/Addresses/AddressesEdit.vue',
          ],
          'group-skeletons': ['./src/components/Skeleton/Contacts/ContactListSkeleton.vue'],
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

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
          layout: ['./src/views/LayoutViews.vue', './src/views/DashboardLayoutViews.vue'],
          auth: ['./src/components/User/UserLogin.vue', './src/components/User/UserRegister.vue'],
          guest: [
            './src/components/Guest/GuestContactList.vue',
            './src/components/Guest/GuestContactDetail.vue',
            './src/components/Guest/GuestAddressesList.vue',
            './src/components/Skeleton/Guest/GuestContactListSkeleton.vue',
            './src/components/Skeleton/Guest/GuestAddressesListSkeleton.vue',
          ],
          contacts: [
            './src/components/Contacts/ContactsList.vue',
            './src/components/Contacts/ContactCreate.vue',
            './src/components/Contacts/ContactDetail.vue',
            './src/components/Contacts/ContactEdit.vue',
            './src/components/Skeleton/Contacts/ContactListSkeleton.vue',
          ],
          addresses: [
            './src/components/Addresses/AddressesList.vue',
            './src/components/Addresses/AddressAdd.vue',
            './src/components/Addresses/AddressEdit.vue',
            './src/components/Skeleton/Addresses/AddressesListSkeleton.vue',
          ],
          user: ['./src/components/User/UserProfile.vue'],
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

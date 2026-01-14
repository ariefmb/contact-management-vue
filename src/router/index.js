import AddressAdd from '@/components/Addresses/AddressAdd.vue'
import AddressesList from '@/components/Addresses/AddressesList.vue'
import ContactCreate from '@/components/Contacts/ContactCreate.vue'
import ContactDetail from '@/components/Contacts/ContactDetail.vue'
import ContactEdit from '@/components/Contacts/ContactEdit.vue'
import ContactsList from '@/components/Contacts/ContactsList.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import DashboardLayoutViews from '@/views/DashboardLayoutViews.vue'
import LayoutViews from '@/views/LayoutViews.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: LayoutViews,
      children: [
        {
          path: '',
          component: UserLogin,
        },
        {
          path: '/register',
          component: UserRegister,
        },
        {
          path: '/login',
          component: UserLogin,
        },
      ],
    },
    {
      component: DashboardLayoutViews,
      path: '/dashboard',
      children: [
        {
          path: 'users/profile',
          component: UserProfile,
        },
        {
          path: '',
          component: ContactsList,
        },
        {
          path: 'contacts',
          component: ContactsList,
        },
        {
          path: 'contacts/create',
          component: ContactCreate,
        },
        {
          path: 'contacts/:contactId',
          component: ContactDetail,
          children: [
            {
              path: '',
              component: AddressesList,
            },
          ],
        },
        {
          path: 'contacts/:contactId/edit',
          component: ContactEdit,
        },
        {
          path: 'contacts/:contactId/addresses/add',
          component: AddressAdd,
        },
      ],
    },
  ],
})

export default router

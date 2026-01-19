import AddressAdd from '@/components/Addresses/AddressAdd.vue'
import AddressEdit from '@/components/Addresses/AddressEdit.vue'
import AddressesList from '@/components/Addresses/AddressesList.vue'
import ContactCreate from '@/components/Contacts/ContactCreate.vue'
import ContactDetail from '@/components/Contacts/ContactDetail.vue'
import ContactEdit from '@/components/Contacts/ContactEdit.vue'
import ContactsList from '@/components/Contacts/ContactsList.vue'
import GuestAddressesList from '@/components/Guest/GuestAddressesList.vue'
import GuestContactDetail from '@/components/Guest/GuestContactDetail.vue'
import GuestContactList from '@/components/Guest/GuestContactList.vue'
import ContactListSkeleton from '@/components/Skeleton/Contacts/ContactListSkeleton.vue'
import GuestContactListSkeleton from '@/components/Skeleton/Guest/GuestContactListSkeleton.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import { getAccessToken } from '@/lib/utils/tokenAndSession'
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
          component: GuestContactList,
          children: [
            {
              path: '',
              component: GuestContactListSkeleton,
            },
          ],
        },
        {
          path: '/guest/contacts/:contactId',
          component: GuestContactDetail,
          children: [
            {
              path: '',
              component: GuestAddressesList,
            },
          ],
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
          children: [
            {
              path: '',
              component: ContactListSkeleton,
            },
          ],
        },
        {
          path: 'contacts',
          component: ContactsList,
          children: [
            {
              path: '',
              component: ContactListSkeleton,
            },
          ],
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
        {
          path: 'contacts/:contactId/addresses/:addressId/edit',
          component: AddressEdit,
        },
      ],
    },
  ],
})

const AUTH_PAGES = ['/login', '/register']
const PROTECTED_PREFIXES = ['/dashboard']
const GUEST_PREFIXES = ['/', '/guest']

router.beforeEach(async (to, from, next) => {
  const { path } = to
  const accessToken = (await getAccessToken()) ?? null

  const isAuthPage = AUTH_PAGES.includes(path)
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))
  const isGuestPage = GUEST_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + '/'),
  )

  if (!accessToken) {
    if (isAuthPage || isGuestPage) return next()
    if (isProtectedRoute) return next('/login')
    return next()
  }

  if (accessToken) {
    if (isAuthPage || isGuestPage) return next('/dashboard')
    if (isProtectedRoute) return next()
    return next()
  }
})

export default router

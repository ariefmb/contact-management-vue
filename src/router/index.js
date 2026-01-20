import GuestAddressesList from '@/components/Guest/GuestAddressesList.vue'
import GuestContactDetail from '@/components/Guest/GuestContactDetail.vue'
import GuestContactList from '@/components/Guest/GuestContactList.vue'
import GuestContactListSkeleton from '@/components/Skeleton/Guest/GuestContactListSkeleton.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import { getAccessToken } from '@/lib/utils/tokenAndSession'
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
      component: () => import('@/views/DashboardLayoutViews.vue'),
      path: '/dashboard',
      children: [
        {
          path: 'users/profile',
          component: () => import('@/components/User/UserProfile.vue'),
        },
        {
          path: '',
          component: () => import('@/components/Contacts/ContactsList.vue'),
        },
        {
          path: 'contacts',
          component: () => import('@/components/Contacts/ContactsList.vue'),
        },
        {
          path: 'contacts/create',
          component: () => import('@/components/Contacts/ContactCreate.vue'),
        },
        {
          path: 'contacts/:contactId',
          component: () => import('@/components/Contacts/ContactDetail.vue'),
          children: [
            {
              path: '',
              component: () => import('@/components/Addresses/AddressesList.vue'),
            },
          ],
        },
        {
          path: 'contacts/:contactId/edit',
          component: () => import('@/components/Contacts/ContactEdit.vue'),
        },
        {
          path: 'contacts/:contactId/addresses/add',
          component: () => import('@/components/Addresses/AddressAdd.vue'),
        },
        {
          path: 'contacts/:contactId/addresses/:addressId/edit',
          component: () => import('@/components/Addresses/AddressEdit.vue'),
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

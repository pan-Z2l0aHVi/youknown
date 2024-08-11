import type { RouteRecordRaw } from 'vue-router'

export const navTabRoutes: (RouteRecordRaw & {
  name: string
  meta: {
    title: string
  }
})[] = [
  {
    path: '/use_fetch',
    name: 'use_fetch',
    component: () => import('@/views/use-fetch/index.vue'),
    meta: {
      title: 'Use fetch hook'
    }
  },
  {
    path: '/use_infinity',
    name: 'use_infinity',
    component: () => import('@/views/use-infinity/index.vue'),
    meta: {
      title: 'Use infinity hook'
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload/index.vue'),
    meta: {
      title: 'Upload'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/rich-text-editor/index.vue'),
    meta: {
      title: 'Editor'
    }
  },
  {
    path: '/crypto',
    name: 'crypto',
    component: () => import('@/views/crypto/index.vue'),
    meta: {
      title: 'Crypto'
    }
  },
  {
    path: '/tab_bar',
    name: 'tab_bar',
    component: () => import('@/views/tab-bar/index.vue'),
    meta: {
      title: 'TabBar'
    }
  },
  {
    path: '/route-transition',
    name: 'route-transition',
    meta: {
      title: 'Route transition'
    },
    redirect: '/route-transition/list',
    children: [
      {
        path: 'list',
        name: 'route-transition-list',
        component: () => import('@/views/list/index.vue')
      },
      {
        path: 'detail',
        name: 'route-transition-detail',
        component: () => import('@/views/detail/index.vue')
      },
      {
        path: 'other',
        name: 'route-transition-other',
        component: () => import('@/views/other/index.vue')
      }
    ]
  },
  {
    path: '/flow',
    name: 'flow',
    meta: {
      title: 'Flow'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/flow/index.vue')
      },
      {
        path: ':id',
        component: () => import('@/views/flow/index.vue')
      }
    ]
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: navTabRoutes[0].path
  },
  ...navTabRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

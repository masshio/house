import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: { 
      title: '登录'
    },
    component: () => import('@/views/login/UserLogin'),
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { 
      title: '管理员登录'
    },
    component: () => import('@/views/login/AdminLogin')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { 
      title: '用户注册'
    },
    component: () => import('@/views/register/Register')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '租房'
    },
    component: () => import('@/views/home/Home')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: '个人中心'
    },
    component: () => import('@/views/profile/Profile')
  },
  {
    path: '/house',
    name: 'House',
    meta: {
      title: '发布房源'
    },
    component: () => import('@/views/house/House')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {
      title: '房屋详情'
    },
    component: () => import('@/views/detail/Detail')
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '测试'
    },
    component: () => import('@/views/house/Test')
  },
  {
    path: '/manage',
    meta: {
      title: '后台管理'
    },
    component: () => import('@/views/admin/Manage'),
    children: [
      {
        path: '',
        redirect: 'managehouse'
      },
      {
        path: 'manageuser',
        name: 'ManageUser',
        component: () => import('@/views/admin/childComps/ManageUser')
      },
      {
        path: 'managehouse',
        name: 'ManageHouse',
        component: () => import('@/views/admin/childComps/ManageHouse')
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/admin/childComps/Statistics')
      },
    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router

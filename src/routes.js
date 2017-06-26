import index          from './pages/index'
import me             from './pages/me'
import meSetting      from './pages/me-setting'
import meInfo         from './pages/me-info'
import login          from './pages/login'
import pwd            from './pages/pwd'
import incomeReport   from './pages/income-report'
import incomeRebate   from './pages/income-rebate'
import about          from './pages/about'
import help           from './pages/help'
import pageNotFound   from './pages/404'
import xiaoUList      from './pages/xiaou-list'

const routes = [
  { 
    path: '/', 
    meta: { title: '首页', mainPage: true },
    component: index
  },
  {
    path: '/index',
    meta: { title: '首页', mainPage: true },
    component: index
  },
  {
    path: '/me',
    meta: { title: '个人中心', mainPage: true },
    component: me
  },
  {
    path: '/me/setting',
    meta: { title: '系统设置'},
    component: meSetting
  },
  {
    path: '/me/info',
    meta: { title: '个人信息'},
    component: meInfo
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false},
    component: login
  },
  {
    path: '/forgot',
    meta: { title: '找回密码', auth: false},
    component: pwd
  },
  {
    path: '/about',
    meta: { title: '关于U视一号', auth: false},
    component: about
  },
  {
    path: '/me/pwd',
    meta: { title: '更改密码'},
    component: pwd
  },
  {
    path: '/income/report',
    meta: { title: '总收益'},
    component: incomeReport
  },
  {
    path: '/income/rebate',
    meta: { title: '收益流水'},
    component: incomeRebate
  },
  {
    path: '/xiaou',
    meta: { title: '我的小U'},
    component: xiaoUList
  },
  {
    path: '/help',
    meta: { title: '帮助与说明'},
    component: help
  },
  {
    path: '*',
    meta: { title: '找不到页面'},
    component: pageNotFound
  }
]

export default routes
import Layout from '@/layout'
import router from '@/router'
import store from '@/store'
import { orgList } from '@/api/fill'

export const initMenu = ((menu) => {
  let filterMenu = handleMenu(menu)
  const unfound = { path: '*', redirect: '/404', hidden: true }
  filterMenu.push(unfound)
  var router1 = router.options.routes
  router.addRoutes(filterMenu) //动态挂载路由
  router.options.routes = router1.concat(filterMenu) //路由合并
  // 把格式化路由放进VUEX
  store.dispatch('user/addRouter', filterMenu).then(data => {
  })
})

export const handleMenu = ((menu) => {
  const menuList = []
  menu.forEach((item, index) => {
    if (item.children.length === 0) {
      menuList.push(
        {
          path: item.href,
          component: Layout,
          children: [{
            path: item.href,
            name: item.name,
            component: resolve => require([`@/views${item.href}`], resolve),
            meta: { title: item.name, icon: 'menu' }
          }
          ]
        }
      )
    } else {
      const childList = []
      item.children.forEach((i, idx) => {
        childList.push(
          {
            path: i.href,
            name: i.name,
            component: resolve => require([`@/views${i.href}`], resolve),
            meta: { title: i.name, icon: 'circle' }
          }
        )
      })
      menuList.push({
        path: item.href,
        component: Layout,
        name: item.name,
        alwaysShow: true,
        meta: { title: item.name, icon: 'menu' },
        children: childList
      })
    }
  })
  return menuList
})
//菜单管理
export const filterMenu = ((menu) => {
  const menuList = []
  menu.forEach((item, index) => {
    if (item.children.length === 0) {
      menuList.push(
        {
          id: item.id,
          menuId: item.menuId,
          label: item.name
        }
      )
    } else {
      const childList = []
      item.children.forEach((i, idx) => {
        childList.push(
          {
            id: i.id,
            label: i.name,
            menuId: i.menuId
          }
        )
      })
      menuList.push({
        id: item.id,
        label: item.name,
        menuId: item.menuId,
        children: filterMenu(item.children)
      })
    }
  })
  return menuList
})
//组织机构管理
export const orgTree = ((menu) => {
  const menuList = []
  menu.forEach((item, index) => {
    if (item.children.length === 0) {
      menuList.push(
        {
          id: item.id,
          orgId: item.orgId,
          label: item.name
        }
      )
    } else {
      const childList = []
      item.children.forEach((i, idx) => {
        childList.push(
          {
            id: i.id,
            orgId: i.orgId,
            label: i.name
          }
        )
      })
      menuList.push({
        id: item.id,
        label: item.name,
        orgId: item.orgId,
        // children: childList
        children: orgTree(item.children)
      })
    }
  })
  return menuList
})

// 组织机构管理级联下拉
export const orgCascader = ((data) => {
  const orgOptions = []
  data.forEach(item => {
    orgOptions.push({
      value: item.id,
      label: item.name,
      children: item.children.length > 0 ? orgCascader(item.children) : ''
    })
  })
  return orgOptions
})

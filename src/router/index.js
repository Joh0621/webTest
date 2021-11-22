import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  { path: '/', redirect: '/login' },
  {
    path: '/test',
    component: () => import('@/views/test')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //油气田按日填报新增
  {
    path: '/dayAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/dayAdd',
        component: () => import('@/views/oilgasday/dayAdd')
      }
    ]
  },
  //油气田按月填报新增
  {
    path: '/monthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/monthAdd',
        component: () => import('@/views/oilgasmonth/monthAdd')
      }
    ]
  },
  //油气田按月填报新增
  {
    path: '/oilAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilAdd',
        component: () => import('@/views/oilgasmonth/oilAdd')
      }
    ]
  },
  //国土资源厅按年填报新增
  {
    path: '/guotuGasAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/guotuGasAdd',
        component: () => import('@/views/guotu/gasAdd')
      }
    ]
  },
  {
    path: '/guotuOilAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/guotuOilAdd',
        component: () => import('@/views/guotu/oilAdd')
      }
    ]
  },
  // 煤制气企业按月填报
  {
    path: '/coalgasAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/coalgasAdd',
        component: () => import('@/views/coalgas/add')
      }
    ]
  },
  // 煤制气企业信息填报
  {
    path: '/coalgasEnterpriseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/coalgasEnterpriseAdd',
        component: () => import('@/views/enterprise/coalgasAdd')
      }
    ]
  },
  // 煤制气企业信息填报
  {
    path: '/coaloilEnterpriseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/coaloilEnterpriseAdd',
        component: () => import('@/views/enterprise/coaloilAdd')
      }
    ]
  },
  // 炼厂企业信息填报
  {
    path: '/lianchangAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/lianchangAdd',
        component: () => import('@/views/enterprise/lianchangAdd')
      }
    ]
  },
  // 煤制油按月填报
  {
    path: '/coaloilAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/coaloilAdd',
        component: () => import('@/views/coaloil/add')
      }
    ]
  },
  // 成品油库存按月
  {
    path: '/chengpinyoudepotAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/chengpinyoudepotAdd',
        component: () => import('@/views/chengpinyoudepot/add')
      }
    ]
  },
  // 成品油销售按月
  {
    path: '/chengpinyousaleAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/chengpinyousaleAdd',
        component: () => import('@/views/chengpinyousale/add')
      }
    ]
  },
  // 炼厂按月
  {
    path: '/refineryAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/refineryAdd',
        component: () => import('@/views/refinery/add')
      }
    ]
  },
  {
    path: '/crudeAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/crudeAdd',
        component: () => import('@/views/pipelinemonth/crudeAdd')
      }
    ]
  },
  {
    path: '/gasAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasAdd',
        component: () => import('@/views/pipelineday/gasAdd')
      }
    ]
  },
  {
    path: '/gasmonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasmonthAdd',
        component: () => import('@/views/pipelinemonth/gasAdd')
      }
    ]
  },
  {
    path: '/productAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/productAdd',
        component: () => import('@/views/pipelinemonth/productAdd')
      }
    ]
  },
  // 管道按月
  {
    path: '/pipelinemonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/pipelinemonthAdd',
        component: () => import('@/views/pipelinemonth/add')
      }
    ]
  },
  // 城市燃气按日
  {
    path: '/citygasdayAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/citygasdayAdd',
        component: () => import('@/views/citygasday/add')
      }
    ]
  },
  // 城市燃气按年
  {
    path: '/citygasyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/citygasyearAdd',
        component: () => import('@/views/citygasyear/add')
      }
    ]
  },
  // 城市燃气调峰
  {
    path: '/citygaspeekdayAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/citygaspeekdayAdd',
        component: () => import('@/views/citygaspeekday/add')
      }
    ]
  },
  // 能源局按年
  {
    path: '/nengyuanjuyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/nengyuanjuyearAdd',
        component: () => import('@/views/nengyuanjuyear/add')
      }
    ]
  },
  // 能源局调峰
  {
    path: '/emergencyAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/emergencyAdd',
        component: () => import('@/views/emergency/add')
      }
    ]
  },
  //储气释放事件填报
  {
    path: '/gasreleaseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasreleaseAdd',
        component: () => import('@/views/gasrelease/add')
      }
    ]
  },
  // 油田及气田生产基地
  {
    path: '/baseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/baseAdd',
        component: () => import('@/views/base/add')
      }
    ]
  },
  // 油井
  {
    path: '/oilWellAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilWellAdd',
        component: () => import('@/views/oilwell/add')
      }
    ]
  },
  // 气井
  {
    path: '/gasWellAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasWellAdd',
        component: () => import('@/views/gaswell/add')
      }
    ]
  },
  {
    path: '/bureauAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/bureauAdd',
        component: () => import('@/views/bureau/add')
      }
    ]
  },
  // 菜单添加
  {
    path: '/menuListAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/menuListAdd',
        component: () => import('@/views/sys/menuListAdd')
      }
    ]
  },
  // 组织机构添加
  {
    path: '/orgListAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/orgListAdd',
        component: () => import('@/views/sys/orgListAdd')
      }
    ]
  },
  // 角色添加
  {
    path: '/roleListAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/roleListAdd',
        component: () => import('@/views/sys/roleListAdd')
      }
    ]
  },
  //角色分配用户
  {
    path: '/userAsign',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/userAsign',
        component: () => import('@/views/sys/userAsign')
      }
    ]
  },
  //角色分配菜单
  {
    path: '/menuAsign',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/menuAsign',
        component: () => import('@/views/sys/menuAsign')
      }
    ]
  },
  //用户添加
  {
    path: '/userListAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/userListAdd',
        component: () => import('@/views/sys/userListAdd')
      }
    ]
  },
  //年度产量信息添加
  {
    path: '/yieldyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/yieldyearAdd',
        component: () => import('@/views/yieldyear/add')
      }
    ]
  },
  //气井月度产量信息添加
  {
    path: '/tGasWellMonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/tGasWellMonthAdd',
        component: () => import('@/views/tGasWellMonth/add')
      }
    ]
  },
  //油井月度产量信息添加
  {
    path: '/tOilWellMonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/tOilWellMonthAdd',
        component: () => import('@/views/tOilWellMonth/add')
      }
    ]
  },
  // 气田按年合同报表
  {
    path: '/gasYearListAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasYearListAdd',
        component: () => import('@/views/gasyear/add')
      }
    ]
  },
  // 气田地方政府储气新增
  {
    path: '/governmentyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/governmentyearAdd',
        component: () => import('@/views/governmentyear/add')
      }
    ]
  },
  // 城市燃气按年填报(能源局)
  {
    path: '/energygasyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/energygasyearAdd',
        component: () => import('@/views/energygasyear/add')
      }
    ]
  },
  // 城市燃气按日填报(能源局)
  {
    path: '/energygasdayAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/energygasdayAdd',
        component: () => import('@/views/energygasday/add')
      }
    ]
  },
  // 城燃按日调峰填报(能源局)
  {
    path: '/energygaspeekdayAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/energygaspeekdayAdd',
        component: () => import('@/views/energygaspeekday/add')
      }
    ]
  },
  {
    path: '/citygasyearEdit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/citygasyearEdit',
        component: () => import('@/views/citygasyear/edit')
      }
    ]
  },
  {
    path: '/energygasyearEdit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/energygasyearEdit',
        component: () => import('@/views/energygasyear/edit')
      }
    ]
  },
  {
    path: '/gasyieldyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasyieldyearAdd',
        component: () => import('@/views/gasyieldyear/add')
      }
    ]
  },
  {
    path: '/oilyieldyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilyieldyearAdd',
        component: () => import('@/views/oilyieldyear/add')
      }
    ]
  },
  {
    path: '/bureauyieldyearAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/bureauyieldyearAdd',
        component: () => import('@/views/bureauyieldyear/add')
      }
    ]
  },
  {
    path: '/gasbaseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasbaseAdd',
        component: () => import('@/views/gasbase/add')
      }
    ]
  },
  {
    path: '/oilbaseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilbaseAdd',
        component: () => import('@/views/oilbase/add')
      }
    ]
  },
  {
    path: '/citygasmonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/citygasmonthAdd',
        component: () => import('@/views/citygasmonth/add')
      }
    ]
  },
  {
    path: '/energygasmonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/energygasmonthAdd',
        component: () => import('@/views/energygasmonth/add')
      }
    ]
  },
  {
    path: '/governmentyearEdit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/governmentyearEdit',
        component: () => import('@/views/governmentyear/edit')
      }
    ]
  },
  {
    path: '/gasbasemonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasbasemonthAdd',
        component: () => import('@/views/gasbasemonth/add')
      }
    ]
  },
  {
    path: '/oilbasemonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilbasemonthAdd',
        component: () => import('@/views/oilbasemonth/add')
      }
    ]
  },
  {
    path: '/oilinfoAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilinfoAdd',
        component: () => import('@/views/oilinfo/add')
      }
    ]
  },
  {
    path: '/gasinfoAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasinfoAdd',
        component: () => import('@/views/gasinfo/add')
      }
    ]
  },
  {
    path: '/chengpinyoupurchaseAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/chengpinyoupurchaseAdd',
        component: () => import('@/views/chengpinyoupurchase/add')
      }
    ]
  },
  {
    path: '/pipelinepeakAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/pipelinepeakAdd',
        component: () => import('@/views/pipelinepeak/add')
      }
    ]
  },
  {
    path: '/gassupplymonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gassupplymonthAdd',
        component: () => import('@/views/gassupplymonth/dayAdd')
      }
    ]
  },
  //油气田按日填报新增
  {
    path: '/gasmonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasmonthAdd',
        component: () => import('@/views/gassupplymonth/dayAdd')
      }
    ]
  },
  {
    path: '/oilsupplymonthAdd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/oilsupplymonthAdd',
        component: () => import('@/views/oilsupplymonth/add')
      }
    ]
  }
  // 管道

  /*{
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
*/
  /*{
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },*/

  /* {
     path: '/nested',
     component: Layout,
     redirect: '/nested/menu1',
     name: 'Nested',
     meta: {
       title: 'Nested',
       icon: 'nested'
     },
     children: [
       {
         path: 'menu1',
         component: () => import('@/views/nested/menu1/index'), // Parent router-view
         name: 'Menu1',
         meta: { title: 'Menu1' },
         children: [
           {
             path: 'menu1-1',
             component: () => import('@/views/nested/menu1/menu1-1'),
             name: 'Menu1-1',
             meta: { title: 'Menu1-1' }
           },
           {
             path: 'menu1-2',
             component: () => import('@/views/nested/menu1/menu1-2'),
             name: 'Menu1-2',
             meta: { title: 'Menu1-2' },
             children: [
               {
                 path: 'menu1-2-1',
                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                 name: 'Menu1-2-1',
                 meta: { title: 'Menu1-2-1' }
               },
               {
                 path: 'menu1-2-2',
                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                 name: 'Menu1-2-2',
                 meta: { title: 'Menu1-2-2' }
               }
             ]
           },
           {
             path: 'menu1-3',
             component: () => import('@/views/nested/menu1/menu1-3'),
             name: 'Menu1-3',
             meta: { title: 'Menu1-3' }
           }
         ]
       },
       {
         path: 'menu2',
         component: () => import('@/views/nested/menu2/index'),
         name: 'Menu2',
         meta: { title: 'menu2' }
       }
     ]
   },

   {
     path: 'external-link',
     component: Layout,
     children: [
       {
         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
         meta: { title: 'External Link', icon: 'link' }
       }
     ]
   },*/

  /*{
    path: '/guotuziyuan',
    component: Layout,
    children: [
      {
        path: 'guotuziyuan',
        name: 'guotuziyuan',
        component: () => import('@/views/guotuziyuan/index'),
        meta: { title: '国土资源厅按年填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/meizhiqi',
    component: Layout,
    meta: { title: '煤制气填报', icon: 'dashboard' },
    children: [
      {
        path: 'gasMonth',
        name: 'gasMonth',
        component: () => import('@/views/meizhiqi/gasFieldMonth'),
        meta: { title: '按月填报', icon: 'dashboard' }
      },
      {
        path: 'gasDay',
        name: 'gasDay',
        component: () => import('@/views/meizhiqi/gasFieldDay'),
        meta: { title: '企业信息填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/meizhiyou',
    component: Layout,
    meta: { title: '煤制油填报', icon: 'dashboard' },
    children: [
      {
        path: 'gasMonth',
        name: 'gasMonth',
        component: () => import('@/views/meizhiyou/gasFieldMonth'),
        meta: { title: '按月填报', icon: 'dashboard' }
      },
      {
        path: 'gasDay',
        name: 'gasDay',
        component: () => import('@/views/meizhiyou/gasFieldDay'),
        meta: { title: '企业信息填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/chenpinyou',
    component: Layout,
    meta: { title: '成品油销售企业填报', icon: 'dashboard' },
    children: [
      {
        path: 'chenpinyou1',
        name: 'chenpinyou1',
        component: () => import('@/views/chenpinyou/chenpinyou1'),
        meta: { title: '库存按月填报', icon: 'dashboard' }
      },
      {
        path: 'chenpinyou2',
        name: 'chenpinyou2',
        component: () => import('@/views/chenpinyou/chenpinyou2'),
        meta: { title: '销售按月填报', icon: 'dashboard' }
      },
      {
        path: 'chenpinyou3',
        name: 'chenpinyou3',
        component: () => import('@/views/chenpinyou/chenpinyou3'),
        meta: { title: '企业信息填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/lianyou',
    component: Layout,
    meta: { title: '炼油厂填报', icon: 'dashboard' },
    children: [
      {
        path: 'gasFieldMonth',
        name: 'gasFieldMonth',
        component: () => import('@/views/lianyou/gasFieldMonth'),
        meta: { title: '按月填报', icon: 'dashboard' }
      },
      {
        path: 'gasFieldDay',
        name: 'gasFieldDay',
        component: () => import('@/views/lianyou/gasFieldDay'),
        meta: { title: '企业信息填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/guandao',
    component: Layout,
    meta: { title: '管道企业填报', icon: 'dashboard' },
    children: [
      {
        path: 'gasFieldDay',
        name: 'gasFieldDay',
        component: () => import('@/views/guandao/gasFieldDay'),
        meta: { title: '按日填报', icon: 'dashboard' }
      },
      {
        path: 'gasFieldMonth',
        name: 'gasFieldMonth',
        component: () => import('@/views/guandao/gasFieldMonth'),
        meta: { title: '管道信息按月填报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/ranqi',
    component: Layout,
    meta: { title: '城市燃气企业填报', icon: 'dashboard' },
    children: [
      {
        path: 'ranqi1',
        name: 'ranqi1',
        component: () => import('@/views/ranqi/ranqi1'),
        meta: { title: '按日填报', icon: 'dashboard' }
      },
      {
        path: 'ranqi2',
        name: 'ranqi2',
        component: () => import('@/views/ranqi/ranqi2'),
        meta: { title: '调峰按日填报', icon: 'dashboard' }
      },
      {
        path: 'ranqi3',
        name: 'ranqi3',
        component: () => import('@/views/ranqi/ranqi3'),
        meta: { title: '按年填报', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/nengyuanju',
    component: Layout,
    children: [{
      path: 'nengyuanju',
      name: 'nengyuanju',
      component: () => import('@/views/nengyuanju/gasFieldMonth'),
      meta: { title: '能源局按年填报', icon: 'dashboard' }
    }]
  },*/
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from '@/store'
import { userList } from '@/api/user'
import { initMenu } from '@/utils/addMenu'
import router from '@/router'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    /*  userList().then(res => {
         if (res.body) {
           initMenu(res.body)
         }
       })*/
    routes() {
      // return this.$router.options.routes
      return store.getters.setRouters
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (path === '/dayAdd') {
        return '/oilgasday/list'
      } else if (path === '/monthAdd') {
        return '/oilgasmonth/gasList'
      } else if (path === '/oilAdd') {
        return '/oilgasmonth/oilList'
      } else if (path === '/guotuGasAdd') {
        return '/guotu/gasList'
      } else if (path === '/guotuOilAdd') {
        return '/guotu/oilList'
      } else if (path === '/coalgasAdd') {
        return '/coalgas/list'
      } else if (path === '/coalgasEnterpriseAdd') {
        return '/enterprise/coalgasList'
      } else if (path === '/coaloilEnterpriseAdd') {
        return '/enterprise/coaloilList'
      } else if (path === '/lianchangAdd') {
        return '/enterprise/lianchangList'
      } else if (path === '/coaloilAdd') {
        return '/coaloil/list'
      } else if (path === '/chengpinyoudepotAdd') {
        return '/chengpinyoudepot/list'
      } else if (path === '/chengpinyousaleAdd') {
        return '/chengpinyousale/list'
      } else if (path === '/refineryAdd') {
        return '/refinery/list'
      } else if (path === '/crudeAdd') {
        return '/pipelineday/crudeList'
      } else if (path === '/gasAdd') {
        return '/pipelineday/gasList'
      } else if (path === '/productAdd') {
        return '/pipelineday/productList'
      } else if (path === '/pipelinemonthAdd') {
        return '/pipelinemonth/list'
      } else if (path === '/citygasdayAdd') {
        return '/citygasday/list'
      } else if (path === '/citygasyearAdd') {
        return '/citygasyear/list'
      } else if (path === '/citygaspeekdayAdd') {
        return '/citygaspeekday/list'
      } else if (path === '/nengyuanjuyearAdd') {
        return '/nengyuanjuyear/list'
      } else if (path === '/emergencyAdd') {
        return '/emergency/list'
      } else if (path === '/gasreleaseAdd') {
        return '/gasrelease/list'
      } else if (path === '/baseAdd') {
        return '/base/list'
      } else if (path === '/oilWellAdd') {
        return '/oilwell/list'
      } else if (path === '/gasWellAdd') {
        return '/gaswell/list'
      } else if (path === '/bureauAdd') {
        return '/bureau/list'
      } else if (path === '/menuListAdd') {
        return '/sys/menuList'
      } else if (path === '/orgListAdd') {
        return '/sys/orgList'
      } else if (path === '/roleListAdd') {
        return '/sys/roleList'
      } else if (path === '/userAsign') {
        return '/sys/roleList'
      } else if (path === '/menuAsign') {
        return '/sys/roleList'
      } else if (path === '/userListAdd') {
        return '/sys/userList'
      } else if (path === '/yieldyearAdd') {
        return '/yieldyear/list'
      } else if (path === '/tGasWellMonthAdd') {
        return '/tGasWellMonth/list'
      } else if (path === '/tOilWellMonthAdd') {
        return '/tOilWellMonth/list'
      } else if (path === '/gasYearListAdd') {
        return '/gasyear/list'
      } else if (path === '/governmentyearAdd') {
        return '/governmentyear/list'
      } else if (path === '/energygasyearAdd') {
        return '/energygasyear/list'
      } else if (path === '/energygasdayAdd') {
        return '/energygasday/list'
      } else if (path === '/energygaspeekdayAdd') {
        return '/energygaspeekday/list'
      } else if (path === '/citygasyearEdit') {
        return '/citygasyear/list'
      } else if (path === '/energygasyearEdit') {
        return '/energygasyear/list'
      } else if (path === '/gasyieldyearAdd') {
        return '/gasyieldyear/list'
      } else if (path === '/oilyieldyearAdd') {
        return '/oilyieldyear/list'
      } else if (path === '/bureauyieldyearAdd') {
        return '/bureauyieldyear/list'
      } else if (path === '/gasbaseAdd') {
        return '/gasbase/list'
      } else if (path === '/oilbaseAdd') {
        return '/oilbase/list'
      } else if (path === '/citygasmonthAdd') {
        return '/citygasmonth/list'
      } else if (path === '/energygasmonthAdd') {
        return '/energygasmonth/list'
      } else if (path === '/governmentyearEdit') {
        return '/governmentyear/list'
      } else if (path === '/gasbasemonthAdd') {
        return '/gasbasemonth/list'
      } else if (path === '/oilbasemonthAdd') {
        return '/oilbasemonth/list'
      } else if (path === '/oilinfoAdd') {
        return '/oilinfo/list'
      } else if (path === '/gasinfoAdd') {
        return '/gasinfo/list'
      } else if (path === '/chengpinyoupurchaseAdd') {
        return '/chengpinyoupurchase/list'
      } else if (path === '/pipelinepeakAdd') {
        return '/pipelinepeak/list'
      } else if (path === '/gassupplymonthAdd') {
        return '/gassupplymonth/list'
      } else if (path === '/gasmonthAdd') {
        return '/gassupplymonth/list'
      } else if (path === '/oilsupplymonthAdd') {
        return '/oilsupplymonth/list'
      } else {
        return path
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="form-add"><span class="first">角色管理</span>
      <span class="first-line">></span>
      <span class="first">分配菜单</span>
    </div>
    <!--    :check-strictly=true-->
    <div class="form-wrapper">
      <el-tree
        ref="selectTree"
        :data="treeData"
        :props="defaultProps"
        show-checkbox

        node-key="menuId"
      ></el-tree>
    </div>
    <div class="form-footer-btn">
      <el-button class="close-btn" @click="close">取 消</el-button>
      <el-button class="confrim-btn" type="primary"
                 @click="assign()"
      >确 定
      </el-button>
    </div>
  </div>
</template>

<script>
import { menuList, resourcesRole, setResourcesRole } from '@/api/fill'
import { filterMenu } from '@/utils/addMenu'

export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getMenu()
    this.resourcesRole()
  },
  methods: {
    //获取所有菜单
    getMenu() {
      menuList().then((res) => {
        if (res.code === 0) {
          this.treeData = filterMenu(res.body)
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    //获取角色下有哪些菜单，并且做回显
    resourcesRole() {
      resourcesRole({ id: this.$route.query.id }).then((res) => {
        if (res.code === 0) {
          this.$nextTick(function() {
            this.$refs.selectTree.setCheckedKeys(res.body)
          })
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    close() {
      this.$router.push('/sys/roleList')
    },
    //分配菜单
    assign() {
      const checkTree = this.$refs.selectTree.getCheckedNodes()
      const getHalfNode = this.$refs.selectTree.getHalfCheckedNodes()
      const checkTreeIds = []
      checkTree.forEach((item, index) => {
        checkTreeIds.push(item.menuId)
      })
      getHalfNode.forEach((item, index) => {
        checkTreeIds.push(item.menuId)
      })
      const params = {
        roleId: this.$route.query.id,
        resourceIds: checkTreeIds
      }
      params.resourceIds = params.resourceIds.toString()
      setResourcesRole(params).then((res) => {
        if (res.code === 0) {
          this.$notify({
            message: '分配菜单成功',
            type: 'success',
            offset: 100
          })
          this.$router.push('/sys/roleList')
        } else {
          this.$notify({
            message: '分配菜单失败',
            type: 'error',
            offset: 100
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<template>
  <div class="app-container">
    <div class="table-wrapper">
      <div class="handel-btn">
        <div class="submenu-title">
          角色管理
        </div>
        <div>
          <el-button size="small" class="btn-add" style="margin-bottom: 10px;" @click="handleAdd"><i
            class="icon iconfont i-add"
          >&#xe880;</i>新增
          </el-button>
          <el-button size="small" class="btn-edit" style="margin-bottom: 10px;" @click="handleEdit"><i
            class="icon iconfont i-edit"
          >&#xe630;</i>编辑
          </el-button>
          <el-button size="small" class="btn-edit" style="margin-bottom: 10px;" @click="handleMenuAssign"><i
            class="icon iconfont i-edit"
          >&#xe67d;</i>分配菜单
          </el-button>
          <el-button size="small" class="btn-edit" style="margin-bottom: 10px;" @click="handleUserAssign"><i
            class="icon iconfont i-edit"
          >&#xe67d;</i>分配用户
          </el-button>
          <el-button size="small" class="btn-del" style="margin-bottom: 10px;" @click="handleDel"><i
            class="icon iconfont i-del"
          >&#xe614;</i>删除
          </el-button>
        </div>
      </div>
      <table-cmp
        :loading="loading"
        :table-data="tableData"
        :table-label="tableLabel"
        :checkbox="checkbox"
        :isPagination="isPagination"
        @handleSelectionChange="handleSelectionChange"

      >
      </table-cmp>
    </div>

  </div>
</template>

<script>
import TableCmp from '@/components/TableCmp'
import { listRole, delRole } from '@/api/fill'

export default {
  name: 'Dashboard',
  components: { TableCmp },
  data() {
    return {
      checkbox: true,
      isPagination: false,
      fromSearch: {
        name: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '角色名称', param: 'name' },
        { label: '角色英文名称', param: 'enName' },
        {
          label: '是否生效', param: 'usable', formatter(row) {
            if (row.usable == '1') {
              return '生效'
            } else {
              return '不生效'
            }
          }
        },
        { label: '排序', param: 'sort' }
      ],
      selectedRows: []
    }
  },
  created() {
    // 初始化查询列表
    this.list()
  },
  methods: {
    // 查询列表
    list() {
      this.loading = true
      listRole().then((res) => {
        if (res.code === 0) {
          this.tableData = res.body
          this.total = res.body.total
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
      this.loading = false
    },
    handleAdd() {
      const params = {
        title: '新增',
        statu: 'create'
      }
      this.$router.push({ path: '/roleListAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/roleListAdd', query: params })

      } else {
        this.$notify({
          message: '请选择一条数据进行编辑',
          type: 'info',
          offset: 100
        })
      }
    },
    // 删除
    handleDel() {
      if (this.selectedRows.length > 0) {
        this.$confirm('确认删除选择数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            roleIds: this.selectedRows
          }
          params.roleIds = params.roleIds.toString()
          delRole(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
              this.list(this.currentPage, this.pageSize)
            } else {
              this.$notify({
                type: 'error',
                message: '删除失败!'
              })
            }
          })

        }).catch(() => {
          this.$notify({
                type: 'info',
                message: '已取消删除',
                offset: 100
              })
        })

      } else {
        this.$notify({
          message: '请选择一条数据进行删除',
          type: 'info',
          offset: 100
        })
      }
    },
    handleSelectionChange(val) {
      const arr = []
      val.map((item) => {
        arr.push(item.id)
      })
      this.selectedRows = arr
    },
    // 分配用户
    handleUserAssign() {
      if (this.selectedRows.length === 1) {
        const params = {
          id: this.selectedRows[0]
        }
        this.$router.push({ path: '/userAsign', query: params })

      } else {
        this.$notify({
          message: '请选择一条数据进行分配用户',
          type: 'info',
          offset: 100
        })
      }
    },
    // 分配菜单
    handleMenuAssign() {
      if (this.selectedRows.length === 1) {
        const params = {
          id: this.selectedRows[0]
        }
        this.$router.push({ path: '/menuAsign', query: params })

      } else {
        this.$notify({
          message: '请选择一条数据进行分配菜单',
          type: 'info',
          offset: 100
        })
      }
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

<template>
  <div class="app-container">
    <div class="form-add"><span class="first">角色管理</span>
      <span class="first-line">></span>
      <span class="first">分配用户</span>
    </div>

    <div class="table-wrapper">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="组织机构" label-width="90px">
                <el-cascader
                  ref="cascaderMenu"
                  v-model="fromSearch.orgName"
                  placeholder="请选择组织机构"
                  :props="{ checkStrictly: true }"
                  :options="orgOptions"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="search-btn">
          <el-form-item label-width="0">
            <el-button type="primary" icon="el-icon-search" @click="list()">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        size="medium"
        element-loading-text="Loading"
        :stripe="true"
        fit
        highlight-current-row
        tooltip-effect="dark"
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="用户名称"
          prop="nickName"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="登录用户名"
        >
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="组织机构"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
      </el-table>

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
import { usersRole, userList, selectUser, orgList, dic, setUsersRole } from '@/api/fill'
import { orgCascader } from '@/utils/addMenu'

export default {
  name: 'userAsign',
  data() {
    return {
      fromSearch: {
        orgName: '',
        time: '',
        name: '',
        name1: ''
      },
      loading: false,
      tableData: [],
      selectedRows: [],
      orgOptions: []
    }
  },
  created() {
    this.orgList()
    this.list()
  },
  methods: {
    //组织机构级联下拉
    orgList() {
      orgList().then((res) => {
        if (res.code === 0) {
          const data = res.body
          this.orgOptions = orgCascader(data)
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },

    handleChange(val) {
      // 目的是选择之后将下拉界面收起
      this.$refs.cascaderMenu.toggleDropDownVisible()
      if (val.length > 0) {
        this.fromSearch.orgName = val[val.length - 1]
      } else {
        this.fromSearch.orgName = ''
      }
    },
    //复选框选中
    handleSelectionChange(val) {
      const arr = []
      if (val[0]) {
        val.map((item) => {
          arr.push(item.id)
        })
      }
      this.selectedRows = arr
    },
    // 根据组织机构查询用户列表
    list() {
      const params = this.fromSearch.orgName == '' ? '0' : this.fromSearch.orgName
      selectUser(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.body
          this.usersRole()
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
    // 查询当前角色下的用户
    usersRole() {
      usersRole({ id: this.$route.query.id }).then((res) => {
        if (res.code === 0) {
          this.checkList = res.body
          this.checkList.forEach((item, idx) => {
            this.tableData.forEach((i, index) => {
              if (item == i.id) {
                this.$refs.multipleTable.toggleRowSelection(this.tableData[index])
              }
            })
          })
        } else {
          this.$notify({
            message: '加载失败',
            type: 'error',
            offset: 100
          })
        }

      })
    },
    // 取消
    close() {
      this.$router.push('/sys/roleList')
    },
    //分 配用户
    assign() {
      console.log(this.selectedRows)
      const params = {
        roleId: this.$route.query.id,
        userIds: this.selectedRows
      }
      params.userIds = params.userIds.toString()
      setUsersRole(params).then((res) => {
        if (res.code === 0) {
          this.$notify({
            message: '分配用户成功',
            type: 'success',
            offset: 100
          })
          this.$router.push('/sys/roleList')
        } else {
          this.$notify({
            message: '分配用户失败',
            type: 'error',
            offset: 100
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.footer-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>

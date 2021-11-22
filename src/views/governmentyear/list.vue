<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <!--            <el-col :span="8">
                          <el-form-item label="盟市名称" label-width="90px">
                            <el-select v-model="fromSearch.leagueCityName" clearable>
                              <el-option
                                v-for="item in leagueCityTypeAry"
                                :key="item.dictItemName"
                                :label="item.dictItemName"
                                :value="item.dictItemName"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>-->
            <el-col :span="9">
              <el-form-item label="起止日期">
                <el-col :span="11">
                  <el-date-picker
                    v-model="fromSearch.beginTime"
                    type="year"
                    placeholder="开始日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="11">
                  <el-date-picker
                    v-model="fromSearch.endTime"
                    type="year"
                    placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-col>

              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <div class="search-btn">
          <el-form-item label-width="0">
            <el-button type="primary" icon="el-icon-search" @click="list(1,pageSize)">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table-wrapper">
      <div class="handel-btn">
        <div class="submenu-title">
          地方政府储气填报
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
        :total="total"
        :checkbox="checkbox"
        :pageSize="pageSize"
        :currentPage="currentPage"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </table-cmp>
    </div>

  </div>
</template>

<script>
import TableCmp from '@/components/TableCmp'
import { dic, energygasdayInit, energygasyearInit, governmentyearList, governmentyearSwitchs } from '@/api/fill'

export default {
  name: 'Dashboard',
  components: { TableCmp },
  data() {
    return {
      checkbox: true,
      count: 3,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromSearch: {
        governmentName: '',
        beginTime: null,
        endTime: null
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate' },
        { label: '旗县名称', param: 'enterName' },
        { label: '机构名称', param: 'governmentName' },
        { label: '旗县地方3天计划储气量(万立方米)', param: 'plannedStorageEnterprise' },
        { label: '盟市', param: 'leagueCityName' },
        { label: '地方政府年度3天计划储气总量(万立方米)', param: 'plannedStorageGovernment' }
      ],
      leagueCityTypeAry: [],
      enterNameAry: [],
      selectedRows: []
    }
  },
  created() {
    // 初始化查询列表
    this.energygasdayInit()
    // this.dic()
  },
  methods: {
    energygasyearInit() {
      energygasyearInit().then((res) => {
        if (res.success) {
          this.fromSearch.leagueCityName = res.data.mengshi
          this.list(1, this.pageSize)
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    energygasdayInit() {
      energygasdayInit().then((res) => {
        if (res.success) {
          this.fromSearch.governmentName = res.data.zuzhijigou
          this.energygasyearInit()
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const data = res.data.leagueCityType
          const enterName = res.data.nengyuanju
          this.leagueCityTypeAry = data
          this.enterNameAry = enterName
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    // 查询列表
    list(val, pageSize) {
      this.loading = true
      this.currentPage = val
      const params = {
        pageNum: val,
        pageSize: pageSize,
        governmentName: this.fromSearch.governmentName,
        beginTime: this.fromSearch.beginTime,
        endTime: this.fromSearch.endTime
      }
      governmentyearList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.body.data
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
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.list(val, this.pageSize)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.list(this.currentPage, val)
    },
    handleAdd() {
      const params = {
        title: '新增',
        statu: 'create'
      }
      this.$router.push({ path: '/governmentyearAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/governmentyearEdit', query: params })

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
            ids: this.selectedRows,
            lx: 3
          }
          governmentyearSwitchs(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                message: '删除成功',
                offset: 100
              })
              this.list(1, this.pageSize)
            } else {
              this.$notify({
                type: 'error',
                message: '删除失败',
                offset: 100
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

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="调峰单位" label-width="90px">
<!--                <el-select v-model="fromSearch.enterName" clearable>
                  <el-option
                    v-for="item in enterNameAry"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeName"
                  >
                  </el-option>
                </el-select>-->
                <el-input v-model="fromSearch.enterName"></el-input>
              </el-form-item>
            </el-col>
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

            <!--            <el-col :span="8">
                          <el-form-item label="起止日期">
                            <el-date-picker
                              v-model="fromSearch.time"
                              type="daterange"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              :clearable="false"
                            >
                            </el-date-picker>
                          </el-form-item>
                        </el-col>-->
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
          储气释放事件填报
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
import { dic, energygasyearInit, gasreleaseList, gasreleaseSwitchs } from '@/api/fill'

/*league_city_name盟市名称（地区）
		enter_name		企业（管理方）
		release_volumn	释放气量
air_attribute		气量属性
surplus_volumn	剩余气量
record_date		时间*/
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
        enterName: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: 160 },
        { label: '调峰单位', param: 'enterName', minWidth: 180 },
        { label: '盟市', param: 'leagueCityName', minWidth: 120 },
        { label: '释放气量(万立方米)', param: 'releaseVolumn', minWidth: 210 },
        { label: '气量属性', param: 'airAttribute', minWidth: 210 },
        { label: '剩余气量(万立方米)', param: 'surplusVolumn', minWidth: 160 }
      ],
      leagueCityTypeAry: [],
      enterNameAry: [],
      selectedRows: []
    }
  },
  created() {
    // 初始化查询列表
    this.energygasyearInit()
    this.dic()
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
        leagueCityName: this.fromSearch.leagueCityName,
        enterName: this.fromSearch.enterName
      }
      gasreleaseList(params).then((res) => {
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
      this.$router.push({ path: '/gasreleaseAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/gasreleaseAdd', query: params })

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
          gasreleaseSwitchs(params).then((res) => {
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

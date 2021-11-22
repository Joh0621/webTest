<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <!--            <el-col :span="8">
                          <el-form-item label="调峰单位" label-width="90px">
                            <el-select v-model="fromSearch.enterName" clearable>
                              <el-option
                                v-for="item in enterNameAry"
                                :key="item.dictItemId"
                                :label="item.dictItemName"
                                :value="item.dictItemName"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>-->

            <el-col :span="8">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="fromSearch.time"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
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
          应急调峰事件填报
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
import { emergencyList, emergencSwitchs, dic, oilgasdayInit } from '@/api/fill'

/*league_city_name盟市名称（地区）
		enter_name		企业（管理方）
response_level	响应等级
peak_object		调峰对象
specific_measure	具体措施
record_date		调峰时间*/
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
        // leagueCityName: '',
        time: '',
        enterName: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '调峰时间', param: 'recordDate', minWidth: 160 },
        { label: '调峰单位', param: 'enterName', minWidth: 180 },
        // { label: '盟市名称', param: 'leagueCityName', minWidth: 120 },
        { label: '商业调峰量(万立方米)', param: 'businessPeakLoadRegulation', minWidth: 180 },
        { label: '甲醇化肥调峰量(万立方米)', param: 'methanolPeakLoadRegulation', minWidth: 200 },
        { label: '可中断工业调峰量(万立方米)', param: 'interruptiblePeakLoadRegulation', minWidth: 200 },
        { label: '不可中断工业调峰量(万立方米)', param: 'uninterruptiblePeakLoadRegulation', minWidth: 220 },
        { label: 'LNG调峰量(万立方米)', param: 'lngPeakLoadRegulation', minWidth: 180 },
        { label: '盟市储气日调用量(万立方米)', param: 'gasInvoke', minWidth: 200 },
        { label: '计划日调峰量(万立方米)', param: 'planPeakLoadRegulation', minWidth: 200 },
        { label: '实际日调峰量(万立方米)', param: 'peakLoadRegulation', minWidth: 200 },
        { label: '响应等级', param: 'responseLevel', minWidth: 210 },
        // { label: '调峰对象', param: 'peakObject', minWidth: 210 },
        { label: '具体措施', param: 'specificMeasure', minWidth: 280, showOverflowTooltip: true }
      ],
      leagueCityTypeAry: [],//盟市名称
      enterNameAry: [],
      selectedRows: []
    }
  },
  created() {
    // 初始化查询列表
    this.oilgasdayInit()
    this.dic()
  },
  methods: {
    oilgasdayInit() {
      oilgasdayInit().then((res) => {
        if (res.success) {
          this.fromSearch.enterName = res.data.zuzhijigou
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
          const enterName = res.data.groupType
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
        beginTime: this.fromSearch.time ? this.fromSearch.time[0] : null,
        endTime: this.fromSearch.time ? this.fromSearch.time[1] : null,
        enterName: this.fromSearch.enterName
      }
      emergencyList(params).then((res) => {
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
      this.$router.push({ path: '/emergencyAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/emergencyAdd', query: params })

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
          emergencSwitchs(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                message: '删除成功',
                offset: 100
              })
              const totalPage = Math.ceil((this.total - 1) / this.pageSize)
              const currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
              this.currentPage = currentPage < 1 ? 1 : currentPage
              this.list(this.currentPage, this.pageSize)
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

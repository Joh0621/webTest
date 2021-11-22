<template>
  <!--  煤制气按月填报-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
<!--            <el-col :span="8">
              <el-form-item label="企业名称" label-width="90px">
                <el-select v-model="fromSearch.enterName" clearable>
                  <el-option
                    v-for="item in enterNameAry"
                    :key="item.typeName"
                    :label="item.typeName"
                    :value="item.typeName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="fromSearch.time"
                  unlink-panels
                  type="monthrange"
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
          按月填报
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
import { coalgasList, coalgasSwitchs, dic, enterpriseInit } from '@/api/fill'

/*1企业名称、2时间、3盟市名称、4计划粉煤月加工量、5粉煤月加工量、6平均负荷率、
7计划平均负荷率、8水资源用量、9单位产品原料消耗、10单位产品综合能耗、11单位产品新鲜水耗、12煤制气产量、
13煤制气月供应量、14管道气供应量、15CNG供应量、16LNG供应量、17终端消费量、18化工消费量、19火力发电消费量、20供热消费量、21工业消费量、22生活消费量、23建筑业消费量、24商业消费量、25交通消费量、26调峰煤制气用量、27煤制气计划月供应量、28煤制气消费量、29状态*/
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
        enterName: '',
        time: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: 150 },
        { label: '企业名称', param: 'enterName', minWidth: 150 },
        // { label: '盟市', param: 'leagueCityName', minWidth: 150 },
        { label: '计划粉煤月加工量(万吨)', param: 'coalProcessMonth', minWidth: 150 },
        { label: '粉煤月加工量(万吨)', param: 'pulverizedCoalProcessingCapacity', minWidth: 150 },
        { label: '平均负荷率(%)', param: 'avgLoadRate', minWidth: 150 },
        { label: '计划平均负荷率(%)', param: 'planAvgLoadRate', minWidth: 150 },
        { label: '水资源用量(万吨)', param: 'waterUse', minWidth: 150 },
        { label: '单位产品原料消耗(吨标准煤)', param: 'unitProductRawSales', minWidth: 150 },
        { label: '单位产品综合能耗(吨标准煤)', param: 'unitProductComprehensiveEnergySales', minWidth: 150 },
        { label: '单位产品新鲜水耗(吨)', param: 'unitProductFreshWaterSales', minWidth: 150 },
        { label: '煤制气产量(万立方米)', param: 'gasYield', minWidth: 150 },
        { label: '煤制气月供应量(万立方米)', param: 'gasSupply', minWidth: 150 },
        { label: '管道气供应量(万立方米)', param: 'pipelineGasSupply', minWidth: 150 },
        { label: 'CNG供应量(万立方米)', param: 'cngSupply', minWidth: 150 },
        { label: 'LNG供应量(万立方米)', param: 'lngSupply', minWidth: 150 },
        { label: '终端消费量(万立方米)', param: 'householdSales', minWidth: 150 },
        { label: '化工消费量(万立方米)', param: 'chemicalConsumption', minWidth: 150 },
        { label: '火力发电消费量(万立方米)', param: 'thermalPowerSales', minWidth: 150 },
        { label: '供热消费量(万立方米)', param: 'heatingSales', minWidth: 150 },
        { label: '工业消费量(万立方米)', param: 'industrySales', minWidth: 150 },
        { label: '生活消费量(万立方米)', param: 'lifeSales', minWidth: 150 },
        { label: '建筑业消费量(万立方米)', param: 'constructionIndustrySales', minWidth: 150 },
        { label: '商业消费量(万立方米)', param: 'businessSales', minWidth: 150 },
        { label: '交通消费量(万立方米)', param: 'trafficSales', minWidth: 150 },
        { label: '调峰煤制气用量(万立方米)', param: 'peakShavingSales', minWidth: 150 },
        { label: '煤制气计划月供应量(万立方米)', param: 'gasPlanMonthSupply', minWidth: 150 },
        { label: '煤制气消费量(万立方米)', param: 'gasConsumption', minWidth: 150 },
        { label: '原料煤价格(元/吨标煤)', param: 'rawCoalPrice', minWidth: 150 },
        { label: '煤制气价格(元/吨标煤)', param: 'coalGasPrice', minWidth: 150 }
      ],
      selectedRows: [],
      enterNameAry: []
    }
  },
  created() {
    // 初始化查询列表
    this.enterpriseInit()
    //字典表
    // this.dic()
  },
  methods: {
    enterpriseInit() {
      enterpriseInit().then((res) => {
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
          const enterName = res.data.meizhiqi
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
      coalgasList(params).then((res) => {
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
      this.$router.push({ path: '/coalgasAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/coalgasAdd', query: params })

      } else {
        this.$notify({
          message: '请选择一条数据进行编辑',
          type: 'info',
          offset: 100
        })
      }
    },
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
          coalgasSwitchs(params).then((res) => {
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

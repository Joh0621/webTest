<template>
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
                  type="monthrange"
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
          非供暖季按月填报
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
import { energygasmonthList, energygasmonthSwitchs, dic, energygasdayInit, energygasyearInit } from '@/api/fill'

/*企业名称、盟市名称、时间、状态、
天然气消费量、天然气需求量、天然气供应合同量、天然气计划日供气量、
工业用户天然气消费量、商业用户天然气消费量、建筑业天然气消费量、生活销售天然气销售量、供暖天然气销售量、
可中断工业消费量、不可中断工业消费量、
居民用气量天然气日消费量(万立方米)、民生用气量天然气日消费量(万立方米)、社会车辆用气天然气日消费量(万立方米)、商业用户天然气日消费量(万立方米)、工业燃料天然气日消费量(万立方米)、
甲醇天然气日消费量(万立方米)、化肥天然气日消费量(万立方米)、LNG天然气日消费量(万立方米）*/
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
        time: '',
        leagueCityName: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: 120 },
        { label: '机构名称', param: 'enterName', minWidth: 120 },
        { label: '盟市', param: 'leagueCityName', minWidth: 120 },
        /* { label: '天然气消费量', param: 'naturalGasSales', minWidth: 120 },
         { label: '天然气需求量', param: 'gasDemand', minWidth: 120 },
         { label: '天然气供应合同量', param: 'supplyNaGasContract', minWidth: 150 },*/
        { label: '天然气实际月供气量(万立方米)', param: 'supplyNaGasContract', minWidth: 150 },
        { label: '天然气计划月供气量(万立方米)', param: 'naturalGasPlanSupply', minWidth: 150 },
        { label: '可中断工业消费量(万立方米)', param: 'interruptibleUserSales', minWidth: 150 },
        { label: '不可中断工业消费量(万立方米)', param: 'uninterruptibleUserSales', minWidth: 150 },
        { label: '居民用气量天然气月消费量(万立方米)', param: 'householdSalesDay', minWidth: 200 },
        { label: '民生用气量天然气月消费量(万立方米)', param: 'livelihoodSalesDay', minWidth: 200 },
        { label: '社会车辆用气天然气月消费量(万立方米)', param: 'cityTrafficSalesDay', minWidth: 200 },
        { label: '商业用户天然气月消费量(万立方米)', param: 'businessSalesDay', minWidth: 180 },
        { label: '工业燃料天然气月消费量(万立方米)', param: 'industrySalesDay', minWidth: 180 },
        { label: '甲醛化肥企业月消费量(万立方米)', param: 'methanolSalesDay', minWidth: 180 },
        // { label: '化肥天然气日消费量(万立方米)', param: 'fertilizerSalesDay', minWidth: 180 },
        { label: 'LNG天然气月消费量(万立方米)', param: 'lngSalesDay', minWidth: 180 },
        { label: '城燃企业5%实际储气量(万立方米)', param: 'actualStorageEnterprise', minWidth: 180 },
        { label: '地方政府3天实际储气量(万立方米)', param: 'actualStorageGovernment', minWidth: 180 },
        { label: '盟市天然气月消费总量(万立方米)', param: 'naturalGasSales', minWidth: 180 }
      ],
      selectedRows: [],
      enterNameAry: []
    }
  },
  created() {
    this.energygasdayInit()

    this.dic()
  },
  methods: {
    energygasyearInit() {
      energygasyearInit().then((res) => {
        if (res.success) {
          this.fromSearch.leagueCityName=res.data.mengshi
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
          this.fromSearch.enterName = res.data.zuzhijigou
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
          const enterName = res.data.chengshiranqi
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
        enterName: this.fromSearch.enterName,
        leagueCityName: this.fromSearch.leagueCityName
      }
      energygasmonthList(params).then((res) => {
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
      this.$router.push({ path: '/energygasmonthAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/energygasmonthAdd', query: params })

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
          energygasmonthSwitchs(params).then((res) => {
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

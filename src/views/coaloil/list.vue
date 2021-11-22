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
import { coaloilSwitchs, coaloilList, dic,enterpriseInit } from '@/api/fill'

/*1企业名称、2时间、3状态、4计划粉煤月加工量、5粉煤月加工量、6平均负荷率、
7计划平均负荷率、8水资源用量、9单位产品原料消耗、10单位产品综合能耗、11单位产品新鲜水耗、12石脑油产量、
13柴油产量、14液化气产量、15干气产量、16石脑油供应量、17柴油供应量、18液化气供应量、19干气供应量、20石脑油销售量、21柴油销售量、22液化气销售量、23干气销售量、24汽运供应量、25管输供应量、26工程车辆销售量、27城市交通销售量、28工业销售量、乙烯原料销售量、调合汽油销售量、重整原料销售量、原料煤价格、煤制油品价格、呼和浩特市销售量、包头市销售量、乌海市销售量、赤峰市销售量、通辽市销售量、鄂尔多斯市销售量、
呼伦贝尔市销售量、巴彦淖尔市销售量、乌兰察布市销售量、锡林格勒盟销售量、阿拉善盟销售量、兴安盟销售量、煤制油月产量（万吨）、计划煤制油月产量（万吨）、*/
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
        { label: '时间', param: 'recordDate', minWidth: 120 },
        { label: '企业名称', param: 'enterName', minWidth: 120 },
        { label: '煤制油月产量(万吨)', param: 'coalOilMonthProduct', minWidth: 150 },
        { label: '计划煤制油月产量(万吨)', param: 'coalOilPlanMonthProduct', minWidth: 150 },
        { label: '计划粉煤月加工量', param: 'coalProcessMonth', minWidth: 150 },
        { label: '粉煤月加工量(万吨)', param: 'pulverizedCoalProcessingCapacity', minWidth: 150 },
        { label: '平均负荷率(%)', param: 'avgLoadRate', minWidth: 150 },
        { label: '计划平均负荷率(%)', param: 'planAvgLoadRate', minWidth: 150 },
        { label: '水资源用量(万吨)', param: 'waterUse', minWidth: 150 },
        { label: '煤制油单位产品原料煤耗(吨标准煤)', param: 'naphthaRawCoalConsumption', minWidth: 150 },
        // { label: '柴油单位产品原料煤耗(吨标准煤)', param: 'dieselRawCoalConsumption', minWidth: 150 },
        // { label: '液化气单位产品原料煤耗(吨标准煤)', param: 'lpgRawCoalConsumption', minWidth: 150 },
        { label: '煤制油单位产品综合能耗(吨标准煤)', param: 'naphthaUnitProductComprehensiveEnergySales', minWidth: 150 },
        // { label: '柴油单位产品综合能耗(吨标准煤)', param: 'dieselUnitProductComprehensiveEnergySales', minWidth: 150 },
        // { label: '液化气单位产品综合能耗(吨标准煤)', param: 'lpgUnitProductComprehensiveEnergySales', minWidth: 150 },
        { label: '煤制油单位产品新鲜水耗(吨)', param: 'naphthaUnitProductFreshWaterConsumption', minWidth: 150 },
        // { label: '柴油单位产品新鲜水耗(吨)', param: 'dieselUnitProductFreshWaterConsumption', minWidth: 150 },
        // { label: '液化气单位产品新鲜水耗(吨)', param: 'lpgUnitProductFreshWwaterConsumption', minWidth: 150 },
        /*{ label: '单位产品综合能耗(吨标准煤)', param: 'unitProductComprehensiveEnergySales', minWidth: 150 },
        { label: '单位产品新鲜水耗(吨)', param: 'unitProductFreshWaterConsumption', minWidth: 150 },*/
        { label: '石脑油产量(万吨)', param: 'yieldNaphtha', minWidth: 150 },
        { label: '石脑油计划产量(万吨)', param: 'planYieldNaphtha', minWidth: 150 },
        { label: '柴油产量(万吨)', param: 'yieldDieselOil', minWidth: 150 },
        { label: '柴油计划产量(万吨)', param: 'planYieldDieselOil', minWidth: 150 },
        { label: '液化气产量(万吨)', param: 'yieldLpg', minWidth: 150 },
        { label: '干气产量(万吨)', param: 'yieldDryGas', minWidth: 150 },
        { label: '石脑油供应量(万吨)', param: 'monthSupplyNaphtha', minWidth: 150 },
        { label: '柴油供应量(万吨)', param: 'monthSupplyDieselOil', minWidth: 150 },
        { label: '液化气供应量(万吨)', param: 'monthSupplyLpg', minWidth: 150 },
        { label: '干气供应量(万吨)', param: 'monthSupplyDryGas', minWidth: 150 },
        { label: '石脑油销售量(万吨)', param: 'naphthaSales', minWidth: 150 },
        { label: '柴油销售量(万吨)', param: 'dieselOilSales', minWidth: 150 },
        { label: '液化气销售量(万吨)', param: 'lgpSales', minWidth: 150 },
        { label: '干气销售量(万吨)', param: 'dryGasSales', minWidth: 150 },
        { label: '汽运供应量(万吨)', param: 'supplyBusTrans', minWidth: 150 },
        { label: '管输供应量(万吨)', param: 'supplyPipeTrans', minWidth: 150 },
        { label: '工程车辆销售量(万吨)', param: 'projectBusSales', minWidth: 150 },
        { label: '城市交通销售量(万吨)', param: 'cityTrafficSales', minWidth: 150 },
        { label: '工业销售量(万吨)', param: 'industrySales', minWidth: 150 },
        { label: '乙烯原料销售量(万吨)', param: 'c2h4MaterialSales', minWidth: 150 },
        { label: '调合汽油销售量(万吨)', param: 'mixGasolineSales', minWidth: 150 },
        { label: '重整原料销售量(万吨)', param: 'reformMaterialSales', minWidth: 150 },
        { label: '原料煤价格(元/吨标煤)', param: 'rawCoalPrice', minWidth: 150 },
        { label: '煤制油品价格(元/吨标煤)', param: 'coalOilPrice', minWidth: 150 },
        { label: '呼和浩特市销售量(万吨)', param: 'huhehaoteSales', minWidth: 150 },
        { label: '包头市销售量(万吨)', param: 'baotouSales', minWidth: 150 },
        { label: '乌海市销售量(万吨)', param: 'wuhaiSales', minWidth: 150 },
        { label: '赤峰市销售量(万吨)', param: 'chifengSales', minWidth: 150 },
        { label: '通辽市销售量(万吨)', param: 'tongliaoSales', minWidth: 150 },
        { label: '鄂尔多斯市销售量(万吨)', param: 'eerduosiSales', minWidth: 150 },
        { label: '呼伦贝尔市销售量(万吨)', param: 'hulunbeierSales', minWidth: 150 },
        { label: '巴彦淖尔市销售量(万吨)', param: 'bayannaoerSales', minWidth: 150 },
        { label: '乌兰察布市销售量(万吨)', param: 'wulanchabuSales', minWidth: 150 },
        { label: '锡林格勒盟销售量(万吨)', param: 'xilingelemengSales', minWidth: 150 },
        { label: '阿拉善盟销售量(万吨)', param: 'alashanmengSales', minWidth: 150 },
        { label: '兴安盟销售量(万吨)', param: 'xinganmengSales', minWidth: 150 }
      ],
      selectedRows: [],
      enterNameAry: []
    }
  },
  created() {
    // 初始化查询列表
    this.enterpriseInit()
    // this.dic()
  },
  methods: {
    enterpriseInit() {
      enterpriseInit().then((res) => {
        console.log(res)
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
          const enterName = res.data.meizhiyou
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
      let params = {
        pageNum: val,
        pageSize: pageSize,
        beginTime: this.fromSearch.time ? this.fromSearch.time[0] : null,
        endTime: this.fromSearch.time ? this.fromSearch.time[1] : null,
        enterName: this.fromSearch.enterName
      }
      console.log(params)
      coaloilList(params).then((res) => {
        console.log(res)
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
      this.$router.push({ path: '/coaloilAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/coaloilAdd', query: params })

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
          coaloilSwitchs(params).then((res) => {
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

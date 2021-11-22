<template>
  <!--  油气田油田按月填报-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="油田区域名称" label-width="110px">
                <el-select v-model="fromSearch.oilGasAreaName" placeholder="请选择油田区域名称" clearable>
                  <el-option
                    v-for="item in oilGasOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
                <!--                <el-cascader
                                  v-model="fromSearch.oilGasName"
                                  placeholder="请选择油田名称"
                                  :options="oilGasOptions"
                                  clearable
                                  @change="handleChange"
                                ></el-cascader>-->
              </el-form-item>
            </el-col>
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
import { dic, oilsupplymonthList, oilsupplymonthSwitchs, oilgasdayInit } from '@/api/fill'

/*1油气田名称、2时间、3油气田区域类型、4油气田区域名称、5集团标识、6盟市名称、
7月产量、8计划月产量、9月供应量、10计划月供应量、11区内供应量、12区外供应量、
13月产能、14综合能源消费量、15状态*/
export default {
  name: 'Dashboard',
  components: { TableCmp },
  data() {
    return {
      checkbox: true,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromSearch: {
        time: '',
        oilGasAreaName: '',
        enterName: ''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: '150' },
        { label: '油田区域名称', param: 'oilGasAreaName', minWidth: '150' },
        /* { label: '油气田区域类型', param: 'oilGasAreaType', minWidth: '180' },
         { label: '油气田区域名称', param: 'oilGasAreaName', minWidth: '180' },*/
        /* { label: '油田面积(平方公里)', param: 'oilGasSize', minWidth: '150' },
         { label: '中心经纬度', param: 'oilGasCoordinate', minWidth: '150' },
         { label: '企业名称', param: 'oilGasAreaName', minWidth: '150' },
         { label: '企业结构', param: 'groupType', minWidth: '150' },*/
        // { label: '盟市名称', param: 'leagueCityName', minWidth: '150' },
        /*  { label: '实际月产量(万吨)', param: 'yieldOilGas', minWidth: '150' },
          { label: '计划月产量(万吨)', param: 'oilGasPlanMonthYield', minWidth: '150' },*/
        { label: '实际月供应量(万吨)', param: 'supplyOilGas', minWidth: '150' },
        { label: '计划月供应量(万吨)', param: 'oilGasPlanMonthSupply', minWidth: '150' },
        { label: '区内供应量(万吨)', param: 'supplyInOilGas', minWidth: '150' },
        { label: '区外供应量(万吨)', param: 'supplyOutOilGas', minWidth: '150' }
        /*  { label: '月产能', param: 'capacityOilGas', minWidth: '150' },
          { label: '综合能源消费量', param: 'energyConsumption', minWidth: '180' }*/
      ],
      selectedRows: [],
      oilTypesAry: [],
      oilGasOptions: []
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
    handleChange(val) {
      if (val.length > 0) {
        this.fromSearch.oilGasName = val[val.length - 1]
      } else {
        this.fromSearch.oilGasName = ''
      }
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const data = res.data.oilTypes
          this.oilGasOptions = []
          data.forEach(item => {
            /*  const childList = []
              if (item.childrenProjectType) {
                item.childrenProjectType.forEach((i, idx) => {
                  childList.push(
                    {
                      value: i.typeName,
                      label: i.typeName
                    }
                  )
                })
              }*/
            console.log(item.typeName)
            this.oilGasOptions.push({
              value: item.typeName,
              label: item.typeName
              // children: childList
            })
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
        oilGasAreaName: this.fromSearch.oilGasAreaName
      }
      oilsupplymonthList(params).then((res) => {
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
      this.$router.push({ path: '/oilsupplymonthAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/oilsupplymonthAdd', query: params })

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
          oilsupplymonthSwitchs(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
              const totalPage = Math.ceil((this.total - 1) / this.pageSize)
              const currentPage = this.currentPage > totalPage ? totalPage : this.currentPage
              this.currentPage = currentPage < 1 ? 1 : currentPage
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

<template>
  <!--  油气田企业按日填报-->
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="气田名称" label-width="90px">
                <el-cascader
                  v-model="fromSearch.oilGasName"
                  placeholder="请选择气田名称"
                  :options="oilGasOptions"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="fromSearch.time"
                  type="monthrange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
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
import { MessageBox, Message } from 'element-ui'
import { gasfieldlist, gasfieldSwitchs, dic, oilgasdayInit } from '@/api/fill'
/*1油气田名称、2时间、3油气田区域类型、4油气田区域名称、5集团标识、6盟市名称、
7天然气日产量、8天然气日供气量、9天然气计划日供气量、10天然气日供气合同量、11直供管道公司日供气量、
12直供甲醇厂日供气量、
13直供合成氨日供气量、
14直供液化工厂日供气量、15状态*/
export default {
  name: 'Dashboard',
  components: { TableCmp },
  data() {
    return {
      total: 0,
      checkbox: true,
      currentPage: 1,
      pageSize: 10,
      fromSearch: {
        oilGasName: null,
        time: '',
        name: '',
        name1: '',
        leagueCityName:''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: '150' },
        { label: '气田名称', param: 'oilGasName', minWidth: '150' },
        /*{ label: '油气田区域类型', param: 'oilGasAreaType', minWidth: '180' },
        { label: '油气田区域名称', param: 'oilGasAreaName', minWidth: '180' },*/
        { label: '企业名称', param: 'leagueCityName', minWidth: '180' },
        { label: '企业结构', param: 'groupType', minWidth: '180' },
        // { label: '盟市名称', param: 'leagueCityName', minWidth: '180' },
        { label: '天然气实际月供气量(万立方米)', param: 'daySupplyNaGas', minWidth: '240' },
        { label: '天然气计划月供气量(万立方米)', param: 'dayPlanSupplyNaGas', minWidth: '240' },
        { label: '直供西部天然气月供气量(万立方米)', param: 'daySupplyPipelineCompany', minWidth: '240' },
        { label: '直供新圣天然气月供气量(万立方米)', param: 'daySupplyNaGasContract', minWidth: '240' },
        { label: '其他直供企业城市用气量(万立方米)', param: 'daySupplyCh3oh', minWidth: '240' },
        { label: '其他直供企业工业用气量(万立方米)', param: 'daySupplyNh3', minWidth: '240' },
        { label: '直供液化工厂LNG月供气量(万立方米)', param: 'daySupplyLiquPlant', minWidth: '240' },
        { label: '直供甲醇化肥厂供气量(万立方米)', param: 'dayYieldNaGas', minWidth: '180' }
      ],
      selectedRows: [],
      gasTypesAry: [],
      oilGasOptions: []
    }
  },
  created() {
    // 初始化查询列表
    this.oilgasdayInit()
    this.dic()
  },
  methods: {
    oilgasdayInit(){
      oilgasdayInit().then((res)=>{
        if(res.success){
          this.fromSearch.leagueCityName=res.data.zuzhijigou
          this.list(1, this.pageSize)
        }else{
          this.$notify({
            message: '请求失败',
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
          const data = res.data.gasTypes
          // this.gasTypesAry = data
          this.oilGasOptions = []
          data.forEach(item => {
            const childList = []
            if (item.childrenProjectType) {
              item.childrenProjectType.forEach((i, idx) => {
                childList.push(
                  {
                    value: i.typeName,
                    label: i.typeName
                  }
                )
              })
            }
            this.oilGasOptions.push({
              value: item.typeName,
              label: item.typeName,
              children: childList
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
        oilGasName: this.fromSearch.oilGasName,
        leagueCityName: this.fromSearch.leagueCityName
      }
      gasfieldlist(params).then((res) => {
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
    //新增
    handleAdd() {
      const params = {
        title: '新增',
        statu: 'create'
      }
      this.$router.push({ path: '/gasmonthAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/gasmonthAdd', query: params })
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
          gasfieldSwitchs(params).then((res) => {
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
    },
    handleNodeClick() {

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

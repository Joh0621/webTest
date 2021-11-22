<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <!--            <el-col :span="8">
                          <el-form-item label="企业名称" label-width="90px">
                            <el-select v-model="fromSearch.enterName" placeholder="请选择企业名称" clearable>
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
              <el-form-item label="管线名" label-width="90px">
                <el-select v-model="fromSearch.pipelineName" placeholder="请选择管线名" clearable>
                  <el-option
                    v-for="item in pipelineNameTypeAry"
                    :key="item.pipelineName"
                    :label="item.pipelineName"
                    :value="item.pipelineName"
                  >
                  </el-option>
                </el-select>
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
          按日填报
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
import { crudeList, pipelinedaySwitchs, dic, pipelinedayInit } from '@/api/fill'

/*1企业名称、2时间、3盟市名称、4状态、管线名、管线进油量、管线出油量、
管线管存量、管线累计输油、城市燃气接收量、甲醇接收量、化肥接收量、lng接收气量、状态*/
/*末站压力阈值
末站压力实际值
设计输气（油）能力
实际输气（油）能力*/

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
      loading: false,
      fromSearch: {
        enterName: '',
        pipelineName: ''
      },
      tableData: [],
      tableLabel: [
        { label: '时间', param: 'recordDate', minWidth: 150 },
        { label: '管线名', param: 'pipelineName', minWidth: 150 },
        { label: '所属企业', param: 'enterName', minWidth: 150 },
        { label: '管线进油量(万吨)', param: 'pipelineInputVolume', minWidth: 180 },
        { label: '管线出油量(万吨)', param: 'pipelineOutputVolume', minWidth: 180 },
        { label: '管线管存量(万吨)', param: 'pipelineStock', minWidth: 180 },
        // { label: '管线累计输油(万吨)', param: 'pipelineCumulativeVolume', minWidth: 180 },
        // { label: '末站压力阈值(Mpa)', param: 'pressureThreshold', minWidth: 180 },
        { label: '末站压力实际值(Mpa)', param: 'pressureActualValue', minWidth: 180 }
        // { label: '设计输油能力(万吨/天)', param: 'runPlanPressure', minWidth: 180 },
        // { label: '实际输油能力(万吨/天)', param: 'runPressure', minWidth: 180 }
      ],
      selectedRows: [],
      pipelineNameTypeAry: [],
      enterNameAry: []
    }
  },
  created() {
    // 初始化查询列表
    this.pipelinedayInit()
    //
    // this.dic()
  },
  methods: {
    pipelinedayInit() {
      pipelinedayInit().then((res) => {
        if (res.success) {
          this.fromSearch.enterName = res.data.zuzhijigou
          this.pipelineNameTypeAry = res.data.yuanyou
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
          const pipelineNameType = res.data.yuanyouguandao
          const enterName = res.data.guandao
          this.pipelineNameTypeAry = pipelineNameType
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
        enterName: this.fromSearch.enterName,
        pipelineName: this.fromSearch.pipelineName
      }
      crudeList(params).then((res) => {
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
      this.$router.push({ path: '/crudeAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/crudeAdd', query: params })

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
          pipelinedaySwitchs(params).then((res) => {
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

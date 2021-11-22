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
          管道企业调峰填报
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
        :page-size="pageSize"
        :current-page="currentPage"
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
import { pipelinepeekdaySwitchs, pipelinepeekdayList, pipelinemonthInit } from '@/api/fill'

/*企业名称、盟市名称、时间、状态
商业调峰量
甲醇化肥调峰量
可中断工业调峰量
不可中断工业调峰量
LNG调峰量
盟市储气日调用量（释放气量）
计划日调峰量
实际日调峰量*/

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
        { label: '调峰时间', param: 'recordDate', minWidth: 120 },
        { label: '调峰单位', param: 'enterName', minWidth: 120 },
        { label: '盟市', param: 'leagueCityName', minWidth: 120 },
        { label: '商业调峰量(万立方米)', param: 'businessPeakLoadRegulation', minWidth: 150 },
        { label: '甲醇化肥调峰量(万立方米)', param: 'methanolPeakLoadRegulation', minWidth: 150 },
        { label: '可中断工业调峰量(万立方米)', param: 'interruptiblePeakLoadRegulation', minWidth: 150 },
        { label: '不可中断工业调峰量(万立方米)', param: 'uninterruptiblePeakLoadRegulation', minWidth: 150 },
        { label: 'LNG调峰量(万立方米)', param: 'lngPeakLoadRegulation', minWidth: 150 },
        { label: '盟市储气日调用量(万立方米)', param: 'gasInvoke', minWidth: 150 },
        { label: '计划日调峰量(万立方米)', param: 'planPeakLoadRegulation', minWidth: 150 },
        { label: '实际日调峰量(万立方米)', param: 'peakLoadRegulation', minWidth: 150 },
        { label: '响应等级', param: 'responseLevel', minWidth: 210 },
        // { label: '调峰对象', param: 'peakObject', minWidth: 210 },
        { label: '具体措施', param: 'specificMeasure', minWidth: 160 }
      ],
      selectedRows: [],
      enterNameAry: []
    }
  },
  created() {
    // 初始化查询列表
    this.pipelinemonthInit()
    // this.dic()
  },
  methods: {
    pipelinemonthInit() {
      pipelinemonthInit().then((res) => {
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
      pipelinepeekdayList(params).then((res) => {
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
      this.$router.push({ path: '/pipelinepeakAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/pipelinepeakAdd', query: params })

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
          pipelinepeekdaySwitchs(params).then((res) => {
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

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="fromSearch" size="small" label-width="80px" class="form-box clearfix">
        <div class="search-input">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="管道类型" label-width="70px">
                <el-select v-model="fromSearch.pipelineType" clearable>
                  <el-option
                    v-for="item in pipelineTypeAry"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeName"
                  >
                  </el-option>
                </el-select>
                <!--                <el-cascader
                                  v-model="fromSearch.pipelineName"
                                  placeholder="请选择管线类型"
                                  :options="pipelineNameOptions"
                                  @change="handleChange"
                                  clearable
                                ></el-cascader>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="管线名" label-width="70px">
                <!--                <el-cascader
                                  v-model="fromSearch.pipelineName"
                                  placeholder="请选择管线名称"
                                  :options="pipelineNameOptions"
                                  @change="handleChange"
                                  clearable
                                ></el-cascader>-->
                <el-input v-model="fromSearch.pipelineName"></el-input>
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
          管道信息填报
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
import { dic, pipelinemonthInit, pipelinemonthlList, pipelinemonthSwitchs } from '@/api/fill'

/*1管道名、2管道类别、3企业名称、4企业性质、5企业地址、
6时间、7管径、8境内里程、9设计运输能力（亿立方米/年）、
10投产时间、11全线起点位置、12全线终点位置、13区内起点、
14区内终点、15设计压力、16法人代表、17安全负责人、18安全负责人电话 、
19是否运行*/
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
        pipelineName: '',
        pipelineType: '',
        enterName:''
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: '管道类型', param: 'pipelineType', minWidth: 150 },
        { label: '管线名', param: 'pipelineName', minWidth: 150 },
        { label: '所属企业', param: 'enterName', minWidth: 150 },
        // { label: '企业性质', param: 'enterType', minWidth: 150 },
        // { label: '企业地址', param: 'enterAddress', minWidth: 150 },
        // { label: '时间', param: 'recordDate', minWidth: 150 },
        { label: '管径(毫米)', param: 'pipelineDiameter', minWidth: 150 },
        { label: '境内里程', param: 'pipelineLength', minWidth: 150 },
        { label: '设计运输能力', param: 'transportPower', minWidth: 180 },
        { label: '投产时间', param: 'dateIncreaseInvest', minWidth: 180 },
        { label: '全线起点位置', param: 'startPipeline', minWidth: 150 },
        { label: '全线终点位置', param: 'endPipeline', minWidth: 150 },
        { label: '区内起点', param: 'startInPipeline', minWidth: 180 },
        { label: '区内终点', param: 'endInPipeline', minWidth: 180 },
        { label: '设计压力(Mpa)', param: 'designPressure', minWidth: 150 },
        { label: '法人代表', param: 'legalRepresentative', minWidth: 150 },
        { label: '负责人', param: 'chargeUser', minWidth: 150 },
        { label: '管道长度(千米)', param: 'pipelineTotalLength', minWidth: 150 },
        { label: '是否运行', param: 'isUse', minWidth: 150 }
      ],
      selectedRows: [],
      pipelineNameTypeAry: [],
      pipelineTypeAry: [],
      pipelineNameOptions: []
    }
  },
  created() {
    // 初始化查询列表
   this.pipelinemonthInit()
    //
    this.dic()
  },
  methods: {
    pipelinemonthInit() {
      pipelinemonthInit().then((res) => {
        if (res.success) {
          this.fromSearch.enterName = res.data.zuzhijigou
          this.list(1, this.pageSize)
        } else {
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
        this.fromSearch.pipelineName = val[val.length - 1]
      } else {
        this.fromSearch.pipelineName = ''
      }
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const pipelineType = res.data.pipelineType
          this.pipelineTypeAry = pipelineType
          /* this.pipelineNameOptions = []
           pipelineType.forEach(item => {
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
             this.pipelineNameOptions.push({
               value: item.typeName,
               label: item.typeName,
               children: childList
             })
           })*/
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
        pipelineType: this.fromSearch.pipelineType,
        pipelineName: this.fromSearch.pipelineName,
        enterName: this.fromSearch.enterName
      }
      pipelinemonthlList(params).then((res) => {
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
      this.$router.push({ path: '/pipelinemonthAdd', query: params })

    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/pipelinemonthAdd', query: params })

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
          pipelinemonthSwitchs(params).then((res) => {
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

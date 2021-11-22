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
import { dic, enterpriseInit, refinerylList, refinerySwitchs } from '@/api/fill'

/*1企业名称、2时间、3盟市名称、4状态、
原油月加工量、原油计划月加工量、成品油产量、计划成品油月产量、计划负荷率、平均负荷率、
89#汽油产量、92#汽油产量、95#汽油产量、
负35号柴油产量、负20号柴油产量、负10号柴油产量、0号柴油产量、
煤油产量*/
/*成品油区外调入量
呼炼供应量
总调出量
89#汽油供应量
92#汽油供应量
95#汽油供应量
0#柴油供应量
负10#柴油供应量
负20#柴油供应量
负35#柴油供应量
煤油供应量
商业的成品油供应量
交通的成品油供应量
工业的成品油供应量
农业的成品油供应量*/
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
        { label: '原油月加工量(万吨)', param: 'crudeOilProcessingCapacity', minWidth: 150 },
        { label: '原油计划月加工量(万吨)', param: 'oilPlanMonthProcess', minWidth: 180 },
        { label: '成品油产量(万吨)', param: 'yieldProductedOil', minWidth: 150 },
        { label: '计划成品油月产量(万吨)', param: 'productedOilPlanMonthProduct', minWidth: 180 },
        { label: '计划负荷率(%)', param: 'planLoadRate', minWidth: 150 },
        { label: '平均负荷率(%)', param: 'avgLoadRate', minWidth: 150 },
        { label: '98#汽油产量(万吨)', param: 'yieldGasoline89', minWidth: 180 },
        { label: '92#汽油产量(万吨)', param: 'yieldGasoline92', minWidth: 150 },
        { label: '95#汽油产量(万吨)', param: 'yieldGasoline95', minWidth: 180 },
        { label: '负35号柴油产量(万吨)', param: 'yieldDieselOilMinus35', minWidth: 180 },
        { label: '负20号柴油产量(万吨)', param: 'yieldDieselOilMinus20', minWidth: 180 },
        { label: '负10号柴油产量(万吨)', param: 'yieldDieselOilMinus10', minWidth: 180 },
        { label: '0号柴油产量(万吨)', param: 'yieldDieselOil0', minWidth: 180 },
        { label: '煤油产量(万吨)', param: 'yieldAviationCoal', minWidth: 150 },
        // { label: '成品油区外调入量', param: 'productedOilTransferInVolume', minWidth: 150 },
        // { label: '呼炼供应量', param: 'productedOilRefineInVolume', minWidth: 180 },
        // { label: '总调出量', param: 'productedOilTransferOutVolume', minWidth: 150 },
        { label: '成品油总调出量(万吨)', param: 'productedOilTransferOutVolume', minWidth: 210 },
        { label: '成品油呼炼供应量(万吨)', param: 'productedOilRefineInVolume', minWidth: 210 },
        { label: '98#汽油供应量(万吨)', param: 'supplyGasoline89', minWidth: 180 },
        { label: '92#汽油供应量(万吨)', param: 'supplyGasoline92', minWidth: 180 },
        { label: '95#汽油供应量(万吨)', param: 'supplyGasoline95', minWidth: 180 },
        { label: '0#柴油供应量(万吨)', param: 'supplyDieselOil0', minWidth: 180 },
        { label: '负10#柴油供应量(万吨)', param: 'supplyDieselOilMinus10', minWidth: 180 },
        { label: '负20#柴油供应量(万吨)', param: 'supplyDieselOilMinus20', minWidth: 150 },
        { label: '负35#柴油供应量(万吨)', param: 'supplyDieselOilMinus35', minWidth: 150 },
        { label: '煤油供应量(万吨)', param: 'aviationCoalSupply', minWidth: 180 },
        { label: '商业的成品油供应量(万吨)', param: 'businessProductedOilSupply', minWidth: 150 },
        { label: '交通的成品油供应量(万吨)', param: 'trafficProductedOilSupply', minWidth: 180 },
        { label: '工业的成品油供应量(万吨)', param: 'industryProductedOilSupply', minWidth: 180 },
        { label: '农业的成品油供应量(万吨)', param: 'agriculturalProductedOilSupply', minWidth: 180 },
        { label: '呼和浩特市成品油供应量(万吨)', param: 'huhehaoteSupply', minWidth: 150 },
        { label: '包头市成品油供应量(万吨)', param: 'baotouSupply', minWidth: 180 },
        { label: '乌海市成品油供应量(万吨)', param: 'wuhaiSupply', minWidth: 180 },
        { label: '赤峰市成品油供应量(万吨)', param: 'chifengSupply', minWidth: 180 },
        { label: '通辽市成品油供应量(万吨)', param: 'tongliaoSupply', minWidth: 150 },
        { label: '鄂尔多斯市成品油供应量(万吨)', param: 'eerduosiSupply', minWidth: 180 },
        { label: '呼伦贝尔市成品油供应量(万吨)', param: 'hulunbeierSupply', minWidth: 180 },
        { label: '巴彦淖尔市成品油供应量(万吨)', param: 'bayannaoerSupply', minWidth: 180 },
        { label: '乌兰察布市成品油供应量(万吨)', param: 'wulanchabuSupply', minWidth: 150 },
        { label: '锡林格勒盟成品油供应量(万吨)', param: 'xilingelemengSupply', minWidth: 180 },
        { label: '阿拉善盟销成品油供应量(万吨)', param: 'alashanmengSupply', minWidth: 180 },
        { label: '兴安盟成品油供应量(万吨)', param: 'xinganmengSupply', minWidth: 180 }
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
          const enterName = res.data.lianchang
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
      refinerylList(params).then((res) => {
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
      this.$router.push({ path: '/refineryAdd', query: params })
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: '编辑',
          id: this.selectedRows[0],
          statu: 'update'
        }
        this.$router.push({ path: '/refineryAdd', query: params })

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
          refinerySwitchs(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
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

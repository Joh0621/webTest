<template>
  <div class="app-container">
    <div class="form-add"><span class="first">炼厂企业填报</span>
      <span class="first-line">></span>
      <span class="first">按月填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="170px"
               class="form-box clearfix"
      >
        <!--        /*1企业名称、2时间、3盟市名称、4状态、
                原油月加工量、原油计划月加工量、成品油产量、计划成品油月产量、计划负荷率、平均负荷率、
                89#汽油产量、92#汽油产量、95#汽油产量、
                负35号柴油产量、负20号柴油产量、负10号柴油产量、0号柴油产量、
                煤油产量*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit" prop="enterName">
<!--              <el-select v-model="editForm.enterName" clearable>
                <el-option
                  v-for="item in enterNameAry"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                >
                </el-option>
              </el-select>-->
              <el-input v-model="editForm.enterName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原油月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.crudeOilProcessingCapacity"
                        type="number"
                        @input="minMax('crudeOilProcessingCapacity',editForm.crudeOilProcessingCapacity)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原油计划月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.oilPlanMonthProcess"
                        type="number"
                        @input="minMax('oilPlanMonthProcess',editForm.oilPlanMonthProcess)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成品油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldProductedOil"
                        type="number"
                        @input="minMax('yieldProductedOil',editForm.yieldProductedOil)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划成品油月产量">
              <el-input placeholder="请输入内容" v-model="editForm.productedOilPlanMonthProduct"
                        type="number"
                        @input="minMax('productedOilPlanMonthProduct',editForm.productedOilPlanMonthProduct)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划负荷率">
              <el-input placeholder="请输入内容" v-model="editForm.planLoadRate"
                        type="number"
                        @input="minMax('planLoadRate',editForm.planLoadRate)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平均负荷率">
              <el-input placeholder="请输入内容" v-model="editForm.avgLoadRate"
                        type="number"
                        @input="minMax('avgLoadRate',editForm.avgLoadRate)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="98#汽油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldGasoline89"
                        type="number"
                        @input="minMax('yieldGasoline89',editForm.yieldGasoline89)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="92#汽油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldGasoline92"
                        type="number"
                        @input="minMax('yieldGasoline92',editForm.yieldGasoline92)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="95#汽油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldGasoline95"
                        type="number"
                        @input="minMax('yieldGasoline95',editForm.yieldGasoline95)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负35号柴油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDieselOilMinus35"
                        type="number"
                        @input="minMax('yieldDieselOilMinus35',editForm.yieldDieselOilMinus35)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负20号柴油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDieselOilMinus20"
                        type="number"
                        @input="minMax('yieldDieselOilMinus20',editForm.yieldDieselOilMinus20)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负10号柴油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDieselOilMinus10"
                        type="number"
                        @input="minMax('yieldDieselOilMinus10',editForm.yieldDieselOilMinus10)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="0号柴油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDieselOil0"
                        type="number"
                        @input="minMax('yieldDieselOil0',editForm.yieldDieselOil0)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 煤油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldAviationCoal"
                        type="number"
                        @input="minMax('yieldAviationCoal',editForm.yieldAviationCoal)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成品油总调出量">
              <el-input placeholder="请输入内容" v-model="editForm.productedOilTransferOutVolume"
                        type="number"
                        @input="minMax('productedOilTransferOutVolume',editForm.productedOilTransferOutVolume)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成品油呼炼供应量">
              <el-input placeholder="请输入内容" v-model="editForm.productedOilRefineInVolume"
                        type="number"
                        @input="minMax('productedOilRefineInVolume',editForm.productedOilRefineInVolume)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="98#汽油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyGasoline89"
                        type="number"
                        @input="minMax('supplyGasoline89',editForm.supplyGasoline89)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="92#汽油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyGasoline92"
                        type="number"
                        @input="minMax('supplyGasoline92',editForm.supplyGasoline92)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="95#汽油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyGasoline95"
                        type="number"
                        @input="minMax('supplyGasoline95',editForm.supplyGasoline95)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="0#柴油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyDieselOil0"
                        type="number"
                        @input="minMax('supplyDieselOil0',editForm.supplyDieselOil0)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="负10#柴油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyDieselOilMinus10"
                        type="number"
                        @input="minMax('supplyDieselOilMinus10',editForm.supplyDieselOilMinus10)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负20#柴油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyDieselOilMinus20"
                        type="number"
                        @input="minMax('supplyDieselOilMinus20',editForm.supplyDieselOilMinus20)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="负35#柴油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyDieselOilMinus35"
                        type="number"
                        @input="minMax('supplyDieselOilMinus35',editForm.supplyDieselOilMinus35)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.aviationCoalSupply"
                        type="number"
                        @input="minMax('aviationCoalSupply',editForm.aviationCoalSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="商业的成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.businessProductedOilSupply"
                        type="number"
                        @input="minMax('businessProductedOilSupply',editForm.businessProductedOilSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交通的成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.trafficProductedOilSupply"
                        type="number"
                        @input="minMax('trafficProductedOilSupply',editForm.trafficProductedOilSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="工业的成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.industryProductedOilSupply"
                        type="number"
                        @input="minMax('industryProductedOilSupply',editForm.industryProductedOilSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="农业的成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.agriculturalProductedOilSupply"
                        type="number"
                        @input="minMax('agriculturalProductedOilSupply',editForm.agriculturalProductedOilSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="呼和浩特市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.huhehaoteSupply"
                        type="number"
                        @input="minMax('huhehaoteSupply',editForm.huhehaoteSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包头市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.baotouSupply"
                        type="number"
                        @input="minMax('baotouSupply',editForm.baotouSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="乌海市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.wuhaiSupply"
                        type="number"
                        @input="minMax('wuhaiSupply',editForm.wuhaiSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赤峰市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.chifengSupply"
                        type="number"
                        @input="minMax('chifengSupply',editForm.chifengSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="通辽市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.tongliaoSupply"
                        type="number"
                        @input="minMax('tongliaoSupply',editForm.tongliaoSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="鄂尔多斯市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.eerduosiSupply"
                        type="number"
                        @input="minMax('eerduosiSupply',editForm.eerduosiSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="呼伦贝尔市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.hulunbeierSupply"
                        type="number"
                        @input="minMax('hulunbeierSupply',editForm.hulunbeierSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="巴彦淖尔市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.bayannaoerSupply"
                        type="number"
                        @input="minMax('bayannaoerSupply',editForm.bayannaoerSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="乌兰察布市成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.wulanchabuSupply"
                        type="number"
                        @input="minMax('wulanchabuSupply',editForm.wulanchabuSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="锡林格勒盟成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.xilingelemengSupply"
                        type="number"
                        @input="minMax('xilingelemengSupply',editForm.xilingelemengSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="阿拉善盟销成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.alashanmengSupply"
                        type="number"
                        @input="minMax('alashanmengSupply',editForm.alashanmengSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兴安盟成品油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.xinganmengSupply"
                        type="number"
                        @input="minMax('xinganmengSupply',editForm.xinganmengSupply)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer-btn">
      <el-button class="close-btn" @click="close">取 消</el-button>
      <el-button class="confrim-btn" type="primary"
                 @click="statu==='create'?createData('editForm'):updateData('editForm')"
      >确 定
      </el-button>
    </div>
  </div>

</template>

<script>
import { dic, enterpriseInit, refinerySave, refineryUpdate } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        enterName: '',
        recordDate: '',
        crudeOilProcessingCapacity: '',
        oilPlanMonthProcess: '',
        yieldProductedOil: '',
        productedOilPlanMonthProduct: '',
        planLoadRate: '',
        avgLoadRate: '',
        yieldGasoline89: '',
        yieldGasoline92: '',
        yieldGasoline95: '',
        yieldDieselOilMinus35: '',
        yieldDieselOilMinus20: '',
        yieldDieselOilMinus10: '',
        yieldDieselOil0: '',
        yieldAviationCoal: '',
        productedOilRefineInVolume: '',
        productedOilTransferOutVolume: '',
        supplyGasoline89: '',
        supplyGasoline92: '',
        supplyGasoline95: '',
        supplyDieselOil0: '',
        supplyDieselOilMinus10: '',
        supplyDieselOilMinus20: '',
        supplyDieselOilMinus35: '',
        aviationCoalSupply: '',
        businessProductedOilSupply: '',
        trafficProductedOilSupply: '',
        industryProductedOilSupply: '',
        agriculturalProductedOilSupply: '',
        huhehaoteSupply: '',
        baotouSupply: '',
        wuhaiSupply: '',
        chifengSupply: '',
        tongliaoSupply: '',
        eerduosiSupply: '',
        hulunbeierSupply: '',
        bayannaoerSupply: '',
        wulanchabuSupply: '',
        xilingelemengSupply: '',
        alashanmengSupply: '',
        xinganmengSupply: ''
      },
      rules: {
        /*enterName: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],*/
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      enterNameAry: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    // this.dic()
    this.enterpriseInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    enterpriseInit() {
      enterpriseInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    minMax(name, value) {
      if (value < 0) {
        this.editForm[name] = 0
      } else if (value > 1000000) {
        this.editForm[name] = 1000000
      }
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
    // 数据回显
    update() {
      refineryUpdate(this.$route.query.id).then((res) => {
        if (res.code === 0) {
          this.editForm = res.body
        } else {
          this.$notify({
            message: '请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    close() {
      this.$router.push('/refinery/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          refinerySave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/refinery/list')
            } else {
              this.$notify({
                message: '保存失败' + (res.body == '已存在该记录！' ? ',' + res.body : ''),
                type: 'error',
                offset: 100
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑保存
    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          refinerySave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/refinery/list')
            } else {
              this.$notify({
                message: '修改失败' + (res.body == '已存在该记录！' ? ',' + res.body : ''),
                type: 'error',
                offset: 100
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

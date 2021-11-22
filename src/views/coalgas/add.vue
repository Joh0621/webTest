<template>
  <div class="app-container">
    <div class="form-add"><span class="first">煤制气企业填报</span>
      <span class="first-line">></span>
      <span class="first">按月填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm"

               size="small" label-width="140px" class="form-box clearfix"
      >
        <!--        /*1企业名称、2时间、3盟市名称、4计划粉煤月加工量、5粉煤月加工量、6平均负荷率、
                7计划平均负荷率、8水资源用量、9单位产品原料消耗、10单位产品综合能耗、11单位产品新鲜水耗、12煤制气产量、
                13煤制气月供应量、14管道气供应量、15CNG供应量、16LNG供应量、17终端消费量、18化工消费量、19火力发电消费量、20供热消费量、21工业消费量、22生活消费量、23建筑业消费量、24商业消费量、25交通消费量、26调峰煤制气用量、27煤制气计划月供应量、28煤制气消费量、29状态*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit" prop="enterName">
<!--              <el-select v-model="editForm.enterName" placeholder="请选择">
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
                value-format="yyyy-MM"
                type="month"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!--          <el-col :span="12">
                      <el-form-item label="盟市名称" class="no-unit">
                        <el-select v-model="editForm.leagueCityName" placeholder="请选择">
                          <el-option
                            v-for="item in leagueCityNameAry"
                            :key="item.dictItemName"
                            :label="item.dictItemName"
                            :value="item.dictItemName"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="12">
            <el-form-item label="煤制气产量">
              <el-input placeholder="请输入内容" v-model="editForm.gasYield"
                        type="number"
                        @input="minMax('gasYield',editForm.gasYield)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划煤制气（天然气）产量">
              <el-input placeholder="请输入内容" v-model="editForm.gasPlanMonthProduct"
                        type="number"
                        @input="minMax('gasPlanMonthProduct',editForm.gasPlanMonthProduct)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="粉煤月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.pulverizedCoalProcessingCapacity"
                        type="number"
                        @input="minMax('pulverizedCoalProcessingCapacity',editForm.pulverizedCoalProcessingCapacity)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划粉煤月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.coalProcessMonth"
                        type="number"
                        @input="minMax('coalProcessMonth',editForm.coalProcessMonth)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <el-col :span="12">
            <el-form-item label="计划平均负荷率">
              <el-input placeholder="请输入内容" v-model="editForm.planAvgLoadRate"
                        type="number"
                        @input="minMax('planAvgLoadRate',editForm.planAvgLoadRate)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="水资源用量">
              <el-input placeholder="请输入内容" v-model="editForm.waterUse"
                        type="number"
                        @input="minMax('waterUse',editForm.waterUse)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位产品原料消耗">
              <el-input placeholder="请输入内容" v-model="editForm.unitProductRawSales"
                        type="number"
                        @input="minMax('unitProductRawSales',editForm.unitProductRawSales)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位产品综合能耗">
              <el-input placeholder="请输入内容" v-model="editForm.unitProductComprehensiveEnergySales"
                        type="number"
                        @input="minMax('unitProductComprehensiveEnergySales',editForm.unitProductComprehensiveEnergySales)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位产品新鲜水耗">
              <el-input placeholder="请输入内容" v-model="editForm.unitProductFreshWaterSales"
                        type="number"
                        @input="minMax('unitProductFreshWaterSales',editForm.unitProductFreshWaterSales)"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="煤制气供应量">
              <el-input placeholder="请输入内容" v-model="editForm.gasSupply"
                        type="number"
                        @input="minMax('gasSupply',editForm.gasSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制气计划月供应量">
              <el-input placeholder="请输入内容" v-model="editForm.gasPlanMonthSupply"
                        type="number"
                        @input="minMax('gasPlanMonthSupply',editForm.gasPlanMonthSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="管道气供应量">
              <el-input placeholder="请输入内容" v-model="editForm.pipelineGasSupply"
                        type="number"
                        @input="minMax('pipelineGasSupply',editForm.pipelineGasSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CNG供应量">
              <el-input placeholder="请输入内容" v-model="editForm.cngSupply"
                        type="number"
                        @input="minMax('cngSupply',editForm.cngSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="LNG供应量">
              <el-input placeholder="请输入内容" v-model="editForm.lngSupply"
                        type="number"
                        @input="minMax('lngSupply',editForm.lngSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制气消费量">
              <el-input placeholder="请输入内容" v-model="editForm.gasConsumption"
                        type="number"
                        @input="minMax('gasConsumption',editForm.gasConsumption)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="终端消费量">
              <el-input placeholder="请输入内容" v-model="editForm.householdSales"
                        type="number"
                        @input="minMax('householdSales',editForm.householdSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="化工消费量">
              <el-input placeholder="请输入内容" v-model="editForm.chemicalConsumption"
                        type="number"
                        @input="minMax('chemicalConsumption',editForm.chemicalConsumption)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="火力发电消费量">
              <el-input placeholder="请输入内容" v-model="editForm.thermalPowerSales"
                        type="number"
                        @input="minMax('thermalPowerSales',editForm.thermalPowerSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工业消费量">
              <el-input placeholder="请输入内容" v-model="editForm.industrySales"
                        type="number"
                        @input="minMax('industrySales',editForm.industrySales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供热消费量">
              <el-input placeholder="请输入内容" v-model="editForm.heatingSales"
                        type="number"
                        @input="minMax('heatingSales',editForm.heatingSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑业消费量">
              <el-input placeholder="请输入内容" v-model="editForm.constructionIndustrySales"
                        type="number"
                        @input="minMax('constructionIndustrySales',editForm.constructionIndustrySales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商业消费量">
              <el-input placeholder="请输入内容" v-model="editForm.businessSales"
                        type="number"
                        @input="minMax('businessSales',editForm.businessSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交通消费量">
              <el-input placeholder="请输入内容" v-model="editForm.trafficSales"
                        type="number"
                        @input="minMax('trafficSales',editForm.trafficSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生活消费量">
              <el-input placeholder="请输入内容" v-model="editForm.lifeSales"
                        type="number"
                        @input="minMax('lifeSales',editForm.lifeSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调峰煤制气用量">
              <el-input placeholder="请输入内容" v-model="editForm.peakShavingSales"
                        type="number"
                        @input="minMax('peakShavingSales',editForm.peakShavingSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原料煤价格">
              <el-input placeholder="请输入内容" v-model="editForm.rawCoalPrice"
                        type="number"
                        @input="minMax('rawCoalPrice',editForm.rawCoalPrice)"
              >
                <template slot="append">元/吨标煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制气价格">
              <el-input placeholder="请输入内容" v-model="editForm.coalGasPrice"
                        type="number"
                        @input="minMax('coalGasPrice',editForm.coalGasPrice)"
              >
                <template slot="append">元/吨标煤</template>
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
import { coalgasSave, coalgasUpdate, dic, enterpriseInit } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        enterName: '',
        recordDate: '',
        leagueCityName: '',
        coalProcessMonth: '',
        gasPlanMonthProduct: '',
        pulverizedCoalProcessingCapacity: '',
        avgLoadRate: '',
        planAvgLoadRate: '',
        waterUse: '',
        unitProductRawSales: '',
        unitProductComprehensiveEnergySales: '',
        unitProductFreshWaterSales: '',
        gasYield: '',
        gasSupply: '',
        pipelineGasSupply: '',
        cngSupply: '',
        lngSupply: '',
        householdSales: '',
        chemicalConsumption: '',
        thermalPowerSales: '',
        heatingSales: '',
        industrySales: '',
        lifeSales: '',
        constructionIndustrySales: '',
        businessSales: '',
        trafficSales: '',
        peakShavingSales: '',
        gasPlanMonthSupply: '',
        gasConsumption: '',
        coalGasPrice: '',
        rawCoalPrice: ''
      },
      rules: {
       /* enterName: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],*/
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      enterNameAry: [],
      leagueCityNameAry: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.dic()
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
          const data = res.data
          // const enterName = data.meizhiqi
          const leagueCityType = data.leagueCityType
          this.leagueCityNameAry = leagueCityType
          // this.enterNameAry = enterName
        }
      })
    },
    // 数据回显
    update() {
      coalgasUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/coalgas/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          coalgasSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/coalgas/list')
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

    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          coalgasSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/coalgas/list')
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

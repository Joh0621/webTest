<template>
  <div class="app-container">
    <div class="form-add"><span class="first">能源局填报</span>
      <span class="first-line">></span>
      <span class="first">盟市消费及储气填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="200px"
               class="form-box clearfix"
      >
        <!--        /*企业名称、盟市名称、时间、状态、
                天然气消费量、天然气需求量、天然气供应合同量、天然气计划日供气量、
                工业用户天然气消费量、商业用户天然气消费量、建筑业天然气消费量、生活销售天然气销售量、供暖天然气销售量、
                可中断工业消费量、不可中断工业消费量、
                居民用气量天然气日消费量(万立方米)、民生用气量天然气日消费量(万立方米)、社会车辆用气天然气日消费量(万立方米)、商业用户天然气日消费量(万立方米)、工业燃料天然气日消费量(万立方米)、
                甲醇天然气日消费量(万立方米)、化肥天然气日消费量(万立方米)、LNG天然气日消费量(万立方米）*-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" class="no-unit" prop="enterName">
              <!--              <el-select v-model="editForm.enterName">
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
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市名称" class="no-unit">
              <!--              <el-select v-model="editForm.leagueCityName">
                              <el-option
                                v-for="item in leagueCityTypeAry"
                                :key="item.dictItemName"
                                :label="item.dictItemName"
                                :value="item.dictItemName"
                              >
                              </el-option>
                            </el-select>-->
              <el-input v-model="editForm.leagueCityName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="天然气实际日供气量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyNaGasContract"
                        type="number"
                        @input="minMax('supplyNaGasContract',editForm.supplyNaGasContract)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="天然气计划日供气量">
              <el-input placeholder="请输入内容" v-model="editForm.naturalGasPlanSupply"
                        type="number"
                        @input="minMax('naturalGasPlanSupply',editForm.naturalGasPlanSupply)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可中断工业消费量">
              <el-input placeholder="请输入内容" v-model="editForm.interruptibleUserSales"
                        type="number"
                        @input="minMax('interruptibleUserSales',editForm.interruptibleUserSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="不可中断工业消费量">
              <el-input placeholder="请输入内容" v-model="editForm.uninterruptibleUserSales"
                        type="number"
                        @input="minMax('uninterruptibleUserSales',editForm.uninterruptibleUserSales)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居民用气量天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.householdSalesDay"
                        type="number"
                        @input="minMax('householdSalesDay',editForm.householdSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民生用气量天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.livelihoodSalesDay"
                        type="number"
                        @input="minMax('livelihoodSalesDay',editForm.livelihoodSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社会车辆用气天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.cityTrafficSalesDay"
                        type="number"
                        @input="minMax('cityTrafficSalesDay',editForm.cityTrafficSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商业用户天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.businessSalesDay"
                        type="number"
                        @input="minMax('businessSalesDay',editForm.businessSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工业燃料天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.industrySalesDay"
                        type="number"
                        @input="minMax('industrySalesDay',editForm.industrySalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲醛化肥企业日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.methanolSalesDay"
                        type="number"
                        @input="minMax('methanolSalesDay',editForm.methanolSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
                      <el-form-item label="化肥天然气日消费量">
                        <el-input placeholder="请输入内容" v-model="editForm.fertilizerSalesDay"
                                  type="number"
                                  @input="minMax('fertilizerSalesDay',editForm.fertilizerSalesDay)">
                          <template slot="append">万立方米</template>
                        </el-input>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="12">
            <el-form-item label="LNG天然气日消费量">
              <el-input placeholder="请输入内容" v-model="editForm.lngSalesDay"
                        type="number"
                        @input="minMax('lngSalesDay',editForm.lngSalesDay)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城燃企业5%实际储气量">
              <el-input placeholder="请输入内容" v-model="editForm.actualStorageEnterprise"
                        type="number"
                        @input="minMax('actualStorageEnterprise',editForm.actualStorageEnterprise)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地方政府3天实际储气量">
              <el-input placeholder="请输入内容" v-model="editForm.actualStorageGovernment"
                        type="number"
                        @input="minMax('actualStorageGovernment',editForm.actualStorageGovernment)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市天然气日消费总量">
              <el-input placeholder="请输入内容" v-model="editForm.naturalGasSales"
                        type="number"
                        @input="minMax('naturalGasSales',editForm.naturalGasSales)"
              >
                <template slot="append">万立方米</template>
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
import { energygasdaySave, energygasdayUpdate, dic, energygasdayInit, energygasyearInit } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      leagueCityTypeAry: [],
      enterNameAry: [],
      editForm: {
        recordDate: '',
        enterName: '',
        leagueCityName: '',
        naturalGasSales: '',
        gasDemand: '',
        naturalGasPlanSupply: '',
        interruptibleUserSales: '',
        uninterruptibleUserSales: '',
        householdSalesDay: '',
        livelihoodSalesDay: '',
        cityTrafficSalesDay: '',
        businessSalesDay: '',
        industrySalesDay: '',
        methanolSalesDay: '',
        fertilizerSalesDay: '',
        lngSalesDay: '',
        actualStorageEnterprise: '',
        supplyNaGasContract: '',
        actualStorageGovernment: ''
      },
      rules: {
        /* enterName: [
           { required: true, message: '请选择企业名称', trigger: 'change' }
         ],*/
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.dic()
    this.energygasdayInit()
    this.energygasyearInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    energygasyearInit() {
      energygasyearInit().then((res) => {
        if (res.success) {
          this.editForm.leagueCityName = res.data.mengshi
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
          const data = res.data.leagueCityType
          const enterName = res.data.chengshiranqi
          this.leagueCityTypeAry = data
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
      energygasdayUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/energygasday/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          energygasdaySave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/energygasday/list')
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
          energygasdaySave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/energygasday/list')
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

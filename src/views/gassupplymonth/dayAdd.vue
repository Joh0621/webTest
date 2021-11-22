<template>
  <div class="app-container">
    <div class="form-add"><span class="first">油气田企业填报</span>
      <span class="first-line">></span>
      <span class="first">按月填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" label-width="190px" :rules="rules" ref="ruleForm"
               class="form-box clearfix"
      >
        <!--        1油气田名称、2时间、3油气田区域类型、4油气田区域名称、5集团标识、6盟市名称、
                7天然气日产量、8天然气日供气量、9天然气计划日供气量、10天然气日供气合同量、11直供管道公司日供气量、
                12直供甲醇厂日供气量、
                13直供合成氨日供气量、
                14直供液化工厂日供气量、-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="气田名称" class="no-unit" prop="oilGasName">
              <el-cascader
                v-model="editForm.oilGasName"
                placeholder="请选择气田名称"
                :options="oilGasOptions"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                type="month"
                placeholder="请选择日期"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit">
              <el-input v-model="editForm.leagueCityName" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业结构" class="no-unit">
<!--              <el-select v-model="editForm.groupType" placeholder="请选择">
                <el-option
                  v-for="item in optionsGroupType"
                  :key="item.dictItemName"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>-->
              <el-input v-model="editForm.groupType" disabled ></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="天然气实际月供气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyNaGas"
                        type="number"
                        @input="minMax('daySupplyNaGas',editForm.daySupplyNaGas)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="天然气计划月供气量">
              <el-input placeholder="请输入内容" v-model="editForm.dayPlanSupplyNaGas"
                        type="number"
                        @input="minMax('dayPlanSupplyNaGas',editForm.dayPlanSupplyNaGas)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
<!--          <el-col :span="12">
            <el-form-item label="天然气日供气合同量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyNaGasContract"
                        type="number"
                        @input="minMax('daySupplyNaGasContract',editForm.daySupplyNaGasContract)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="直供西部天然气月供气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyPipelineCompany"
                        type="number"
                        @input="minMax('daySupplyPipelineCompany',editForm.daySupplyPipelineCompany)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直供新圣天然气月供气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyNaGasContract"
                        type="number"
                        @input="minMax('daySupplyNaGasContract',editForm.daySupplyNaGasContract)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="其他直供企业城市用气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyCh3oh"
                        type="number"
                        @input="minMax('daySupplyCh3oh',editForm.daySupplyCh3oh)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他直供企业工业用气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyNh3"
                        type="number"
                        @input="minMax('daySupplyNh3',editForm.daySupplyNh3)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="直供液化工厂LNG月供气量">
              <el-input placeholder="请输入内容" v-model="editForm.daySupplyLiquPlant"
                        type="number"
                        @input="minMax('daySupplyLiquPlant',editForm.daySupplyLiquPlant)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直供甲醇化肥厂供气量">
              <el-input placeholder="请输入内容" v-model="editForm.dayYieldNaGas"
                        type="number"
                        @input="minMax('dayYieldNaGas',editForm.dayYieldNaGas)"
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
      <el-button class="confrim-btn" @click="statu==='create'?createData('editForm'):updateData('editForm')">确 定
      </el-button>
    </div>

  </div>

</template>

<script>
import { gasfieldupdate, gasfieldsave, dic,oilgasdayInit } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        oilGasName: '',
        recordDate: '',
        oilGasAreaType: '',
        oilGasAreaName: '',
        groupType: '',
        dayYieldNaGas: '',
        daySupplyNaGas: '',
        dayPlanSupplyNaGas: '',
        daySupplyNaGasContract: '',
        daySupplyPipelineCompany: '',
        daySupplyCh3oh: '',
        daySupplyNh3: '',
        daySupplyLiquPlant: '',
        leagueCityName:''
      },
      pageTitle: '',
      statu: '',
      optionsGroupType: [],
      unit: '万吨',
      rules: {
        oilGasName: [
          { required: true, message: '请选择气田名称', trigger: 'change' }
        ],
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      gasTypesAry: [],
      leagueCityNameAry: [],
      oilGasOptions: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.oilgasdayInit()
  },
  mounted() {
    Promise.all([
      this.dic()
    ]).then(res => {
      if (this.statu !== 'create') {
        this.update()
      }
    })
  },
  methods: {
    oilgasdayInit(){
      oilgasdayInit().then((res)=>{
        if(res.success){
          this.editForm.leagueCityName=res.data.zuzhijigou
          this.editForm.groupType=res.data.qiyejiegou
        }else{
          this.$notify({
            message: '请求失败',
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
          const gasType = data.gasTypes
          // const groupTypes = data.groupType
          const leagueCityType = data.leagueCityType
          // this.gasTypesAry = gasType
          this.oilGasOptions = []
          gasType.forEach(item => {
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
          // this.optionsGroupType = groupTypes
          this.leagueCityNameAry = leagueCityType
        }
      })
    },
    // 数据回显
    update() {
      return new Promise((resolve, reject) => {
        gasfieldupdate(this.$route.query.id).then((res) => {
          if (res.code === 0) {
            this.editForm = res.body
            this.editForm.oilGasName = [res.body.typeName, res.body.oilGasName]
          } else {
            this.$notify({
              message: '请求失败',
              type: 'error',
              offset: 100
            })
          }
        })
      })
    },
    // 取消
    close() {
      this.$router.push('/gassupplymonth/list')
    },
    // 新增保存
    createData() {
      console.log(this.editForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editForm.oilGasName = Array.isArray(this.editForm.oilGasName) ? this.editForm.oilGasName[this.editForm.oilGasName.length - 1] : this.editForm.oilGasName
          gasfieldsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gassupplymonth/list')
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
          this.editForm.oilGasName = Array.isArray(this.editForm.oilGasName) ? this.editForm.oilGasName[this.editForm.oilGasName.length - 1] : this.editForm.oilGasName
          gasfieldsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gassupplymonth/list')
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
.text-center {
  text-align: center;
}
</style>

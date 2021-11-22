<template>
  <div class="app-container">
    <div class="form-add"><span class="first">油气田企业填报</span>
      <span class="first-line">></span>
      <span class="first">气田基础信息填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="110px"
               class="form-box clearfix"
      >
        <!--        /*1油气田名称、2时间、3油气田区域类型、4油气田区域名称、5集团标识、6盟市名称、
                7月产量、8计划月产量、9月供应量、10计划月供应量、11区内供应量、12区外供应量、
                13月产能、14综合能源消费量、15状态*/-->

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
<!--          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="气田面积">
              <el-input placeholder="请输入内容" v-model="editForm.oilGasSize"
                        type="number"
                        @input="minMax('oilGasSize',editForm.oilGasSize)"
              >
                <template slot="append">平方公里</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="中心经纬度" class="no-unit">
              <el-input placeholder="请输入内容" v-model="editForm.oilGasCoordinate">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit">
              <el-input v-model="editForm.enterName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="企业结构" class="no-unit">
              <el-input v-model="editForm.groupType" disabled></el-input>
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
import { gasinfoUpdate, gasinfoSave, dic, oilgasdayInit,gasinfoChange } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        oilGasName: '',
        oilGasAreaType: '',
        enterName: '',
        groupType: '',
        leagueCityName: '',
        yieldOilGas: '',
        oilGasPlanMonthYield: '',
        supplyOilGas: '',
        oilGasPlanMonthSupply: '',
        supplyInOilGas: '',
        supplyOutOilGas: '',
        capacityOilGas: '',
        energyConsumption: '',
        oilGasCoordinate: '',
        oilGasSize: ''
      },
      pageTitle: '',
      statu: '',
      optionsGroupType: [],
      unit: '万立方米',
      rules: {
        oilGasName: [
          { required: true, message: '请选择气田名称', trigger: 'change' }
        ]
       /* recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]*/
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
    oilgasdayInit() {
      oilgasdayInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
          this.editForm.groupType = res.data.qiyejiegou
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
        gasinfoUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/gasinfo/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editForm.oilGasName = Array.isArray(this.editForm.oilGasName) ? this.editForm.oilGasName[this.editForm.oilGasName.length - 1] : this.editForm.oilGasName
          const param = this.editForm
          param['oilGasAreaType'] = 2
          gasinfoSave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasinfo/list')
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
          const param = this.editForm
          param['oilGasAreaType'] = 2
          gasinfoChange(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasinfo/list')
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

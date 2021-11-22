<template>
  <div class="app-container">
    <div class="form-add"><span class="first">国土资源厅按年填报</span>
      <span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="130px"
               class="form-box clearfix"
      >
        <!--        /*1油气田名称、2时间、3油气田区域类型、4油气田区域名称、5集团标识、6盟市名称、
                7累计探明地质储量、8剩余技术可采储量、9剩余经济可采储量、10储采比、11油气田人数、12远景资源量、
                13预测储量、14控制储量、15油气田面积、16状态*/-->

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
                placeholder="请选择日期"
                type="year"
                value-format="yyyy"
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
            <el-form-item label="累计探明地质储量">
              <el-input placeholder="请输入内容" v-model="editForm.reservesCumulativeKnow"
                        type="number"
                        @input="minMax('reservesCumulativeKnow',editForm.reservesCumulativeKnow)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余技术可采储量">
              <el-input placeholder="请输入内容" v-model="editForm.recoveryReservesSurplusTech"
                        type="number"
                        @input="minMax('recoveryReservesSurplusTech',editForm.recoveryReservesSurplusTech)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="剩余经济可采储量">
              <el-input placeholder="请输入内容" v-model="editForm.recoveryReservesSurplusEcon"
                        type="number"
                        @input="minMax('recoveryReservesSurplusEcon',editForm.recoveryReservesSurplusEcon)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="储采比">
              <el-input placeholder="请输入内容" v-model="editForm.reserveProductionRatio"
                        type="number"
                        @input="minMax('reserveProductionRatio',editForm.reserveProductionRatio)"
              >
                <template slot="append">年</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">
            <el-form-item label="气田人数" class="no-unit">
              <el-input placeholder="请输入内容" v-model="editForm.peopleNum"
                        type="number"
                        @input="minMax('peopleNum',editForm.peopleNum)"
              >
              </el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="远景资源量">
              <el-input placeholder="请输入内容" v-model="editForm.prospectiveResources"
                        type="number"
                        @input="minMax('prospectiveResources',editForm.prospectiveResources)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预测储量">
              <el-input placeholder="请输入内容" v-model="editForm.predictedReserves"
                        type="number"
                        @input="minMax('predictedReserves',editForm.predictedReserves)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="控制储量">
              <el-input placeholder="请输入内容" v-model="editForm.controlReserve"
                        type="number"
                        @input="minMax('controlReserve',editForm.controlReserve)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
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
import { dic, guotuSave, guotuGasUpdate, oilgasdayInit } from '@/api/fill'

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
        leagueCityName: '',
        reservesCumulativeKnow: '',
        recoveryReservesSurplusTech: '',
        recoveryReservesSurplusEcon: '',
        reserveProductionRatio: '',
        peopleNum: '',
        prospectiveResources: '',
        predictedReserves: '',
        controlReserve: '',
        oilGasSize: '',
        predictedResources:''
      },
      optionsGroupType: [],
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
  },
  mounted() {
    this.oilgasdayInit()
    Promise.all([
      this.dic()
    ]).then(res => {
      if (this.statu !== 'create') {
        this.update()
      }
    })
  },
  methods: {
    minMax(name, value) {
      if (value < 0) {
        this.editForm[name] = 0
      } else if (value > 1000000) {
        this.editForm[name] = 1000000
      }
    },
    oilgasdayInit() {
      oilgasdayInit().then((res) => {
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
    dic() {
      dic().then((res) => {
        if (res.success) {
          const data = res.data
          const gasType = data.gasTypes
          const groupTypes = data.groupType
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
          this.optionsGroupType = groupTypes
          this.leagueCityNameAry = leagueCityType
        }
      })
    },
    // 数据回显
    update() {
      return new Promise((resolve, reject) => {
        guotuGasUpdate(this.$route.query.id).then((res) => {
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
    close() {
      this.$router.push('/guotu/gasList')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editForm.oilGasName =
            Array.isArray(this.editForm.oilGasName)?this.editForm.oilGasName[this.editForm.oilGasName.length - 1]:this.editForm.oilGasName
          const param = this.editForm
          param['oilGasAreaType'] = 2
          guotuSave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/guotu/gasList')
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
          this.editForm.oilGasName =
            Array.isArray(this.editForm.oilGasName)?this.editForm.oilGasName[this.editForm.oilGasName.length - 1]:this.editForm.oilGasName
          const param = this.editForm
          param['oilGasAreaType'] = 2
          guotuSave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/guotu/gasList')
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

<template>
  <div class="app-container">
    <div class="form-add"><span class="first">能源局填报</span>
      <span class="first-line">></span>
      <span class="first">城市燃气储气填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="220px"
               class="form-box clearfix"
      >
        <!--        企业名称、盟市名称、时间、状态
                已建储气能力(万立方米)
                正在建设储气能力(万立方米)
                待建设储气能力(万立方米)
                城燃企业5%实际储气量
                城燃企业5%计划储气量-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" class="no-unit">
              <el-input v-model="editForm.leagueCityName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                type="year"
                value-format="yyyy"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同量">
              <el-input placeholder="请输入内容" v-model="editForm.enterpriseContract"
                        type="number"
                        @input="minMax('enterpriseContract',editForm.enterpriseContract)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="盟市年度城燃5%计划储气量">
              <el-input placeholder="请输入内容"
                        v-model="editForm.leaguePlannedStorageEnterprise"
                        type="number"
                        @input="minMax('leaguePlannedStorageEnterprise',editForm.leaguePlannedStorageEnterprise)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="qixianAry.length>0">
            <el-form-item label="城燃企业5%计划储气量">
              <el-input placeholder="请输入内容"
                        v-model="editForm.plannedStorageEnterprise"
                        type="number"
                        @input="minMax('plannedStorageEnterprise',editForm.plannedStorageEnterprise)"
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
import { energygasyearSave, energygasyearUpdate, dic, energygasyearInit,insertAll,energygasyearChange } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        recordDate: '',
        leagueCityName: '',
        plannedStorageEnterprise: '',
        enterpriseContract: '',
        leaguePlannedStorageEnterprise:''
      },
      qixian: {},
      rules: {
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      leagueCityTypeAry: [],
      qixianAry: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.dic()
    this.energygasyearInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    //查询用户所属盟市下的旗县
    energygasyearInit() {
      energygasyearInit().then((res) => {
        if (res.success) {
          this.qixianAry = res.data.qixian
          this.editForm.leagueCityName = res.data.zuzhijigou
          this.qixianAry.forEach((item) => {
            this.$set(this.qixian, item.typeName, '')
          })
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
          const enterName = res.data.nengyuanju
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
      energygasyearUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/energygasyear/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = []
          Object.keys(this.qixian).forEach((key) => {
            console.log(key)
            params.push({
              recordDate: this.editForm.recordDate,
              leagueCityName: this.editForm.leagueCityName,
              plannedStorageEnterprise: this.qixian[key],
              enterpriseContract: this.editForm.enterpriseContract,
              enterName: key
            })
          })
          insertAll(params).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/energygasyear/list')
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
          energygasyearChange(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/energygasyear/list')
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

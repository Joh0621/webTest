<template>
  <div>
    <div class="form-add"><span class="first">煤制气企业填报</span>
      <span class="first-line">></span>
      <span class="first">企业信息填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="90px"
               class="form-box clearfix"
      >
        <!--        /*1企业名称、2时间、3企业性质、4税收、5企业人数、6状态*/-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="enterName" class="no-unit">
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
            <el-form-item label="企业性质" class="no-unit">
              <el-select v-model="editForm.enterpriseEconomyType">
                <el-option
                  v-for="item in enterpriseEconomyTypeAry"
                  :key="item.dictItemName"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产能">
              <el-input placeholder="请输入内容" v-model="editForm.proCapacity"
                        type="number"
                        @input="minMax('proCapacity',editForm.proCapacity)">
                <template slot="append">万吨/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人" class="no-unit">
              <el-input placeholder="请输入内容" v-model="editForm.legalRepresentative">
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业人数" class="no-unit">
              <el-input placeholder="请输入内容" v-model="editForm.employeesNum"
                        type="number"
                        @input="minMax('employeesNum',editForm.employeesNum)">
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
import { dic, enterpriseInit, enterpriseSave, enterpriseUpdate } from '@/api/fill'


export default {
  name: 'editFormAdd',

  data() {
    return {
      enterpriseEconomyTypeAry: [],
      enterNameAry:[],
      editForm: {
        enterName: '',
        enterpriseEconomyType: '',
        proCapacity:'',
        taxRevenue: '',
        employeesNum: '',
        legalRepresentative:''
      },
      rules: {
      /*  enterName: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ]*/
      }
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
          const data = res.data.enterpriseEconomyType
          // const enterName = res.data.meizhiqi
          this.enterpriseEconomyTypeAry = data
          // this.enterNameAry=enterName
        } else {
          this.$notify({
            message: '请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    // 数据回显
    update() {
      enterpriseUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/enterprise/coalgasList')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const parms = this.editForm
          parms['enterpriseType'] = '煤制气企业'
          enterpriseSave(parms).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/enterprise/coalgasList')
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
          const parms = this.editForm
          parms['enterpriseType'] = '煤制气企业'
          enterpriseSave(parms).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/enterprise/coalgasList')
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

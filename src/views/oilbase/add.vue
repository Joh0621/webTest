<template>
  <div class="app-container">
    <div class="form-add"><span class="first">油气田企业填报</span>
      <span class="first-line">></span>
      <span class="first">生产基地信息填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="140px"
               class="form-box clearfix"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="基地(单位-部门)" prop="baseName" class="no-unit">
              <el-input v-model="editForm.baseName"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">
            <el-form-item label="日期" prop="recordDate" class="no-unit">
              <el-date-picker
                v-model="editForm.recordDate"
                placeholder="请选择日期"
                type="month"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="所属企业" class="no-unit">
              <el-input v-model="editForm.groupType" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="企业法人" class="no-unit">
              <el-input v-model="editForm.enterJuridical" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基地员工数量">
              <el-input v-model="editForm.employeesNum" placeholder="请输入内容"
                        type="number"
                        @input="minMax('employeesNum',editForm.employeesNum)"
              >
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row>


          <el-col :span="12">
            <el-form-item label="当月产量">
              <el-input v-model="editForm.yieldMonth" placeholder="请输入内容"
                        type="number"
                        @input="minMax('yieldMonth',editForm.yieldMonth)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理油井数量">
              <el-input v-model="editForm.oilWellNum" placeholder="请输入内容"
                        type="number"
                        @input="minMax('oilWellNum',editForm.oilWellNum)"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer-btn">
      <el-button class="close-btn" @click="close">取 消</el-button>
      <el-button
        class="confrim-btn"
        type="primary"
        @click="statu==='create'?createData('editForm'):updateData('editForm')"
      >确 定
      </el-button>
    </div>
  </div>

</template>

<script>
import { dic, oilbaseUpdate, oilbaseSave, gasyearInit } from '@/api/fill'

export default {
  name: 'EditFormAdd',
  data() {
    return {
      editForm: {
        baseName: '',
        // recordDate: '',
        groupType: '',
        enterJuridical: '',
        employeesNum: '',
        // yieldMonth: '',
        yieldYear: '',
        oilWellNum: ''
        // enterName: ''
      },
      enterNameAry: [],
      rules: {
        baseName: [
          { required: true, message: '请输入基地(单位-部门)', trigger: 'blur' }
        ],
       /* recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]*/
      }
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.gasyearInit()
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
    gasyearInit() {
      gasyearInit().then((res) => {
        if (res.success) {
          // this.editForm.enterName = res.data.zuzhijigou
          this.editForm.groupType = res.data.zuzhijigou
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
          const enterName = res.data.groupType
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
      return new Promise((resolve, reject) => {
        oilbaseUpdate(this.$route.query.id).then((res) => {
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
      })
    },
    close() {
      this.$router.push('/oilbase/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          oilbaseSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/oilbase/list')
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
          oilbaseSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/oilbase/list')
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

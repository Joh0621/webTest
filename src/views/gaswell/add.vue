<template>
  <div class="app-container">
    <div class="form-add"><span class="first">油气田企业填报</span>
      <span class="first-line">></span>
      <span class="first">气井信息填报</span
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
            <el-form-item label="气井名称" prop="gasWellName" class="no-unit">
              <el-input v-model="editForm.gasWellName"></el-input>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
                      <el-form-item label="日期" class="no-unit">
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
            <el-form-item label="气井地图坐标信息" class="no-unit">
              <el-input v-model="editForm.gasWellCoordinate" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="气井所属生产基地" class="no-unit">
              <el-select v-model="editForm.baseName" clearable>
                <el-option
                  v-for="item in baseNameAry"
                  :key="item.baseName"
                  :label="item.baseName"
                  :value="item.baseName"
                ></el-option>
              </el-select>
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
import { dic, gaswellSave, gaswellUpdate, oilgasdayInit } from '@/api/fill'

export default {
  name: 'EditFormAdd',
  data() {
    return {
      yieldAttributeAry: [],
      editForm: {
        gasWellName: '',
        recordDate: '',
        gasWellCoordinate: '',
        baseName: '',
        gasWellYield: '',
        enterName: ''
      },
      baseNameAry:[],
      rules: {
        gasWellName: [
          { required: true, message: '请输入气井名称', trigger: 'blur' }
        ]
      }
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
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    oilgasdayInit() {
      oilgasdayInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
          this.baseNameAry=res.data.gasBase
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
          const yieldAtr = res.data.yieldAttribute
          this.yieldAttributeAry = yieldAtr
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
        gaswellUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/gaswell/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          gaswellSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gaswell/list')
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
          gaswellSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gaswell/list')
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

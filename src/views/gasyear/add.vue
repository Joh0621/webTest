<template>
  <div class="app-container">
    <div class="form-add"><span class="first">气田合同按年填报</span>
      <span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="130px"
               class="form-box clearfix"
      >

        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit">
              <!--              <el-select v-model="editForm.enterName" placeholder="请选择">
                              <el-option
                                v-for="item in enterNameAry"
                                :key="item.typeName"
                                :label="item.typeName"
                                :value="item.typeName"
                              >
                              </el-option>
                            </el-select>-->
              <el-input disabled v-model="editForm.enterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属企业" class="no-unit">
              <!--              <el-select v-model="editForm.enterName" placeholder="请选择">
                              <el-option
                                v-for="item in enterNameAry"
                                :key="item.typeName"
                                :label="item.typeName"
                                :value="item.typeName"
                              >
                              </el-option>
                            </el-select>-->
              <el-input disabled v-model="editForm.groupType"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
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
          <el-col :span="12">
            <el-form-item label="天然气供气合同量">
              <el-input placeholder="请输入内容" v-model="editForm.yearSupplyNaGasContract"
                        type="number"
                        @input="minMax('yearSupplyNaGasContract',editForm.yearSupplyNaGasContract)"
              >
                <template slot="append">亿立方米</template>
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
import { dic, gasyearInit, gasyearSave, gasyearUpdate } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        enterName: '',
        recordDate: '',
        yearSupplyNaGasContract: '',
        groupType: ''
      },
      enterNameAry: [],
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
          this.editForm.enterName = res.data.zuzhijigou
          this.editForm.groupType = res.data.qiyejiegou
        } else {
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
          const enterName = data.chengpinyou
          this.enterNameAry = enterName
        }
      })
    },
    // 数据回显
    update() {
      return new Promise((resolve, reject) => {
        gasyearUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/gasyear/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editForm.oilGasName =
            Array.isArray(this.editForm.oilGasName) ? this.editForm.oilGasName[this.editForm.oilGasName.length - 1] : this.editForm.oilGasName
          const param = this.editForm
          param['oilGasAreaType'] = 2
          gasyearSave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasyear/list')
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
            Array.isArray(this.editForm.oilGasName) ? this.editForm.oilGasName[this.editForm.oilGasName.length - 1] : this.editForm.oilGasName
          const param = this.editForm
          param['oilGasAreaType'] = 2
          gasyearSave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasyear/list')
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

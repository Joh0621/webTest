<template>
  <div class="app-container">
    <div class="form-add"><span class="first">能源局填报</span>
      <span class="first-line">></span>
      <span class="first">储气释放事件填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" label-width="160px" :rules="rules" ref="ruleForm"
               class="form-box clearfix"
      >
        <!--        /*league_city_name盟市名称（地区）
                enter_name		企业（管理方）
                release_volumn	释放气量
                air_attribute		气量属性
                surplus_volumn	剩余气量
                record_date		时间*/-->

        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市名称" class="no-unit" prop="leagueCityName">
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
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="调峰单位" class="no-unit" prop="enterName">
              <!--              <el-select v-model="editForm.enterName" clearable>
                              <el-option
                                v-for="item in enterNameAry"
                                :key="item.typeId"
                                :label="item.typeName"
                                :value="item.typeName"
                              >
                              </el-option>
                            </el-select>-->
              <el-input v-model="editForm.enterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="释放气量">
              <el-input placeholder="请输入内容" v-model="editForm.releaseVolumn"
                        type="number"
                        @input="minMax('releaseVolumn',editForm.releaseVolumn)"
              >
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="气量属性" class="no-unit">
              <el-select v-model="editForm.airAttribute" clearable>
                <el-option
                  v-for="item in attrAry"
                  :key="item.dictItemId"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余气量">
              <el-input placeholder="请输入内容" v-model="editForm.surplusVolumn"
                        type="number"
                        @input="minMax('surplusVolumn',editForm.surplusVolumn)"
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
import { gasreleaseUpdate, gasreleasesave, dic, energygasyearInit } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      leagueCityTypeAry: [],//盟市名称
      enterNameAry: [],
      attrAry: [],
      editForm: {
        recordDate: '',
        leagueCityName: '',
        enterName: '',
        releaseVolumn: '',
        airAttribute: '',
        surplusVolumn: ''
      },
      pageTitle: '',
      statu: '',
      rules: {
        enterName: [
          { required: true, message: '请输入调峰单位', trigger: 'blur' }
        ],
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
          const attr = res.data.gasProperty
          this.leagueCityTypeAry = data
          this.enterNameAry = enterName
          this.attrAry = attr
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
      gasreleaseUpdate(this.$route.query.id).then((res) => {
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
    // 取消
    close() {
      this.$router.push('/gasrelease/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          gasreleasesave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasrelease/list')
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
          gasreleasesave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/gasrelease/list')
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

<template>
  <div class="app-container">
    <div class="form-add"><span class="first">城市燃气企业填报</span>
      <span class="first-line">></span>
      <span class="first">调峰按日填报</span><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="140px"
               class="form-box clearfix"
      >
        <!--        /*企业名称、盟市名称、时间、状态
                商业调峰量
                甲醇化肥调峰量
                可中断工业调峰量
                不可中断工业调峰量
                LNG调峰量
                盟市储气日调用量（释放气量）
                计划日调峰量
                实际日调峰量*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="调峰单位" class="no-unit" prop="enterName">
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
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市名称" class="no-unit">
              <el-select v-model="editForm.leagueCityName">
                <el-option
                  v-for="item in leagueCityTypeAry"
                  :key="item.dictItemName"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商业调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.businessPeakLoadRegulation"
                        type="number"
                        @input="minMax('businessPeakLoadRegulation',editForm.businessPeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="甲醇化肥调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.methanolPeakLoadRegulation"
                        type="number"
                        @input="minMax('methanolPeakLoadRegulation',editForm.methanolPeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可中断工业调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.interruptiblePeakLoadRegulation"
                        type="number"
                        @input="minMax('interruptiblePeakLoadRegulation',editForm.interruptiblePeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="不可中断工业调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.uninterruptiblePeakLoadRegulation"
                        type="number"
                        @input="minMax('uninterruptiblePeakLoadRegulation',editForm.uninterruptiblePeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="LNG调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.lngPeakLoadRegulation"
                        type="number"
                        @input="minMax('lngPeakLoadRegulation',editForm.lngPeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市储气日调用量">
              <el-input placeholder="请输入内容" v-model="editForm.gasInvoke"
                        type="number"
                        @input="minMax('gasInvoke',editForm.gasInvoke)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划日调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.planPeakLoadRegulation"
                        type="number"
                        @input="minMax('planPeakLoadRegulation',editForm.planPeakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际日调峰量">
              <el-input placeholder="请输入内容" v-model="editForm.peakLoadRegulation"
                        type="number"
                        @input="minMax('peakLoadRegulation',editForm.peakLoadRegulation)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="响应等级" class="no-unit">
              <el-select v-model="editForm.responseLevel">
                <el-option
                  v-for="item in responseLevelAry"
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
            <el-form-item label="具体措施" class="no-unit">
              <el-input placeholder="请输入内容" v-model="editForm.specificMeasure">
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
import { citygaspeekdaysave, citygaspeekdayUpdate, citygasyearInit, dic } from '@/api/fill'


export default {
  name: 'editFormAdd',
  data() {
    return {
      responseLevelAry: [],
      leagueCityTypeAry: [],//盟市名称
      enterNameAry: [],
      editForm: {
        recordDate: '',
        enterName: '',
        leagueCityName: '',
        businessPeakLoadRegulation: '',
        methanolPeakLoadRegulation: '',
        interruptiblePeakLoadRegulation: '',
        uninterruptiblePeakLoadRegulation: '',
        lngPeakLoadRegulation: '',
        gasInvoke: '',
        planPeakLoadRegulation: '',
        peakLoadRegulation: '',
        responseLevel: '',
        peakObject: '',
        specificMeasure: ''
      },
      rules: {
        /*enterName: [
          { required: true, message: '请选择调峰单位', trigger: 'change' }
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
    //字典表
    this.dic()
    this.citygasyearInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    citygasyearInit() {
      citygasyearInit().then((res) => {
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
          // const enterName = res.data.chengshiranqi
          const response = res.data.responseLevel
          this.leagueCityTypeAry = data
          // this.enterNameAry = enterName
          this.responseLevelAry = response
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
      citygaspeekdayUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/citygaspeekday/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          citygaspeekdaysave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/citygaspeekday/list')
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
          citygaspeekdaysave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/citygaspeekday/list')
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

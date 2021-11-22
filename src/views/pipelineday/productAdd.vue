<template>
  <div class="app-container">
    <div class="form-add"><span class="first">管道企业填报</span>
      <span class="first-line">></span>
      <span class="first">按日填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="160px"
               class="form-box clearfix"
      >
        <!--        /*1企业名称、2时间、3盟市名称、管线名、管线进油量、管线出油量、
                管线管存量、管线累计输油、城市燃气接收量、甲醇接收量、化肥接收量、lng接收气量、状态*/-->

        <el-row>
          <!--          <el-col :span="12">
                      <el-form-item label="企业名称" class="no-unit" prop="enterName">
                        <el-select v-model="editForm.enterName" placeholder="请选择管线名" clearable>
                          <el-option
                            v-for="item in enterNameAry"
                            :key="item.typeName"
                            :label="item.typeName"
                            :value="item.typeName"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="12">
            <el-form-item label="管线名" class="no-unit" prop="pipelineName">
              <el-select v-model="editForm.pipelineName" placeholder="请选择管线名" clearable>
                <el-option
                  v-for="item in pipelineNameTypeAry"
                  :key="item.pipelineName"
                  :label="item.pipelineName"
                  :value="item.pipelineName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="管线进油量">
              <el-input placeholder="请输入内容" v-model="editForm.pipelineInputVolume"
                        type="number"
                        @input="minMax('pipelineInputVolume',editForm.pipelineInputVolume)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管线出油量">
              <el-input placeholder="请输入内容" v-model="editForm.pipelineOutputVolume"
                        type="number"
                        @input="minMax('pipelineOutputVolume',editForm.pipelineOutputVolume)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="管线管存量">
              <el-input placeholder="请输入内容" v-model="editForm.pipelineStock"
                        type="number"
                        @input="minMax('pipelineStock',editForm.pipelineStock)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
                      <el-form-item label="管线累计输油">
                        <el-input placeholder="请输入内容" v-model="editForm.pipelineCumulativeVolume"
                                  type="number"
                                  @input="minMax('pipelineCumulativeVolume',editForm.pipelineCumulativeVolume)">
                          <template slot="append">万吨</template>
                        </el-input>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="12">
            <el-form-item label="末站压力实际值">
              <el-input placeholder="请输入内容" v-model="editForm.pressureActualValue"
                        type="number"
                        @input="minMax('pressureActualValue',editForm.pressureActualValue)"
              >
                <template slot="append">Mpa</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <!--          <el-col :span="12">
                      <el-form-item label="末站压力阈值">
                        <el-input placeholder="请输入内容" v-model="editForm.pressureThreshold"
                                  type="number"
                                  @input="minMax('pressureThreshold',editForm.pressureThreshold)">
                          <template slot="append">Mpa</template>
                        </el-input>
                      </el-form-item>
                    </el-col>-->

        </el-row>
        <!--        <el-row>

                  <el-col :span="12">
                    <el-form-item label="设计输油能力">
                      <el-input placeholder="请输入内容" v-model="editForm.runPlanPressure"
                                type="number"
                                @input="minMax('runPlanPressure',editForm.runPlanPressure)">
                        <template slot="append">万吨/天</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实际输油能力">
                      <el-input placeholder="请输入内容" v-model="editForm.runPressure"
                                type="number"
                                @input="minMax('runPressure',editForm.runPressure)">
                        <template slot="append">万吨/天</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>-->
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
import { dic, pipelinedayInit, pipelinedaysave, pipelinedayUpdate } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        recordDate: '',
        // enterName: '',
        pipelineName: '',
        pipelineInputVolume: '',
        pipelineOutputVolume: '',
        pipelineStock: '',
        pipelineCumulativeVolume: '',
        pressureThreshold: '',
        pressureActualValue: '',
        runPlanPressure: '',
        runPressure: '',
        enterName: ''
      },
      rules: {
        pipelineName: [
          { required: true, message: '请选择管线名称', trigger: 'change' }
        ],
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      pipelineNameTypeAry: [],
      enterNameAry: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.pipelinedayInit()
    // this.dic()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    pipelinedayInit() {
      pipelinedayInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
          this.pipelineNameTypeAry = res.data.chengpinyou
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
          const pipelineNameType = res.data.chengpinyouguandao
          const enterName = res.data.guandao
          this.pipelineNameTypeAry = pipelineNameType
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
      pipelinedayUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/pipelineday/productList')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const param = this.editForm
          param['pipelineType'] = '成品油管线'
          pipelinedaysave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/pipelineday/productList')
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
          const param = this.editForm
          param['pipelineType'] = '成品油管线'
          pipelinedaysave(param).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/pipelineday/productList')
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

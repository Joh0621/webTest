<template>
  <div class="app-container">
    <div class="form-add"><span class="first">管道企业填报</span>
      <span class="first-line">></span>
      <span class="first">管道信息填报</span><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="140px"
               class="form-box clearfix"
      >
        <!--        /*1管道名、2管道类型、3企业名称、4时间、5区内里程、6运送能力、7管道长度、
        8设计压力、9末站压力阈值、10末站压力实际值、11区内起点、12区内终点、
        13设计输气（油）能力、14实际输气（油）能力、15管径、16投产时间、17负责人、18状态*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="管道类型" class="no-unit" prop="pipelineType">
              <el-select v-model="editForm.pipelineType" placeholder="请选择" @change="changeUnit">
                <el-option
                  v-for="item in pipelineTypeAry"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管线名" class="no-unit" prop="pipelineName">
              <!--              <el-cascader
                              v-model="editForm.pipelineName"
                              placeholder="请选择管线名称"
                              :options="pipelineNameOptions"
                            ></el-cascader>-->
              <el-input v-model="editForm.pipelineName"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
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
              <el-input v-model="editForm.enterName" disabled></el-input>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
                      <el-form-item label="企业性质" class="no-unit">
                        <el-select v-model="editForm.enterType" placeholder="请选择">
                          <el-option
                            v-for="item in enterpriseEconomyTypeAry"
                            :key="item.dictItemName"
                            :label="item.dictItemName"
                            :value="item.dictItemName"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>-->
          <el-col :span="12">
            <el-form-item label="管径">
              <el-input v-model="editForm.pipelineDiameter" placeholder="请输入内容"
                        type="number"
                        @input="minMax('pipelineDiameter',editForm.pipelineDiameter)"
              >
                <template slot="append">毫米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-row>
        &lt;!&ndash;          <el-col :span="12">
                    <el-form-item label="企业地址" class="no-unit">
                      <el-input v-model="editForm.enterAddress" placeholder="请输入内容"/>
                    </el-form-item>
                  </el-col>&ndash;&gt;


                </el-row>-->
        <el-row>

          <el-col :span="12">
            <el-form-item label="境内里程">
              <el-input v-model="editForm.pipelineLength" placeholder="请输入内容"
                        type="number"
                        @input="minMax('pipelineLength',editForm.pipelineLength)"
              >
                <template slot="append">公里</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设计运输能力">
              <el-input v-model="editForm.transportPower" placeholder="请输入内容"
                        type="number"
                        @input="minMax('transportPower',editForm.transportPower)"
              >
                <template slot="append">{{ unit }}</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="投产时间" class="no-unit">
              <el-date-picker
                v-model="editForm.dateIncreaseInvest"
                placeholder="请选择日期"
                type="year"
                value-format="yyyy"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全线起点位置" class="no-unit">
              <el-input v-model="editForm.startPipeline" placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="全线终点位置" class="no-unit">
              <el-input v-model="editForm.endPipeline" placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区内起点" class="no-unit">
              <el-input v-model="editForm.startInPipeline" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="区内终点" class="no-unit">
              <el-input v-model="editForm.endInPipeline" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设计压力">
              <el-input v-model="editForm.designPressure" placeholder="请输入内容"
                        type="number"
                        @input="minMax('designPressure',editForm.designPressure)"
              >
                <template slot="append">Mpa</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法人代表" class="no-unit">
              <el-input v-model="editForm.legalRepresentative" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" class="no-unit">
              <el-input v-model="editForm.chargeUser" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="管道长度">
              <el-input v-model="editForm.pipelineTotalLength" placeholder="请输入内容"
                        type="number"
                        @input="minMax('pipelineTotalLength',editForm.pipelineTotalLength)"
              >
                <template slot="append">千米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否运行" class="no-unit">
              <el-input v-model="editForm.isUse" placeholder="请输入内容"/>
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
import { dic, pipelinemonthsave, pipelinemonthUpdate, pipelinemonthInit } from '@/api/fill'

export default {
  name: 'EditFormAdd',
  data() {
    return {
      editForm: {
        pipelineName: '',
        pipelineType: '',
        enterName: '',
        enterType: '',
        enterAddress: '',
        recordDate: '',
        pipelineDiameter: '',
        pipelineLength: '',
        transportPower: '',
        dateIncreaseInvest: '',
        startPipeline: '',
        endPipeline: '',
        startInPipeline: '',
        endInPipeline: '',
        designPressure: '',
        legalRepresentative: '',
        chargeUser: '',
        userPhone: '',
        isUse: '',
        pipelineTotalLength: ''
      },
      pipelineNameTypeAry: [],
      pipelineTypeAry: [],
      enterpriseEconomyTypeAry: [],
      enterNameAry: [],
      rules: {
        pipelineType: [
          { required: true, message: '请选择管道名称', trigger: 'change' }
        ],
        pipelineName: [
          { required: true, message: '请输入管线名称', trigger: 'blur' }
        ]
      },
      pipelineNameOptions: [],
      unit: ''
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.pipelinemonthInit()
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
    pipelinemonthInit() {
      pipelinemonthInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
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
    //更换单位re
    changeUnit(val) {
      if (val == '天然气管线') {
        this.unit = '亿立方米/年'
      } else {
        this.unit = '万吨/年'
      }
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const pipelineTypy = res.data.pipelineType
          const enterpriseEconomyType = res.data.enterpriseEconomyType
          // const enterName = res.data.guandao
          this.pipelineTypeAry = pipelineTypy
          /*this.pipelineNameOptions = []
          pipelineTypy.forEach(item => {
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
            this.pipelineNameOptions.push({
              value: item.typeName,
              label: item.typeName,
              children: childList
            })
          })*/
          this.enterpriseEconomyTypeAry = enterpriseEconomyType
          // this.enterNameAry = enterName
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
        pipelinemonthUpdate(this.$route.query.id).then((res) => {
          if (res.code === 0) {
            this.editForm = res.body
            // this.editForm.pipelineName = [res.body.typeName, res.body.pipelineName]
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
      this.$router.push('/pipelinemonth/list')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // this.editForm.pipelineName = this.editForm.pipelineName[this.editForm.pipelineName.length - 1]
          pipelinemonthsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/pipelinemonth/list')
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
          // this.editForm.pipelineName = this.editForm.pipelineName[this.editForm.pipelineName.length - 1]
          pipelinemonthsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/pipelinemonth/list')
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

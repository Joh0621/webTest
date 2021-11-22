<template>
  <div class="app-container">
    <div class="form-add"><span class="first">能源局填报</span>
      <span class="first-line">></span>
      <span class="first">按年填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="220px"
               class="form-box clearfix"
      >
        <!--        /*盟市名称、时间
                盟市储气设施总容积
                地方政府日均三天计划储气量
                地方政府日均三天实际储气量
                盟市租赁储罐数量
                盟市自建储罐数量
                天然气历史缺口量
                盟市储气日调用量
                盟市气化装置数量
                盟市气化装置日均气化量*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市名称" class="no-unit">
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
                type="year"
                v-model="editForm.recordDate"
                placeholder="请选择日期"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地方政府和城燃企业储罐容积">
              <el-input placeholder="请输入内容" v-model="editForm.tankVolume"
                        type="number"
                        @input="minMax('tankVolume',editForm.tankVolume)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地方政府和城燃企业计划储气量">
              <el-input placeholder="请输入内容" v-model="editForm.plannedStorageGovernment"
                        type="number"
                        @input="minMax('plannedStorageGovernment',editForm.plannedStorageGovernment)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地方政府和城燃企业实际储气量">
              <el-input placeholder="请输入内容" v-model="editForm.actualStorageGovernment"
                        type="number"
                        @input="minMax('actualStorageGovernment',editForm.actualStorageGovernment)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="盟市租赁储罐数量">
              <el-input placeholder="请输入内容" v-model="editForm.tankRent"
                        type="number"
                        @input="minMax('tankRent',editForm.tankRent)">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="12">
            <el-form-item label="盟市自建储罐数量">
              <el-input placeholder="请输入内容" v-model="editForm.tankSelf"
                        type="number"
                        @input="minMax('tankSelf',editForm.tankSelf)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>-->
<!--          <el-col :span="12">
            <el-form-item label="天然气历史缺口量">
              <el-input placeholder="请输入内容" v-model="editForm.naGasBreach"
                        type="number"
                        @input="minMax('naGasBreach',editForm.naGasBreach)">
                <template slot="append">万立方米</template>
              </el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="盟市气化装置数量">
              <el-input placeholder="请输入内容" v-model="editForm.apparatusNum"
                        type="number"
                        @input="minMax('apparatusNum',editForm.apparatusNum)">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地方政府已建储罐数量">
              <el-input placeholder="请输入内容" v-model="editForm.gasStorageCapacityHaveBuilt"
                        type="number"
                        @input="minMax('gasStorageCapacityHaveBuilt',editForm.gasStorageCapacityHaveBuilt)">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>


          <el-col :span="12">
            <el-form-item label="地方政府正在建设储罐数量">
              <el-input placeholder="请输入内容" v-model="editForm.gasStorageCapacityUnderConstruction"
                        type="number"
                        @input="minMax('gasStorageCapacityUnderConstruction',editForm.gasStorageCapacityUnderConstruction)">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地方政府待建设储罐数量">
              <el-input placeholder="请输入内容" v-model="editForm.gasStorageCapacityToBuild"
                        type="number"
                        @input="minMax('gasStorageCapacityToBuild',editForm.gasStorageCapacityToBuild)">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

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
import { dic, energygasyearInit, nengyuanjuyearsave, nengyuanjuyearUpdate } from '@/api/fill'


export default {
  name: 'editFormAdd',
  data() {
    return {
      leagueCityTypeAry: [],//盟市名称
      editForm: {
        recordDate: '',
        leagueCityName: '',
        tankVolume: '',
        plannedStorageGovernment: '',
        actualStorageGovernment: '',
        tankRent: '',
        tankSelf: '',
        naGasBreach: '',
        naGasInvoke: '',
        apparatusNum: '',
        apparatusGasContent: '',
        gasStorageCapacityHaveBuilt: '',
        gasStorageCapacityToBuild: '',
        gasStorageCapacityUnderConstruction: ''

      },
      rules: {
       /* leagueCityName: [
          { required: true, message: '请选择盟市名称', trigger: 'change' }
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
          this.leagueCityTypeAry = data
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
      nengyuanjuyearUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/nengyuanjuyear/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          nengyuanjuyearsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/nengyuanjuyear/list')
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
          nengyuanjuyearsave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/nengyuanjuyear/list')
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
